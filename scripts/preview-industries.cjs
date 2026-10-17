// Build a read-only local layout preview from the Shopify JSON template.
// This does not publish or change the store and does not render Shopify server data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const page = JSON.parse(fs.readFileSync(path.join(root, 'templates/page.industries.json'), 'utf8'));
const blocks = page.sections.examples;
const hero = page.sections.hero.settings;
const cta = page.sections.cta.settings;
const output = path.join(root, 'output/industries-local-preview.html');
const esc = value => String(value || '').replace(/[&<>"']/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
const css = ['base.css', 'theme.css', 'b2b-pages.css', 'revision.css'].map(name => `<link rel="stylesheet" href="../assets/${name}">`).join('\n');
const fontCss = fs.readFileSync(path.join(root, 'snippets/local-fonts.liquid'), 'utf8')
  .replace(/{% comment %}[\s\S]*?{% endcomment %}/g, '')
  .replace(/<\/?style>/g, '')
  .replace(/{{\s*'(font-\d+\.woff2)'\s*\|\s*asset_url\s*}}/g, '../assets/$1');

assert.equal(blocks.block_order.length, 8);
const cards = blocks.block_order.map(id => {
  const item = blocks.blocks[id].settings;
  const localPhoto = item.image_asset && fs.existsSync(path.join(root, 'assets', item.image_asset));
  const media = localPhoto ? `<figure class="b2b-media"><img src="../assets/${esc(item.image_asset)}" alt="${esc(item.image_alt)}" width="1200" height="900"></figure>` : `<div class="b2b-placeholder"><strong>Existing Shopify photo</strong><small>${esc(item.image_alt)}</small></div>`;
  return `<article class="b2b-card">${media}<div class="b2b-card__body"><h3>${esc(item.title)}</h3><div class="b2b-rte">${item.text}</div></div></article>`;
}).join('\n');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Industries We Serve · Local layout preview</title>${css}<style>${fontCss}</style></head>
<body class="page-page-industries"><header class="site-header"><div class="container"><div class="header__inner"><a class="header__logo" href="#"><span class="header__logo-badge">EV</span><span class="header__logo-text"><span class="header__logo-name">Elma Vada</span><span class="header__logo-sub">Studio</span></span></a><nav class="header__nav" aria-label="Main navigation"><a class="header__nav-link" href="#">Business Solutions</a><a class="header__nav-link" href="#">Production Capabilities</a><a class="header__nav-link" href="#">Industries</a><a class="header__nav-link" href="#">Our Work</a><a class="header__nav-link" href="#">About</a><a class="header__nav-link" href="#">Catalog</a></nav><div class="header__cta"><a class="btn btn--primary" href="/pages/request-a-quote">Request a Quote</a></div><button class="header__hamburger" aria-label="Open menu"><span></span><span></span><span></span></button></div></div></header><div style="height:72px" aria-hidden="true"></div><main id="MainContent" class="content-for-layout">
<section class="b2b-section ev-page-hero--compact b2b-section--cream"><div class="container b2b-split b2b-hero b2b-split--text-only"><div><p class="b2b-eyebrow">${esc(hero.eyebrow)}</p><h1>${esc(hero.heading)}</h1><div class="b2b-rte">${hero.text}</div></div></div></section>
<section class="b2b-section b2b-section--cream"><div class="container"><div class="b2b-header"><h2>${esc(blocks.settings.heading)}</h2></div><div class="b2b-grid" style="--b2b-columns:${blocks.settings.columns}">${cards}</div></div></section>
<section class="b2b-section b2b-section--navy"><div class="container"><div class="b2b-header"><h2>${esc(cta.heading)}</h2><div class="b2b-rte">${cta.text}</div></div><div class="b2b-grid" style="--b2b-columns:4"></div><div class="b2b-actions" style="justify-content:center"><a class="btn btn--primary" href="${esc(cta.button_link)}">${esc(cta.button_label)}</a></div></div></section></main></body></html>`;
fs.mkdirSync(path.dirname(output), {recursive: true});
fs.writeFileSync(output, html);
console.log(output);
