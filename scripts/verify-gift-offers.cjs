// Offline Liquid + jsdom fixtures. No browser, Shopify request, real ID or order.
// NODE_PATH=/tmp/elma-gift-checks/node_modules node scripts/verify-gift-offers.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {Liquid} = require('liquidjs');
const {JSDOM} = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const engine = new Liquid({root: path.join(root, 'snippets'), extname: '.liquid'});
engine.registerFilter('money', value => '$' + (Number(value || 0) / 100).toFixed(2));
engine.registerFilter('image_url', photo => photo.url);
engine.registerFilter('placeholder_svg_tag', () => '<svg></svg>');
engine.registerFilter('default_errors', () => 'Invalid form');
const field = value => ({value});
const custom = values => ({custom: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, field(value)]))});
const image = {url: '/fixture-box.jpg', width: 400, height: 400, alt: 'Gift box'};
const routes = {cart_url: '/fr/cart', cart_add_url: '/fr/cart/add', cart_change_url: '/fr/cart/change', cart_update_url: '/fr/cart/update', all_products_collection_url: '/fr/collections/all'};
const settings = {enable_product_gift_offers: true, enable_cart_gift_offers: true, enable_volume_pricing: true};
function fixtures() {
  const addonProduct = {id: 200, title: 'Gift box', has_only_default_variant: true, featured_image: image, metafields: custom({})};
  const addon = {id: 201, title: 'Default Title', product: addonProduct, price: 500, available: true, quantity_rule: {min: 1, increment: 1, max: 10}, metafields: custom({is_gift_addon: true})};
  const offer = {title: field('Gift box'), image: field(image), variant: field(addon), enabled: field(true), kind: field('gift_box')};
  const extraProduct = {...addonProduct, id: 300, title: 'Ribbon'};
  const extra = {...addon, id: 301, product: extraProduct, price: 200};
  const ribbon = {...offer, enabled: field(true), title: field('Ribbon'), variant: field(extra), kind: field('other')};
  const variants = [
    {id: 101, title: 'Pen only', options: ['Black'], price: 2000, available: true, quantity_rule: {min: 1, increment: 1}, metafields: custom({includes_gift_box: false})},
    {id: 102, title: 'With gift box', options: ['Gold'], price: 2400, available: true, quantity_rule: {min: 1, increment: 1}, metafields: custom({includes_gift_box: true})},
    {id: 103, title: 'Unknown packaging', options: ['Silver'], price: 2000, available: true, quantity_rule: {min: 1, increment: 1}, metafields: custom({})}
  ];
  const product = {id: 100, title: 'Pen', url: '/fr/products/pen', has_only_default_variant: false,
    variants, selected_or_first_available_variant: variants[0], images: [],
    metafields: custom({gift_offers: [offer, ribbon], personalization_enabled: true, personalization_required: true, personalization_max_length: 20,
      volume_profile: {enabled: field(true), tiers: field([{minimum: 2, percent_off: 5}, {minimum: 5, percent_off: 10}])}})};
  const line = (key, quantity, text, variant = variants[0]) => ({key, quantity, product, variant, properties: {'Engraving text': text}, final_line_price: quantity * variant.price, original_line_price: quantity * variant.price});
  const items = [line('101:maya', 1, 'Maya'), line('101:anna', 2, 'Anna')];
  const cart = {items, item_count: 3, total_price: 6000, currency: {iso_code: 'USD'}};
  return {product, variants, addon, addonProduct, offer, ribbon, cart, line, routes, settings, selected_variant: variants[0], section: {id: 'main', settings: {enable_personalization: true, buy_label: 'Add to cart'}, blocks: []}, request: {}, form: {}};
}
const snippet = (name, context) => engine.parseAndRender(read('snippets/' + name + '.liquid'), context);
const productMarkup = context => engine.parseAndRender(read('sections/product-details.liquid')
  .replace(/{% schema %}[\s\S]*?{% endschema %}/, '')
  .replace(/{% form 'product'[^%]*%}/, '<form class="product-purchase" method="post" action="/fr/cart/add">')
  .replace(/{% endform %}/, '</form>'), context);
