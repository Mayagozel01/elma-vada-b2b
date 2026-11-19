// No browser or live Shopify requests: Liquid fixtures, jsdom and mocked fetch.
// NODE_PATH=<deps>/node_modules node scripts/verify-cart.cjs [theme-directory]
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {Liquid} = require('liquidjs');
const {JSDOM} = require('jsdom');
const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const engine = new Liquid({root: path.join(root, 'snippets'), extname: '.liquid'});
engine.registerFilter('money', cents => '$' + (Number(cents) / 100).toFixed(2));
engine.registerFilter('asset_url', asset => '/assets/' + asset);
const routes = {root_url: '/fr/', cart_url: '/fr/cart', cart_update_url: '/fr/cart/update', cart_change_url: '/fr/cart/change', all_products_collection_url: '/fr/collections/all'};
const line = (key, text, quantity) => ({
  key, quantity, product: {title: 'Pen', has_only_default_variant: false},
  variant: {id: 101, title: 'Black'}, url: '/fr/products/pen?variant=101',
  properties: [['Engraving text', text], ['Gift note', 'Keep & preserve']],
  final_line_price: quantity * 999, original_line_price: quantity * 999,
  url_to_remove: '/fr/cart/change?id=' + encodeURIComponent(key) + '&quantity=0'
});
const before = [line('101:maya', 'Maya', 1), line('101:anna', 'Anna', 1)];
const after = [line('101:maya', 'Maya', 1), line('101:anna', 'Anna', 2)];
const state = items => ({items, item_count: items.reduce((n, i) => n + i.quantity, 0), total_price: items.reduce((n, i) => n + i.final_line_price, 0)});
const response = items => ({ok: true, status: 200, json: async () => state(items)});
async function markup(items, includeCart = true) {
  const context = {routes, cart: state(items), section: {settings: {}}, settings: {}, shop: {name: 'Elma Vada'}};
  const header = await engine.parseAndRender(read('sections/header.liquid').replace(/{% schema %}[\s\S]*?{% endschema %}/, ''), context);
  return header + (includeCart ? await engine.parseAndRender(read('templates/cart.liquid'), context) : '');
}
async function fixture(items = before, includeCart = true, runJS = true) {
  const dom = new JSDOM(await markup(items, includeCart), {url: 'https://fixture.test/fr/cart'});
  const document = dom.window.document;
  const calls = [], navigations = [], timers = new Map();
  let sequence = 0;
  let reply = async (url, options) => options.method === 'POST' ? response(after) : sectionResponse(after);
  const window = {
    location: {replace: url => navigations.push(url)}, scrollX: 0, scrollY: 100, scrollTo() {},
    addEventListener: dom.window.addEventListener.bind(dom.window)
  };
  const context = vm.createContext({
    window, document, URL, DOMParser: dom.window.DOMParser, CustomEvent: dom.window.CustomEvent, AbortController: dom.window.AbortController,
    setTimeout: callback => { timers.set(++sequence, callback); return sequence; },
    clearTimeout: id => timers.delete(id),
    fetch: async (url, options = {}) => { calls.push({url, options}); return reply(url, options); }
  });
  const run = () => vm.runInContext(read('assets/cart.js'), context);
  if (runJS) run();
  const q = s => document.querySelector(s);
  return {
    dom, document, q, calls, navigations, timers, run,
    respond: callback => { reply = callback; },
    submit: (name = 'update') => q('[data-cart-form]').dispatchEvent(new dom.window.SubmitEvent('submit', {bubbles: true, cancelable: true, submitter: q('button[name="' + name + '"]')})),
    remove: index => document.querySelectorAll('[data-cart-remove]')[index].dispatchEvent(new dom.window.MouseEvent('click', {bubbles: true, cancelable: true})),
    quantity: (index, value) => { document.querySelectorAll('[data-cart-quantity]')[index].value = String(value); },
    close: () => dom.window.close()
  };
}
const flush = () => new Promise(resolve => setTimeout(resolve, 5));
async function sectionResponse(items) {
  const html = await engine.parseAndRender(read('snippets/cart-content.liquid'), {routes, cart: state(items), settings: {}});
  return {ok: true, json: async () => ({'cart-gift-offers': html})};
}
async function main() {
  let f = await fixture();
  assert.equal(f.q('[data-header-cart]').getAttribute('href'), '/fr/cart');
  assert.equal(f.q('[data-cart-count]').textContent, '2');
  assert.equal(f.q('[data-cart-form]').method, 'post');
  f.quantity(1, 2);
  let resolveRequest;
  f.respond((url, options) => options.method === 'POST' ? new Promise(resolve => { resolveRequest = resolve; }) : sectionResponse(after));
  f.run();
  assert.equal(f.submit(), false); assert.equal(f.submit(), false); assert.equal(f.remove(0), false);
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].url, '/fr/cart/update.js');
  assert.deepEqual(JSON.parse(f.calls[0].options.body), {updates: {'101:anna': 2}});
  assert(f.q('button[name="checkout"]').disabled);
  resolveRequest(response(after));
  for (let i = 0; i < 12; i++) await flush();
  assert.deepEqual(f.navigations, []);
  assert.equal(f.q('[data-cart-count]').textContent, '3');
  assert.equal(f.q('[data-header-cart]').getAttribute('aria-label'), 'Cart, 3 items');
  assert.equal(f.q('button[name="checkout"]').disabled, false);
  assert(f.document.body.textContent.includes('Total: $29.97'));
  assert.deepEqual([...f.document.querySelectorAll('[data-cart-quantity]')].map(i => i.value), ['1', '2']);
  assert.equal(f.document.querySelectorAll('.commerce-cart__item').length, 2);
  assert(f.document.body.textContent.includes('Engraving text: Maya'));
  assert(f.document.body.textContent.includes('Engraving text: Anna'));
  assert(f.document.body.textContent.includes('Gift note: Keep & preserve'));
  f.respond((url, options) => options.method === 'POST' ? response([after[0]]) : sectionResponse([after[0]]));
  f.remove(1); for (let i = 0; i < 12; i++) await flush();
  const remove = f.calls.find(call => call.url === '/fr/cart/change.js');
  assert.deepEqual(JSON.parse(remove.options.body), {id: '101:anna', quantity: 0});
  assert.equal(f.q('[data-cart-count]').textContent, '1');
  assert.equal(f.document.querySelectorAll('.commerce-cart__item').length, 1);
  f.close();

  f = await fixture(after); f.quantity(0, 0); f.quantity(1, 3);
  f.respond((url, options) => options.method === 'POST' ? response([line('101:anna', 'Anna', 3)]) : sectionResponse([line('101:anna', 'Anna', 3)]));
  f.submit(); for (let i = 0; i < 12; i++) await flush();
  assert.deepEqual(JSON.parse(f.calls[0].options.body), {updates: {'101:maya': 0, '101:anna': 3}});
  assert.equal(f.q('[data-cart-count]').textContent, '3'); f.close();

  for (const failure of [403, 422, 'network', 'html', 'invalid']) {
    f = await fixture();
    f.respond(async () => {
      if (failure === 'network') throw new Error('Network');
      if (failure === 'html') return {ok: true, json: async () => { throw new Error('HTML'); }};
      if (failure === 'invalid') return {ok: true, json: async () => ({status: 422})};
      return {ok: false, status: failure};
    });
    f.quantity(1, 2); f.submit(); for (let i = 0; i < 12; i++) await flush();
    assert.equal(f.calls.length, 2, 'Failed mutation followed by read-only reconciliation');
    assert.equal(f.navigations.length, 0);
    assert.equal(f.q('[data-cart-count]').textContent, '2');
    assert(!f.q('[data-cart-message]').hidden);
    assert(f.q('[data-cart-message]').textContent.includes('Your cart may have changed'));
    f.submit(); f.remove(0); f.submit('checkout');
    assert.equal(f.calls.length, 2, 'No POST retries until a fresh GET succeeds');
    assert(f.q('button[name="checkout"]').disabled);
    f.respond(() => sectionResponse(before));
    f.q('[data-cart-retry]').click(); for (let i = 0; i < 12; i++) await flush();
    assert.equal(f.q('button[name="checkout"]').disabled, false);
    assert(f.q('[data-cart-message]').hidden); f.close();
  }
  // Native Checkout still carries every unsaved quantity and no offer inputs.
  f = await fixture(); f.quantity(1, 2);
  assert.equal(f.submit('checkout'), true);
  assert.equal(f.calls.length, 0);
  assert.equal(f.q('button[name="checkout"]').disabled, false);
  const checkoutData = new f.dom.window.FormData(f.q('[data-cart-form]'), f.q('button[name="checkout"]'));
  assert(checkoutData.has('checkout'));
  assert.deepEqual(checkoutData.getAll('updates[]'), ['1', '2']);
  assert.equal(f.submit('checkout'), false); f.close();

  f = await fixture(after, true, false);
  assert.deepEqual(new f.dom.window.FormData(f.q('[data-cart-form]')).getAll('updates[]'), ['1', '2']);
  assert.equal(new URL(f.document.querySelectorAll('[data-cart-remove]')[1].href).searchParams.get('id'), '101:anna'); f.close();
  f = await fixture();
  f.respond(() => sectionResponse(after));
  const restored = new f.dom.window.Event('pageshow'); Object.defineProperty(restored, 'persisted', {value: true});
  f.dom.window.dispatchEvent(restored); for (let i = 0; i < 12; i++) await flush();
  assert.deepEqual(f.navigations, []); assert.equal(f.q('[data-cart-count]').textContent, '3'); f.close();
  f = await fixture([], false); f.respond(async () => response(after));
  const restoredHeader = new f.dom.window.Event('pageshow'); Object.defineProperty(restoredHeader, 'persisted', {value: true});
  f.dom.window.dispatchEvent(restoredHeader); await flush();
  assert.equal(f.calls[0].url, '/fr/cart.js'); assert.equal(f.q('[data-cart-count]').textContent, '3'); f.close();
  f = await fixture([line('101:xss', '<img src=x onerror=alert(1)>', 1)]);
  assert.equal(f.q('.commerce-cart__property img'), null); f.close();
  f = await fixture();
  f.respond((url, options) => options.method === 'POST' ? response([]) : sectionResponse([]));
  f.quantity(0, 0); f.quantity(1, 0); f.submit(); for (let i = 0; i < 12; i++) await flush();
  assert.equal(f.q('[data-cart-count]').textContent, '0');
  assert.equal(f.q('[data-cart-footer]').hidden, true);
  assert(f.q('[data-cart-items]').textContent.includes('Your cart is empty')); f.close();
  console.log('PASS: keyed Maya/Anna updates/removal/zero, properties, Shopify-rendered totals, native Checkout, no reload, shared locking, read-only recovery and retries, empty state, header and restored pages.');
  console.log('Local Liquid/jsdom fixtures, no Shopify cart/order.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
