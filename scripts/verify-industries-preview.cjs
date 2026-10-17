// Visual/layout checks for the generated local Industries preview. No store writes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {chromium} = require('playwright-core');

const root = path.resolve(__dirname, '..');
const preview = path.join(root, 'output/industries-local-preview.html');
const template = JSON.parse(fs.readFileSync(path.join(root, 'templates/page.industries.json'), 'utf8'));
const expected = template.sections.examples.block_order.map(id => template.sections.examples.blocks[id].settings.title);
const expectedLocalImages = template.sections.examples.block_order.filter(id => template.sections.examples.blocks[id].settings.image_asset).length;

async function main() {
  const browser = await chromium.launch({executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(preview).href, {waitUntil: 'load'});
    assert.equal(await page.locator('h1').textContent(), template.sections.hero.settings.heading);
    assert.deepEqual(await page.locator('.b2b-card h3').allTextContents(), expected);
    assert.equal(new Set(expected).size, 8, 'Audience titles must be unique');
    assert.equal(await page.getByText('Where would you like to go next?').count(), 0);
    assert.equal(await page.locator('.b2b-section--navy a.btn').count(), 1);
    assert.equal(await page.locator('.b2b-section--navy a.btn').getAttribute('href'), '/pages/request-a-quote');
    const imageCheck = await page.locator('.b2b-card img').evaluateAll(images => images.map(img => ({src: img.getAttribute('src'), alt: img.alt, loaded: img.complete && img.naturalWidth > 0, fit: getComputedStyle(img).objectFit})));
    assert.equal(await page.locator('.b2b-card').count(), 8);
    assert.equal(imageCheck.length, expectedLocalImages);
    assert.equal(new Set(imageCheck.map(img => img.src)).size, expectedLocalImages, 'Distinct bundled photos required');
    assert(imageCheck.every(img => img.alt && img.loaded && ['cover', 'contain'].includes(img.fit)), 'Bundled images must load with descriptive alt text and a supported fit mode');
    const widths = {};
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 900});
      await page.waitForTimeout(120);
      const layout = await page.evaluate(() => ({scrollWidth: document.documentElement.scrollWidth, width: innerWidth, columns: getComputedStyle(document.querySelector('.b2b-grid')).gridTemplateColumns.split(' ').length, cardsFit: [...document.querySelectorAll('.b2b-card')].every(card => { const r=card.getBoundingClientRect(); return r.left >= -1 && r.right <= innerWidth + 1; })}));
      assert(layout.scrollWidth <= width + 1, `Horizontal overflow at ${width}px: ${layout.scrollWidth}`);
      assert(layout.cardsFit, `Card clipped at ${width}px`);
      assert.equal(layout.columns, width <= 640 ? 1 : width <= 990 ? 2 : 4);
      widths[width] = layout;
      if (width === 390 || width === 1440) await page.screenshot({path: path.join(root, `output/industries-preview-${width}.png`), fullPage: true});
    }
    console.log(JSON.stringify({passed: true, kind: 'local theme-CSS layout preview', widths, photos: imageCheck.length, note: 'Shopify-hosted preview and live links still require store connectivity.'}, null, 2));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
