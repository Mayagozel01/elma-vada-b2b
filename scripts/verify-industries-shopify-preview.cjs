// Read-only checks for an explicit unpublished Shopify preview. No forms are submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright-core');

const target = new URL(process.argv[2]);
assert(['elmavada.myshopify.com', 'elmavada.com'].includes(target.hostname));
const themeId = Number(target.searchParams.get('preview_theme_id'));
assert(themeId > 0, 'Use an explicit unpublished preview URL');
target.pathname = '/pages/industries';
const output = path.resolve(__dirname, '../output');

async function main() {
  const browser = await chromium.launch({executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  try {
    const context = await browser.newContext({viewport: {width: 1440, height: 1000}});
    await context.route('**/*', route => {
      const request = route.request();
      if (!['GET', 'HEAD'].includes(request.method())) return route.abort();
      if (/google-analytics|googletagmanager|facebook|monorail|\/collect(?:\?|$)/.test(request.url())) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    const response = await page.goto(target.href, {waitUntil: 'commit', timeout: 60000});
    assert(response?.ok(), `Preview response: ${response?.status()}`);
    await page.locator('h1').waitFor({state: 'visible', timeout: 30000});
    assert.equal(await page.evaluate(() => window.Shopify?.theme?.id), themeId, 'Requested unpublished theme must remain active');
    assert.equal((await page.locator('h1').textContent()).trim(), 'What does gifting need to do for your business?');
    const cardTitles = await page.locator('.b2b-card h3').allTextContents();
    for (const title of ['Marketing & HR Teams', 'Education & Community Organizations', 'Real Estate & Client Services', 'Hospitality & Events', 'Military & Law Enforcement', 'Direct Sales & Distributed Teams', 'Healthcare & Medical Practices', 'Executive & Administrative Teams']) {
      assert(cardTitles.includes(title), `Missing card: ${title}`);
    }
    assert.equal(await page.getByText('Where would you like to go next?').count(), 0);
    assert.equal(await page.locator('.b2b-section--navy .btn').getAttribute('href'), '/pages/request-a-quote');
    const images = await page.locator('.b2b-card img').evaluateAll(nodes => Promise.all(nodes.map(async img => { await img.decode(); return {alt: img.alt, loaded: img.naturalWidth > 0, fit: getComputedStyle(img).objectFit}; })));
    assert.equal(images.length, 8);
    assert(images.every(img => img.alt && img.loaded));
    const layouts = {};
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 1000});
      const layout = await page.evaluate(() => ({scrollWidth: document.documentElement.scrollWidth, columns: getComputedStyle(document.querySelector('.b2b-grid')).gridTemplateColumns.split(' ').length}));
      assert(layout.scrollWidth <= width + 1, `Horizontal overflow at ${width}px`);
      assert.equal(layout.columns, width <= 640 ? 1 : width <= 990 ? 2 : 4);
      layouts[width] = layout;
      if (width === 390 || width === 1440) await page.screenshot({path: path.join(output, `industries-shopify-preview-${width}.png`), fullPage: true});
    }
    const quoteContext = await browser.newContext();
    const quotePage = await quoteContext.newPage();
    const quote = new URL('/pages/request-a-quote', 'https://elmavada.com');
    const quoteResponse = await quotePage.goto(quote.href, {waitUntil: 'commit', timeout: 60000});
    assert(quoteResponse?.ok(), `Quote response: ${quoteResponse?.status()}`);
    await quotePage.locator('h1').waitFor({state: 'visible', timeout: 30000});
    assert.equal((await quotePage.locator('h1').textContent()).trim(), 'Tell us the occasion. We’ll handle the rest.');
    await quoteContext.close();
    console.log(JSON.stringify({passed: true, themeId, audienceCards: images.length, layouts, quotePageGet: true, noWrites: true}, null, 2));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
