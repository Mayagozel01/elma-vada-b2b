// Local smoke tests, not a substitute for Shopify preview/contact delivery tests.
// NODE_PATH=<validation-dependencies>/node_modules node scripts/verify-b2b.cjs
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const {Liquid} = require('liquidjs');
const {chromium} = require('playwright-core');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const schema = type => JSON.parse(read('sections/'+type+'.liquid').match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const defaults = settings => Object.fromEntries((settings||[]).filter(s=>s.id).map(s=>[s.id, s.default ?? '']));
const engine = new Liquid({root:path.join(root,'snippets'),extname:'.liquid',strictFilters:false});
engine.registerFilter('json', x => JSON.stringify(x));
engine.registerFilter('image_url', (x,...args) => x.url+'?width='+(args[0]?.[1]||1200));
engine.registerFilter('image_tag', (url,...args) => {const opts=Object.fromEntries(args);return '<img src="'+url+'" width="1200" height="900" class="'+(opts.class||'')+'" alt="'+(opts.alt||'')+'">';});
engine.registerFilter('asset_url', x => 'https://local.test/'+x);
engine.registerFilter('video_tag', (video,...args) => '<video class="ev-hero__visual" controls muted playsinline preload="none" poster="'+Object.fromEntries(args).poster+'"></video>');
engine.registerFilter('placeholder_svg_tag', () => '<svg aria-hidden="true" viewBox="0 0 160 90"><rect width="160" height="90" fill="#ddd"/></svg>');
engine.registerFilter('default_errors', () => '<p>Check your email address.</p>');
const photo={url:'https://local.test/sample.svg',width:1200,height:900,alt:'Sample product',presentation:{focal_point:'50% 50%'}};
const businessSettings = {...Object.assign({},...JSON.parse(read('config/settings_schema.json')).map(s=>defaults(s.settings))),...JSON.parse(read('config/settings_data.json')).current};
const context = {settings:businessSettings,request:{design_mode:false},page:{title:'Page'},shop:{name:'Elma Vada',url:'https://elmavada.com'},routes:{root_url:'/'},customer:{},form:{}};
async function renderSection(type,data,ctx=context,id='test') {
  const spec=schema(type);
  const section={id,settings:{...defaults(spec.settings),...data.settings},blocks:(data.block_order||[]).map(k=>{
    const b=data.blocks[k];const bs=spec.blocks.find(x=>x.type===b.type);
    return {id:k,type:b.type,shopify_attributes:'data-block="'+k+'"',settings:{...defaults(bs.settings),...b.settings}};
  })};
  // The Shopify-hosted form endpoint is not emulated. Test only its local markup.
  const src=read('sections/'+type+'.liquid').replace(/{% schema %}[\s\S]*?{% endschema %}/g,'').replace(/{% form [\s\S]*?%}/g,'<form class="b2b-form">').replace(/{% endform %}/g,'</form>');
  return engine.parseAndRender(src,{...ctx,section},{globals:ctx});
}
function validateSettings(defs,values,label){
  for(const [id,value] of Object.entries(values||{})){
    const d=defs.find(x=>x.id===id);assert(d,label+': unknown setting '+id);
    if(d.type==='checkbox')assert.equal(typeof value,'boolean',label+': '+id);
    if(d.type==='range')assert(value>=d.min&&value<=d.max,label+': range '+id);
    if(d.type==='select')assert(d.options.some(o=>o.value===value),label+': select '+id);
  }
}
async function main(){
 const info=JSON.parse(read('config/settings_schema.json')).find(s=>s.name==='theme_info');
 assert(info,'Missing theme_info');
 assert(Boolean(info.theme_support_url)!==Boolean(info.theme_support_email),'Provide exactly one support URL or email');
 for(const key of ['theme_documentation_url','theme_support_url'])if(info[key])assert(/^https?:\/\//.test(info[key]),key+' must use HTTP(S)');
 if(info.theme_support_email)assert(/^[^\s:@]+@[^\s@]+\.[^\s@]+$/.test(info.theme_support_email),'Invalid support email');
 const files=fs.readdirSync(path.join(root,'templates')).filter(f=>/^page\..+\.json$/.test(f));
 assert.equal(files.length,20);
 const rendered=[];
 for(const file of files){
  assert(!fs.existsSync(path.join(root,'templates',file.replace('.json','.liquid'))),'Conflicting template '+file);
  const t=JSON.parse(read('templates/'+file));
  assert.equal(new Set(t.order).size,t.order.length);
  let html='';
  for(const id of t.order){
   const s=t.sections[id],spec=schema(s.type);assert(s,'Missing section '+id);
   validateSettings(spec.settings,s.settings,file+'/'+id);
   assert((s.block_order||[]).length<=(spec.max_blocks||50));
   assert.equal(new Set(s.block_order||[]).size,(s.block_order||[]).length);
   for(const b of Object.values(s.blocks||{})){const def=spec.blocks.find(x=>x.type===b.type);assert(def);validateSettings(def.settings,b.settings,file+'/'+id+'/'+b.type);}
   html+=await renderSection(s.type,s,context,id);
  }
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+' must have one h1');
  assert(!html.includes('b2b-placeholder'),file+' leaks editor placeholder');
  assert(!/[А-Яа-яЁё]/.test(html),file+' leaks Russian photo instructions');
  const faqScripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(faqScripts.length,1,file+' FAQ schema count');
  for(const [,json] of faqScripts){const d=JSON.parse(json);assert(d.mainEntity.length>0);for(const q of d.mainEntity){assert(html.includes(q.name.replaceAll('&','&amp;')),file+' question mismatch');}}
  rendered.push({file,html});
 }
 const allLinks=rendered.map(r=>r.html).join('')+read('sections/footer.liquid');
 const expectedHandles=['business-solutions','production-capabilities','industries','our-work','about','request-a-quote','corporate-gifts','bulk-orders','branded-merchandise','custom-engraving','promotional-products','faq','client-gifting','service-awards','employee-recognition','events-awards','onboarding','milestone-program','free-mockup','book-a-call'];
 for(const handle of expectedHandles)assert(allLinks.includes('/pages/'+handle),'No internal link for '+handle);
 const blankReview={settings:{},blocks:{review:{type:'testimonial',settings:{}}},block_order:['review']};
 assert.equal((await renderSection('testimonials',blankReview)).trim(),'','Empty reviews must not be public');
 blankReview.blocks.review.settings={quote:'A real customer review.',name:'Approved author'};
 assert((await renderSection('testimonials',blankReview)).includes('A real customer review.'));
 const portfolio=JSON.parse(read('templates/page.portfolio.json'));
 const example=portfolio.sections.examples;
 assert.equal((await renderSection(example.type,example)).trim(),'','Unapproved cases must not render');
 const editor=await renderSection(example.type,example,{...context,request:{design_mode:true}});
 assert(editor.includes('b2b-placeholder')&&editor.includes('Не видно посетителям'));
 example.blocks.item_1.settings.image=photo;
 assert.equal((await renderSection(example.type,example)).trim(),'','Photo alone must not publish case');
 example.blocks.item_1.settings.approved=true;
 example.blocks.item_1.settings.text='<p>Approved case detail.</p>';
 const approved=await renderSection(example.type,example);
 assert(approved.includes('<img')&&approved.includes('Approved case detail.'));
 assert(!approved.includes('Add verified project details'));
 const questions=JSON.parse(read('templates/page.faq.json')).sections.questions;
 questions.blocks.question_1.settings.question='Edited question?';
 questions.blocks.question_1.settings.answer='<p>Changed &amp; checked.</p>';
 const edited=await renderSection('b2b-faq',questions);
 const data=JSON.parse(edited.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(data.mainEntity[0].name,'Edited question?');
 assert.equal(data.mainEntity[0].acceptedAnswer.text,'Changed &amp; checked.');
 questions.blocks.question_1.settings.question='Literal </script> test';
 const safe=await renderSection('b2b-faq',questions);
 assert.equal((safe.match(/<\/script>/g)||[]).length,1,'FAQ JSON script injection');
 JSON.parse(safe.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 const form=await renderSection('b2b-quote',{settings:{}});
 assert(form.includes('contact[artwork_link]')&&!form.includes('type="file"'));
 const success=await renderSection('b2b-quote',{settings:{}},{...context,form:{'posted_successfully?':true}});
 assert(success.includes('role="status"'));
 const failure=await renderSection('b2b-quote',{settings:{}},{...context,form:{errors:['email'],email:'bad-email'}});
 assert(failure.includes('role="alert"')&&failure.includes('aria-invalid="true"'));
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
 const out=fs.mkdtempSync('/tmp/elma-b2b-check-');
 try{
  const page=await browser.newPage();
  await page.route('https://local.test/**',route=>{
    const name=new URL(route.request().url()).pathname.slice(1);
    if(/^hero-video-cover-(metal|ribbon|layers)\.png$/.test(name))return route.fulfill({contentType:'image/png',body:fs.readFileSync(path.join(root,'assets',name))});
    return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><rect width="1200" height="900" fill="#d3c1a0"/><circle cx="600" cy="450" r="200" fill="#1e252b"/></svg>'});
  });
  const css=read('assets/base.css')+read('assets/theme.css')+read('assets/b2b-pages.css')+read('assets/revision.css');
  const header=await renderSection('header',{settings:businessSettings.sections.header.settings});
  const set=html=>page.setContent('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>'+css+'</style></head><body class="page-page">'+header+'<main class="content-for-layout">'+html+'</main></body></html>');
  for(const width of [360,375,768,820,1024,1200,1201,1280,1440]){
   await page.setViewportSize({width,height:900});
   for(const {file,html} of rendered){
    await set(html);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),file+' horizontal overflow at '+width);
    assert(await page.locator('h1').evaluate(e=>e.getBoundingClientRect().top>=72),file+' heading covered by header');
   }
  }
  const sample=JSON.parse(read('templates/page.corporate-gifts.json'));
  sample.sections.hero.settings.image=photo;
  for(const b of Object.values(sample.sections.examples.blocks))b.settings.image=photo;
  let sampleHtml='';for(const id of sample.order)sampleHtml+=await renderSection(sample.sections[id].type,sample.sections[id],context,id);
  for(const width of [375,1440]){
   await page.setViewportSize({width,height:900});await set(sampleHtml);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),'Photo layout overflow');
   assert(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.hasAttribute('width')&&i.hasAttribute('height')&&i.hasAttribute('alt'))));
   await page.screenshot({path:path.join(out,'corporate-gifts-'+width+'.png'),fullPage:true});
  }
  // Homepage including header/footer, no public AI placeholders.
  const home=JSON.parse(read('templates/index.json'));
  let homeHtml='';
  for(const id of home.order) if(!home.sections[id].disabled) homeHtml+=await renderSection(home.sections[id].type,home.sections[id],context,id);
  const footer=await renderSection('footer', {settings:businessSettings.sections.footer.settings});
  assert.equal((homeHtml.match(/<h1[ >]/g)||[]).length,1);
  assert(!homeHtml.includes('Illustrative concept')&&!homeHtml.includes('Add verified rating'));
  assert(!footer.includes('href="https://www.etsy.com'));
  assert(footer.includes('18383 Preston Rd, #202, Dallas, TX 75252'));
  assert(footer.includes('daria@elmavada.com'));
  for(const width of [360,375,768,820,1024,1200,1440]){
    await page.setViewportSize({width,height:900});await set(homeHtml+footer);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Home/footer overflow at '+width);
  }
  // Real photos remain editable; use fixtures only in this browser test.
  for(const slide of Object.values(home.sections.hero.blocks))slide.settings.image=photo;
  const heroHtml=await renderSection('hero',home.sections.hero);
  await page.setViewportSize({width:820,height:900});await set(heroHtml);
  await page.addScriptTag({content:read('assets/revision.js')});
  assert.equal(await page.locator('[data-ev-slide]:visible').count(),1);
  await page.locator('[data-ev-next]').click();
  assert.equal(await page.locator('[data-ev-slide]:visible').count(),1);
  assert.equal(await page.locator('[data-ev-status]').textContent(),'2 / 3');
  assert.equal(await page.locator('[data-ev-slide][inert]').count(),2);
  assert.equal(await page.locator('h1').textContent(),'Corporate Gifts Made Personal');
  await page.screenshot({path:path.join(out,'hero-820.png'),fullPage:true});
  // Exercise video-slide state with a deterministic media stub (not CDN decoding).
  home.sections.hero.blocks.hero_slide_2.settings.media_type='video';
  home.sections.hero.blocks.hero_slide_2.settings.video={preview_image:photo};
  home.sections.hero.blocks.hero_slide_2.settings.poster_style='ribbon';
  const videoHero=await renderSection('hero',home.sections.hero);
  assert(videoHero.includes('poster="https://local.test/hero-video-cover-ribbon.png"'));
  home.sections.hero.blocks.hero_slide_2.settings.poster=photo;
  assert((await renderSection('hero',home.sections.hero)).includes('poster="https://local.test/sample.svg?width=1600"'),'Uploaded poster must override preset');
  for (const width of [360,768,1024,1280,1440]) {
    await page.setViewportSize({width,height:900});
    await set(videoHero);
    await page.addScriptTag({content:read('assets/revision.js')});
    const boxes=await page.evaluate(()=>{
      const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
      return {grid:box('.ev-hero__grid'),media:box('.ev-hero__media'),controls:box('.ev-hero__controls')};
    });
    assert(boxes.controls.x>=boxes.media.x && boxes.controls.y>=boxes.media.y);
    assert(boxes.controls.x+boxes.controls.width<=boxes.media.x+boxes.media.width+1);
    assert(boxes.controls.y+boxes.controls.height<=boxes.media.y+boxes.media.height+1);
    if(width>1024)assert(Math.abs(boxes.media.height-boxes.grid.height)<1,'Desktop media must fill banner height');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Media overflow at '+width);
    await page.locator('[data-ev-next]').click();
    const toggle=await page.locator('[data-ev-video-toggle]').boundingBox();
    const media=await page.locator('.ev-hero__media').boundingBox();
    assert(Math.abs(toggle.x+toggle.width/2-media.x-media.width/2)<1);
    assert(Math.abs(toggle.y+toggle.height/2-media.y-media.height/2)<1);
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:path.join(out,'video-cover-'+width+'.png'),fullPage:true});
  }
  await set(videoHero);
  await page.evaluate(()=>{
    const video=document.querySelector('video');
    let paused=true;
    window.videoPlayCalls=0;
    window.videoPausedBySlide=false;
    Object.defineProperty(video,'paused',{get:()=>paused});
    video.play=async()=>{window.videoPlayCalls++;paused=false;video.dispatchEvent(new Event('play'));};
    video.pause=()=>{window.videoPausedBySlide=true;if(!paused){paused=true;video.dispatchEvent(new Event('pause'));}};
  });
  await page.addScriptTag({content:read('assets/revision.js')});
  await page.locator('[data-ev-next]').click();
  assert(await page.locator('video').isVisible());
  assert.equal(await page.evaluate(()=>window.videoPlayCalls),0,'No play on mount or slide change');
  assert(await page.locator('video').evaluate(v=>!v.autoplay && v.muted && v.volume===0 && !v.controls));
  await page.locator('[data-ev-video-toggle]').click();
  assert.equal(await page.evaluate(()=>window.videoPlayCalls),1);
  assert.equal(await page.locator('[data-ev-video-toggle]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-ev-video-toggle]').click();
  assert.equal(await page.locator('[data-ev-video-toggle]').getAttribute('aria-pressed'),'false');
  await page.locator('[data-ev-video-toggle]').click();
  await page.evaluate(()=>{window.videoPausedBySlide=false;document.querySelector('video').muted=false;});
  await page.waitForFunction(()=>document.querySelector('video').muted);
  await page.locator('[data-ev-next]').click();
  assert(!(await page.locator('video').isVisible()));
  assert(await page.evaluate(()=>window.videoPausedBySlide));
  await page.locator('[data-ev-prev]').click();
  assert.equal(await page.evaluate(()=>window.videoPlayCalls),2,'Returning to video must not resume it');
  await page.evaluate(()=>{document.querySelector('video').play=()=>Promise.reject(new Error('Fixture media error'));});
  await page.locator('[data-ev-video-toggle]').click();
  assert(await page.locator('[data-ev-video-message]').isVisible());
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('[data-ev-pause]').disabled);
  assert(await page.locator('[data-ev-pause]').isDisabled());
  await page.emulateMedia({reducedMotion:'no-preference'});
  // JSON-LD and metadata: new business data, unique fallbacks, escaped input.
  const businessSource=read('snippets/schema-local-business.liquid');
  const businessHtml=await engine.parseAndRender(businessSource,context,{globals:context});
  const business=JSON.parse(businessHtml.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.equal(business.address.addressLocality,'Dallas');assert.equal(business.address.postalCode,'75252');
  assert(!business.openingHoursSpecification);
  const hostile={...context,settings:{...context.settings,business_name:'Literal </script><script>bad</script>'}};
  const safeBusiness=await engine.parseAndRender(businessSource,hostile,{globals:hostile});
  assert.equal((safeBusiness.match(/<\/script>/g)||[]).length,1,'Business JSON script injection');
  JSON.parse(safeBusiness.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
  for(const row of JSON.parse(read('scripts/seo-pages.json'))){
    const ctx={...context,page:{handle:row.handle,title:row.handle},page_title:row.handle,page_description:'',current_page:1,canonical_url:'https://elmavada.com/'+row.handle,request:{page_type:row.handle?'page':'index'}};
    const meta=await engine.parseAndRender(read('snippets/seo-meta.liquid'),ctx,{globals:ctx});
    assert(meta.includes('property="og:title"'));assert(meta.includes('name="description" content="'));
    assert(!meta.includes('name="description" content=""'));assert.equal((meta.match(/<title>/g)||[]).length,1);
  }
  await page.setViewportSize({width:375,height:900});
  await set(rendered.find(r=>r.file==='page.quote.json').html);
  assert(await page.locator('.b2b-form input').first().evaluate(e=>e.getBoundingClientRect().top<900),'First form input should be visible without scrolling');
  const formBox=await page.locator('.ev-quote__main').boundingBox(),asideBox=await page.locator('.ev-quote__aside').boundingBox();
  assert(formBox.y<asideBox.y,'Mobile form must precede explanatory text');
  await page.locator('button[type="submit"]').click();
  assert(await page.locator('input:invalid').count()>=3,'Required fields should block empty form');
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:path.join(out,'quote-375.png'),fullPage:true});
  await set(editor);
  await page.screenshot({path:path.join(out,'editor-placeholders-375.png'),fullPage:true});
  console.log(JSON.stringify({templates:files.length,viewportChecks:180,assertions:'Schemas, H1, FAQ JSON, case approval, editor-only placeholders, form states, required fields, mobile overflow, full-height hero, overlay controls, click-only muted video, cover priority',screenshots:out},null,2));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
