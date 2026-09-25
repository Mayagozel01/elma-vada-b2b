// Rebuild the complete page checklists from the current theme; retain curated media choices.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const json = f => JSON.parse(read(f));
const pairs = [
 ['01-home','index',''], ['02-business-solutions','page.solutions','business-solutions'],
 ['03-production-capabilities','page.capabilities','production-capabilities'],
 ['04-industries','page.industries','industries'], ['05-our-work','page.portfolio','our-work'],
 ['06-about','page.about','about'], ['07-request-a-quote','page.quote','request-a-quote'],
 ['08-corporate-gifts','page.corporate-gifts','corporate-gifts'], ['09-bulk-orders','page.bulk-orders','bulk-orders'],
 ['10-personalized-merchandise','page.branded-merchandise','branded-merchandise'],
 ['11-custom-engraving','page.custom-engraving','custom-engraving'],
 ['12-promotional-products','page.promotional-products','promotional-products'], ['13-faq','page.faq','faq'],
 ['14-client-gifting','page.client-gifting','client-gifting'], ['15-service-awards','page.service-awards','service-awards'],
 ['16-employee-recognition','page.employee-recognition','employee-recognition'],
 ['17-events-awards','page.events-awards','events-awards'], ['18-onboarding','page.onboarding','onboarding'],
 ['19-milestone-program','page.milestone-program','milestone-program'],
 ['20-free-mockup','page.free-mockup','free-mockup'], ['21-consultation','page.book-a-call','book-a-call']
];
const marker = '<!-- COMPLETE-THEME-CHECKLIST -->';
const notice = '> Обновлено по экспорту 24SEP2026-0517pm. Ниже сохранён подбор медиа; полный порядок всех секций, карточек и полей — в разделе [Полный чек-лист](#полный-чек-лист). Уже загруженные файлы указаны в чек-листе: сохраняйте их, если они подходят по содержанию.\n\n';
const clean = s => String(s ?? '').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const cell = s => clean(typeof s === 'object' ? JSON.stringify(s) : s).replace(/\|/g,'&#124;').replace(/`/g,'ˋ');
const norm = s => clean(s).toLowerCase().replace(/^\d+\.\s*/, '').replace(/[^a-z0-9]/g,'');
const schema = type => JSON.parse(read('sections/'+type+'.liquid').match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
const globals = json('config/settings_data.json').current;
const seo = json('scripts/seo-pages.json');
const report = [];
function advice(d) {
 const id = d.id || '';
 if(id==='media_type')return 'Image — фото; Video — ролик с ручным Play без звука.';
 if(d.type==='video')return 'Выберите ролик из Shopify Files; проверьте, что он показывает именно этот этап/товар.';
 if(id==='poster')return 'Обложка видео: чёткий кадр того же ролика. Пустое поле использует превью видео.';
 if(d.type==='image_picker')return /logo/.test(id)?'Ваш логотип. Сохраняйте пропорции.':'Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне.';
 if(/alt/.test(id))return 'Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет.';
 if(id==='photo_note')return 'Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt.';
 if(id==='show_image')return 'Включает фото или видео; у текстовых шагов можно оставить выключенным.';
 if(id==='show_native_form')return 'При подключённом app block Shopify Forms выключите, чтобы не показывать две формы. Без app block остаётся резервная форма.';
 if(id==='requires_approval'||id==='approved')return 'Кейсы показывайте после подтверждения фактов и разрешения на публикацию.';
 if(d.type==='url')return 'Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404.';
 if(d.type==='link_list')return 'Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP.';
 if(d.type==='collection'||d.type==='product')return 'Выберите реальную опубликованную коллекцию/товар с заполненными фото и ценой.';
 if(d.type==='checkbox')return 'Проверьте переключатель в редакторе и результат в предпросмотре.';
 if(d.type==='range'||d.type==='select'||d.type==='color')return 'Настройка оформления. Проверьте настольный и мобильный вид.';
 if(/question/.test(id))return 'Один реальный вопрос покупателя; ответ должен находиться в этой же карточке.';
 if(/answer/.test(id))return 'Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги.';
 if(/heading|title/.test(id))return 'Понятный заголовок по теме блока; H1 — только в hero страницы.';
 if(/email/.test(id))return 'Публичный email: daria@elmavada.com. Уведомления Forms настраиваются отдельно.';
 if(/phone/.test(id))return 'Подтверждённый номер +1 (929) 509-0117; проверьте звонок и SMS перед включением.';
 return 'Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия.';
}
function fields(defs, values) {
 let out='| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |\n|---|---|---|\n';
 for(const d of defs||[]){if(!d.id)continue;const v=values[d.id]??d.default??'';out+=`| ${cell(d.label||d.id)} (${d.id}) | ${cell(v)||'Не заполнено'} | ${advice(d)} |\n`;}
 return out+'\n';
}
function fallback(title, note) {
 const t=title.toLowerCase();
 const rules=[
 [/co₂|co2/, 'Реальный CO₂-станок в работе по дереву; не показывайте станок другого типа.', 'CO2 laser engraving a wooden gift in the studio.'],
 [/fiber/, 'Реальная маркировка металлической ручки волоконным лазером.', 'Fiber laser engraving a metal pen.'],
 [/uv/, 'Кадр UV-лазера при гравировке только если эта технология действительно используется. UV laser engraving и UV printing — разные услуги; цветную печать не показывать.', 'UV laser engraving a personalized item in the studio.'],
 [/crystal|glass/, 'Новый реальный кадр гравировки на подтверждённом стекле или кристалле, с читаемой деталью.', 'Close-up of engraving on a clear glass gift.'],
 [/approv|proof|details|direction|mockup/, 'Цифровой макет вашего изделия с расположением имени/логотипа и согласуемыми размерами. Для демонстрации используйте ELMA VADA STUDIO; подпись Illustrative approval layout.', 'Illustrative engraving proof showing artwork placement on a pen.'],
 [/pack|deliver|fulfill|produce|production run/, 'Реальная готовая партия в одинаковых коробках или ролик упаковки; адресные этикетки не включать в кадр.', 'Personalized gift boxes prepared for packing and delivery.'],
 [/quality|review|checking/, 'Реальный сотрудник проверяет гравировку перед упаковкой, крупный план рук и изделия.', 'Team member checking an engraved pen before packing.'],
 [/team|people|consult|face to face/, 'Реальный сотрудник за столом показывает образец ручки и футляр во время консультации.', 'Elma Vada team member presenting a personalized pen sample.'],
 [/studio|laser|engraving|material/, 'Реальная рабочая зона или крупный план соответствующей лазерной гравировки. Выберите короткий ролик процесса или его чёткий кадр.', 'Laser engraving a personalized gift in the studio.'],
 [/welcome|onboarding|coordinated kit/, 'Открытый набор из реально доступных товаров: ручка, футляр, блокнот и карточка. Для создаваемого концепта используйте подпись Illustrative gift concept.', 'Employee welcome gift set with a personalized pen, notebook and card.'],
 [/award|recognition|service/, 'Реальная награда с нейтральной демонстрационной надписью, целиком и с читаемой гравировкой.', 'Personalized recognition award with an engraved message.'],
 [/drinkware/, 'Реальная кружка или термостакан из вашего ассортимента с лазерной гравировкой.', 'Personalized drinkware with a laser-engraved design.'],
 [/wood|keepsake|desk/, 'Деревянная ручка с футляром или доступный настольный подарок, крупно показать материал и гравировку.', 'Wooden pen beside a matching engraved presentation case.'],
 [/batch|event pens|conference|per-piece|names/, 'Несколько реальных ручек одной модели с разными демонстрационными именами; вся партия в фокусе.', 'Matching pens with individually engraved names.'],
 [/brief|occasion/, 'Можно оставить без фото. Если включаете: подарочная ручка и упаковка рядом с чистой карточкой для идеи.', 'Personalized pen and gift packaging beside a blank card.'],
 [/pen/, 'Реальная ручка из вашего ассортимента в открытом футляре; гравировка читается.', 'Personalized pen displayed in an open presentation case.']
 ];
 const r=rules.find(([re])=>re.test(t));
 return r ? {brief:r[1],alt:r[2]} : {brief:note||`Новый кадр для «${title}»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.`,alt:`Personalized gift displayed for ${title.toLowerCase()}.`};
}
function media(defs,v,title,id,curated){
 if(!(defs||[]).some(d=>d.type==='image_picker'&&['image','poster'].includes(d.id)))return 'Медиа: отдельного слота изображения/видео в этом блоке нет.\n\n';
 const match=curated.find(r=>norm(r[0])===norm(title))|| (id==='hero'?curated.find(r=>norm(r[0])==='hero'):null);
 const proposed=fallback(title,v.photo_note);
 let out='';
 if(v.image)out+=`Уже загружено фото: \`${cell(v.image)}\`. Сохраните его, если оно соответствует сюжету ниже.\n\n`;
 if(v.video)out+=`Уже загружено видео: \`${cell(v.video)}\`.\n\n`;
 out+=`**Сюжет / файл:** ${match?match[1]:proposed.brief}\n\n`;
 out+=`**Alt для предложенного сюжета:** ${match?match[2]:'`'+proposed.alt+'`'}\n\n`;
 if(v.image_alt)out+=`Текущий alt: \`${cell(v.image_alt)}\`. Сверьте с фактически выбранным кадром.\n\n`;
 if(v.show_image===false)out+='Сейчас Include image or video выключен: карточка текстовая. Изображение здесь необязательно.\n\n';
 out+='Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.\n\n';
 return out;
}
for(const [name,template,handle] of pairs){
 const file='docs/page-media/'+name+'.md';
 let original=read(file).split(marker)[0].replace(notice,'').trimEnd();
 const curated=original.split('\n').filter(l=>l.startsWith('|')).map(l=>l.split('|').slice(1,-1).map(x=>x.trim())).filter(r=>r.length===3&&!/^[- ]+$/.test(r[0]));
 const t=json('templates/'+template+'.json');
 const items=[];
 let out=`${marker}\n\n## Полный чек-лист\n\nИсточник: свежий экспорт 24SEP2026-0517pm + поддержка видео в локальной теме. Шаблон: \`${template.replace('page.','')}\`. URL: \`${handle?'/pages/'+handle:'/'}\`.\n\nОткройте редактор темы → ${handle?'Pages → '+template.replace('page.',''):'Home page'}. Проходите блоки ниже по порядку. Названия взяты из текущей темы, скрытые секции тоже перечислены. После изменения нажмите Save.\n\n`;
 out+='### Как добавить видео\n\nВ Hero внутренних страниц, B2B feature, Photo / content card, Solution card и боковом медиа формы доступны **Media type → Image / Video**, **Video** и **Video cover**. Выберите Video, загрузите ролик, задайте обложку и описание сюжета в Photo description. Если есть Include image or video — включите. Видео запускается по Play, без звука; повторное нажатие ставит паузу. На главной Hero уже имеет собственные настройки слайдов. Обложка по умолчанию берётся из видео. Эти новые поля появятся после загрузки обновлённой темы.\n\n';
 function section(id,s,index,global=false,notOrdered=false){
  const spec=schema(s.type), v={...Object.fromEntries((spec.settings||[]).filter(d=>d.id).map(d=>[d.id,d.default??''])),...s.settings};
  const title=clean(v.heading||v.title||spec.name);
  out+=`### ${index}. ${title}\n\nРедактор: **${spec.name}**; идентификатор \`${id}\`. ${global?'Общая секция всех страниц. ':''}${s.disabled?'**Скрыта в экспорте.** Не включайте до заполнения.':'Включена в шаблоне; фактический показ зависит от заполнения и настроек.'}${notOrdered?' Не включена в порядок вывода.':''}\n\n`;
  out+='- [ ] Проверить все поля секции:\n\n'+fields(spec.settings||[],v);
  out+=media(spec.settings,v,title,id,curated);
  if(s.type==='hero')out+='Тексты слева в hero берутся из первого слайда. В остальных слайдах важны изображение/видео, обложка и описание. Не включайте автопрокрутку видео: каждый ролик ждёт Play.\n\n';
  if(s.type==='b2b-quote')out+='В Apps → Forms проверьте Upload your logo (SVG поддерживается), имя, email, количество, срок, детали проекта и запрос Physical sample. Загрузка логотипа необязательна. Проверьте адрес уведомлений daria@elmavada.com и сделайте тестовую отправку. Встроенная резервная форма принимает ссылку; загрузку файла обеспечивает app block.\n\n';
  if(s.type==='b2b-faq')out+='Каждая пара Question / Answer ниже — отдельный блок. Ответы должны быть видимы посетителю; добавлять к ним фото не требуется.\n\n';
  if(s.type==='testimonials')out+='При отсутствии подтверждённых отзывов оставьте секцию пустой. Отзывы и имена заполняются через Add block; не переносите общую цифру клиентов в рейтинг.\n\n';
  if(s.type==='featured-products')out+='Фото и alt товаров заполняйте в Products → нужный товар → Media. Здесь выбирается коллекция и количество товаров.\n\n';
  if(s.type==='header'||s.type==='footer')out+='Проверьте меню, все ссылки, логотип, телефон и email. Общие контакты: Theme settings → Business & contact. Адрес: 18383 Preston Rd, #202, Dallas, TX 75252. Ссылку на Etsy в футер не добавляйте.\n\n';
  const order=[...(s.block_order||[]),...Object.keys(s.blocks||{}).filter(k=>!(s.block_order||[]).includes(k))];
  if(!order.length)out+='Вложенных карточек в текущем экспорте нет.\n\n';
  for(const [i,bid] of order.entries()){
   const b=s.blocks[bid], bs=(spec.blocks||[]).find(x=>x.type===b.type);
   const bv={...Object.fromEntries((bs?.settings||[]).filter(d=>d.id).map(d=>[d.id,d.default??''])),...b.settings};
   const bt=clean(bv.title||bv.heading||bv.question||bs?.name||b.type);
   out+=`#### ${index}.${i+1}. ${bt}\n\n- [ ] Проверить блок \`${bid}\`${b.disabled?' — скрыт':''}.\n\n`;
   if(b.type.startsWith('shopify://')){
    out+='Это блок приложения Shopify Forms. Поля внутри формы, их подписи и уведомления редактируются в Apps → Forms; ZIP темы содержит только подключение.\n\n';
    out+=fields(Object.keys(bv).map(id=>({id,label:id,type:'text'})),bv);
   }else{out+=fields(bs?.settings||[],bv);out+=media(bs?.settings,bv,bt,bid,curated);}
   if(bv.requires_approval&&!bv.approved)out+='Сейчас карточка не разрешена к публикации. После проверки фактов включите Facts and publication permission confirmed.\n\n';
   items.push({section:id,block:bid});
  }
  items.push({section:id,blocks:order.length,disabled:!!s.disabled});
 }
 if(globals.sections?.header)section('header',globals.sections.header,'Header',true);
 const order=[...(t.order||[]),...Object.keys(t.sections).filter(k=>!(t.order||[]).includes(k))];
 order.forEach((id,i)=>section(id,t.sections[id],i+1,false,!(t.order||[]).includes(id)));
 if(globals.sections?.footer)section('footer',globals.sections.footer,'Footer',true);
 const meta=seo.find(x=>x.handle===handle);
 out+='### SEO и итоговая проверка\n\n';
 if(meta)out+=`SEO заполняется ${handle?'в Online Store → Pages → нужная страница → Search engine listing → Edit':'в Theme settings → SEO & social preview'}.\n\nTitle: \`${meta.title}\`\n\nDescription: \`${meta.description}\`\n\n`;
 out+='- [ ] Один H1; заголовки и ответы соответствуют содержанию страницы.\n- [ ] Все CTA открывают нужную форму; можно запросить макет, образец или консультацию.\n- [ ] Personalized gifts, только лазерная гравировка; UV printing отсутствует. Названия технологий UV laser подтверждены отдельно.\n- [ ] Цены $9.99–$119.99 и скорость «as little as 1 business day / up to 1,000 pens» используются только с условиями по товару, количеству, сложности, согласованию и наличию.\n- [ ] 1–5K+ units per order; контакты Dallas; нет старого Gmail/Los Angeles и служебных заглушек.\n- [ ] На телефоне нет горизонтальной прокрутки; фото не обрезает гравировку; видео ждёт Play и остаётся без звука.\n- [ ] Изменения сохранены в Shopify; перед следующей правкой кода скачан новый ZIP.\n';
 original=original.replace(/^(# [^\n]+\n)/,'$1\n'+notice);
 fs.writeFileSync(path.join(root,file),original+'\n\n'+out);
 report.push({file,template:'templates/'+template+'.json',sections:order.length,blocks:items.filter(x=>x.block).length,items});
}
fs.writeFileSync(path.join(root,'docs/page-media/coverage.json'),JSON.stringify(report,null,2)+'\n');
console.log(`Updated ${report.length} page guides; ${report.reduce((n,r)=>n+r.sections,0)} page sections and ${report.reduce((n,r)=>n+r.blocks,0)} blocks, plus shared header/footer.`);
