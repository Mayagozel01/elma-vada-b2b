// Local release smoke tests. Shopify media/app/form services are NOT emulated.
// NODE_PATH=<LiquidJS dependency directory>:<Playwright directory> node scripts/verify-release.cjs
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const { Liquid } = require('liquidjs');
const { chromium } = require('playwright-core');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const defaults = defs => Object.fromEntries((defs || []).filter(d => d.id).map(d => [d.id, d.default ?? '']));
const schema = type => JSON.parse(read(`sections/${type}.liquid`).match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const photo = name => ({url:`https://fixture.test/images/${encodeURIComponent(name)}.svg`,width:1200,height:900,alt:'Fixture photo',presentation:{focal_point:'50% 50%'}});
function media(value) {
  if (typeof value === 'string' && value.startsWith('shopify://shop_images/')) return photo(value);
  if (typeof value === 'string' && value.startsWith('shopify://files/videos/')) return {preview_image:photo(value)};
  if (Array.isArray(value)) return value.map(media);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,media(v)]));
  return value;
}
const engine = new Liquid({root:path.join(root,'snippets'),extname:'.liquid',strictFilters:false});
engine.registerFilter('json', JSON.stringify);
engine.registerFilter('asset_url', name => `https://fixture.test/assets/${name}`);
engine.registerFilter('image_url', (image,...args) => `${image.url}?width=${Object.fromEntries(args).width || 1200}`);
engine.registerFilter('image_tag', (url,...args) => {
  const opts=Object.fromEntries(args);
  return `<img src="${escape(url)}" width="1200" height="900" class="${escape(opts.class)}" alt="${escape(opts.alt)}" loading="${escape(opts.loading || 'lazy')}" fetchpriority="${escape(opts.fetchpriority || 'auto')}">`;
});
engine.registerFilter('video_tag', (video,...args) => {
  const opts=Object.fromEntries(args);
  return `<video class="${escape(opts.class)}" poster="${escape(opts.poster)}" controls muted playsinline preload="none"${opts.loop ? ' loop' : ''}${opts.autoplay ? ' autoplay' : ''}><img src="${escape(video.preview_image.url)}" alt="Video fallback"></video>`;
});
engine.registerFilter('placeholder_svg_tag', () => '<svg aria-hidden="true"></svg>');
engine.registerFilter('default_errors', () => '<p>Fixture form error</p>');
const globalDefaults=Object.assign({},...JSON.parse(read('config/settings_schema.json')).map(s => defaults(s.settings)));
const context={settings:media({...globalDefaults,...JSON.parse(read('config/settings_data.json')).current}),request:{design_mode:false},page:{title:'Fixture page'},shop:{name:'Elma Vada',url:'https://elmavada.com'},routes:{root_url:'/'},customer:{},form:{}};
async function renderSection(type,data,id,ctx=context) {
  const spec=schema(type);
  const section={id,settings:media({...defaults(spec.settings),...data.settings}),blocks:(data.block_order || []).map(key => {
    const block=data.blocks[key];
    if(block.type.startsWith('shopify://')) return {id:key,type:block.type,settings:block.settings};
    const def=spec.blocks.find(b => b.type===block.type);
    assert(def,`Unknown block ${type}/${block.type}`);
    return {id:key,type:block.type,shopify_attributes:`data-block="${key}"`,settings:media({...defaults(def.settings),...block.settings})};
  })};
  const src=read(`sections/${type}.liquid`).replace(/{% schema %}[\s\S]*?{% endschema %}/g,'')
    .replace(/{%\s*render block\s*%}/g,'<div data-app-fixture="true"></div>')
    .replace(/{% form [\s\S]*?%}/g,'<form class="b2b-form">').replace(/{% endform %}/g,'</form>');
  return engine.parseAndRender(src,{...ctx,section},{globals:ctx});
}
async function main() {
  const results=[];
  const rendered={};
  for(const file of fs.readdirSync(path.join(root,'templates')).filter(f => f.endsWith('.json'))) {
    const template=JSON.parse(read(`templates/${file}`));
    const templateName=file==='index.json'?'index':'page';
    const ctx={...context,request:{...context.request,page_type:templateName},template:{name:templateName,suffix:templateName==='index'?'':file.slice(5,-5)}};
    assert.equal(new Set(template.order).size,template.order.length);
    let html='';
    for(const id of template.order) {
      const data=template.sections[id];
      assert(data,`Missing section ${file}/${id}`);
      if(!data.disabled) html+=await renderSection(data.type,data,`${file}:${id}`,ctx);
    }
    assert.equal((html.match(/<h1[ >]/g) || []).length,1,`${file}: H1 count`);
    assert(!html.includes('b2b-placeholder'),`${file}: editor placeholder`);
    assert(!/[А-Яа-яЁё]/.test(html),`${file}: editor-only text leaked`);
    assert(!/data-ev-bulk-motion-toggle|Pause animations|Resume animations|Animations off/.test(html),`${file}: animation controls remain`);
    const pulseCount=(html.match(/data-ev-bulk-pulse/g)||[]).length;
    assert.equal(pulseCount,file==='index.json'?3:file==='page.bulk-orders.json'?2:0,`${file}: incorrect pulse locations`);
    for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
    rendered[file]=html;
  }
  assert.equal(Object.keys(rendered).length,21);
  results.push({check:'Render all 21 JSON templates with actual Liquid and local Shopify-filter fixtures',passed:true});
  const homepage=JSON.parse(read('templates/index.json'));
  assert.equal(homepage.sections.volume.disabled,true);
  assert.equal(homepage.sections.hero.settings.autoplay,false);
  const portfolio=rendered['page.portfolio.json'];
  assert.equal((portfolio.match(/Request a Similar Bulk Order/g) || []).length,3);
  assert(read('snippets/product-main-image.liquid').includes('loading="eager" fetchpriority="high"'));
  assert(!read('layout/theme.liquid').includes('fonts.googleapis.com'));
  results.push({check:'Approved cases, disabled quantity section, non-rotating carousel and image/font optimizations preserved',passed:true});
  const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
  const errors=[];
  let requests=0;
  try {
    const css=['base.css','theme.css','b2b-pages.css','revision.css'].map(name => `<link rel="stylesheet" href="https://fixture.test/assets/${name}">`).join('');
    const fonts=await engine.parseAndRender(read('snippets/local-fonts.liquid'),context);
    const document=body => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${fonts}${css}</head><body>${body}<script src="https://fixture.test/assets/revision.js"></script></body></html>`;
    async function page(options={}) {
      const p=await browser.newPage(options);
      p.on('pageerror',e => errors.push(e.message));
      await p.route('https://fixture.test/**',route => {
        requests++;
        const url=new URL(route.request().url());
        if(url.pathname==='/') return route.fulfill({contentType:'text/html',body:document(p.fixture)});
        if(url.pathname.startsWith('/assets/')) {
          const name=url.pathname.slice(8);
          const type=name.endsWith('.css')?'text/css':name.endsWith('.js')?'text/javascript':name.endsWith('.woff2')?'font/woff2':'image/png';
          return route.fulfill({contentType:type,body:fs.readFileSync(path.join(root,'assets',name))});
        }
        return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><rect width="1200" height="900" fill="#d3c1a0"/></svg>'});
      });
      return p;
    }
    for(const width of [1440,390]) {
      const p=await page({viewport:{width,height:900}});
      for(const file of ['index.json','page.about.json','page.corporate-gifts.json','page.portfolio.json','page.quote.json','page.bulk-orders.json']) {
        p.fixture=rendered[file];
        await p.goto('https://fixture.test/');
        assert(await p.locator('h1').isVisible(),`${file}/${width}: heading hidden`);
        assert(await p.evaluate(() => document.documentElement.scrollWidth<=innerWidth+1),`${file}/${width}: horizontal overflow`);
        if(file==='index.json') {
          const cta=p.locator('.ev-hero [data-ev-bulk-cta]').first();
          assert(await cta.isVisible());
          assert.equal(await cta.getAttribute('href'),'/pages/request-a-quote');
        }
      }
      await p.close();
      results.push({check:`First screen and horizontal overflow at ${width}px on six representative pages`,passed:true});
    }
    const header=await renderSection('header',{settings:{}},'header');
    const footer=await renderSection('footer',{settings:{}},'footer');
    assert(!/Pause animations|Resume animations|data-ev-bulk-motion-toggle/.test(header+footer));
    const targets=[
      {file:'index.json',key:'index.json:hero:primary'},
      {file:'index.json',key:'index.json:speed:primary'},
      {file:'index.json',key:'index.json:cta_banner:primary'},
      {file:'page.bulk-orders.json',key:'page.bulk-orders.json:speed:primary'},
      {file:'page.bulk-orders.json',key:'page.bulk-orders.json:cta:primary'}
    ];
    const visualDir=path.join(root,'output','cta-pulse-visual-2026-10-08');
    fs.mkdirSync(visualDir,{recursive:true});
    const visualCaptures=[];
    const layout=el=>({width:el.offsetWidth,height:el.offsetHeight,left:el.offsetLeft,top:el.offsetTop});
    for(const width of [1440,390]) {
      await Promise.all(targets.map(async target=>{
        const p=await page({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});
        await p.addInitScript(()=>{window.pulseCycles=0;document.addEventListener('animationiteration',e=>{if(e.animationName==='ev-bulk-halo'&&e.target.dataset.evBulkCta===window.trackedKey)window.pulseCycles++;});});
        p.fixture=header+rendered[target.file]+footer;
        await p.goto('https://fixture.test/');
        await p.evaluate(key=>{window.trackedKey=key;},target.key);
        const button=p.locator(`[data-ev-bulk-cta="${target.key}"]`);
        await p.evaluate(()=>document.fonts.ready);
        await button.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest'}));
        await p.waitForFunction(key=>getComputedStyle(document.querySelector(`[data-ev-bulk-cta="${key}"]`),'::after').animationPlayState==='running',target.key);
        const before=await button.evaluate(layout);
        assert.equal(await button.textContent(),'Get a Bulk Quote');
        assert.equal(await button.getAttribute('href'),'/pages/request-a-quote');
        assert.deepEqual(await button.evaluate(el=>{const s=getComputedStyle(el,'::after');return [s.animationDuration,s.animationIterationCount,s.animationTimingFunction];}),['1.8s','infinite','ease-in-out']);
        await button.evaluate(el=>{
          window.motionSample={minScale:2,maxScale:0,maxOpacity:0,maxHaloExpansionX:0,maxHaloExpansionY:0,maxUnevenExpansion:0,layoutShift:0};
          const observer=new PerformanceObserver(list=>{for(const e of list.getEntries()) window.motionSample.layoutShift+=e.value;});observer.observe({type:'layout-shift'});window.motionObserver=observer;
          window.motionSampling=true;
          function sample(){if(!window.motionSampling)return;const a=getComputedStyle(el),h=getComputedStyle(el,'::after');
            const scale=a.transform==='none'?1:new DOMMatrix(a.transform).a;
            const halo=h.transform==='none'?new DOMMatrix():new DOMMatrix(h.transform),rect=el.getBoundingClientRect();
            const expansionX=(halo.a-1)*rect.width/scale/2,expansionY=(halo.d-1)*rect.height/scale/2;
            window.motionSample.minScale=Math.min(window.motionSample.minScale,scale);window.motionSample.maxScale=Math.max(window.motionSample.maxScale,scale);
            window.motionSample.maxOpacity=Math.max(window.motionSample.maxOpacity,Number(h.opacity));
            window.motionSample.maxHaloExpansionX=Math.max(window.motionSample.maxHaloExpansionX,expansionX);
            window.motionSample.maxHaloExpansionY=Math.max(window.motionSample.maxHaloExpansionY,expansionY);
            window.motionSample.maxUnevenExpansion=Math.max(window.motionSample.maxUnevenExpansion,Math.abs(expansionX-expansionY));
            requestAnimationFrame(sample);
          }sample();
        });
        await p.waitForTimeout(10100);
        assert((await p.evaluate(()=>window.pulseCycles))>=5,`${width}/${target.key}: stopped before 10 seconds`);
        assert.equal(await button.evaluate(el=>getComputedStyle(el,'::after').animationPlayState),'running');
        assert.deepEqual(await button.evaluate(layout),before,`${width}/${target.key}: layout dimensions shifted`);
        const samples=await p.evaluate(()=>{window.motionSampling=false;window.motionObserver.disconnect();return window.motionSample;});
        assert(samples.maxScale>=1.019 && samples.minScale<=1.001,`${width}/${target.key}: button not visibly scaling`);
        assert(samples.maxOpacity>=0.64 && samples.maxHaloExpansionX>=3.98 && samples.maxHaloExpansionY>=3.98,`${width}/${target.key}: glow too faint`);
        assert(samples.maxUnevenExpansion<0.03,`${width}/${target.key}: uneven ring expansion`);
        assert.equal(samples.layoutShift,0,`${width}/${target.key}: CLS`);
        const fileKey=`${width}-${target.key.replace(/[^a-z0-9]+/gi,'-')}`;
        let clip;
        const frames=[];
        for(const [phase,time] of [['rest',0],['peak',900],['fade',1350]]) {
          await button.evaluate((el,time)=>{el.style.setProperty('--ev-bulk-play-state','paused');for(const animation of el.getAnimations({subtree:true})){if(animation.animationName==='ev-bulk-halo'||animation.animationName==='ev-bulk-button-pulse')animation.currentTime=time;}},time);
          await p.waitForTimeout(50);
          if(!clip){const r=await button.boundingBox();const x=Math.max(0,Math.floor(r.x-40)),y=Math.max(0,Math.floor(r.y-64));clip={x,y,width:Math.min(width-x,Math.ceil(r.width+80)),height:Math.min(900-y,Math.ceil(r.height+128))};}
          const halo=await button.evaluate(el=>{
            const r=el.getBoundingClientRect(),s=getComputedStyle(el),p=getComputedStyle(el,'::after');
            const own=s.transform==='none'?1:new DOMMatrix(s.transform).a,ring=p.transform==='none'?new DOMMatrix():new DOMMatrix(p.transform);
            const borderWidth=parseFloat(p.width)+(p.boxSizing==='border-box'?0:parseFloat(p.paddingLeft)+parseFloat(p.paddingRight)+parseFloat(p.borderLeftWidth)+parseFloat(p.borderRightWidth));
            const borderHeight=parseFloat(p.height)+(p.boxSizing==='border-box'?0:parseFloat(p.paddingTop)+parseFloat(p.paddingBottom)+parseFloat(p.borderTopWidth)+parseFloat(p.borderBottomWidth));
            const haloWidth=borderWidth*own*ring.a;
            const haloHeight=borderHeight*own*ring.d;
            // Include the visible tail of the static 6px Gaussian glow, not only the border.
            const tailX=9*own*ring.a,tailY=9*own*ring.d;
            const box={left:(r.left+r.right-haloWidth)/2-tailX,right:(r.left+r.right+haloWidth)/2+tailX,top:(r.top+r.bottom-haloHeight)/2-tailY,bottom:(r.top+r.bottom+haloHeight)/2+tailY};
            const clipped=[];for(let a=el.parentElement;a;a=a.parentElement){const st=getComputedStyle(a),b=a.getBoundingClientRect();if(/hidden|clip|auto|scroll/.test(st.overflowX)&&(box.left<b.left-1||box.right>b.right+1))clipped.push(a.tagName+' x');if(/hidden|clip|auto|scroll/.test(st.overflowY)&&(box.top<b.top-1||box.bottom>b.bottom+1))clipped.push(a.tagName+' y');}
            return {clipped,withinViewport:box.left>=-1&&box.right<=innerWidth+1,buttonScale:own,ringScaleX:ring.a,ringScaleY:ring.d,opacity:p.opacity,expansionX:(ring.a-1)*borderWidth/2,expansionY:(ring.d-1)*borderHeight/2};
          });
          assert.deepEqual(halo.clipped,[],`${width}/${target.key}/${phase}: clipped glow`);
          assert(halo.withinViewport,`${width}/${target.key}/${phase}: glow outside viewport`);
          assert(Math.abs(halo.expansionX-halo.expansionY)<0.03,`${width}/${target.key}/${phase}: unequal horizontal/vertical gap`);
          if(phase==='peak')assert(Math.abs(halo.expansionX-3)<0.03,`${width}/${target.key}: incorrect peak expansion`);
          const file=path.join(visualDir,`${fileKey}-${phase}.png`);
          await p.screenshot({path:file,clip});frames.push({phase,file});
        }
        assert(!fs.readFileSync(frames[0].file).equals(fs.readFileSync(frames[1].file)),'Rendered pulse frames do not change');
        visualCaptures.push({width,key:target.key,frames,samples});
        for(const resizedWidth of [width===390?430:1280,width]) {
          await p.setViewportSize({width:resizedWidth,height:900});
          await button.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest'}));
          await p.waitForFunction(key=>{
            const el=document.querySelector(`[data-ev-bulk-cta="${key}"]`),s=getComputedStyle(el),r=el.getBoundingClientRect();
            const scale=s.transform==='none'?1:new DOMMatrix(s.transform).a;
            return Math.abs(Number(s.getPropertyValue('--ev-bulk-halo-x'))*r.width/scale-8)<0.03&&Math.abs(Number(s.getPropertyValue('--ev-bulk-halo-y'))*r.height/scale-8)<0.03;
          },target.key);
        }
        await button.evaluate(el=>{for(const a of el.getAnimations({subtree:true})){if(a.animationName==='ev-bulk-halo'||a.animationName==='ev-bulk-button-pulse')a.currentTime=0;}el.style.setProperty('--ev-bulk-play-state','running');});
        await p.waitForTimeout(100);
        await button.evaluate(el=>el.addEventListener('click',e=>{e.preventDefault();window.quoteClickReceived=true;},{once:true}));
        const rect=await button.boundingBox();await p.mouse.click(rect.x+rect.width/2,rect.y+rect.height/2);
        assert(await p.evaluate(()=>window.quoteClickReceived),`${width}/${target.key}: button unclickable`);
        assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
        assert.equal(await p.locator('[data-ev-bulk-motion-toggle]').count(),0);
        await button.evaluate(el=>{const top=el.getBoundingClientRect().top+scrollY;scrollTo(0,top<innerHeight?document.documentElement.scrollHeight:0);});
        await p.waitForFunction(key=>getComputedStyle(document.querySelector(`[data-ev-bulk-cta="${key}"]`),'::after').animationPlayState==='paused',target.key);
        assert.equal(await button.evaluate(el=>getComputedStyle(el).animationPlayState),'paused');
        assert(await button.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.animationName?.startsWith('ev-bulk-')).every(a=>a.playState==='paused')));
        await p.waitForTimeout(100);
        const cycles=await p.evaluate(()=>window.pulseCycles);
        await p.waitForTimeout(1900);
        assert.equal(await p.evaluate(()=>window.pulseCycles),cycles);
        await button.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest'}));
        await p.waitForFunction(n=>window.pulseCycles>n,cycles);
        assert.equal(await button.evaluate(el=>getComputedStyle(el).animationPlayState),'running');
        await p.emulateMedia({reducedMotion:'reduce'});
        await p.waitForFunction(key=>getComputedStyle(document.querySelector(`[data-ev-bulk-cta="${key}"]`),'::after').animationName==='none',target.key);
        assert.equal(await button.evaluate(el=>getComputedStyle(el).animationName),'none');
        await p.emulateMedia({reducedMotion:'no-preference'});
        await p.waitForFunction(key=>getComputedStyle(document.querySelector(`[data-ev-bulk-cta="${key}"]`),'::after').animationPlayState==='running',target.key);
        assert.equal(await p.locator('.header__cta .btn').evaluate(el=>getComputedStyle(el,'::after').animationName),'none');
        await p.close();
      }));
      results.push({check:`${width}px: all five CTA locations pulse for 10 seconds; sampled 1–1.02 scale, .65 glow and equal 0–4px ring expansion on both axes; actual phase screenshots; clickable; stable layout/zero CLS; unclipped glow; scroll/resume/reduced motion for both animations; no controls/overflow`,passed:true});
    }
    for(const width of [1440,390]) {
      const sheet=await browser.newPage({viewport:{width:width===390?820:1140,height:1200}});
      const rows=targets.map(target=>{const capture=visualCaptures.find(c=>c.width===width&&c.key===target.key);return `<section><h2>${escape(target.key)}</h2><div class="phases">${capture.frames.slice(0,2).map(frame=>`<figure><figcaption>${frame.phase}</figcaption><img src="data:image/png;base64,${fs.readFileSync(frame.file).toString('base64')}"></figure>`).join('')}</div></section>`;}).join('');
      await sheet.setContent(`<style>body{margin:12px;font:13px Arial;background:#ddd}h2{font-size:14px;margin:8px 0}.phases{display:grid;grid-template-columns:1fr 1fr;gap:8px}figure{margin:0}img{display:block;max-width:none}section{margin:0 0 14px}</style>${rows}`);
      await sheet.screenshot({path:path.join(visualDir,`${width}-comparison.png`),fullPage:true});await sheet.close();
    }
    fs.writeFileSync(path.join(visualDir,'measurements.json'),JSON.stringify(visualCaptures,null,2));
    const fixture='<main><section id="Bulk"><a class="btn btn--primary" data-ev-bulk-cta="bulk:primary" data-ev-bulk-pulse href="/pages/request-a-quote">Get a Bulk Quote <span class="ev-bulk-cta__arrow">→</span></a></section><a class="btn btn--primary" id="Purchase" href="/products/example">Buy product</a><a class="btn" id="HeaderQuote" href="/pages/request-a-quote">Request a Quote</a><div style="height:1800px"></div></main>';
    for(const width of [1440,390]) {
    const p=await page({viewport:{width,height:900},isMobile:width===390,hasTouch:width===390});
    await p.addInitScript(() => {window.pulseCycles=0;document.addEventListener('animationiteration',e => {if(e.animationName==='ev-bulk-halo') window.pulseCycles++;});});
    p.fixture=fixture;
    await p.goto('https://fixture.test/');
    const running=()=>p.waitForFunction(() => getComputedStyle(document.querySelector('[data-ev-bulk-cta]'),'::after').animationPlayState==='running');
    const paused=()=>p.waitForFunction(() => getComputedStyle(document.querySelector('[data-ev-bulk-cta]'),'::after').animationPlayState==='paused');
    await running();
    assert.deepEqual(await p.locator('[data-ev-bulk-cta]').evaluate(el => {
      const style=getComputedStyle(el,'::after');return [style.animationDuration,style.animationIterationCount,style.animationTimingFunction];
    }),['1.8s','infinite','ease-in-out']);
    const button=p.locator('[data-ev-bulk-cta]');
    const bounds=await button.evaluate(layout);
    await p.waitForFunction(() => window.pulseCycles>=3);
    assert.deepEqual(await button.evaluate(layout),bounds);
    await p.evaluate(() => scrollTo(0,1200));
    await paused();
    const awayCycles=await p.evaluate(()=>window.pulseCycles);
    await p.waitForTimeout(1700);
    assert.equal(await p.evaluate(()=>window.pulseCycles),awayCycles);
    await p.evaluate(() => scrollTo(0,0));
    await running();
    await p.waitForFunction(n=>window.pulseCycles>n,awayCycles);
    assert.deepEqual(await button.evaluate(layout),bounds);
    await p.evaluate(()=>{const s=document.querySelector('#Bulk');s.dispatchEvent(new CustomEvent('shopify:section:load',{bubbles:true}));});
    await running();
    await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
    await paused();
    assert.equal(await button.evaluate(el=>getComputedStyle(el).animationPlayState),'paused');
    const hiddenCycles=await p.evaluate(()=>window.pulseCycles);
    await p.waitForTimeout(1700);
    assert.equal(await p.evaluate(()=>window.pulseCycles),hiddenCycles);
    await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
    await running();
    assert.equal(await button.evaluate(el=>getComputedStyle(el).animationPlayState),'running');
    await p.waitForFunction(n=>window.pulseCycles>n,hiddenCycles);
    await p.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await button.evaluate(el=>getComputedStyle(el,'::after').animationName),'none');
    assert.equal(await p.locator('[data-ev-bulk-motion-toggle]').count(),0);
    await p.emulateMedia({reducedMotion:'no-preference'});
    await running();
    await button.focus();
    await p.keyboard.press('Shift+Tab');
    await p.keyboard.press('Tab');
    assert.equal(await button.evaluate(el => el===document.activeElement),true);
    assert.equal(await button.evaluate(el => getComputedStyle(el).outlineWidth),'3px');
    if(width===1440) {
      const hoverRect=await button.boundingBox();
      await p.mouse.move(hoverRect.x+hoverRect.width/2,hoverRect.y+hoverRect.height/2);
      await p.waitForTimeout(250);
      assert.equal(await p.locator('.ev-bulk-cta__arrow').evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41),3);
    }
    assert.equal(await p.locator('#Purchase').evaluate(el => el.hasAttribute('data-ev-bulk-cta')),false);
    assert.equal(await p.locator('#HeaderQuote').evaluate(el => getComputedStyle(el,'::after').animationName),'none');
    const priorRequests=requests;
    await p.evaluate(() => {const s=document.querySelector('#Bulk');for(let i=0;i<3;i++) s.dispatchEvent(new CustomEvent('shopify:section:load',{bubbles:true}));s.dispatchEvent(new CustomEvent('shopify:section:unload',{bubbles:true}));s.innerHTML=s.innerHTML;s.dispatchEvent(new CustomEvent('shopify:section:load',{bubbles:true}));});
    await running();
    const remountCycles=await p.evaluate(()=>window.pulseCycles);
    await p.waitForFunction(n=>window.pulseCycles>n,remountCycles);
    assert.equal(requests,priorRequests);
    await p.evaluate(()=>{const s=document.querySelector('#Bulk');s.dispatchEvent(new CustomEvent('shopify:section:unload',{bubbles:true}));});
    assert.equal(await button.evaluate(el=>el.classList.contains('is-bulk-highlight')),false);
    assert.deepEqual(await button.evaluate(el=>['--ev-bulk-halo-x','--ev-bulk-halo-y'].map(key=>el.style.getPropertyValue(key))),['','']);
    await p.close();
    results.push({check:`${width}px: automatic pulse, offscreen/tab-state pause and resume; reduced motion; keyboard; unaffected header/purchase; editor remount and cleanup; no extra requests`,passed:true});
    }
    for(const opts of [{reducedMotion:'reduce'},{javaScriptEnabled:false},{noObserver:true},{noSizeObserver:true}]) {
      const {noObserver,noSizeObserver,...browserOptions}=opts;
      const p=await page({viewport:{width:390,height:844},...browserOptions});
      if(noObserver) await p.addInitScript(()=>{delete window.IntersectionObserver;});
      if(noSizeObserver) await p.addInitScript(()=>{delete window.ResizeObserver;});
      p.fixture=fixture;
      await p.goto('https://fixture.test/');
      const button=p.locator('[data-ev-bulk-cta]');
      assert(await button.isVisible());
      assert.equal(await button.getAttribute('href'),'/pages/request-a-quote');
      assert((await button.boundingBox()).height>=44);
      if(noSizeObserver) {
        await button.evaluate(el=>{el.style.width='280px';el.style.paddingBlock='28px';});
        await p.setViewportSize({width:430,height:844});
        await p.waitForFunction(()=>{const el=document.querySelector('[data-ev-bulk-cta]'),s=getComputedStyle(el);return Math.abs(Number(s.getPropertyValue('--ev-bulk-halo-x'))*el.offsetWidth-8)<0.03&&Math.abs(Number(s.getPropertyValue('--ev-bulk-halo-y'))*el.offsetHeight-8)<0.03;});
      } else assert.equal(await button.evaluate(el => getComputedStyle(el,'::after').animationName),'none');
      assert.equal(await p.locator('[data-ev-bulk-motion-toggle]').count(),0);
      await p.close();
    }
    results.push({check:'Mobile tap target, reduced motion, links without JavaScript/IntersectionObserver and equal-expansion resize fallback without ResizeObserver',passed:true});
    const videoFixture=read('snippets/b2b-image.liquid').match(/<figure[\s\S]*?<\/figure>/)[0]
      .replace(/{%[\s\S]*?%}/g,'').replace(/{{ video \| video_tag:[\s\S]*?}}/,'<video muted playsinline controls preload="none"></video>').replace(/{{[\s\S]*?}}/g,'Video fixture');
    const vp=await page({viewport:{width:1440,height:900}});
    vp.fixture=videoFixture;
    await vp.goto('https://fixture.test/');
    await vp.evaluate(async() => {
      const canvas=document.createElement('canvas');canvas.width=160;canvas.height=120;
      const ctx=canvas.getContext('2d'),stream=canvas.captureStream(10),recorder=new MediaRecorder(stream),chunks=[];
      recorder.ondataavailable=e => chunks.push(e.data);
      const ready=new Promise(resolve => recorder.onstop=resolve);
      recorder.start();
      const timer=setInterval(() => {ctx.fillStyle='#c09858';ctx.fillRect(0,0,160,120);},50);
      await new Promise(resolve => setTimeout(resolve,700));recorder.stop();await ready;clearInterval(timer);stream.getTracks().forEach(t => t.stop());
      window.fixtureVideo=URL.createObjectURL(new Blob(chunks,{type:recorder.mimeType}));
      document.querySelector('video').src=window.fixtureVideo;
    });
    assert.equal(await vp.locator('video').evaluate(v => v.paused),true);
    await vp.locator('[data-ev-video-toggle]').click();
    await vp.waitForFunction(() => !document.querySelector('video').paused);
    await vp.locator('[data-ev-video-toggle]').click();
    assert.equal(await vp.locator('video').evaluate(v => v.paused),true);
    await vp.evaluate(() => {
      const root=document.querySelector('[data-ev-hero]');root.dispatchEvent(new CustomEvent('shopify:section:unload',{bubbles:true}));root.classList.add('ev-hero');
      root.innerHTML=root.innerHTML+'<div data-ev-slide hidden><video muted playsinline></video></div><button data-ev-next>Next</button><button data-ev-prev>Previous</button>';
      root.querySelector('video').src=window.fixtureVideo;root.dispatchEvent(new CustomEvent('shopify:section:load',{bubbles:true}));
      window.loopCount=0;window.lastTime=0;const v=root.querySelector('video');v.addEventListener('timeupdate',() => {if(v.currentTime<window.lastTime) window.loopCount++;window.lastTime=v.currentTime;});
    });
    await vp.waitForFunction(() => !document.querySelector('video').paused);
    assert.equal(await vp.locator('video').first().evaluate(v => v.muted && v.loop),true);
    await vp.waitForFunction(() => window.loopCount>=1);
    await vp.locator('[data-ev-video-toggle]').click({force:true});
    assert.equal(await vp.locator('video').first().evaluate(v => v.paused),true);
    await vp.locator('[data-ev-next]').click();
    assert.equal(await vp.locator('video').first().evaluate(v => v.paused),true);
    await vp.locator('[data-ev-prev]').click();
    assert.equal(await vp.locator('video').first().evaluate(v => v.paused),true);
    await vp.close();
    results.push({check:'Real local video: manual inline play/pause, muted hero autoplay/loop, inactive slide pause and preserved manual pause',passed:true});
    assert.deepEqual(errors,[]);
    results.push({check:'No browser JavaScript errors',passed:true});
    console.log(JSON.stringify({passed:true,checks:results,limitations:['Local Shopify-filter/media fixtures, not Shopify Preview','Shopify Forms rendering/submission and real-world image-loading improvement are not verified']},null,2));
  } finally { await browser.close(); }
}
main().catch(e => {console.error(e);process.exitCode=1;});
