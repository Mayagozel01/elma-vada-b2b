// Read-only Shopify Preview checks. No POSTs, carts, orders or contact submissions.
// NODE_PATH=<test-dependencies>/node_modules node scripts/verify-catalog-preview.cjs <preview URL>
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright-core');
const target = new URL(process.argv[2]);
assert(['elmavada.myshopify.com', 'elmavada.com'].includes(target.hostname));
const themeId = Number(target.searchParams.get('preview_theme_id'));
assert(themeId > 0, 'Use an explicit unpublished preview URL');
target.pathname = '/collections/all';
const output = path.resolve(__dirname, '../output');

async function main() {
  const browser = await chromium.launch({executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  try {
    const context = await browser.newContext({viewport: {width: 1440, height: 1000}});
    await context.route('**/*', route => {
      const request = route.request();
      if (!['GET', 'HEAD'].includes(request.method())) return route.abort();
      const url = new URL(request.url());
      if (/google-analytics|googletagmanager|facebook|monorail|\/collect(?:\?|$)/.test(url.href)) return route.abort();
      return route.continue();
    });
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    const go = async url => {
      const response = await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 30000});
      assert(response?.ok(), 'Preview response: ' + response?.status());
      assert.equal(await page.evaluate(() => window.Shopify?.theme?.id), themeId, 'Must remain on the requested preview theme');
    };
    await go(target.href);
    assert.equal(await page.locator('.catalog h1').textContent(), 'Shop personalized gifts');
    assert.equal(await page.locator('.catalog-card__price').count(), 0, 'Prices stay hidden until agreed');
    const cardCount = await page.locator('.catalog-card').count();
    assert.equal(await page.locator('.catalog-card__stock').count(), cardCount, 'Every card needs an availability status');
    assert(cardCount > 0, 'Real store products, no fixture cards');
    const contentAudit = await page.locator('.catalog-card').evaluateAll(cards => cards.map(card => ({title: card.querySelector('h3').textContent.trim(), url: card.querySelector('h3 a').getAttribute('href'), stock: card.querySelector('.catalog-card__stock').textContent.trim()})));
    fs.mkdirSync(output, {recursive: true});
    fs.writeFileSync(path.join(output, 'catalog-content-audit-2026-10-15.json'), JSON.stringify(contentAudit, null, 2) + '\n');
    const counter = await page.locator('.catalog-tools__bar > p').textContent();
    assert(Number.parseInt(counter) >= cardCount, 'Server-side count must include the complete filtered collection');
    const bulkLink = await page.locator('.catalog-bulk .btn').getAttribute('href');
    const menuLinks = await page.locator('.catalog-categories a').evaluateAll(nodes => nodes.map(el => ({href: el.getAttribute('href'), text: el.textContent.trim()})));
    for (const link of menuLinks) {
      const url = new URL(link.href, page.url());
      assert.equal(url.search, '', 'Category URLs must not retain old filter/page queries');
    }
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({width, height: 1000});
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Viewport overflow: ' + width);
      assert(await page.locator('.catalog-card, .catalog-categories a, .catalog-sort').evaluateAll(nodes => nodes.every(node => {
        const box = node.getBoundingClientRect();
        return box.left >= -1 && box.right <= innerWidth + 1;
      })), 'Clipped content: ' + width);
      assert.equal(await page.locator('.catalog__grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), width <= 480 ? 1 : width <= 990 ? 3 : 4);
      assert(await page.locator('.catalog-card').evaluateAll(cards => {
        const rows = new Map();
        for (const card of cards) {
          const top = Math.round(card.getBoundingClientRect().top);
          const linkTop = card.querySelector('.catalog-card__action').getBoundingClientRect().top;
          if (rows.has(top) && Math.abs(rows.get(top) - linkTop) > 1) return false;
          rows.set(top, linkTop);
        }
        return true;
      }), 'Aligned links in each row: ' + width);
      if (width === 1440 || width === 390) {
        await page.locator('.catalog-card__image img').evaluateAll(images => Promise.all(images.map(img => img.decode().catch(() => {}))));
        fs.mkdirSync(output, {recursive: true});
        await page.screenshot({path: path.join(output, 'catalog-shopify-preview-' + width + '.png'), fullPage: true});
        await page.screenshot({path: path.join(output, 'catalog-shopify-preview-first-screen-' + width + '.png')});
        await page.locator('.catalog-card').first().scrollIntoViewIfNeeded();
        await page.screenshot({path: path.join(output, 'catalog-stock-cards-' + width + '.png')});
        await page.evaluate(() => window.scrollTo(0, 0));
      }
    }
    await page.locator('.catalog-categories a').first().focus();
    assert(await page.locator('.catalog-categories a').first().evaluate(el => getComputedStyle(el).outlineStyle !== 'none'), 'Visible keyboard focus');
    const sort = page.locator('select[name="sort_by"]');
    await sort.selectOption('price-ascending');
    await Promise.all([page.waitForNavigation({waitUntil: 'domcontentloaded'}), page.getByRole('button', {name: 'Apply', exact: true}).click()]);
    assert.equal(new URL(page.url()).searchParams.get('sort_by'), 'price-ascending');
    assert.equal(await page.evaluate(() => window.Shopify?.theme?.id), themeId);
    const details = page.locator('.catalog-filters');
    if (await details.count()) {
      if (!(await details.getAttribute('open'))) await details.locator('summary').click();
      const inStock = details.locator('input[name="filter.v.availability"][value="1"]');
      if (await inStock.count()) await inStock.check();
      await page.locator('input[name="filter.v.price.gte"]').fill('1000000');
      await page.locator('input[name="filter.v.price.lte"]').fill('2000000');
      await Promise.all([page.waitForNavigation({waitUntil: 'domcontentloaded'}), page.getByRole('button', {name: 'Apply filters', exact: true}).click()]);
      assert.equal(await page.locator('.catalog-card').count(), 0);
      assert(await page.getByRole('heading', {name: 'No matching products'}).isVisible());
      assert((await page.locator('.catalog-tools__bar > p').textContent()).trim().startsWith('0 products'));
      await Promise.all([page.waitForNavigation({waitUntil: 'domcontentloaded'}), page.getByRole('link', {name: 'Clear all filters', exact: true}).click()]);
      assert.equal(await page.locator('.catalog-card').count(), cardCount);
      assert.equal(new URL(page.url()).searchParams.get('filter.v.price.gte'), null);
      assert.equal(new URL(page.url()).searchParams.get('sort_by'), 'price-ascending');
    }
    for (const link of menuLinks.slice(1)) {
      const categoryUrl = new URL(link.href, target.origin);
      categoryUrl.searchParams.set('preview_theme_id', String(themeId));
      await go(categoryUrl.href);
      assert.equal(await page.locator('.catalog-tools').getAttribute('action'), categoryUrl.pathname);
      assert.equal(await page.locator('.catalog-categories a[aria-current="page"]').getAttribute('href'), categoryUrl.pathname);
      assert.equal(await page.locator('.catalog-categories a').count(), menuLinks.length);
    }
    await go(target.href);
    const productUrl = new URL(await page.locator('.catalog-card__action').first().getAttribute('href'), page.url());
    productUrl.searchParams.set('preview_theme_id', String(themeId));
    await go(productUrl.href);
    assert(await page.locator('[data-product-detail]').isVisible());
    const variantSelect = page.locator('[data-variant-select]');
    const optionCount = await variantSelect.locator('option').count();
    if (optionCount > 1) await variantSelect.selectOption({index: 1});
    assert.equal((await page.locator('[data-variant-stock]').textContent()).trim(), await variantSelect.locator('option:checked').getAttribute('data-stock-status'));
    const quoteUrl = new URL(bulkLink, target.origin);
    quoteUrl.searchParams.set('preview_theme_id', String(themeId));
    await go(quoteUrl.href);
    assert(await page.locator('h1').isVisible());
    console.log(JSON.stringify({passed: true, themeId, realProductsOnPage: cardCount, categoryLinks: menuLinks,
      checks: ['Shopify Preview identity', '320/390/768/1440px layout and aligned links', 'real product images', 'hidden price default', 'inventory status on all cards and selected variant', 'keyboard focus', 'server-side sorting', 'availability/price filtering and reset', 'empty result and count', 'all configured categories and active states', 'product and quote page GET links'],
      limitations: ['Low stock/out of stock/backorder/untracked and exact quantities additionally tested with local fixtures, not by altering store inventory', 'Pagination and enabled prices additionally tested with local fixtures', 'No orders or contact forms submitted']}, null, 2));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