const cartMarkup = context => engine.parseAndRender(read('templates/cart.liquid'), context);
const parse = html => new JSDOM(html).window.document;
const flush = async () => { for (let i = 0; i < 30; i++) await new Promise(resolve => setTimeout(resolve, 2)); };
function harness(html, {product = false, storage = new Map(), storageBlocked = false} = {}) {
  const dom = new JSDOM('<a data-header-cart data-cart-json-url="/fr/cart.js"><span data-cart-count>3</span></a>' + html,
    {url: 'https://fixture.test/fr/' + (product ? 'products/pen' : 'cart'), pretendToBeVisual: true});
  const {document} = dom.window;
  const calls = [], navigations = [], timers = new Map();
  let sequence = 0, reply = async () => { throw new Error('Unexpected request'); };
  const window = {location: {origin: 'https://fixture.test', href: dom.window.location.href, replace: url => navigations.push(url)},
    scrollX: 0, scrollY: 240, innerWidth: 1200, scrollTo(x, y) { this.scrollX = x; this.scrollY = y; }, history: {replaceState() {}}, addEventListener: dom.window.addEventListener.bind(dom.window)};
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; dialog.dispatchEvent(new dom.window.Event('close')); };
  });
  const context = vm.createContext({window, document, URL, FormData: dom.window.FormData, DOMParser: dom.window.DOMParser,
    CustomEvent: dom.window.CustomEvent, AbortController: dom.window.AbortController,
    sessionStorage: {getItem(key) { if (storageBlocked) throw new Error('blocked'); return storage.get(key); }, setItem(key, value) { if (storageBlocked) throw new Error('blocked'); storage.set(key, value); }, removeItem(key) { storage.delete(key); }},
    setTimeout: (callback, ms) => { timers.set(++sequence, {callback, ms}); return sequence; }, clearTimeout: id => timers.delete(id),
    fetch: async (url, options = {}) => { calls.push({url, options}); return reply(url, options); }});
  const run = file => vm.runInContext(read('assets/' + file), context);
  run('cart.js');
  run(product ? 'commerce.js' : 'gift-offers.js');
  document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  const q = selector => document.querySelector(selector);
  return {dom, window, document, calls, navigations, timers, storage, q, run,
    respond: callback => { reply = callback; },
    async boot() { await flush(); dom.window.dispatchEvent(new dom.window.Event('load')); await flush(); },
    async tick(ms) { for (const [id, timer] of [...timers]) if (timer.ms === ms) { timers.delete(id); timer.callback(); } await flush(); },
    click: selector => q(selector).click(),
    quantity(card, value) { const input = card.querySelector('[data-offer-quantity]'); input.value = String(value); input.dispatchEvent(new dom.window.Event('input', {bubbles: true})); },
    submit(selector, name) { return q(selector).dispatchEvent(new dom.window.SubmitEvent('submit', {bubbles: true, cancelable: true, submitter: name ? q('button[name="' + name + '"]') : null})); },
    changeVariant(id) { q('[data-variant-select]').value = String(id); q('[data-variant-select]').dispatchEvent(new dom.window.Event('change')); },
    dispose() { dom.window.close(); }};
}
const response = data => ({ok: true, status: 200, json: async () => data});
const sectionResponse = async ctx => response({'cart-gift-offers': await snippet('cart-content', ctx)});
function appendAddon(ctx, id, quantity = 1) {
  const variant = id === 201 ? ctx.addon : ctx.ribbon.variant.value;
  ctx.cart.items.push({key: id + ':addon', variant, product: variant.product, quantity,
    properties: {_elma_gift_offer: 'true'}, original_line_price: variant.price * quantity, final_line_price: variant.price * quantity});
  ctx.cart.item_count += quantity;
  ctx.cart.total_price += variant.price * quantity;
}
const cardAt = (app, id, modal = false) => app.q((modal ? '[data-offers-dialog]' : '[data-offers-panel]') + ' [data-variant-id="' + id + '"]');
async function main() {
  let ctx = fixtures();
  const eligible = () => snippet('gift-offer-eligible', {offer: ctx.offer, base_product: ctx.product, base_variant: ctx.variants[0]});
  assert.equal((await eligible()).trim(), 'true');
  ctx.product.metafields.custom.includes_gift_box = field(true);
  assert.equal((await eligible()).trim(), 'true', 'variant false overrides product true');
  for (const value of [true, undefined]) {
    ctx.variants[0].metafields = custom({includes_gift_box: value});
    assert.equal((await eligible()).trim(), 'false');
  }
  ctx.product.metafields.custom.includes_gift_box = field(false);
  assert.equal((await eligible()).trim(), 'true', 'unset variant inherits product false');
  ctx.variants[0].metafields = custom({includes_gift_box: false});
  for (const [object, key, value] of [[ctx.offer.enabled, 'value', false], [ctx.addon, 'available', false], [ctx.addonProduct, 'requires_selling_plan', true], [ctx.addon.quantity_rule, 'min', 2]]) {
    const old = object[key]; object[key] = value;
    assert.equal((await eligible()).trim(), 'false'); object[key] = old;
  }
  ctx.addon.metafields = custom({});
  assert.equal((await eligible()).trim(), 'false');
  ctx.addon.metafields = custom({is_gift_addon: true, requires_personalization: true});
  assert.equal((await eligible()).trim(), 'false');
  ctx.addon.metafields = custom({is_gift_addon: true});
  ctx.addonProduct.metafields = custom({personalization_enabled: true});
  assert.equal((await eligible()).trim(), 'false');
  ctx.addon.options = ['No engraving'];
  assert.equal((await eligible()).trim(), 'true');
  ctx = fixtures();
  let app = harness(await productMarkup(ctx), {product: true}); await app.boot();
  assert.equal(app.q('[data-product-offers]'), null, 'legacy enabled setting does not display product offers');
  app.q('[data-engraving-text]').value = 'Anna';
  assert.equal(app.submit('.product-purchase'), true);
  assert.equal(app.submit('.product-purchase'), false);
  assert.equal(new app.dom.window.FormData(app.q('.product-purchase')).get('properties[Engraving text]'), 'Anna');
  assert.equal(app.calls.length, 0); app.dispose();

  // Existing quantity savings rules stay independent of gifts and engraving rows.
  let volume = parse(await snippet('product-volume-pricing', ctx));
  assert.equal(volume.querySelector('[data-volume-pricing]').dataset.existingQuantity, '3');
  ctx.cart.items.push({...ctx.line('201:extra', 7, ''), variant: ctx.addon});
  ctx.cart.items.push({...ctx.line('101:marked', 8, ''), properties: {_elma_gift_offer: 'true'}});
  volume = parse(await snippet('product-volume-pricing', ctx));
  assert.equal(volume.querySelector('[data-volume-pricing]').dataset.existingQuantity, '3');
  const profile = ctx.product.metafields.custom.volume_profile.value;
  for (const tiers of [[], [{minimum: 2, percent_off: 0}], [{minimum: 2, percent_off: 100}], [{minimum: 2.5, percent_off: 5}], [{minimum: 3, percent_off: 5}, {minimum: 2, percent_off: 10}], [{minimum: '2', percent_off: 5}]]) {
    profile.tiers.value = tiers;
    assert.equal((await snippet('product-volume-pricing', ctx)).trim(), '');
  }
  // Server-rendered block is immediately visible, deduplicated, capped and after lines.
  ctx = fixtures();
  ctx.cart.items.unshift(ctx.line('102:boxed', 1, 'Boxed', ctx.variants[1]));
  ctx.product.metafields.custom.gift_offers.value.push(ctx.offer);
  let html = await cartMarkup(ctx), doc = parse(html);
  assert.equal(doc.querySelectorAll('[data-offers-panel] [data-gift-offer]').length, 2);
  assert.equal(doc.querySelector('[data-offers-panel]').hidden, false);
  assert.deepEqual([...doc.querySelectorAll('[data-offers-panel] [data-gift-offer]')].map(card => card.dataset.variantId), ['301', '201'], 'boxed line yields ribbon first, unboxed line yields box');
  assert.match(doc.querySelector('[data-variant-id="201"] [data-offer-parents]').textContent, /Pen only/);
  assert(doc.querySelector('[data-cart-items]').compareDocumentPosition(doc.querySelector('[data-cart-offers]')) & 4);
  assert(doc.querySelector('[data-cart-offers]').compareDocumentPosition(doc.querySelector('[data-cart-footer]')) & 4);
  for (let i = 0; i < 3; i++) ctx.product.metafields.custom.gift_offers.value.push({...ctx.ribbon, variant: field({...ctx.ribbon.variant.value, id: 500 + i})});
  assert.equal(parse(await cartMarkup(ctx)).querySelectorAll('[data-offers-panel] [data-gift-offer]').length, 3);

  ctx = fixtures();
  app = harness(await cartMarkup(ctx)); await app.boot();
  app.run('gift-offers.js'); app.run('cart.js');
  app.respond(() => sectionResponse(ctx));
  assert.equal(app.q('[data-offers-panel]').hidden, false);
  assert.equal(app.q('[data-offers-dialog]').open, false);
  assert.equal(app.calls.length, 0);
  assert.equal(new app.dom.window.FormData(app.q('[data-cart-form]')).getAll('updates[]').length, 2);
  const inputs = [...app.document.querySelectorAll('[data-offer-quantity]')];
  assert(inputs.every(input => input.value === '1' && input.form === null));
  await app.tick(5000);
  const dialog = app.q('[data-offers-dialog]');
  assert.equal(dialog.open, true);
  assert.equal(app.storage.get('elma:gift-offers:seen:v1'), 'true');
  assert.equal(app.document.activeElement, app.q('[data-offers-close]'));
  assert.equal(app.document.body.style.position, 'fixed');
  const continueButton = app.q('.gift-offers-dialog__footer button'); continueButton.focus();
  continueButton.dispatchEvent(new app.dom.window.KeyboardEvent('keydown', {key: 'Tab', bubbles: true, cancelable: true}));
  assert.equal(app.document.activeElement, app.q('[data-offers-close]'));
  app.quantity(cardAt(app, 201, true), 2);
  assert.equal(cardAt(app, 201).querySelector('input').value, '2');
  const body = app.q('.gift-offers-dialog__body'); body.scrollTop = 30;
  let resolvePost, postCount = 0;
  app.respond(async (url, options) => {
    if (options.method === 'POST') {
      postCount++;
      const item = JSON.parse(options.body).items[0];
      return new Promise(resolve => { resolvePost = () => { appendAddon(ctx, Number(item.id), item.quantity); resolve(response({items: [{id: Number(item.id), quantity: item.quantity}]})); }; });
    }
    return sectionResponse(ctx);
  });
  const button = cardAt(app, 201, true).querySelector('button'); button.focus(); button.click(); button.click();
  await flush();
  assert.equal(postCount, 1);
  assert.equal(button.textContent, 'Adding…');
  assert(!app.document.body.textContent.includes('Added ✓'));
  resolvePost(); await flush();
  assert.equal(dialog.open, true); assert.equal(app.q('[data-offers-dialog]'), dialog);
  assert.equal(app.document.activeElement, button);
  assert.equal(body.scrollTop, 30);
  assert.equal(button.textContent, 'Added ✓');
  assert.equal(cardAt(app, 201).querySelector('button').textContent, 'Added ✓');
  assert.equal(app.q('[data-cart-count]').textContent, '5');
  assert.match(app.q('[data-cart-footer]').textContent, /\$70.00/);
  assert.match(app.q('[data-cart-items]').textContent, /Maya/);
  assert.match(app.q('[data-cart-items]').textContent, /Anna/);
  button.click(); await flush(); assert.equal(postCount, 1);
  cardAt(app, 301, true).querySelector('button').click(); await flush();
  assert.equal(postCount, 2); resolvePost(); await flush();
  assert.equal(cardAt(app, 301).querySelector('button').textContent, 'Added ✓');
  assert.equal(app.q('[data-cart-count]').textContent, '6');
  assert.equal(app.navigations.length, 0);
  const session = app.storage;
  app.click('[data-offers-close]');
  assert.equal(app.document.body.style.position, '');
  assert.equal(app.window.scrollY, 240);
  assert.equal(app.q('[data-offers-panel]').hidden, true);
  app.dispose();
  app = harness(await cartMarkup(fixtures()), {storage: session}); await app.boot(); await app.tick(5000);
  assert.equal(app.calls.length, 0); app.dispose();

  // No offered cards for empty/disabled/unavailable/present/add-on-only carts.
  for (const scenario of ['empty', 'no-offers', 'unavailable', 'already-added', 'addon-only']) {
    ctx = fixtures(); ctx.product.metafields.custom.gift_offers = field([ctx.offer]);
    if (scenario === 'empty') ctx.cart = {items: [], item_count: 0, total_price: 0};
    if (scenario === 'no-offers') ctx.offer.enabled.value = false;
    if (scenario === 'unavailable') ctx.addon.available = false;
    if (scenario === 'already-added') appendAddon(ctx, 201);
    if (scenario === 'addon-only') ctx.cart.items.forEach(item => { item.variant = ctx.addon; });
    app = harness(await cartMarkup(ctx)); await app.boot(); await app.tick(5000);
    assert.equal(app.q('[data-offers-panel]').hidden, true, scenario); assert.equal(app.calls.length, 0); app.dispose();
  }
  for (const scenario of ['storage', 'setting', 'dirty', 'hidden', 'dialog', 'checkout', 'null', 'throw-show']) {
    ctx = fixtures(); if (scenario === 'setting') ctx.settings = {...settings, auto_open_cart_gift_offers: false};
    app = harness(await cartMarkup(ctx), {storageBlocked: scenario === 'storage'}); await app.boot();
    app.respond(() => scenario === 'null' ? response({'cart-gift-offers': null}) : sectionResponse(ctx));
    if (scenario === 'dirty') app.q('[data-cart-quantity]').value = '4';
    if (scenario === 'hidden') Object.defineProperty(app.document, 'visibilityState', {value: 'hidden'});
    if (scenario === 'dialog') { const other = app.document.createElement('div'); other.setAttribute('role', 'dialog'); app.document.body.append(other); }
    if (scenario === 'checkout') assert.equal(app.submit('[data-cart-form]', 'checkout'), true);
    if (scenario === 'throw-show') app.q('[data-offers-dialog]').showModal = () => { throw new Error('Unavailable'); };
    await app.tick(5000);
    assert.equal(app.q('[data-offers-dialog]').open, false, scenario);
    assert.equal(app.storage.size, 0, scenario + ' does not consume a show');
    if (['storage', 'setting'].includes(scenario)) {
      app.click('[data-offers-open]'); await flush(); assert.equal(app.q('[data-offers-dialog]').open, true);
    }
    app.dispose();
  }
  // Checkout during preflight is never delayed by the read or a late timer.
  ctx = fixtures(); app = harness(await cartMarkup(ctx)); await app.boot();
  let resolveRead; app.respond(() => new Promise(resolve => { resolveRead = resolve; }));
  await app.tick(5000);
  assert.equal(app.submit('[data-cart-form]', 'checkout'), true);
  assert.equal(app.q('button[name="checkout"]').disabled, false);
  resolveRead(await sectionResponse(ctx)); await flush();
  assert.equal(app.q('[data-offers-dialog]').open, false); assert.equal(app.storage.size, 0); app.dispose();

  // Price/availability changes are checked before POST; a new cart is applied in place.
  for (const change of ['price', 'stock', 'cart']) {
    ctx = fixtures(); app = harness(await cartMarkup(ctx)); await app.boot();
    if (change === 'price') ctx.addon.price = 600;
    if (change === 'stock') ctx.addon.available = false;
    if (change === 'cart') ctx.cart.items[0].quantity = 7;
    app.respond(() => sectionResponse(ctx));
    cardAt(app, 201).querySelector('button').click(); await flush();
    assert.equal(app.calls.filter(call => call.options.method === 'POST').length, 0);
    assert.equal(app.navigations.length, 0);
    assert.match(app.q('[data-offers-status]').textContent, /changed/); app.dispose();
  }
  // Failed writes reconcile first. Only confirmed successes say Added; safe retries work.
  for (const failure of ['422', '403', 'network', 'malformed', 'partial', 'timeout', 'section-failure']) {
    ctx = fixtures(); app = harness(await cartMarkup(ctx)); await app.boot();
    let posts = 0, reads = 0, retry = false;
    app.respond(async (url, options) => {
      if (options.method !== 'POST') {
        reads++;
        return failure === 'section-failure' && reads > 1 && !retry ? response({'cart-gift-offers': null}) : sectionResponse(ctx);
      }
      posts++;
      if (retry) { appendAddon(ctx, 201); return response({items: [{id: 201, quantity: 1}]}); }
      if (failure === 'network') throw new Error('Network failed');
      if (failure === 'timeout') return new Promise((resolve, reject) => options.signal.addEventListener('abort', () => reject(new Error('Timeout'))));
      if (failure === 'partial') appendAddon(ctx, 201);
      if (failure === 'malformed') return response({});
      return {ok: false, status: 422};
    });
    cardAt(app, 201).querySelector('button').click(); await flush();
    if (failure === 'timeout') await app.tick(20000);
    assert.equal(posts, 1); assert.equal(app.navigations.length, 0);
    assert(!app.document.body.textContent.includes('Added ✓'), failure);
    retry = true;
    if (failure === 'section-failure') { assert.equal(app.window.elmaCart.isLocked(), true); app.click('[data-cart-retry]'); await flush(); }
    assert.equal(app.window.elmaCart.isLocked(), false);
    if (failure !== 'partial') {
      cardAt(app, 201).querySelector('button').click(); await flush();
      assert.equal(posts, 2, failure + ' permits retry');
      assert.equal(cardAt(app, 201).querySelector('button').textContent, 'Added ✓');
    } else assert.equal(cardAt(app, 201), null, 'uncertain but present add-on cannot be added again');
    app.dispose();
  }
  console.log('PASS: cart-only SSR cards, stable order/dedup/cap, packaging false inheritance, eligibility, volume rules, independent quantities, sequential additions, confirmed/synced Added, focus/scroll/DOM retention, storage/timer/checkout guards, live revalidation and safe retries after 403/422/network/timeout/partial/null responses.');
  console.log('Offline Liquid/jsdom fixtures; these do not confirm Shopify purchases or real discounts.');
}
module.exports = {harness, sectionResponse, fixtures, cartMarkup, snippet, appendAddon, productMarkup};
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
