// Local fixtures only: no real carts, messages, orders or payments are created.
// NODE_PATH=<test-dependencies>/node_modules node scripts/verify-commerce.cjs
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {Liquid} = require('liquidjs');
const {chromium} = require('playwright-core');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const schema = type => JSON.parse(read('sections/' + type + '.liquid').match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const defaults = specs => Object.fromEntries((specs || []).filter(s => s.id).map(s => [s.id, s.default ?? '']));
const engine = new Liquid({root: path.join(root, 'snippets'), extname: '.liquid'});
engine.registerFilter('money', value => '$' + (Number(value || 0) / 100).toFixed(2));
engine.registerFilter('image_url', (photo, ...args) => photo.url + '?width=' + Object.fromEntries(args).width);
engine.registerFilter('placeholder_svg_tag', () => '<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" fill="#ddd"/></svg>');
engine.registerFilter('default_errors', () => '<p>Please check the form.</p>');
const photo = id => ({id, url: 'https://fixture.test/images/' + id + '.svg', width: 1200, height: 1200, alt: 'Pen photo ' + id});
const images = [photo('black'), photo('gold'), photo('detail')];
const variants = [
  {id: 101, title: 'Black / Gift case', available: true, inventory_management: 'shopify', inventory_quantity: 12, inventory_policy: 'deny', price: 1999, compare_at_price: null, featured_image: images[0], quantity_rule: {min: 1, increment: 1}},
  {id: 102, title: 'Gold / Gift case', available: true, inventory_management: 'shopify', inventory_quantity: 2, inventory_policy: 'deny', price: 2999, compare_at_price: 3499, featured_image: images[1], quantity_rule: {min: 2, increment: 2, max: 10}},
  {id: 103, title: 'Silver / Gift case', available: false, inventory_management: 'shopify', inventory_quantity: 0, inventory_policy: 'deny', price: 2499, compare_at_price: null, quantity_rule: {min: 1, increment: 1}}
];
const product = {
  id: 1, title: 'Executive pen & case', type: 'Pens', url: '/products/executive-pen', price: 1999, price_min: 1999, price_varies: true,
  available: true, has_only_default_variant: false, requires_selling_plan: false, description: '<p>A pen with a presentation case.</p>',
  images, featured_image: images[0], variants, selected_or_first_available_variant: variants[0],
  metafields: {custom: {
    short_description: {value: 'A personal gift for your team.'}, material: {value: 'Metal'}, dimensions: {value: '140 mm'},
    engraving_details: {value: 'Text engraving; logos quoted separately.'}, packaging: {value: 'Presentation case'},
    personalization_enabled: {value: true}, personalization_note: {value: 'Text engraving is included in the listed price.'}
  }}
};
const other = {...product, id: 2, title: 'Desk gift', url: '/products/desk-gift'};
const collection = {
  title: 'Product Catalog', handle: 'all', url: '/collections/all', description: '', products_count: 2, products: [product, other],
  default_sort_by: 'manual', sort_options: [{name: 'Featured', value: 'manual'}, {name: 'Price, low to high', value: 'price-ascending'}],
  filters: [
    {type: 'list', label: 'Material', active_values: [], values: [{param_name: 'filter.p.m.custom.material', value: 'Metal', label: 'Metal', count: 2, active: false}, {param_name: 'filter.p.m.custom.material', value: 'Wood', label: 'Wood', count: 0, active: false}]},
    {type: 'boolean', label: 'Availability', active_values: [], values: [{param_name: 'filter.v.availability', value: '1', label: 'In stock', count: 2, active: false}]},
    {type: 'price_range', label: 'Price', range_max: 3499, active_values: [], min_value: {param_name: 'filter.v.price.gte', value: null}, max_value: {param_name: 'filter.v.price.lte', value: null}}
  ]
};
product.collections = [{title: 'Pens', url: '/collections/pens', products: [product, other]}];
other.collections = [];
const routes = {root_url: '/', all_products_collection_url: '/collections/all', cart_url: '/cart'};
const cartItem = {key: '101:fixture', product, variant: variants[0], image: images[0], url: product.url + '?variant=101', quantity: 1, properties: [['Engraving text', 'Anna']], original_line_price: 1999, final_line_price: 1999, url_to_remove: '/cart/change?id=101%3Afixture&quantity=0', line_level_discount_allocations: []};
const ctx = {product, collection, routes, settings: {show_catalog_prices: false}, cart: {item_count: 1, total_price: 1999, items: [cartItem], currency: {iso_code: 'USD'}}, shop: {name: 'Elma Vada', url: 'https://fixture.test', currency: 'USD'}, request: {design_mode: false}, form: {}, customer: {}, paginate: {pages: 2, current_page: 1, next: {url: '/collections/all?page=2'}}};
function source(name) {
  return read(name).replace(/{% schema %}[\s\S]*?{% endschema %}/g, '')
    .replace(/{%[-\s]*paginate[^%]*%}/g, '').replace(/{%[-\s]*endpaginate\s*[-]?%}/g, '')
    .replace(/{% form 'product'[^%]*%}/g, '<form method="post" action="/cart/add" id="{{ product_form_id }}" class="product-purchase">')
    .replace(/{% form 'contact'[^%]*%}/g, '<form method="post" action="/contact" id="{{ quote_form_id }}" class="product-quote__form">')
    .replace(/{% endform %}/g, '</form>');
}
async function renderSection(type, context = ctx, customSettings = {}) {
  const spec = schema(type);
  const template = type === 'product-details' ? JSON.parse(read('templates/product.json')).sections.main : {};
  const section = {id: type, settings: {...defaults(spec.settings), ...customSettings}, blocks: (template.block_order || []).map(id => {
    const block = template.blocks[id];
    const def = spec.blocks.find(b => b.type === block.type);
    return {id, type: block.type, settings: defaults(def.settings), shopify_attributes: 'data-block="' + id + '"'};
  })};
  return engine.parseAndRender(source('sections/' + type + '.liquid'), {...context, section});
}
async function renderProduct(context = ctx) { return await renderSection('product-details', context) + await renderSection('product-related', context); }
const css = ['base.css', 'theme.css', 'b2b-pages.css', 'revision.css', 'commerce.css'].map(name => '<link rel="stylesheet" href="/assets/' + name + '">').join('');
const documentHtml = (body, includeCommerce = true) => '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + (includeCommerce ? css : css.replace('<link rel="stylesheet" href="/assets/commerce.css">', '')) + '</head><body><main class="content-for-layout">' + body + '</main>' + (includeCommerce ? '<script defer src="/assets/commerce.js"></script>' : '') + '</body></html>';
async function main() {
  // Shopify's upload validator is stricter than the local JSON/Theme Check.
  // https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#url
  const specs = fs.readdirSync(path.join(root, 'sections')).filter(file => file.endsWith('.liquid')).map(file => ({label: file, spec: schema(file.slice(0, -7))}));
  specs.push(...JSON.parse(read('config/settings_schema.json')).map((spec, index) => ({label: 'settings_schema/' + index, spec})));
  for (const {label, spec} of specs) {
    const definitions = [...(spec.settings || []), ...(spec.blocks || []).flatMap(block => block.settings || [])];
    for (const setting of definitions) {
      if (setting.type === 'url' && Object.hasOwn(setting, 'default')) {
        assert(['/collections', '/collections/all'].includes(setting.default), label + '/' + setting.id + ': unsupported URL schema default');
      }
    }
  }
  // Schema/template compatibility, including resource template migrations.
  for (const file of fs.readdirSync(path.join(root, 'templates')).filter(f => f.endsWith('.json'))) {
    assert(!fs.existsSync(path.join(root, 'templates', file.replace('.json', '.liquid'))), 'Conflicting template ' + file);
    const data = JSON.parse(read('templates/' + file));
    assert.equal(new Set(data.order).size, data.order.length);
    for (const section of Object.values(data.sections)) {
      const spec = schema(section.type);
      for (const id of Object.keys(section.settings || {})) assert(spec.settings.some(s => s.id === id), file + ': unknown setting ' + id);
    }
  }
  const productHtml = await renderProduct();
  assert.equal((productHtml.match(/<h1[ >]/g) || []).length, 1);
  const relatedHtml = await renderSection('product-related');
  assert(!relatedHtml.includes('/products/executive-pen'), 'Related section must exclude the current product');
  assert(relatedHtml.includes('Desk gift'));
  const minimalProduct = {...product, images: [], featured_image: null, variants: [{...variants[0], featured_image: null}], selected_or_first_available_variant: {...variants[0], featured_image: null}, metafields: {custom: {}}, collections: []};
  const minimalHtml = await renderProduct({...ctx, product: minimalProduct});
  assert(!minimalHtml.includes('name="properties[Engraving text]"'));
  assert(!minimalHtml.includes('data-block="specifications"'));
  assert(!minimalHtml.includes('product-related'));
  const emptyCatalogHtml = await renderSection('catalog', {...ctx, collection: {...collection, products: [], products_count: 0}});
  assert(emptyCatalogHtml.includes('Products are coming soon'));
  assert(emptyCatalogHtml.includes('href="/pages/request-a-quote" class="btn btn--primary">Request a Quote'), 'Empty catalog must retain its default quote link');
  const activeFilters = collection.filters.map(f => ({...f, values: f.values?.map(v => ({...v}))}));
  activeFilters[0].values[0].active = true;
  activeFilters[0].values[0].url_to_remove = '/collections/all';
  activeFilters[0].active_values = [activeFilters[0].values[0]];
  const activeCtx = {...ctx, collection: {...collection, filters: activeFilters}};
  assert((await renderSection('catalog', {...activeCtx, collection: {...activeCtx.collection, products: [], products_count: 0}})).includes('No matching products'));
  assert((await renderSection('catalog', activeCtx, {show_filters: false})).includes('type="hidden" name="filter.p.m.custom.material" value="Metal"'));
  const cartHtml = await engine.parseAndRender(source('templates/cart.liquid'), ctx);
  assert(cartHtml.includes('Engraving text: Anna'));
  assert((await engine.parseAndRender(source('templates/cart.liquid'), {...ctx, cart: {item_count: 0}})).includes('Your cart is empty'));
  const penCollection = {...collection, id: 11, title: 'Pens', handle: 'pens', url: '/collections/pens', description: '<p>Collection description.</p>'};
  const chopstickCollection = {id: 12, handle: 'chopsticks', url: '/collections/chopsticks'};
  const categoryMenu = {links: [
    {title: 'Executive pens', type: 'collection_link', url: '/collections/pens?page=9&filter.v.availability=0', object: penCollection},
    {title: 'Chopsticks', type: 'collection_link', url: '/collections/chopsticks', object: chopstickCollection},
    {title: 'Deleted collection', type: 'collection_link', url: '/collections/deleted', object: null},
    {title: 'Not a category', type: 'page_link', url: '/pages/about'},
    {title: 'Unsafe URL', type: 'http_link', url: 'javascript:alert(1)'},
    {title: 'Duplicate all', type: 'collection_link', url: '/collections/all', object: collection}
  ]};
  const catalogHtml = await renderSection('catalog', ctx, {category_menu: categoryMenu});
  assert((await renderSection('catalog', {...ctx, collection: {...collection, title: 'Products'}}, {fallback_title: 'Product Catalog'})).includes('<h1>Product Catalog</h1>'));
  assert((await renderSection('catalog', ctx, {fallback_title: 'Corporate Gift Catalog', introduction: '<p>Editable intro.</p>'})).includes('<h1>Corporate Gift Catalog</h1>'));
  assert((await renderSection('catalog')).includes('>All products</a>'), 'All products must work without a menu');
  assert(catalogHtml.includes('href="/collections/pens"'), 'Category link must drop filters and page parameters');
  for (const absent of ['Deleted collection', 'Not a category', 'Unsafe URL', 'Duplicate all', '?page=9']) assert(!catalogHtml.includes(absent));
  const sharedSettings = {show_catalog_prices: false, catalog_category_menu: categoryMenu};
  const categoryHtml = await renderSection('catalog', {...ctx, settings: sharedSettings, collection: penCollection});
  assert(categoryHtml.includes('href="/collections/pens" aria-current="page"'));
  assert(categoryHtml.includes('href="/collections/all" >All products</a>'));
  assert(categoryHtml.includes('<h1>Pens</h1>'));
  assert(categoryHtml.includes('Collection description.'));
  assert((await renderSection('catalog', {...ctx, collection: penCollection}, {use_collection_description: false, introduction: '<p>Editable intro.</p>'})).includes('Editable intro.'));
  const renamedMenu = {links: [{...categoryMenu.links[1], title: 'Dining gifts'}, categoryMenu.links[0]]};
  const renamedHtml = await renderSection('catalog', ctx, {category_menu: renamedMenu});
  assert(renamedHtml.indexOf('>Dining gifts</a>') < renamedHtml.indexOf('>Executive pens</a>'), 'Menu rename/order must be reflected');
  const longCategoryHtml = await renderSection('catalog', ctx, {category_menu: {links: [{...categoryMenu.links[0], title: 'A very long approved category name for corporate gifts and personalized presentation sets'}]}});
  const nextPageUrl = '/collections/pens?filter.v.availability=1&sort_by=price-ascending&page=2';
  const filteredCategoryHtml = await renderSection('catalog', {...activeCtx,
    collection: {...penCollection, filters: activeFilters, products_count: 1, products: [product]},
    paginate: {...ctx.paginate, next: {url: nextPageUrl}}
  });
  assert(filteredCategoryHtml.includes('1 product ·'), 'Filtered count, not unfiltered or page count');
  assert(filteredCategoryHtml.includes(nextPageUrl), 'Shopify pagination URL must preserve active filters/sorting');
  const pricedCtx = {...ctx, settings: {...sharedSettings, show_catalog_prices: true}};
  const pricedCatalogHtml = await renderSection('catalog', pricedCtx);
  assert(pricedCatalogHtml.includes('From $19.99'));
  for (const type of ['featured-products', 'product-related']) {
    assert((await renderSection(type, pricedCtx, {collection, products_to_show: 4})).includes('catalog-card__price'), 'Shared price toggle: ' + type);
  }
  const renderCard = (card_product, show_price = true, options = {}) => engine.parseAndRender(source('snippets/catalog-product-card.liquid'), {card_product, card_index: 1, show_price, ...options});
  const shortProduct = {...product, title: 'Long product title – with many characteristics, SEO unchanged', metafields: {custom: {catalog_title: {value: 'Pen & Gift Set'}}}};
  const shortHtml = await renderCard(shortProduct);
  assert(shortHtml.includes('>Pen &amp; Gift Set</a></h3>'));
  assert(!shortHtml.includes('Long product title'));
  assert((await renderCard({...product, metafields: {custom: {catalog_title: {value: '   '}}}})).includes('>Executive pen &amp; case</a></h3>'), 'Empty short title must fall back');
  assert(!shortHtml.includes('b2b-eyebrow'), 'Product type must not duplicate the short title');
  const singlePriceHtml = await renderCard({...product, price_varies: false});
  assert(singlePriceHtml.includes('class="catalog-card__price">$19.99</p>'));
  for (const price_min of [null, undefined, -1]) assert(!(await renderCard({...product, price_min})).includes('catalog-card__price'), 'Missing/invalid price');
  assert((await renderCard({...product, price_min: 0, price_varies: false})).includes('$0.00'), 'Real zero price must not disappear');
  const featuredHtml = await renderSection('featured-products', ctx, {collection, products_to_show: 4});
  for (const html of [catalogHtml, relatedHtml, featuredHtml]) {
    assert(html.includes('class="b2b-card catalog-card"'), 'Product cards must share the site card component');
    assert(html.includes('class="b2b-card__body catalog-card__body"'));
    assert(html.includes('class="b2b-link catalog-card__action"'));
    assert(html.includes('<h3><a href="/products/'));
    assert(!html.includes('catalog-card__price'), 'Card prices must remain hidden until enabled');
    assert(html.includes('catalog-card__stock'), 'Card availability must be visible even when prices are hidden');
    assert(html.includes('Some options available'));
  }
  const soldOutCardHtml = await engine.parseAndRender(source('snippets/catalog-product-card.liquid'), {card_product: {...product, available: false}, card_index: 1});
  assert(soldOutCardHtml.includes('Out of stock'));
  assert(soldOutCardHtml.includes('catalog-card__action'), 'Unavailable products must remain openable for quote requests');
  assert(!soldOutCardHtml.includes('catalog-card__price'));
  assert(catalogHtml.includes('href="/pages/request-a-quote" class="btn btn--primary">Request a Bulk Quote'), 'Bulk quote fallback must remain');
  const customLinkHtml = await renderSection('catalog', {...ctx, collection: {...collection, products: [], products_count: 0}}, {empty_button_link: '/pages/custom-quote', bulk_link: '/pages/custom-bulk'});
  assert(customLinkHtml.includes('href="/pages/custom-quote"'));
  assert(customLinkHtml.includes('href="/pages/custom-bulk"'));
  const singleProduct = variant => ({...product, available: variant.available, variants_count: 1, variants: [variant], selected_or_first_available_variant: variant});
  const stockCases = [
    ['Tracked stock', {...variants[0]}, 'In stock'],
    ['Low stock', {...variants[0], inventory_quantity: 3}, 'Low stock'],
    ['Unavailable', {...variants[0], available: false, inventory_quantity: 0}, 'Out of stock'],
    ['Backorder', {...variants[0], inventory_quantity: 0, inventory_policy: 'continue'}, 'Available to order'],
    ['Negative backorder', {...variants[0], inventory_quantity: -4, inventory_policy: 'continue'}, 'Available to order'],
    ['Untracked', {...variants[0], inventory_management: null, inventory_quantity: 999}, 'Available to order'],
    ['Unknown quantity', {...variants[0], inventory_quantity: null}, 'Available to order']
  ];
  for (const [name, variant, expected] of stockCases) {
    const card = await renderCard(singleProduct(variant), true, {show_inventory_quantity: true});
    assert(card.includes('>' + expected), name);
    const knownPositive = variant.available && variant.inventory_management && variant.inventory_quantity > 0;
    assert.equal(card.includes(' · ' + variant.inventory_quantity + ' available'), Boolean(knownPositive), name + ': quantity disclosure');
    const hiddenQuantity = await renderCard(singleProduct(variant));
    assert(!/·\s*-?\d+ available/.test(hiddenQuantity), name + ': quantity hidden by default');
  }
  assert((await renderCard(singleProduct({...variants[0], inventory_quantity: 3}), true, {low_stock_threshold: 2})).includes('>In stock'));
  assert((await renderCard(singleProduct({...variants[0], inventory_quantity: 1}), true, {low_stock_threshold: 0})).includes('>In stock'));
  assert((await renderCard({...product, variants: variants.slice(0, 2)}, true, {show_inventory_quantity: true})).includes('>In stock'));
  const mixedSupply = {...product, variants: [variants[0], {...variants[1], inventory_quantity: 0, inventory_policy: 'continue'}]};
  const mixedSupplyHtml = await renderCard(mixedSupply, true, {show_inventory_quantity: true});
  assert(mixedSupplyHtml.includes('>Available to order'));
  assert(!/·\s*\d+ available/.test(mixedSupplyHtml), 'Do not total incompatible variants');
  assert((await renderCard({...product, variants_count: 300, variants: variants.slice(0, 2)})).includes('Some options available'), 'Do not claim every option is available for truncated variant data');
  const inventoryProducts = stockCases.map(([name, variant], index) => ({...singleProduct(variant), id: 50 + index, title: name, url: '/products/fixture-' + index}));
  inventoryProducts.push({...product, title: 'A long product title which must stay readable without replacing its SEO title or removing characteristics', id: 99});
  const inventoryHtml = await renderSection('catalog', {...ctx, settings: {...sharedSettings, show_catalog_prices: true, show_inventory_quantity: true}, collection: {...collection, products: inventoryProducts, products_count: inventoryProducts.length}});
  if (process.argv.includes('--markup-only')) {
    console.log('PASS: URL schema defaults, JSON template compatibility, Liquid rendering, empty/custom quote links, product metafields, related products and cart markup.');
    return;
  }
  const browser = await chromium.launch({executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  const errors = [];
  try {
    async function createPage(width, html, url = '/products/executive-pen', includeCommerce = true) {
      const page = await browser.newPage({viewport: {width, height: 1000}});
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://fixture.test/**', route => {
        const pathname = new URL(route.request().url()).pathname;
        if (pathname.startsWith('/assets/')) return route.fulfill({contentType: pathname.endsWith('.css') ? 'text/css' : 'text/javascript', body: read(pathname.slice(1))});
        if (pathname.startsWith('/images/')) return route.fulfill({contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200"><rect width="1200" height="1200" fill="#efece6"/><rect x="420" y="200" width="120" height="800" rx="30" fill="#393939"/><rect x="660" y="250" width="180" height="700" fill="#c09858"/></svg>'});
        return route.fulfill({contentType: 'text/html', body: documentHtml(html, includeCommerce)});
      });
      await page.goto('https://fixture.test' + url);
      return page;
    }
    for (const width of [320, 390, 768, 1024, 1440]) {
      for (const [name, html] of [['product', productHtml], ['catalog', catalogHtml], ['priced-catalog', pricedCatalogHtml], ['inventory-catalog', inventoryHtml], ['category', categoryHtml], ['long-category', longCategoryHtml], ['featured', featuredHtml], ['cart', cartHtml], ['minimal-product', minimalHtml]]) {
        const page = await createPage(width, html, name === 'featured' ? '/' : '/products/executive-pen', name !== 'featured');
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), name + '/' + width + ' overflow');
        // revision.css clips viewport overflow: verify each visible commerce control as well.
        assert(await page.locator('.catalog-card, .catalog-categories a, .commerce-field, .catalog-sort, .product-gallery__stage').evaluateAll(nodes => nodes.every(node => {
          const box = node.getBoundingClientRect();
          return box.width === 0 || (box.left >= -1 && box.right <= innerWidth + 1);
        })), name + '/' + width + ' clipped content');
        if (name.includes('catalog') || name === 'category') assert.equal(await page.locator('.catalog__grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), width <= 480 ? 1 : width <= 640 ? 2 : width <= 990 ? 3 : 4);
        if (name === 'priced-catalog' || name === 'category') {
          assert(await page.locator('.catalog-card__body').evaluateAll(nodes => nodes.every(node => {
            const heading = node.querySelector('h3').getBoundingClientRect();
            const next = node.querySelector('.catalog-card__price, .catalog-card__stock').getBoundingClientRect();
            return next.top - heading.bottom < 20;
          })), 'Compact spacing: ' + name + '/' + width);
        }
        if (name.includes('catalog') || name === 'category') {
          assert(await page.locator('.catalog-card h3 a').evaluateAll(links => links.every(link => link.getBoundingClientRect().height <= Number.parseFloat(getComputedStyle(link).lineHeight) * 3 + 1 && link.getAttribute('title') === link.textContent)), 'Three visual lines with the full title retained: ' + name + '/' + width);
          assert(await page.locator('.catalog-card').evaluateAll(cards => {
            const rows = new Map();
            for (const card of cards) {
              const top = Math.round(card.getBoundingClientRect().top);
              const linkTop = card.querySelector('.catalog-card__action').getBoundingClientRect().top;
              if (rows.has(top) && Math.abs(rows.get(top) - linkTop) > 1) return false;
              rows.set(top, linkTop);
            }
            return true;
          }), 'Aligned action links: ' + name + '/' + width);
        }
        if (name === 'catalog' || name === 'featured') {
          const card = page.locator('.catalog-card').first();
          await card.hover();
          assert(await card.evaluate(el => {
            const style = getComputedStyle(el);
            const image = el.querySelector('.catalog-card__image').getBoundingClientRect();
            return style.transform === 'none' && style.boxShadow === 'none' && Math.abs(image.width / image.height - 4 / 3) < .02;
          }), name + '/' + width + ': shared card styling');
        }
        if ((width === 1440 || width === 390) && (name === 'product' || name === 'catalog' || name === 'priced-catalog' || name === 'inventory-catalog')) {
          fs.mkdirSync(path.join(root, 'output'), {recursive: true});
          await page.screenshot({path: path.join(root, 'output', 'hybrid-' + name + '-' + width + '.png'), fullPage: true});
        }
        await page.close();
      }
    }
    const page = await createPage(1440, productHtml);
    assert.equal((await page.locator('[data-variant-stock]').textContent()).trim(), 'In stock');
    await page.locator('[data-gallery-thumb="detail"]').click();
    assert(await page.locator('[data-gallery-image="detail"]').isVisible());
    await page.locator('[data-gallery-image="detail"]').click();
    assert(await page.locator('dialog').evaluate(el => el.open));
    await page.keyboard.press('Escape');
    assert(!(await page.locator('dialog').evaluate(el => el.open)));
    await page.locator('[data-variant-select]').selectOption('102');
    assert.equal((await page.locator('[data-variant-stock]').textContent()).trim(), 'Low stock');
    assert.equal(await page.locator('[data-variant-price]').textContent(), '$29.99');
    assert(await page.locator('[data-variant-compare]').isVisible());
    assert(await page.locator('[data-gallery-image="gold"]').isVisible());
    assert.equal(await page.locator('[data-product-quantity]').getAttribute('step'), '2');
    assert.equal(await page.locator('[data-product-quantity]').getAttribute('max'), '10');
    assert.equal(await page.locator('[data-quote-variant]').inputValue(), 'Gold / Gift case');
    assert.equal(new URL(page.url()).searchParams.get('variant'), '102');
    await page.locator('[data-product-quantity]').fill('6');
    await page.locator('[data-engraving-text]').fill('Anna');
    await page.locator('[data-bulk-link]').click();
    assert.equal(await page.locator('[data-quote-quantity]').inputValue(), '6');
    assert.equal(await page.locator('[data-quote-body]').inputValue(), 'Engraving text: Anna');
    const buyRequest = page.waitForRequest(request => request.url().endsWith('/cart/add') && request.method() === 'POST');
    await page.locator('[data-add-to-cart]').click();
    const purchase = new URLSearchParams((await buyRequest).postData());
    assert.equal(purchase.get('id'), '102');
    assert.equal(purchase.get('quantity'), '6');
    assert.equal(purchase.get('properties[Engraving text]'), 'Anna');
    assert.equal(purchase.get('return_to'), '/cart');
    await page.waitForLoadState();
    await page.locator('[data-variant-select]').selectOption('103');
    assert.equal((await page.locator('[data-variant-stock]').textContent()).trim(), 'Out of stock');
    assert(await page.locator('[data-add-to-cart]').isDisabled());
    assert(!(await page.locator('[data-variant-compare]').isVisible()));
    await page.locator('[data-variant-select]').selectOption('101');
    assert(await page.locator('[data-add-to-cart]').isEnabled());
    assert.equal(await page.locator('[data-product-quantity]').getAttribute('max'), null);
    await page.locator('[data-quote-quantity]').fill('100');
    await page.locator('[data-product-quantity]').fill('3');
    assert.equal(await page.locator('[data-quote-quantity]').inputValue(), '100', 'Do not overwrite an edited bulk quantity');
    await page.locator('input[name="contact[name]"]').fill('Test customer');
    await page.locator('input[name="contact[email]"]').fill('test@example.com');
    await page.locator('[data-quote-body]').fill('100 pens, company logo.');
    const contactRequest = page.waitForRequest(request => request.url().endsWith('/contact') && request.method() === 'POST');
    await page.locator('button', {hasText: 'Send quote request'}).click();
    const contact = new URLSearchParams((await contactRequest).postData());
    assert.equal(contact.get('contact[Product]'), product.title);
    assert.equal(contact.get('contact[Quantity]'), '100');
    assert.equal(contact.get('contact[Variant]'), 'Black / Gift case');
    assert.equal(new URL(contact.get('contact[Product URL]')).searchParams.get('variant'), '101');
    await page.close();
    const quantityProduct = await renderProduct({...ctx, settings: {show_inventory_quantity: true, low_stock_threshold: 5}});
    const quantityPage = await createPage(390, quantityProduct);
    assert.equal((await quantityPage.locator('[data-variant-stock]').textContent()).trim(), 'In stock · 12 available');
    await quantityPage.locator('[data-variant-select]').selectOption('102');
    assert.equal((await quantityPage.locator('[data-variant-stock]').textContent()).trim(), 'Low stock · 2 available');
    await quantityPage.close();
    for (const [, variant, expected] of stockCases.slice(2)) {
      const html = await renderProduct({...ctx, settings: {show_inventory_quantity: true}, product: singleProduct(variant)});
      const stockPage = await createPage(390, html);
      assert.equal((await stockPage.locator('[data-variant-stock]').textContent()).trim(), expected);
      await stockPage.close();
    }
    const catalogPage = await createPage(390, catalogHtml, '/collections/all');
    await catalogPage.locator('summary', {hasText: 'Filter products'}).click();
    assert(await catalogPage.locator('input[value="Wood"]').isDisabled());
    await catalogPage.locator('input[value="Metal"]').check();
    await catalogPage.locator('select[name="sort_by"]').selectOption('price-ascending');
    const filterRequest = catalogPage.waitForRequest(request => request.isNavigationRequest());
    await catalogPage.locator('button', {hasText: 'Apply filters'}).click();
    const filteredUrl = new URL((await filterRequest).url());
    assert.equal(filteredUrl.searchParams.get('filter.p.m.custom.material'), 'Metal');
    assert.equal(filteredUrl.searchParams.get('sort_by'), 'price-ascending');
    await catalogPage.close();
    const categoryPage = await createPage(390, categoryHtml, '/collections/pens?filter.v.availability=0&page=3');
    assert.equal(await categoryPage.locator('.catalog-tools').getAttribute('action'), '/collections/pens');
    const allRequest = categoryPage.waitForRequest(request => request.isNavigationRequest());
    await categoryPage.getByRole('link', {name: 'All products', exact: true}).click();
    const allUrl = new URL((await allRequest).url());
    assert.equal(allUrl.pathname, '/collections/all');
    assert.equal(allUrl.search, '');
    await categoryPage.close();
    const keyboardPage = await createPage(1440, pricedCatalogHtml, '/collections/all');
    await keyboardPage.getByRole('link', {name: 'Executive pens', exact: true}).focus();
    assert(await keyboardPage.locator('.catalog-categories a').nth(1).evaluate(el => getComputedStyle(el).outlineStyle !== 'none'), 'Visible category keyboard focus');
    const categoryRequest = keyboardPage.waitForRequest(request => request.isNavigationRequest());
    await keyboardPage.keyboard.press('Enter');
    assert.equal(new URL((await categoryRequest).url()).pathname, '/collections/pens');
    await keyboardPage.close();
    const cartPage = await createPage(390, cartHtml, '/cart');
    assert.equal(await cartPage.locator('button[name="checkout"]').getAttribute('type'), 'submit');
    assert.equal(await cartPage.locator('a.commerce-cart__remove').getAttribute('href'), cartItem.url_to_remove);
    await cartPage.locator('input[name="updates[]"]').fill('2');
    const cartRequest = cartPage.waitForRequest(request => request.url().endsWith('/cart') && request.method() === 'POST');
    await cartPage.locator('button[name="checkout"]').click();
    const cartPost = new URLSearchParams((await cartRequest).postData());
    assert.equal(cartPost.get('updates[]'), '2');
    assert(cartPost.has('checkout'));
    await cartPage.close();
    assert.deepEqual(errors, []);
  } finally { await browser.close(); }
  console.log('PASS: Liquid/schema/templates; collection menu add/rename/order/invalid links; short title/fallback; price toggle/minimum/single/missing/zero; filtered count/pagination; 320/390/768/1024/1440px layout and long categories; keyboard focus; gallery/variants; purchase/quote fields; filters/sorting; cart. Shopify services not exercised.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
