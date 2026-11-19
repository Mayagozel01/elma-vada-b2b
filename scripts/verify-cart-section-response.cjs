// Regression for /cart content negotiation and standalone section response shape.
// NODE_PATH=/tmp/elma-gift-checks/node_modules node scripts/verify-cart-section-response.cjs
const assert = require('node:assert/strict');
const {harness, fixtures, cartMarkup, snippet} = require('./verify-gift-offers.cjs');
const settle = () => new Promise(resolve => setTimeout(resolve, 100));
const response = body => ({ok: true, status: 200, json: async () => body});
async function main() {
  const ctx = fixtures();
  const markup = await cartMarkup(ctx);
  const html = await snippet('cart-content', ctx);
  const app = harness(markup);
  app.window.location.href = 'https://fixture.test/fr/cart?preview_theme_id=123&preview_key=fixture&pb=0&section_id=old#CartCheckout';
  app.respond((url, options) => {
    const parsed = new URL(url);
    assert.equal(parsed.pathname, '/fr/cart');
    assert.equal(parsed.searchParams.get('sections'), 'cart-gift-offers');
    assert.equal(parsed.searchParams.get('preview_theme_id'), '123');
    assert.equal(parsed.searchParams.get('preview_key'), 'fixture');
    assert.equal(parsed.searchParams.get('pb'), '0');
    assert.equal(parsed.searchParams.has('section_id'), false);
    assert.equal(parsed.hash, '');
    assert.equal(options.method, 'GET');
    assert.equal(options.credentials, 'same-origin');
    assert.equal(options.redirect, 'error');
    assert.equal(options.headers['Content-Type'], undefined);
    return response(options.headers.Accept === 'application/json' ? ctx.cart : {'cart-gift-offers': html});
  });
  await app.boot();
  await app.tick(5000);
  assert.equal(app.q('[data-offers-dialog]').open, true);
  assert.equal(app.calls[0].options.headers.Accept, '*/*');
  assert.equal(app.storage.get('elma:gift-offers:seen:v1'), 'true');
  app.click('[data-offers-close]');
  app.click('[data-offers-open]'); await settle();
  assert.equal(app.q('[data-offers-dialog]').open, true);
  app.dispose();

  for (const [name, body] of Object.entries({
    cartJSON: ctx.cart, missing: {}, nullResponse: null, nullHTML: {'cart-gift-offers': null},
    blankHTML: {'cart-gift-offers': '  '}, invalidHTML: {'cart-gift-offers': '<p>Not a cart</p>'},
    bundled: {items: [], sections: {'cart-gift-offers': html}}
  })) {
    const app = harness(markup); await app.boot();
    app.respond(() => response(body));
    await assert.rejects(app.window.elmaCart.read(), /Cart section unavailable|Invalid cart section/, name);
    await app.tick(5000);
    assert.equal(app.q('[data-offers-dialog]').open, false, name);
    assert.match(app.q('[data-offers-status]').textContent, /could not refresh/, name + ' auto failure remains visible');
    assert.equal(app.storage.has('elma:gift-offers:seen:v1'), false, name);
    app.click('[data-offers-open]'); await settle();
    assert.match(app.q('[data-offers-status]').textContent, /could not refresh/);
    assert.equal(app.storage.has('elma:gift-offers:seen:v1'), false);
    assert.equal(app.q('[data-offers-panel]').hidden, false);
    app.respond(() => response({'cart-gift-offers': html}));
    app.click('[data-offers-open]'); await settle();
    assert.equal(app.q('[data-offers-dialog]').open, true, name + ' manual retry');
    app.dispose();
  }
  console.log('PASS: section Accept vs cart JSON, locale/preview context, strict standalone format, HTTP 200 with missing/null/invalid HTML, bundled format rejection, auto/manual/reopen and session flag only after show.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
