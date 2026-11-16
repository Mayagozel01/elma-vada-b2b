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
const flush = async () => { for (let i = 0; i < 12; i++) await new Promise(resolve => setImmediate(resolve)); };
function harness(html, {product = false, storage = new Map(), storageBlocked = false} = {}) {
  const dom = new JSDOM('<a data-header-cart data-cart-json-url="/fr/cart.js"><span data-cart-count>3</span></a>' + html,
    {url: 'https://fixture.test/fr/' + (product ? 'products/pen' : 'cart'), pretendToBeVisual: true});
  const {document} = dom.window;
  const calls = [], navigations = [], timers = new Map();
  let sequence = 0, reply = async () => { throw new Error('Unexpected request'); };
  const window = {location: {origin: 'https://fixture.test', href: dom.window.location.href, replace: url => navigations.push(url)},
    history: {replaceState() {}}, addEventListener: dom.window.addEventListener.bind(dom.window)};
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; dialog.dispatchEvent(new dom.window.Event('close')); };
  });
  const context = vm.createContext({window, document, URL, FormData: dom.window.FormData, DOMParser: dom.window.DOMParser,
    CustomEvent: dom.window.CustomEvent, AbortController: dom.window.AbortController,
    sessionStorage: {getItem(key) { if (storageBlocked) throw new Error('blocked'); return storage.get(key); }, setItem(key, value) { if (storageBlocked) throw new Error('blocked'); storage.set(key, value); }},
    setTimeout: (callback, ms) => { timers.set(++sequence, {callback, ms}); return sequence; }, clearTimeout: id => timers.delete(id),
    fetch: async (url, options = {}) => { calls.push({url, options}); return reply(url, options); }});
  const run = file => vm.runInContext(read('assets/' + file), context);
  run('cart.js');
  run(product ? 'commerce.js' : 'gift-offers.js');
  document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  const q = selector => document.querySelector(selector);
  return {dom, window, document, calls, navigations, timers, storage, q,
    respond: callback => { reply = callback; },
    async boot() { await flush(); dom.window.dispatchEvent(new dom.window.Event('load')); await flush(); },
    async tick(ms) { for (const [id, timer] of [...timers]) if (timer.ms === ms) { timers.delete(id); timer.callback(); } await flush(); },
    click: selector => q(selector).click(),
    choose(card, value = true) { const input = card.querySelector('[data-offer-choice]'); input.checked = value; input.dispatchEvent(new dom.window.Event('change', {bubbles: true})); },
    submit(selector) { return q(selector).dispatchEvent(new dom.window.SubmitEvent('submit', {bubbles: true, cancelable: true})); },
    changeVariant(id) { q('[data-variant-select]').value = String(id); q('[data-variant-select]').dispatchEvent(new dom.window.Event('change')); },
    dispose() { dom.window.close(); }};
}
const response = data => ({ok: true, status: 200, json: async () => data});
async function main() {
  let ctx = fixtures();
  const eligible = () => snippet('gift-offer-eligible', {offer: ctx.offer, base_product: ctx.product, base_variant: ctx.variants[0]});
  assert.equal((await eligible()).trim(), 'true');
  for (const value of [true, undefined]) {
    ctx.variants[0].metafields = custom({includes_gift_box: value});
    assert.equal((await eligible()).trim(), 'false', 'included/unknown box must be hidden');
  }
  ctx.variants[0].metafields = custom({includes_gift_box: false});
  for (const [object, key, value] of [[ctx.offer.enabled, 'value', false], [ctx.addon, 'available', false], [ctx.addonProduct, 'requires_selling_plan', true]]) {
    const old = object[key]; object[key] = value;
    assert.equal((await eligible()).trim(), 'false'); object[key] = old;
  }
  ctx.addon.metafields = custom({});
  assert.equal((await eligible()).trim(), 'false', 'add-on classification required');
  ctx.addon.metafields = custom({is_gift_addon: true});
  ctx.addonProduct.metafields = custom({personalization_enabled: true});
  assert.equal((await eligible()).trim(), 'false', 'personalized offers excluded');
  ctx.addon.options = ['No engraving'];
  assert.equal((await eligible()).trim(), 'true', 'explicit no-engraving variant may be offered');
  ctx = fixtures();
  let html = await snippet('product-gift-offers', ctx);
  let doc = parse(html);
  assert.equal(doc.querySelectorAll('[data-gift-offer]').length, 2);
  assert.equal(doc.querySelector('[data-gift-offer]').dataset.eligibleVariants, '|101|');
  assert.equal(doc.querySelectorAll('input:checked').length, 0);
  assert.match(doc.body.textContent, /\$5.00/);
  assert.equal((await snippet('product-gift-offers', {...ctx, settings: {}})).trim(), '');
  ctx.offer.enabled.value = false;
  assert.equal(parse(await snippet('product-gift-offers', ctx)).querySelectorAll('[data-gift-offer]').length, 1);
  ctx = fixtures();
  let volume = parse(await snippet('product-volume-pricing', ctx));
  assert.equal(volume.querySelector('[data-volume-pricing]').dataset.existingQuantity, '3', 'engraving lines count together');
  ctx.cart.items.push({...ctx.line('201:extra', 7, ''), variant: ctx.addon});
  ctx.cart.items.push({...ctx.line('101:marked', 8, ''), properties: {_elma_gift_offer: 'true'}});
  volume = parse(await snippet('product-volume-pricing', ctx));
  assert.equal(volume.querySelector('[data-volume-pricing]').dataset.existingQuantity, '3');
  const profile = ctx.product.metafields.custom.volume_profile.value;
  for (const tiers of [[], [{minimum: 2, percent_off: 0}], [{minimum: 2, percent_off: 100}], [{minimum: 2.5, percent_off: 5}], [{minimum: 3, percent_off: 5}, {minimum: 2, percent_off: 10}], [{minimum: '2', percent_off: 5}]]) {
    profile.tiers.value = tiers;
    assert.equal((await snippet('product-volume-pricing', ctx)).trim(), '', 'invalid profile hidden');
  }
  ctx = fixtures();
  let app = harness(await productMarkup(ctx), {product: true});
  await app.boot();
  assert.equal(app.q('[data-product-offers]').hidden, false);
  app.choose(app.q('[data-gift-offer]'));
  app.changeVariant(102);
  assert.equal(app.q('[data-gift-offer]').hidden, true);
  assert.equal(app.q('[data-offer-choice]').checked, false, 'ineligible choice cleared');
  app.changeVariant(101);
  app.q('[data-engraving-text]').value = 'Maya & Anna';
  app.q('[data-product-quantity]').value = '2';
  const extraProperty = app.document.createElement('input');
  extraProperty.name = 'properties[Gift note]'; extraProperty.value = 'Keep this';
  app.q('.product-purchase').append(extraProperty);
  app.choose(app.q('[data-gift-offer]'));
  app.q('[data-offer-quantity]').value = '3';
  app.choose(app.document.querySelectorAll('[data-gift-offer]')[1]);
  let release;
  app.respond((url, options) => options.method === 'POST' ? new Promise(resolve => { release = () => resolve(response({items: [{id: 101, quantity: 2}, {id: 201, quantity: 3}, {id: 301, quantity: 1}]})); }) : response(ctx.cart));
  assert.equal(app.submit('.product-purchase'), false);
  app.submit('.product-purchase');
  assert.equal(app.calls.length, 1, 'one POST for a double click');
  assert.equal(app.calls[0].url, '/fr/cart/add.js');
  assert.deepEqual(JSON.parse(app.calls[0].options.body).items, [
    {id: '101', quantity: 2, properties: {'Engraving text': 'Maya & Anna', 'Gift note': 'Keep this'}},
    {id: '201', quantity: 3, properties: {_elma_gift_offer: 'true'}},
    {id: '301', quantity: 1, properties: {_elma_gift_offer: 'true'}}
  ]);
  release(); await flush();
  assert.deepEqual(app.navigations, ['/fr/cart']);
  app.dispose();

  // No selected extras: native POST and all original form controls survive.
  app = harness(await productMarkup(ctx), {product: true}); await app.boot();
  app.q('[data-engraving-text]').value = 'Anna';
  assert.equal(app.submit('.product-purchase'), true);
  assert.equal(app.submit('.product-purchase'), false, 'native double submit blocked');
  assert.equal(app.calls.length, 0);
  assert.equal(new app.dom.window.FormData(app.q('.product-purchase')).get('properties[Engraving text]'), 'Anna');
  app.dispose();

  // Cart rendering deduplicates one variant across two engravings and products.
  ctx = fixtures();
  const secondProduct = {...ctx.product, id: 400, title: 'Desk gift'};
  ctx.cart.items.push({...ctx.line('401:desk', 1, ''), product: secondProduct});
  ctx.cart.item_count++;
  const section = await snippet('cart-gift-offers', ctx);
  app = harness(await cartMarkup(ctx)); await app.boot();
  app.respond(() => response({'cart-gift-offers': section}));
  assert.equal(app.q('[data-offers-open]').hidden, false);
  assert.equal(app.q('[data-offers-dialog]').open, false);
  assert.equal(app.calls.length, 0);
  await app.tick(5000);
  assert.equal(app.q('[data-offers-dialog]').open, true);
  assert.equal(app.q('[data-offers-list]').querySelectorAll('[data-gift-offer]').length, 2);
  assert.equal(app.q('[data-offer-parents]').textContent, 'Pairs with: Pen — Pen only; Desk gift — Pen only');
  assert.equal(app.document.activeElement, app.q('[data-offers-close]'));
  app.click('[data-offers-close]');
  assert.equal(app.document.activeElement, app.q('[data-offers-open]'));
  const session = app.storage;
  app.click('[data-offers-open]'); await flush();
  assert.equal(app.q('[data-offers-dialog]').open, true, 'manual reopening after close');
  app.choose(app.q('[data-offers-list] [data-gift-offer]'));
  app.choose(app.q('[data-offers-list]').querySelectorAll('[data-gift-offer]')[1]);
  const last = app.q('[data-offers-add]'); last.focus();
  last.dispatchEvent(new app.dom.window.KeyboardEvent('keydown', {key: 'Tab', bubbles: true, cancelable: true}));
  assert.equal(app.document.activeElement, app.q('[data-offers-close]'));
  let posts = 0;
  app.respond((url, options) => {
    if (options.method === 'POST') { posts++; return response({items: [{id: 201, quantity: 1}, {id: 301, quantity: 1}]}); }
    return response(url.includes('sections=') ? {'cart-gift-offers': section} : ctx.cart);
  });
  app.submit('[data-cart-offers-form]'); app.submit('[data-cart-offers-form]'); await flush();
  assert.equal(posts, 1);
  assert.deepEqual(JSON.parse(app.calls.find(call => call.options.method === 'POST').options.body).items,
    [{id: '201', quantity: 1, properties: {_elma_gift_offer: 'true'}}, {id: '301', quantity: 1, properties: {_elma_gift_offer: 'true'}}]);
  assert.deepEqual(app.navigations, ['/fr/cart']);
  app.dispose();
  app = harness(await cartMarkup(ctx), {storage: session}); await app.boot(); await app.tick(5000);
  assert.equal(app.calls.length, 0, 'refresh does not auto-open again in the tab session'); app.dispose();

  // Empty carts, absent offers, and an already purchased add-on.
  for (const scenario of ['empty', 'disabled', 'already-added']) {
    const fixture = fixtures();
    if (scenario === 'empty') fixture.cart = {items: [], item_count: 0, total_price: 0};
    if (scenario === 'disabled') fixture.product.metafields.custom.gift_offers = field([]);
    if (scenario === 'already-added') { fixture.product.metafields.custom.gift_offers = field([fixture.offer]); fixture.cart.items.push({variant: fixture.addon, product: fixture.addonProduct, quantity: 1, key: '201:box'}); }
    app = harness(await cartMarkup(fixture)); await app.boot(); await app.tick(5000);
    assert.equal(app.q('[data-offers-open]').hidden, true, scenario); assert.equal(app.calls.length, 0); app.dispose();
  }
  app = harness(await cartMarkup(ctx), {storageBlocked: true}); await app.boot(); await app.tick(5000);
  assert.equal(app.calls.length, 0, 'blocked storage suppresses automatic opening');
  app.respond(() => response({'cart-gift-offers': section})); app.click('[data-offers-open]'); await flush();
  assert.equal(app.q('[data-offers-dialog]').open, true); app.dispose();

  // Fresh cart check, dirty quantities, null sections and changed prices.
  app = harness(await cartMarkup(ctx)); await app.boot();
  app.q('[data-cart-quantity]').value = '4'; app.click('[data-offers-open]'); await flush();
  assert.equal(app.calls.length, 0); assert.match(app.q('[data-offers-status]').textContent, /Update your cart/);
  app.q('[data-cart-quantity]').value = '1';
  app.respond(() => response({'cart-gift-offers': null})); app.click('[data-offers-open]'); await flush();
  assert.equal(app.q('[data-offers-dialog]').open, false); assert.equal(app.storage.size, 0);
  app.respond(() => response({'cart-gift-offers': section})); app.click('[data-offers-open]'); await flush();
  app.choose(app.q('[data-offers-list] [data-gift-offer]'));
  ctx.addon.price = 600;
  const changedPrice = await snippet('cart-gift-offers', ctx);
  app.respond(() => response({'cart-gift-offers': changedPrice})); app.submit('[data-cart-offers-form]'); await flush();
  assert.equal(app.calls.filter(call => call.options.method === 'POST').length, 0);
  assert.match(app.q('[data-add-error-text]').textContent, /changed/); app.dispose();
  app = harness(await cartMarkup(ctx)); await app.boot();
  ctx.cart.items[0].quantity = 9;
  const changedCart = await snippet('cart-gift-offers', ctx);
  app.respond(() => response({'cart-gift-offers': changedCart})); app.click('[data-offers-open]'); await flush();
  assert.deepEqual(app.navigations, ['/fr/cart']); assert.equal(app.q('[data-offers-dialog]').open, false); app.dispose();

  // Failed/partial mutations never display success or retry automatically.
  for (const failure of ['422', '403', 'network', 'malformed', 'partial', 'timeout']) {
    const fixture = fixtures();
    app = harness(await productMarkup(fixture), {product: true}); await app.boot();
    app.q('[data-engraving-text]').value = 'Anna'; app.choose(app.q('[data-gift-offer]'));
    app.respond((url, options) => {
      if (failure === 'network') throw new Error('Network failed');
      if (failure === 'timeout') return new Promise((resolve, reject) => options.signal.addEventListener('abort', () => { const error = new Error('Timeout'); error.name = 'AbortError'; reject(error); }));
      if (failure === 'malformed') return response({});
      if (failure === 'partial') return response({items: [{id: 101, quantity: 1}]});
      return {ok: false, status: Number(failure), json: async () => ({description: 'Inventory changed'})};
    });
    app.submit('.product-purchase'); await flush();
    if (failure === 'timeout') await app.tick(20000);
    assert.equal(app.q('[data-add-message]').hidden, false, failure);
    assert.equal(app.navigations.length, 0); assert.equal(app.window.elmaCart.isLocked(), true);
    app.submit('.product-purchase'); assert.equal(app.calls.length, 1); app.dispose();
  }
  console.log('PASS: offer eligibility, packaging, personalization exclusion, real-variant prices, opt-in choices, multi-add payload/properties, shared duplicate lock, independent product quantity tiers, cart deduplication/context, fresh reads, session suppression, focus cycling, dirty cart/price changes, and failed/partial request handling.');
  console.log('Offline fixtures only. Browser accessibility/layout, Shopify selling/discount behavior and checkout are not verified.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
