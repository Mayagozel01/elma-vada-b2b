// Local Chromium + intercepted Shopify fixtures only; never connects to the store.
// NODE_PATH=/tmp/elma-gift-checks/node_modules node scripts/verify-gift-offers-browser.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {chromium} = require('playwright-core');
const {fixtures, cartMarkup, snippet, appendAddon} = require('./verify-gift-offers.cjs');
const root = path.resolve(__dirname, '..');
const out = process.env.ELMA_GIFT_SCREENSHOTS || '/tmp/elma-gift-offers-browser';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
async function main() {
  fs.mkdirSync(out, {recursive: true});
  const browser = await chromium.launch({executablePath: process.env.ELMA_CHROME || '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  try {
    for (const width of [320, 390, 1440]) {
      const ctx = fixtures();
      ctx.cart.cart_level_discount_applications = [{title: 'Fixture cart discount', total_allocated_amount: 500}];
      ctx.cart.total_price = 5500;
      ctx.product.metafields.custom.gift_offers.value.push({...ctx.ribbon, title: {value: 'A long title for a compatible gift accessory'}, variant: {value: {...ctx.ribbon.variant.value, id: 401}}});
      const context = await browser.newContext({viewport: {width, height: width < 500 ? 740 : 1000}});
      const page = await context.newPage();
      const errors = [], posts = [], checkout = [];
      let failNext = false;
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', async route => {
        const request = route.request(), url = new URL(request.url());
        if (url.hostname !== 'fixture.test') return route.abort();
        if (url.pathname.startsWith('/assets/')) {
          const filename = path.basename(url.pathname);
          return route.fulfill({contentType: filename.endsWith('.css') ? 'text/css' : 'text/javascript', body: read('assets/' + filename)});
        }
        if (url.pathname.endsWith('.jpg')) return route.fulfill({contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#d8c5a5"/><rect x="30" y="65" width="140" height="70" rx="8" fill="#273c42"/></svg>'});
        if (url.searchParams.has('sections')) {
          assert.equal(url.pathname, '/fr/cart');
          assert.equal(url.searchParams.get('preview_theme_id'), 'fixture-theme');
          // Reproduce Shopify's verified /cart content negotiation, not an always-green mock.
          if (request.headers().accept === 'application/json') return route.fulfill({json: ctx.cart});
          assert.equal(request.headers().accept, '*/*');
          return route.fulfill({json: {'cart-gift-offers': await snippet('cart-content', ctx)}});
        }
        if (url.pathname.endsWith('/cart/add.js')) {
          const payload = request.postDataJSON(); posts.push(payload);
          if (failNext) { failNext = false; return route.fulfill({status: 422, json: {description: 'Fixture unavailable'}}); }
          const item = payload.items[0]; appendAddon(ctx, Number(item.id), item.quantity);
          return route.fulfill({json: {items: [{id: Number(item.id), quantity: item.quantity}]}});
        }
        if (request.method() === 'POST' && url.pathname.endsWith('/cart')) {
          checkout.push(request.postData());
          return route.fulfill({contentType: 'text/html', body: '<h1>Fixture checkout received</h1>'});
        }
        if (url.pathname.endsWith('/cart.js')) return route.fulfill({json: ctx.cart});
        const styles = ['base.css', 'theme.css', 'b2b-pages.css', 'revision.css', 'commerce.css', 'gift-offers.css'].map(file => '<link rel="stylesheet" href="/assets/' + file + '">').join('');
        return route.fulfill({contentType: 'text/html', body: '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + styles + '</head><body><header style="padding:20px"><a data-header-cart data-cart-json-url="/fr/cart.js"><span data-cart-count>' + ctx.cart.item_count + '</span></a></header><main>' + await cartMarkup(ctx) + '</main><script defer src="/assets/cart.js"></script><script defer src="/assets/gift-offers.js"></script></body></html>'});
      });
      await page.goto('https://fixture.test/fr/cart?preview_theme_id=fixture-theme');
      const dialog = page.locator('[data-offers-dialog]');
      assert.equal(await page.locator('[data-offers-panel] [data-gift-offer]').count(), 3);
      assert(await page.locator('[data-offers-panel]').isVisible());
      assert.equal(await dialog.evaluate(el => el.open), false);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), width + ' page overflow');
      await page.screenshot({path: path.join(out, width + '-cart.png'), fullPage: true});
      await page.waitForFunction(() => document.querySelector('[data-offers-dialog]').open);
      assert.equal(await page.evaluate(() => sessionStorage.getItem('elma:gift-offers:seen:v1')), 'true');
      assert(await page.locator('[data-offers-dialog] [data-offers-close]').first().evaluate(el => el === document.activeElement));
      const bounds = await dialog.boundingBox();
      assert(bounds.x >= 0 && bounds.y >= 0 && bounds.x + bounds.width <= width + 1 && bounds.height <= (width < 500 ? 740 : 1000));
      assert(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth), width + ' dialog overflow');
      await page.screenshot({path: path.join(out, width + '-dialog.png')});
      await page.keyboard.press('Escape');
      assert.equal(await dialog.evaluate(el => el.open), false);
      assert(await page.locator('[data-offers-panel]').isVisible());
      await page.waitForFunction(() => document.body.style.position === '');
      await page.reload();
      await page.waitForTimeout(5200);
      assert.equal(await dialog.evaluate(el => el.open), false, 'reload must not auto-open');
      await page.locator('[data-offers-open]').click();
      await page.waitForFunction(() => document.querySelector('[data-offers-dialog]').open);
      const first = dialog.locator('[data-variant-id="201"]');
      await first.locator('input').fill('2');
      assert.equal(await page.locator('[data-offers-panel] [data-variant-id="201"] input').inputValue(), '2');
      failNext = true;
      await first.locator('button').click();
      await first.locator('[data-offer-error]').waitFor({state: 'visible'});
      assert.equal(await first.locator('button').textContent(), 'Add to cart');
      await first.locator('button').click();
      await page.waitForFunction(() => document.querySelector('[data-offers-dialog] [data-variant-id="201"] button').textContent === 'Added ✓');
      assert.equal(await dialog.evaluate(el => el.open), true);
      assert(await first.locator('button').evaluate(el => el === document.activeElement), 'focus retained after add');
      assert.equal(await page.locator('[data-offers-panel] [data-variant-id="201"] button').textContent(), 'Added ✓');
      await first.locator('button').evaluate(el => el.click());
      await dialog.locator('[data-variant-id="301"] button').click();
      await page.waitForFunction(() => document.querySelector('[data-offers-dialog] [data-variant-id="301"] button').textContent === 'Added ✓');
      assert.equal(posts.length, 3, 'one failed plus two successful writes, no duplicate');
      assert.equal(await page.locator('[data-header-cart] [data-cart-count]').textContent(), '6');
      assert.match(await page.locator('[data-cart-footer]').textContent(), /Total: \$67.00/);
      assert.match(await page.locator('[data-cart-footer]').textContent(), /Fixture cart discount/);
      assert.match(await page.locator('[data-cart-items]').textContent(), /Maya/);
      assert.match(await page.locator('[data-cart-items]').textContent(), /Anna/);
      await dialog.locator('.gift-offers-dialog__footer button').focus();
      await page.keyboard.press('Tab');
      assert(await dialog.locator('[data-offers-close]').first().evaluate(el => el === document.activeElement));
      await page.keyboard.press('Shift+Tab');
      assert(await dialog.locator('.gift-offers-dialog__footer button').evaluate(el => el === document.activeElement));
      await dialog.locator('.gift-offers-dialog__footer button').click();
      await page.waitForFunction(() => document.body.style.position === '');
      assert(await page.locator('[data-offers-panel]').isVisible(), 'remaining offer block persists');
      assert.equal(await page.locator('[data-offers-panel] [data-gift-offer]').count(), 1);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({path: path.join(out, width + '-added.png'), fullPage: true});
      await page.evaluate(() => sessionStorage.clear());
      await page.goto('https://fixture.test/fr/cart?preview_theme_id=fixture-theme');
      await page.locator('[data-cart-quantity]').first().fill('4');
      await page.locator('button[name="checkout"]').click();
      await page.waitForSelector('h1:text("Fixture checkout received")');
      assert.equal(checkout.length, 1);
      assert(new URLSearchParams(checkout[0]).has('checkout'));
      assert.equal(new URLSearchParams(checkout[0]).getAll('updates[]')[0], '4');
      assert.equal(errors.length, 0, errors.join('\n'));
      await context.close();
      console.log('PASS Chromium ' + width + 'px: visible cards, modal bounds, timer/reload, Escape/Tab, sequential add/retry, focus, totals/properties, native Checkout.');
    }
  } finally { await browser.close(); }
  console.log('Screenshots: ' + out + '. All responses are local fixtures; no Shopify purchase verified.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
