// Local checks only: Shopify form/app tags are emulated for rendering.
// No live request is sent. NODE_PATH=<deps>/node_modules node scripts/verify-office-visit.cjs [baseline.json] [screenshot-directory]
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {Liquid} = require('liquidjs');
const {chromium} = require('playwright-core');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const book = JSON.parse(read('templates/page.book-a-call.json'));
const defaults = defs => Object.fromEntries((defs || []).filter(s => s.id).map(s => [s.id, s.default ?? '']));
const schema = type => JSON.parse(read('sections/' + type + '.liquid').match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const engine = new Liquid({root: path.join(root, 'snippets'), extname: '.liquid'});
engine.registerFilter('json', value => JSON.stringify(value));
engine.registerFilter('asset_url', file => 'https://preview.local/assets/' + file);
engine.registerFilter('image_url', img => img.url);
engine.registerFilter('default_errors', () => '<ul><li>Email is invalid.</li></ul>');
const context = {settings: JSON.parse(read('config/settings_data.json')).current, request: {design_mode: false}, template: {name: 'page', suffix: 'book-a-call'}, routes: {root_url: '/'}, shop: {name: 'Elma Vada'}, customer: {}};
function media(values) {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, typeof value === 'string' && value.startsWith('shopify://shop_images/') ? {url: 'https://elmavada.com/cdn/shop/files/' + value.split('/').pop(), width: 1200, height: 900} : value]));
}
async function render(id, data, state = {}, overrides = {}) {
  const spec = schema(data.type);
  for (const key of Object.keys(data.settings)) assert(spec.settings.some(s => s.id === key), 'Unknown setting ' + key);
  const section = {id, settings: media({...defaults(spec.settings), ...data.settings}), blocks: (data.block_order || []).map(key => {
    const b = data.blocks[key];
    return {...b, id: key, settings: media({...defaults(spec.blocks.find(x => x.type === b.type)?.settings), ...b.settings})};
  })};
  let source = read('sections/' + data.type + '.liquid').replace(/{% schema %}[\s\S]*?{% endschema %}/, '');
  // A visibly labelled test-only app stub. The production code still renders the real Shopify app block.
  source = source.replace(/{% render block %}/g, '<div data-app-form="{{ block.settings.form_id }}">Shopify Forms app — local test placeholder</div>');
  // Assert the actual tag first: this fixture cannot validate Shopify's redirect service.
  if (data.type === 'office-visit') {
    assert(source.includes("{% form 'contact', id: 'OfficeVisitForm' %}"), 'Use native contact redirect, without a return_to override');
  }
  source = source.replace(/{% form 'contact',[\s\S]*?%}/, '<form method="post" action="/contact#OfficeVisitForm" id="OfficeVisitForm"><input type="hidden" name="form_type" value="contact">').replace(/{% endform %}/g, '</form>');
  return '<div id="shopify-section-' + id + '">' + await engine.parseAndRender(source, {...context, ...overrides, section, form: state}) + '</div>';
}
async function documentHtml(state = {}) {
  let body = '';
  for (const id of book.order) body += await render(id, book.sections[id], state);
  const css = ['base.css', 'theme.css', 'b2b-pages.css', 'revision.css', 'office-visit.css'].map(f => '<style>' + read('assets/' + f) + '</style>').join('');
  const fonts = await engine.parseAndRender(read('snippets/local-fonts.liquid'), context);
  const header = await render('header', context.settings.sections.header);
  const earlyRoute = read('layout/theme.liquid').match(/<script>\s*(document.documentElement.dataset.consultation[\s\S]*?)<\/script>/)[1];
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + fonts + css + '<script>' + earlyRoute + '</script><script src="/assets/office-visit.js" defer></script></head><body>' + header + '<main>' + body + '</main><script src="/assets/theme.js" defer></script></body></html>';
}
async function main() {
  let meetings = 0;
  const templateFiles = fs.readdirSync(path.join(root, 'templates')).filter(f => f.endsWith('.json'));
  for (const file of templateFiles) {
    const source = read('templates/' + file), t = JSON.parse(source);
    assert(!/Meet With Us Face to Face|Can we meet in Dallas\?|consultation at 18383|before coming to the studio/.test(source), file);
    assert.equal(new Set(t.order).size, t.order.length);
    for (const [id, s] of Object.entries(t.sections)) {
      if (s.type === 'b2b-feature' && s.settings.heading === 'We Come to Your Office') {
        meetings++;
        assert.equal(s.settings.show_address, false);
        assert.equal(s.settings.button_link, '/pages/book-a-call?request=in-person');
        assert.equal(s.settings.button_label, 'Request an Office Visit');
        const output = await render(id, s);
        assert(!output.includes('18383 Preston Rd'));
        assert(output.includes('visit your office in the Dallas–Fort Worth area'));
      }
    }
  }
  assert.equal(meetings, 5);
  if (process.argv[2]) {
    const before = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
    for (const [key, original] of Object.entries(before.forms)) {
      const parts = key.split('/');
      const t = JSON.parse(read(parts.slice(0, 2).join('/')));
      assert.deepEqual(t.sections[parts[2]].blocks[parts[3]], original, 'Existing app configuration changed');
    }
    for (const [key, original] of Object.entries(before.images)) {
      const parts = key.split('/');
      let value = JSON.parse(read(parts.slice(0, 2).join('/'))).sections;
      for (const part of parts.slice(2)) value = value[part];
      assert.equal(value, original, 'Image selection changed: ' + key);
    }
    for (const file of ['sections/footer.liquid', 'sections/header.liquid', 'config/settings_data.json', 'snippets/business-address.liquid']) {
      assert.equal(crypto.createHash('sha256').update(read(file)).digest('hex'), before.files[file], 'Shared contacts changed');
    }
  }
  const appVersion = structuredClone(book.sections.office_visit);
  appVersion.blocks = {test: {type: '@app', settings: {form_id: 'test-only-office-form'}}};
  appVersion.block_order = ['test'];
  const appMarkup = await render('office_visit', appVersion);
  assert(appMarkup.includes('data-shopify-office-form') && !appMarkup.includes('id="OfficeVisitForm"'), 'App replaces native form');
  const initial = await documentHtml();
  const errorHtml = await documentHtml({errors: ['email'], email: 'invalid'});
  const successHtml = await documentHtml({'posted_successfully?': true});
  const browser = await chromium.launch({executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  try {
    const ctx = await browser.newContext();
    let responseHtml = initial, post = null;
    await ctx.route('https://preview.local/**', route => {
      const u = new URL(route.request().url());
      if (u.pathname.startsWith('/assets/')) return route.fulfill({path: path.join(root, 'assets', path.basename(u.pathname))});
      if (route.request().method() === 'POST') {post = route.request().postData(); return route.abort();}
      return route.fulfill({contentType: 'text/html', body: responseHtml});
    });
    const page = await ctx.newPage();
    const go = async suffix => {await page.goto('https://preview.local/pages/book-a-call' + suffix, {waitUntil: 'load'}); await page.evaluate(() => document.fonts.ready);};
    await go('');
    assert(await page.locator('[data-consultation-call]').first().isVisible());
    assert(!(await page.locator('[data-office-visit]').isVisible()));
    assert.equal(await page.locator('[data-app-form="1155185"]').count(), 1);
    await go('?request=in-person');
    assert(await page.locator('[data-office-visit]').isVisible());
    assert(!(await page.locator('[data-consultation-call]').first().isVisible()));
    assert.equal(await page.locator('h1:visible').textContent(), 'Request an Office Visit');
    assert((await page.locator('.office-visit__header').textContent()).includes('when you’re available'));
    assert.equal(await page.locator('#OfficeVisitForm [required]').count(), 6);
    assert.equal(await page.locator('[data-office-status]').count(), 0);
    await page.locator('#OfficeVisitForm button').click();
    assert.equal(post, null);
    assert(!(await page.locator('#OfficeVisitForm').evaluate(f => f.checkValidity())));
    const values = {OfficeName: 'Preview Test', OfficeCompany: 'Test Company', OfficeEmail: 'preview@example.com', OfficePhone: '2145550100', OfficeAddress: '123 Example St, Suite 4', OfficeCity: 'Dallas', OfficeZip: '75201', OfficeDate: '2027-01-15', OfficeAvailability: '10 am–2 pm Central', OfficeDetails: 'Local test only'};
    for (const [id, value] of Object.entries(values)) await page.locator('#' + id).fill(value);
    await page.locator('#OfficeZip').fill('bad');
    assert(!(await page.locator('#OfficeVisitForm').evaluate(f => f.checkValidity())));
    await page.locator('#OfficeZip').fill('75201');
    await page.locator('#OfficeEmail').fill('bad');
    assert(!(await page.locator('#OfficeVisitForm').evaluate(f => f.checkValidity())));
    await page.locator('#OfficeEmail').fill(values.OfficeEmail);
    assert(await page.locator('#OfficeVisitForm').evaluate(f => f.checkValidity()));
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({width, height: 1100});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Page overflow at ' + width);
      assert(await page.locator('#OfficeVisitForm input, #OfficeVisitForm textarea, #OfficeVisitForm button').evaluateAll(els => els.filter(el => el.type !== 'hidden').every(el => {const r=el.getBoundingClientRect(); return r.left>=0 && r.right<=innerWidth;})));
      if (process.argv[3] && [375, 1440].includes(width)) {
        // Do not save contact test values in screenshots.
        await page.locator('#OfficeVisitForm').evaluate(f => f.reset());
        await page.evaluate(() => document.activeElement?.blur());
        await page.locator('[data-office-visit]').screenshot({path: path.join(process.argv[3], 'office-visit-' + width + '.png')});
        for (const [id, value] of Object.entries(values)) await page.locator('#' + id).fill(value);
      }
    }
    const payload = await page.locator('#OfficeVisitForm').evaluate(f => Object.fromEntries(new FormData(f)));
    for (const name of ['name','Company name','email','phone','Office address','City','ZIP code','Preferred date','Preferred time or availability','body','State','Country','Request type','Appointment status']) assert(payload['contact[' + name + ']'], 'Missing submitted field: ' + name);
    assert.equal(payload.return_to, undefined, 'Do not replace Shopify’s native success redirect');
    assert.equal(payload['contact[Request type]'], 'Office visit — Dallas–Fort Worth');
    await page.locator('#OfficeVisitForm button').click();
    await page.waitForTimeout(200);
    assert(post && new URLSearchParams(post).get('contact[Office address]') === values.OfficeAddress);
    assert.equal(new URLSearchParams(post).get('contact[ZIP code]'), '75201');
    // Render server states as local fixtures only, never treat this as a live delivery test.
    responseHtml = errorHtml;
    await go('?request=call');
    assert(await page.getByRole('alert').isVisible());
    assert.equal(await page.locator('[data-office-status]').evaluate(el => el === document.activeElement), true);
    assert.equal(new URL(page.url()).searchParams.get('request'), 'in-person');
    assert.equal(await page.locator('#OfficeEmail').getAttribute('aria-invalid'), 'true');
    assert(await page.locator('#OfficeVisitForm button').isVisible());
    responseHtml = successHtml;
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({width, height: 800});
      // A server success can arrive without our scenario query or even the fragment.
      await go('?contact_posted=true&preview_theme_id=test');
      assert(await page.getByRole('status').isVisible());
      assert.equal((await page.getByRole('status').textContent()).trim(), 'Thank you! We’ve received your office visit request. Our team will contact you to confirm the location, date and time.');
      await page.waitForFunction(() => document.activeElement?.id === 'OfficeVisitStatus' && document.activeElement.getBoundingClientRect().top >= document.getElementById('SiteHeader').getBoundingClientRect().bottom);
      assert(await page.getByRole('status').evaluate(el => el.getBoundingClientRect().bottom <= innerHeight), 'Status is in viewport at ' + width);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Success overflow at ' + width);
      const url = new URL(page.url());
      assert.equal(url.searchParams.get('request'), 'in-person');
      assert.equal(url.searchParams.get('contact_posted'), 'true');
      assert.equal(url.searchParams.get('preview_theme_id'), 'test');
      assert(!(await page.locator('[data-consultation-call]').first().isVisible()));
      if (process.argv[3]) await page.screenshot({path: path.join(process.argv[3], 'office-success-' + width + '.png')});
    }
    await go('#OfficeVisitForm');
    await page.waitForFunction(() => document.activeElement?.id === 'OfficeVisitStatus' && document.activeElement.getBoundingClientRect().top >= document.getElementById('SiteHeader').getBoundingClientRect().bottom);
    await page.evaluate(() => {history.replaceState(null, '', '?request=call'); window.dispatchEvent(new PopStateEvent('popstate'));});
    assert(await page.getByRole('status').isVisible(), 'Server result wins over query routing');
    assert.equal(await page.locator('#OfficeVisitForm button').count(), 0);
    responseHtml = initial;
    await go('?request=in-person&contact_posted=true&success=true');
    assert.equal(await page.locator('[data-office-status]').count(), 0, 'No client-generated success');
    await page.locator('[data-office-visit] a').last().click();
    assert(await page.locator('[data-consultation-call]').first().isVisible());
    await page.locator('#shopify-section-office_visit').dispatchEvent('shopify:section:select', {bubbles: true});
    assert(await page.locator('[data-office-visit]').isVisible());
    const noJs = await browser.newContext({javaScriptEnabled: false});
    let fallbackHtml = initial;
    await noJs.route('https://preview.local/**', route => {
      const u = new URL(route.request().url());
      if (u.pathname.startsWith('/assets/')) return route.fulfill({path: path.join(root, 'assets', path.basename(u.pathname))});
      return route.fulfill({contentType: 'text/html', body: fallbackHtml});
    });
    const fallback = await noJs.newPage();
    await fallback.goto('https://preview.local/pages/book-a-call?request=in-person');
    assert(await fallback.locator('#OfficeVisitForm').isVisible());
    fallbackHtml = successHtml;
    await fallback.setViewportSize({width: 375, height: 800});
    await fallback.goto('https://preview.local/pages/book-a-call?contact_posted=true#OfficeVisitForm');
    assert(await fallback.getByRole('status').isVisible(), 'Liquid confirmation works without JS');
    assert.equal(await fallback.locator('#OfficeVisitForm button').count(), 0);
    assert(await fallback.getByRole('status').evaluate(el => {
      const bounds = el.getBoundingClientRect();
      return bounds.top >= document.getElementById('SiteHeader').getBoundingClientRect().bottom && bounds.bottom <= innerHeight;
    }), 'No-JS confirmation remains below the fixed header on mobile');
    fallbackHtml = errorHtml;
    await fallback.goto('https://preview.local/pages/book-a-call#OfficeVisitForm');
    assert(await fallback.getByRole('alert').isVisible(), 'Liquid errors work without JS');
    // Late script execution must also restore the scenario and focus the server result.
    responseHtml = successHtml.replace('<script src="/assets/office-visit.js" defer></script>', '');
    await go('?request=call');
    await page.addScriptTag({content: read('assets/office-visit.js')});
    assert(await page.getByRole('status').isVisible());
    assert.equal(await page.getByRole('status').evaluate(el => el === document.activeElement), true);
    await noJs.close();
    console.log('PASS: meeting/FAQ checks; route separation; required/email/ZIP validation; full address/type in intercepted local POST; native form tag without return_to; server error/success fixtures; exact success text; focus/scroll below real header at 375/768/1440px; query preservation and server-state priority; late script execution; editor selection and no-JS success. NO LIVE REDIRECT, SUBMISSION OR EMAIL DELIVERY TESTED.');
  } finally {await browser.close();}
}
main().catch(error => {console.error(error);process.exitCode=1;});
