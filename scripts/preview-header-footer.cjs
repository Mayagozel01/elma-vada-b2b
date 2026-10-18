// Local preview: actual Liquid sections, exported settings, and unchanged Shopify PNGs.
// NODE_PATH=<dependencies>/node_modules node scripts/preview-header-footer.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { Liquid } = require('liquidjs');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const current = JSON.parse(read('config/settings_data.json')).current;
const defaults = defs => Object.fromEntries(defs.filter(s => s.id).map(s => [s.id, s.default ?? '']));
const engine = new Liquid({ root: path.join(root, 'snippets'), extname: '.liquid' });
engine.registerFilter('asset_url', name => `../assets/${name}`);
engine.registerFilter('image_url', image => image.url);
const logos = {
  'shopify://shop_images/ElmavadaLogoHeader.png': { url: './header-logo-selected.png', width: 2172, height: 724, aspect_ratio: 3 },
  'shopify://shop_images/LogoElmaVada-brief.png': { url: './header-logo-source.png', width: 1254, height: 1254, aspect_ratio: 1 },
  'shopify://shop_images/LogoElmaVada.png': { url: './footer-logo-source.png', width: 2172, height: 724, aspect_ratio: 3 },
};
const settings = { ...Object.assign({}, ...JSON.parse(read('config/settings_schema.json')).map(s => defaults(s.settings || []))), ...current };
const context = { settings, shop: { name: 'Elma Vada' }, routes: { root_url: '/', all_products_collection_url: '/collections/all' } };
async function render(type, overrides = {}) {
  const source = read(`sections/${type}.liquid`);
  const schema = JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
  const values = { ...defaults(schema.settings), ...current.sections[type].settings, ...overrides };
  for (const [key, value] of Object.entries(values)) if (logos[value]) values[key] = logos[value];
  const html = await engine.parseAndRender(source.replace(/{% schema %}[\s\S]*?{% endschema %}/g, ''), {
    ...context, section: { id: type, settings: values },
  });
  return `<div id="shopify-section-${type}" class="shopify-section">${html}</div>`;
}
async function main() {
  for (const image of Object.values(logos)) assert(fs.existsSync(path.join(root, 'output', image.url)), `Download ${image.url} first`);
  const header = await render('header');
  const footer = await render('footer');
  const fonts = await engine.parseAndRender(read('snippets/local-fonts.liquid'), context);
  const css = ['base.css', 'theme.css', 'b2b-pages.css', 'revision.css'].map(name => `<link rel="stylesheet" href="../assets/${name}">`).join('\n');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Elma Vada — header & footer preview</title>${fonts}${css}</head><body>${header}<main style="min-height:240px;padding:48px 24px;background:var(--color-cream)"><p style="font-size:14px;color:var(--color-text-muted)">LOCAL PREVIEW · HEADER & FOOTER</p><h1 style="font-size:28px;margin-top:12px">Elma Vada Studio</h1><p style="margin-top:12px">Original Shopify logos · Responsive layout</p></main>${footer}<script src="../assets/theme.js"></script></body></html>`;
  const previewPath = path.join(root, 'output/header-footer-preview.html');
  fs.writeFileSync(previewPath, html);
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const results = [];
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    page.on('pageerror', e => errors.push(e.message));
    for (const width of [320, 375, 768, 1024, 1440, 1911]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(pathToFileURL(previewPath).href);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(img => img.decode()));
      });
      await page.waitForTimeout(150);
      const measure = () => page.evaluate(() => {
        const header = document.querySelector('.site-header');
        const img = header.querySelector('img');
        const footer = document.querySelector('.site-footer');
        const fimg = footer.querySelector('img');
        const brand = header.querySelector('.header__logo');
        const copy = header.querySelector('.header__brand-copy');
        const rect = el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, right: r.right, bottom: r.bottom }; };
        return {
          header: rect(header), logo: rect(img), footerLogo: rect(fimg),
          headerRatio: img.naturalWidth / img.naturalHeight,
          footerRatio: fimg.naturalWidth / fimg.naturalHeight,
          spacer: rect(document.querySelector('.site-header-spacer')),
          footerCard: rect(footer.querySelector('.footer__logo')),
          headerContainer: rect(header.querySelector('.container')),
          footerContainer: rect(footer.querySelector('.container')),
          compact: header.classList.contains('is-compact'),
          filter: getComputedStyle(fimg).filter,
          cardBackground: getComputedStyle(footer.querySelector('.footer__logo')).backgroundColor,
          columns: getComputedStyle(footer.querySelector('.footer__grid')).gridTemplateColumns,
          brand: rect(brand), copy: rect(copy),
          brandGap: getComputedStyle(brand).columnGap,
          lines: [...copy.children].map(line => line.textContent),
          lineRects: [...copy.children].map(rect),
        };
      });
      const normal = await measure();
      assert.equal(normal.logo.width, width <= 640 ? current.sections.header.settings.logo_mobile_width : current.sections.header.settings.logo_width, `${width}: saved image width changed`);
      assert.equal(normal.brandGap, width <= 640 ? '10px' : '16px');
      assert(Math.abs(normal.copy.x - normal.logo.right - parseFloat(normal.brandGap)) < 1, `${width}: incorrect image/text gap`);
      assert(Math.abs(normal.logo.y + normal.logo.height / 2 - normal.copy.y - normal.copy.height / 2) < 1, `${width}: brand blocks are not centered`);
      assert.deepEqual(normal.lines, ['Elma Vada', 'CORPORATE GIFTS', 'IN-HOUSE ENGRAVING']);
      assert(normal.lineRects.every(r => r.right <= normal.brand.right + 1), `${width}: text escapes brand block`);
      assert(Math.abs(normal.header.height - normal.spacer.height) < 1, `${width}: spacer mismatch`);
      assert(normal.logo.y >= 0 && normal.logo.bottom <= normal.header.bottom, `${width}: clipped header logo`);
      assert(Math.abs(normal.logo.width / normal.logo.height - normal.headerRatio) < 0.01, `${width}: header image distortion`);
      assert(Math.abs(normal.footerLogo.width / normal.footerLogo.height - normal.footerRatio) < 0.01, `${width}: footer image distortion`);
      assert(normal.footerCard.right <= width && normal.footerLogo.right <= normal.footerCard.right, `${width}: footer image overflow`);
      assert.equal(normal.headerContainer.width, normal.footerContainer.width, `${width}: inconsistent containers`);
      assert.equal(normal.filter, 'none');
      assert.equal(normal.cardBackground, 'rgb(244, 242, 237)');
      await page.screenshot({ path: path.join(root, `output/header-footer-${width}.png`), fullPage: true });
      await page.locator('.site-header').screenshot({ path: path.join(root, `output/header-brand-${width}.png`) });
      await page.evaluate(() => scrollTo(0, 100));
      await page.waitForTimeout(120);
      const scrolled = await measure();
      assert(Math.abs(normal.header.height - scrolled.header.height) < 1, `${width}: header shrinks on scroll`);
      assert.equal(normal.logo.width, scrolled.logo.width);
      assert(await page.locator('.site-header').evaluate(el => el.classList.contains('scrolled')));
      if (normal.compact) {
        await page.locator('.header__hamburger').click();
        const menu = await page.locator('.mobile-menu').boundingBox();
        assert(menu && Math.abs(menu.y - normal.header.height) < 1, `${width}: dropdown overlaps header`);
        assert(menu.y + menu.height <= 1001, `${width}: dropdown extends below viewport`);
        await page.screenshot({ path: path.join(root, `output/header-menu-${width}.png`) });
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.header__hamburger').getAttribute('aria-expanded'), 'false');
      } else {
        const nav = await page.locator('.header__nav').boundingBox();
        const cta = await page.locator('.header__cta').boundingBox();
        assert(normal.logo.right <= nav.x && nav.x + nav.width <= cta.x && cta.x + cta.width <= width, `${width}: overlapping navigation`);
      }
      // Check overflow without relying on the theme's global overflow clipping.
      await page.addStyleTag({ content: 'html,body { overflow-x:visible!important; }' });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}: horizontal overflow`);
      results.push({ width, ...normal, scrolledHeaderHeight: scrolled.header.height, passed: true });
    }
    // An unusually wide menu must collapse even at desktop widths.
    await page.evaluate(() => document.querySelector('.header__nav-link').textContent = 'Long custom menu label '.repeat(12));
    await page.setViewportSize({ width: 1439, height: 1000 });
    await page.waitForTimeout(150);
    assert(await page.locator('.site-header').evaluate(el => el.classList.contains('is-compact')));
    // Reinitialize when Shopify replaces the header section in its editor.
    await page.evaluate(() => {
      const section = document.getElementById('shopify-section-header');
      section.dispatchEvent(new CustomEvent('shopify:section:unload', { bubbles: true }));
      section.dispatchEvent(new CustomEvent('shopify:section:load', { bubbles: true }));
    });
    await page.locator('.header__hamburger').click();
    assert.equal(await page.locator('.header__hamburger').getAttribute('aria-expanded'), 'true');
    const customHeader = await render('header', {
      brand_line_one: 'Custom & Company', brand_line_two: '<b>GIFTS</b>', brand_line_three: 'LASER STUDIO',
      brand_name_font: 'classic', brand_detail_font: 'serif', brand_name_size: 36,
      brand_name_mobile_size: 18, brand_detail_size: 12, brand_detail_mobile_size: 10,
      brand_name_color: '#123456', brand_detail_color: '#654321', brand_line_height: 1.5,
    });
    await page.setContent(html.replace(header, customHeader));
    await page.waitForTimeout(150);
    const customStyles = await page.locator('.header__brand-copy').evaluate(el => {
      const name = getComputedStyle(el.children[0]);
      const detail = getComputedStyle(el.children[1]);
      return { nameSize: name.fontSize, detailSize: detail.fontSize, color: name.color, detailColor: detail.color,
        nameFont: name.fontFamily, detailFont: detail.fontFamily, lineHeight: name.lineHeight,
        secondLine: el.children[1].textContent, injectedElements: el.querySelectorAll('b').length };
    });
    assert.equal(customStyles.nameSize, '36px');
    assert.equal(customStyles.detailSize, '12px');
    assert.equal(customStyles.color, 'rgb(18, 52, 86)');
    assert.equal(customStyles.detailColor, 'rgb(101, 67, 33)');
    assert(customStyles.nameFont.includes('Georgia'));
    assert(customStyles.detailFont.includes('DM Serif Display'));
    assert.equal(customStyles.lineHeight, '54px');
    assert.equal(customStyles.secondLine, '<b>GIFTS</b>');
    assert.equal(customStyles.injectedElements, 0);
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(root, 'output/header-footer-checks.json'), JSON.stringify({ results, customMenuCollapse: true, editorReinitialization: true, errors }, null, 2));
    console.log(JSON.stringify(results.map(r => ({ width: r.width, headerHeight: r.header.height, headerLogo: r.logo.width, footerLogo: r.footerLogo.width, compact: r.compact, passed: true })), null, 2));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
