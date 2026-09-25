const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const root = path.resolve(__dirname,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const schema = type => JSON.parse(read('sections/'+type+'.liquid').match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const types=['b2b-content','b2b-feature','b2b-page-hero','b2b-quote','business-solutions'];
for(const type of types){
 const s=schema(type);
 for(const defs of [s.settings,...(s.blocks||[]).map(b=>b.settings)].filter(Boolean)){
  assert.equal(new Set(defs.filter(d=>d.id).map(d=>d.id)).size,defs.filter(d=>d.id).length);
  if(!defs.some(d=>d.id==='image'))continue;
  for(const id of ['media_type','video','poster'])assert(defs.some(d=>d.id===id),type+' missing '+id);
  assert.equal(defs.find(d=>d.id==='media_type').default,'image');
 }
}
const coverage=JSON.parse(read('docs/page-media/coverage.json'));
const templates=fs.readdirSync(path.join(root,'templates')).filter(f=>f.endsWith('.json'));
assert.equal(coverage.length,templates.length);
for(const c of coverage){
 const t=JSON.parse(read(c.template));const guide=read(c.file);
 for(const [sid,s] of Object.entries(t.sections)){
  assert(c.items.some(i=>i.section===sid&&!i.block),c.file+' missing section '+sid);
  assert(guide.includes('`'+sid+'`'));
  const spec=schema(s.type);
  for(const [bid,b] of Object.entries(s.blocks||{})){
   assert(c.items.some(i=>i.section===sid&&i.block===bid),c.file+' missing block '+bid);
   assert(guide.includes('`'+bid+'`'));
   if(b.type.startsWith('shopify://'))continue;
   assert(spec.blocks.some(x=>x.type===b.type));
  }
 }
}
console.log('Schema and documentation coverage passed: all 21 JSON templates, sections and blocks.');

async function browserTest(){
 const {chromium}=require('playwright-core');
 const browser=await chromium.launch({executablePath:'/opt/google/chrome/chrome',headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  // Render the video's wrapper from the actual snippet. Shopify supplies the video_tag output.
  let fixture=read('snippets/b2b-image.liquid').match(/<figure[\s\S]*?<\/figure>/)[0];
  fixture=fixture.replace(/{%[\s\S]*?%}/g,'').replace(/{{ video \| video_tag:[\s\S]*?}}/,'<video muted playsinline controls preload="none"></video>').replace(/{{[\s\S]*?}}/g,'Engraving process');
  for(const width of [375,768,1280]){
   await page.setViewportSize({width,height:900});
   await page.setContent('<style>body{margin:0}button[hidden],p[hidden]{display:none}</style><style>'+read('assets/b2b-pages.css')+read('assets/revision.css')+'</style>'+fixture);
   // Produce a short real test video locally in the browser, with no external requests.
   await page.evaluate(async()=>{
    const c=document.createElement('canvas');c.width=320;c.height=240;
    const ctx=c.getContext('2d');const stream=c.captureStream(15);
    const recorder=new MediaRecorder(stream,{mimeType:'video/webm'});const chunks=[];
    recorder.ondataavailable=e=>chunks.push(e.data);
    const ready=new Promise(resolve=>recorder.onstop=resolve);recorder.start();
    const timer=setInterval(()=>{ctx.fillStyle='#c09858';ctx.fillRect(0,0,320,240);},50);
    await new Promise(resolve=>setTimeout(resolve,1000));recorder.stop();await ready;clearInterval(timer);stream.getTracks().forEach(t=>t.stop());
    document.querySelector('video').src=URL.createObjectURL(new Blob(chunks,{type:'video/webm'}));
   });
   await page.addScriptTag({content:read('assets/revision.js')});
   const state=()=>page.evaluate(()=>{const v=document.querySelector('video');return {paused:v.paused,muted:v.muted,volume:v.volume,autoplay:v.autoplay,pressed:document.querySelector('button').getAttribute('aria-pressed')};});
   assert.deepEqual(await state(),{paused:true,muted:true,volume:0,autoplay:false,pressed:'false'});
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow at '+width);
   await page.locator('button').click();await page.waitForFunction(()=>!document.querySelector('video').paused&&document.querySelector('button').getAttribute('aria-pressed')==='true');
   assert.equal((await state()).pressed,'true');
   await page.locator('button').click();assert.equal((await state()).paused,true);
   await page.evaluate(()=>{const v=document.querySelector('video');v.muted=false;v.volume=1;});
   await page.waitForFunction(()=>document.querySelector('video').muted&&document.querySelector('video').volume===0);
   await page.evaluate(()=>document.querySelector('video').dispatchEvent(new Event('error')));
   assert.equal(await page.locator('[data-ev-video-message]').isVisible(),true);
   // Simulate section editor unmount/remount and confirm listeners are reattached once.
   await page.evaluate(()=>{const r=document.querySelector('figure');r.dispatchEvent(new CustomEvent('shopify:section:unload',{bubbles:true}));r.dispatchEvent(new CustomEvent('shopify:section:load',{bubbles:true}));});
   await page.locator('button').click();await page.waitForFunction(()=>!document.querySelector('video').paused);
   await page.locator('button').click();assert.equal((await state()).paused,true);
  }
  assert.deepEqual(errors,[]);
  console.log('Browser passed at 375/768/1280px: manual play/pause, enforced mute, no autoplay/overflow, error message and section reload.');
 }finally{await browser.close();}
}
browserTest().catch(e=>{console.error(e);process.exitCode=1;});
