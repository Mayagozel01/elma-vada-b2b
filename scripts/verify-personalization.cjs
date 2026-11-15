// Local Liquid fixtures + jsdom only. No browser, HTTP, Shopify cart or order.
// NODE_PATH=<liquidjs-and-jsdom>/node_modules node scripts/verify-personalization.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {Liquid} = require('liquidjs');
const {JSDOM} = require('jsdom');

const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const readJson = file => JSON.parse(read(file).replace(/^\s*\/\*[\s\S]*?\*\/\s*/, ''));
const schema = file => JSON.parse(read(file).match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const engine = new Liquid({root: path.join(root, 'snippets'), extname: '.liquid'});
engine.registerFilter('money', value => '$' + (Number(value || 0) / 100).toFixed(2));
engine.registerFilter('placeholder_svg_tag', () => '<svg></svg>');
engine.registerFilter('default_errors', () => '<p>Please check the form.</p>');

// Adapt Shopify-only form/app tags. Business logic and the actual JS are unmodified.
const productSource = read('sections/product-details.liquid')
  .replace(/{% schema %}[\s\S]*?{% endschema %}/, '')
  .replace(/{% form 'product'[^%]*%}/g, '<form method="post" action="/cart/add" id="{{ product_form_id }}" class="product-purchase">')
  .replace(/{% endform %}/g, '</form>')
  .replace(/{% render block %}/g, '');
const template = readJson('templates/product.json').sections.main;
const defaults = Object.fromEntries(schema('sections/product-details.liquid').settings.filter(s => s.id).map(s => [s.id, s.default ?? '']));
const variants = [
  {id: 101, title: 'Black / Engraved', options: ['Black', 'Engraved'], available: true, price: 1999, quantity_rule: {min: 1, increment: 1}},
  {id: 102, title: 'Gold / Engraved', options: ['Gold', 'Engraved'], available: true, price: 2999, quantity_rule: {min: 2, increment: 2, max: 10}},
  {id: 103, title: 'Black / No engraving', options: ['Black', 'No engraving'], available: true, price: 1999, quantity_rule: {min: 1, increment: 1}},
  {id: 104, title: 'Gold / Plain finish', options: ['Gold', 'Plain finish'], available: true, price: 2999, quantity_rule: {min: 1, increment: 1}},
  {id: 105, title: 'Silver / Engraved', options: ['Silver', 'Engraved'], available: false, price: 2499, quantity_rule: {min: 1, increment: 1}}
];
const baseProduct = {id: 1, title: 'Test pen', type: 'Pens', url: '/products/test-pen', variants, images: [], collections: [], has_only_default_variant: false};
const routes = {cart_url: '/cart', all_products_collection_url: '/collections/all'};
async function renderProduct(fields = {}, selected = 0, settings = {}) {
  const custom = Object.fromEntries(Object.entries({personalization_enabled: true, ...fields}).map(([k, v]) => [k, {value: v}]));
  return engine.parseAndRender(productSource, {
    product: {...baseProduct, metafields: {custom}, selected_or_first_available_variant: variants[selected]},
    section: {id: 'main', settings: {...defaults, ...template.settings, ...settings}, blocks: []},
    routes, settings: {}, form: {}, cart: {item_count: 0}, shop: {url: 'https://fixture.test'}, request: {}
  });
}
function dom(html, javascript = false) {
  const instance = new JSDOM(html, {url: 'https://fixture.test/products/test-pen', runScripts: 'outside-only'});
  if (javascript) {
    instance.window.eval(read('assets/commerce.js'));
    instance.window.document.dispatchEvent(new instance.window.Event('DOMContentLoaded'));
  }
  return instance;
}
function controls(instance) {
  const w = instance.window;
  const q = selector => w.document.querySelector(selector);
  const form = q('.product-purchase');
  const input = q('[data-engraving-text]');
  return {
    w, q, form, input,
    data: () => new w.FormData(form),
    type: text => { input.value = text; input.dispatchEvent(new w.Event('input', {bubbles: true})); },
    variant: id => { const select = q('[data-variant-select]'); select.value = String(id); select.dispatchEvent(new w.Event('change', {bubbles: true})); },
    submit: () => form.dispatchEvent(new w.Event('submit', {bubbles: true, cancelable: true}))
  };
}

async function main() {
  // Parse every theme JSON and section schema, including product template settings.
  let jsonCount = 0;
  for (const directory of ['templates', 'config', 'locales']) {
    for (const file of fs.readdirSync(path.join(root, directory)).filter(f => f.endsWith('.json'))) {
      readJson(directory + '/' + file);
      jsonCount++;
    }
  }
  let schemas = 0;
  for (const file of fs.readdirSync(path.join(root, 'sections')).filter(f => f.endsWith('.liquid'))) {
    schema('sections/' + file);
    schemas++;
  }
  for (const key of Object.keys(template.settings)) assert(Object.hasOwn(defaults, key), 'Unknown product setting: ' + key);

  for (const value of [false, null]) {
    const instance = dom(await renderProduct({personalization_enabled: value}));
    assert.equal(instance.window.document.querySelector('[data-engraving-text]'), null);
    assert.equal(new instance.window.FormData(instance.window.document.querySelector('form')).get('id'), '101');
    instance.window.close();
  }
  assert(!(await renderProduct({}, 0, {enable_personalization: false})).includes('name="properties[Engraving text]"'));

  let instance = dom(await renderProduct());
  let c = controls(instance);
  assert(c.form.contains(c.input));
  assert.equal(c.input.labels[0].textContent, 'Engraving text');
  assert.equal(c.input.placeholder, 'Enter the name or text to engrave');
  assert(c.q('#ProductEngravingHelp-main').textContent.includes('Please check spelling and capitalization before adding to cart.'));
  for (const id of c.input.getAttribute('aria-describedby').split(' ')) assert(c.w.document.getElementById(id));
  assert(!c.input.required);
  assert(!c.input.hasAttribute('maxlength'), 'No catalog-wide default limit');
  assert(c.q('[data-variant-select]').disabled, 'Without JS, use variant links and the server-selected variant');
  assert.deepEqual(c.data().getAll('id'), ['101']);
  c.input.value = 'Anna & <Studio> "A"';
  assert.equal(c.data().get('properties[Engraving text]'), c.input.value, 'Native form includes the exact text');
  assert(c.input.compareDocumentPosition(c.q('[data-add-to-cart]')) & c.w.Node.DOCUMENT_POSITION_FOLLOWING);
  instance.window.close();

  // JavaScript must preserve form serialization, other properties, draft and quantity rules.
  instance = dom(await renderProduct({personalization_required: true, personalization_max_length: 12}), true);
  c = controls(instance);
  const extra = c.w.document.createElement('input');
  extra.name = 'properties[Gift note]'; extra.value = 'Keep this property'; c.form.append(extra);
  assert.equal(c.form.method, 'post');
  assert.equal(new URL(c.form.action).pathname, '/cart/add');
  assert(!c.q('[data-variant-select]').disabled);
  assert.deepEqual(c.data().getAll('id'), ['101']);
  assert(c.q('[data-engraving-error]').hidden, 'No error before interaction');
  assert(!c.form.checkValidity());
  assert(c.q('[data-engraving-error]').textContent.includes('Please enter'));
  c.type('   '); assert(!c.form.checkValidity(), 'Required text cannot be whitespace only');
  c.type('Long engraving text');
  assert.equal(c.input.value, 'Long engraving text', 'Never truncate pasted names');
  assert(!c.submit());
  assert.equal(c.input.getAttribute('aria-invalid'), 'true');
  assert(c.q('[data-engraving-error]').textContent.includes('12 characters or fewer'));
  c.type('  Anna & Co ');
  assert(c.submit(), 'Valid native submission is not intercepted');
  assert(c.form.checkValidity());
  assert.equal(c.input.getAttribute('aria-invalid'), null);
  c.q('[data-product-quantity]').value = '3';
  c.variant(102);
  assert.equal(c.data().get('id'), '102');
  assert.equal(c.data().get('quantity'), '4', 'Keep existing variant quantity increment behavior');
  assert.equal(c.data().get('properties[Engraving text]'), '  Anna & Co ');
  assert.equal(c.data().get('properties[Gift note]'), extra.value);
  c.variant(103);
  assert(!c.input.required && c.input.disabled && c.q('[data-personalization]').hidden);
  assert.equal(c.data().get('properties[Engraving text]'), null);
  assert(c.form.checkValidity() && c.submit(), 'No engraving must never be blocked by required text');
  assert.equal(c.data().get('properties[Gift note]'), extra.value);
  c.variant(101);
  assert.equal(c.input.value, '  Anna & Co ');
  assert(c.input.required && !c.input.disabled);
  c.variant(105); assert(c.q('[data-add-to-cart]').disabled, 'Sold-out behavior retained');
  c.variant(101); assert(!c.q('[data-add-to-cart]').disabled);
  c.w.history.replaceState({}, '', '?variant=103');
  c.w.dispatchEvent(new c.w.PopStateEvent('popstate'));
  assert(c.input.disabled);
  c.w.history.replaceState({}, '', '?variant=102');
  c.w.dispatchEvent(new c.w.PopStateEvent('popstate'));
  assert.equal(c.data().get('properties[Engraving text]'), '  Anna & Co ');
  c.w.dispatchEvent(new c.w.Event('pageshow'));
  assert.equal(c.input.value, '  Anna & Co ');
  c.type('This draft exceeds the limit');
  c.variant(103);
  assert(c.form.checkValidity() && c.submit(), 'Opt-out also bypasses a previously invalid draft');
  assert.equal(c.data().get('properties[Engraving text]'), null);
  c.variant(101);
  assert.equal(c.input.value, 'This draft exceeds the limit');
  assert(!c.form.checkValidity(), 'The original limit applies again when engraving is restored');
  c.type(''); c.variant(103);
  assert(c.form.checkValidity() && c.submit(), 'Required engraving must not block opt-out with empty text');
  instance.window.close();

  instance = dom(await renderProduct({personalization_required: true, personalization_max_length: 12, personalization_note: '<b>Note & terms</b>'}));
  c = controls(instance);
  assert(c.input.required && c.input.getAttribute('maxlength') === '12', 'Native constraints remain without JS');
  assert(!c.form.checkValidity());
  assert.equal(c.q('#ProductEngravingNote-main').textContent, '<b>Note & terms</b>');
  assert.equal(c.q('#ProductEngravingNote-main b'), null);
  instance.window.close();

  // Server rendering also handles opt-out on direct variant URLs without JavaScript.
  instance = dom(await renderProduct({personalization_required: true, personalization_max_length: 12}, 2));
  c = controls(instance);
  assert(c.input.disabled && !c.input.required && c.q('[data-personalization]').hidden);
  assert.deepEqual(c.data().getAll('id'), ['103']);
  assert.equal(c.data().get('properties[Engraving text]'), null);
  assert(c.form.checkValidity());
  instance.window.close();

  instance = dom(await renderProduct({personalization_no_engraving_values: ['  PLAIN FINISH  ']}, 3), true);
  c = controls(instance); assert(c.input.disabled); c.variant(101); assert(!c.input.disabled);
  instance.window.close();
  instance = dom(await renderProduct({}, 3), true);
  assert(!controls(instance).input.disabled, 'Do not infer that Plain finish means no engraving');
  instance.window.close();
  for (const option of ['No engraving', 'Without engraving', 'UNENGRAVED', 'Без гравировки']) {
    assert.equal(await engine.renderFile('engraving-disabled', {engraving_variant: {options: ['Black', option]}, engraving_product: {}}), 'true');
  }
  for (const option of ['None', 'Engraving', 'No engraving on box, engraved pen']) {
    assert.equal(await engine.renderFile('engraving-disabled', {engraving_variant: {options: [option]}, engraving_product: {}}), 'false');
  }
  for (const maximum of [0, null]) {
    instance = dom(await renderProduct({personalization_max_length: maximum}), true);
    c = controls(instance); c.type('A'.repeat(500)); assert(c.form.checkValidity());
    instance.window.close();
  }
  instance = dom(await renderProduct({personalization_max_length: 5}), true);
  c = controls(instance); c.type('12345'); assert(c.form.checkValidity());
  c.type('123456'); assert(!c.form.checkValidity()); c.type(''); assert(c.form.checkValidity());
  instance.window.close();

  // Two fixture lines intentionally share the variant ID, with distinct property sets.
  // Shopify's actual line splitting is a server behavior, not simulated as a passed test.
  const line = (key, text, quantity) => ({
    key, product: baseProduct, variant: variants[0], url: '/products/test-pen?variant=101', quantity,
    properties: [['Engraving text', text], ['Other <property>', 'Keep & preserve'], ['_private', 'Hidden'], ['Empty', '']],
    url_to_remove: '/cart/change?id=' + encodeURIComponent(key) + '&quantity=0',
    original_line_price: 1999 * quantity, final_line_price: 1999 * quantity
  });
  const malicious = '<img src=x onerror="alert(1)"> & ' + 'A'.repeat(500);
  const lines = [line('101:anna', malicious, 2), line('101:bob', 'Bob', 1)];
  const renderCart = items => engine.parseAndRender(read('templates/cart.liquid'), {routes, cart: {items, item_count: items.reduce((n, i) => n + i.quantity, 0), total_price: 5997}});
  instance = dom(await renderCart(lines));
  let articles = [...instance.window.document.querySelectorAll('.commerce-cart__item')];
  assert.equal(articles.length, 2);
  assert.equal(articles[0].querySelector('.commerce-cart__property').textContent, 'Engraving text: ' + malicious);
  assert.equal(articles[0].querySelectorAll('img').length, 0, 'Customer HTML is escaped');
  assert(articles[0].textContent.includes('Other <property>: Keep & preserve'));
  assert(!articles[0].textContent.includes('_private') && !articles[0].textContent.includes('Empty:'));
  assert(articles[0].textContent.includes('all 2 units'));
  assert(!articles[1].textContent.includes('all 1 units'));
  const removeIds = articles.map(a => new URL(a.querySelector('.commerce-cart__remove').href).searchParams.get('id'));
  assert.deepEqual(removeIds, ['101:anna', '101:bob']);
  articles[0].querySelector('input').value = '3';
  articles[1].querySelector('input').value = '0';
  const updates = new instance.window.FormData(instance.window.document.querySelector('form'));
  assert.deepEqual(updates.getAll('updates[]'), ['3', '0'], 'Native update quantities follow cart line order, not variant ID');
  assert(![...updates.keys()].some(k => k.startsWith('properties')), 'Updates do not overwrite properties');
  instance.window.close();
  instance = dom(await renderCart([{...lines[0], quantity: 3}]));
  assert(instance.window.document.querySelector('.commerce-cart__property').textContent.includes(malicious));
  assert(instance.window.document.body.textContent.includes('all 3 units'));
  instance.window.close();

  console.log(`PASS: ${jsonCount} JSON files, ${schemas} section schemas; Liquid rendering; native form serialization; required/optional/per-product limits; opt-out and draft retention; variant/quantity rules; escaped separate cart lines, update/remove markup and property preservation.`);
  console.log('No browser or Shopify requests made. Real cart merging, mobile layout and order persistence still require preview testing.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
