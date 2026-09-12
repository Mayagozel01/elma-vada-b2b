# Elma Vada — отчёт по B2B-сайту и план запуска

> Обновление 12 сентября 2026: внутренние страницы теперь редактируются через JSON-секции, добавлены 4 направления, фотоблоки и новые тексты. Актуальные шаги: [SHOPIFY-CONTENT-GUIDE-RU.md](SHOPIFY-CONTENT-GUIDE-RU.md). Карта снимков: [PHOTO-UPLOAD-MAP-RU.md](PHOTO-UPLOAD-MAP-RU.md). Старые пункты ниже — исторический отчёт; в частности, встроенный file upload заменён ссылкой на artwork, а реальные вложения требуют интеграции.

Дата: 11 сентября 2026  
Тема: Elma Vada B2B для Shopify  
Цель: представить Elma Vada как local DFW production & branding studio для корпоративных заказов от 10 до 5,000+ единиц.

## 1. Итоговый статус

Каркас сайта по ТЗ собран в теме. В коде созданы B2B-главная, отдельные посадочные страницы, форма заявки, SEO-разметка, каталог товаров и перелинковка.

До финального запуска осталось не «дописать сайт», а наполнить его реальными материалами в Shopify, сделать страницы видимыми, проверить ссылки и подключить измерения/доверительные доказательства.

> Важно: файл-шаблон сам по себе не создаёт страницу в Shopify. Для каждой посадочной страницы нужно создать запись в **Content → Pages**, назначить нужный template и включить **Visible**. Если страница Hidden, в Theme Editor она может открываться, но клиент увидит Page not found.

## 2. Что уже сделано

### Структура и B2B-позиционирование

- B2B-главная с секциями из ТЗ: Hero, volume/trust, industries, business solutions, production capabilities, advantages, comparison, portfolio, process и final CTA.
- Профессиональный визуальный стиль: navy/cream/gold, типографика DM Serif Display + Inter.
- Верхнее меню можно выбрать через Shopify Navigation: Business Solutions, Capabilities, Industries, Our Work, About, Request a Quote.
- Футер содержит разделы Services и Company; их меню можно выбрать через Customizer.

### Hero-карусель

- Hero переделан в carousel до 3 слайдов.
- Для каждого слайда отдельно редактируются изображение, eyebrow, H1, подзаголовок, основной текст, 2 CTA-кнопки и badge поверх фотографии.
- Есть стрелки, точки, автопрокрутка, пауза при наведении/фокусе и мобильная версия.

### Страницы и SEO-посадочные

В теме подготовлены шаблоны:

| Назначение | Handle страницы | Template |
|---|---:|---|
| Business Solutions | `business-solutions` | `page.solutions` |
| Production Capabilities | `production-capabilities` | `page.capabilities` |
| Industries We Serve | `industries` | `page.industries` |
| Our Work | `our-work` | `page.portfolio` |
| About | `about` | `page.about` |
| Request a Quote | `request-a-quote` | `page.quote` |
| Corporate Gifts DFW | `corporate-gifts` | `page.corporate-gifts` |
| Bulk Orders / Bulk Engraving | `bulk-orders` | `page.bulk-orders` |
| Branded Merchandise DFW | `branded-merchandise` | `page.branded-merchandise` |
| Custom Engraving Dallas | `custom-engraving` | `page.custom-engraving` |
| Promotional Products DFW | `promotional-products` | `page.promotional-products` |
| FAQ | `faq` | `page.faq` |

### Форма Request a Quote

Форма реализована на нативной Shopify contact form. В ней уже есть:

- Name, Company, Email, Phone;
- тип проекта, количество, deadline, budget range;
- ссылка на logo/artwork (обновление 12 сентября: настоящий file upload требует приложения/обработчика);
- pickup / delivery / shipping;
- notes;
- сообщение об успешной отправке.

### SEO, AEO и аналитика

- Sitewide LocalBusiness JSON-LD: Elma Vada Studio, Plano, Texas, DFW, услуги и social links.
- FAQPage JSON-LD для FAQ и ключевых посадочных страниц с вопросами.
- Настройки Google Search Console, GA4 и Meta Pixel добавлены в **Theme settings → Analytics & verification**.
- Внутренние ссылки с основных страниц и футера ведут на SEO-посадочные страницы.

### Редактирование без кода

В Shopify Customizer уже можно редактировать:

- Hero carousel и все 3 слайда;
- главное меню Header;
- Business Solutions: карточки, тексты, порядок и ссылки;
- Portfolio: до 12 карточек, фотографии, подписи, порядок;
- Footer: текст, контакты, area served и отдельные menus;
- цвета, favicon, Instagram/Etsy, verification code, GA4 и Meta Pixel;
- Featured products: выбрать коллекцию и число товаров на главной.

### Каталог Shopify

- Добавлены шаблоны `/collections/all` и карточка товара.
- Товар отображает фото, описание, цену, варианты, количество и Add to cart.
- На главной есть editable section **Featured products**: после выбора collection товары появятся автоматически.

## 3. Что необходимо сделать в Shopify Admin

### Шаг 1 — проверить активную тему

1. Откройте **Online Store → Themes**.
2. В блоке **Current theme** должна быть именно тема Elma Vada B2B, а не старая Etsy/product-тема.
3. Откройте сайт в incognito и убедитесь, что в шапке есть B2B-меню.

Если на обычном домене видна старая навигация (`Engraved Pens`, `Chopsticks` и т.п.), новая тема не является Current theme этого магазина либо домен подключён к другому магазину.

### Шаг 2 — создать и открыть все страницы

Для каждой строки из таблицы выше:

1. **Content → Pages → Add page**.
2. Введите Title.
3. Нажмите **Save**.
4. Внизу откройте **Search engine listing → Edit** и задайте URL handle.
5. В поле **Theme template** выберите template из таблицы.
6. В Visibility установите **Visible**.
7. Save и откройте URL в incognito.

Минимум для первого запуска: `business-solutions`, `production-capabilities`, `industries`, `our-work`, `about`, `request-a-quote`.

### Шаг 3 — собрать Navigation

В **Content → Menus → Main menu** создайте ровно такую структуру:

1. Business Solutions → Page: Business Solutions
2. Production Capabilities → Page: Production Capabilities
3. Industries We Serve → Page: Industries
4. Our Work → Page: Our Work
5. About → Page: About
6. Request a Quote → Page: Request a Quote

Не вводите ссылки вручную: выбирайте объект **Page** в picker, чтобы Shopify сам подставил корректный URL.

В **Customize → Header** выберите это меню в поле **Main menu**.

Создайте также два меню:

- **Services:** Corporate Gifts, Bulk Orders, Branded Merchandise, Custom Engraving, Promotional Products, FAQ.
- **Company:** Business Solutions, About, Production Capabilities, Industries, Our Work, Request a Quote.

В **Customize → Footer** назначьте их полям **Services menu** и **Company menu**.

## 4. Контент-план: что и где заполнять

### A. Hero carousel — 3 слайда

Путь: **Customize → Home page → Hero carousel**.

| Слайд | Цель | Текст/CTA | Нужная фотография |
|---|---|---|---|
| 1. Production studio | Сразу объяснить, кто вы | `Local DFW Production & Branding Studio`; Request a Quote / View Our Work | Лучшее широкое фото реального оборудования или мастерской, в работе человек и станок. |
| 2. Corporate gifts | Показать premium B2B gifting | `Gifts Your Team and Clients Keep`; Explore Corporate Gifts | Лайфстайл-композиция из брендированных gift items: pens, drinkware, boxes; чистый корпоративный кадр. |
| 3. Bulk orders | Доказать масштаб и надёжность | `Built for Business-Scale Orders`; Explore Bulk Orders | Стол/стеллаж с одинаковыми изделиями, упаковкой или процессом серийной гравировки. |

Рекомендация: горизонтальные оригиналы от **1600 × 1000 px**, светлые/контрастные, без текста, без водяных знаков. Главное лицо/оборудование держите ближе к правой части кадра: текст расположен слева.

### B. Главная — заполнение секций

| Секция | Что заменить/проверить | Нужный контент |
|---|---|---|
| Stats / Trust | Подтвердить цифры | Не используйте `thousands` и `5,000+`, если это не соответствует фактам. Добавьте реальное число завершённых заказов, годы опыта/оборудование. |
| Industries | Уточнить отрасли | Оставить только те сегменты, с которыми действительно работаете: HR, real estate, medical, construction, inspection, hospitality, events и т.д. |
| Business Solutions | Карточки в Customizer | По одной понятной причине купить: corporate gifts, employee appreciation, client gifts, event merchandise, onboarding kits, promotional products. Каждой карточке — правильная SEO-ссылка. |
| Production Capabilities | Проверить станки/материалы | Указывайте только реально доступные методы: CO₂, fiber, UV, glass. Для каждого метода — материал, сильная сторона и пример продукта. |
| Why Choose Us / Comparison | Доказательства вместо общих слов | Local production, samples, proofing, QC, communication, deadline control. Подкрепить production-фото и, при наличии, отзывами. |
| Portfolio | Загрузить настоящие кейсы | Минимум 6, лучше 10–12 фотографий. Для каждого — понятная подпись с client type, quantity, material and method. |
| How It Works | Проверить процесс | Quote → product/method → digital proof → production/QC → pickup/delivery/shipping. |
| Featured products | Выбрать collection либо скрыть | Если магазин пока работает как service-first B2B site, не добавляйте случайные розничные товары. Покажите только curated corporate-ready collection. |

### C. Обязательные реальные фотографии

Приоритет загрузки:

1. Hero slide 1 — оборудование/производство.
2. Hero slide 2 — премиальные корпоративные подарки.
3. Hero slide 3 — большой тираж или упаковка.
4. Portfolio — 6–12 реальных проектов.
5. About — команда, основатель/основательница, мастерская.
6. Capabilities — отдельные close-up кадров: fiber on metal, CO₂ on wood/acrylic, UV print, glass engraving.
7. Trust/quality — proofing, QC check, packing, local pickup.

Для каждого фото заполните понятный **alt text** в Shopify, например:

- `Fiber laser engraving company logo on stainless steel tumbler in Plano Texas`
- `Bulk branded pens packaged for a corporate employee appreciation order`
- `UV printed acrylic awards produced at Elma Vada Studio`

Не используйте сток как главное доказательство возможностей. Сток допустим только временно, пока вы не замените его реальными photos.

### D. Тексты на посадочных страницах

Для каждой страницы проверьте:

- H1 точно отражает страницу и географию при необходимости: `Corporate Gifts in DFW`, `Custom Engraving in Dallas`.
- Первый абзац отвечает напрямую: что делаете, где, для кого, минимальный/типичный объём.
- H2 по возможности оформлены как вопросы или прямые ответы на пользовательский интент.
- Внутри есть CTA на quote form.
- Нет неподтверждённых обещаний: «within 24 hours», «thousands of orders», определённый срок, техника или материал — только если это факт.

## 5. Контент для доверия, которого ещё не хватает

ТЗ просит не просто утверждения, а подтверждения. Нужно собрать:

| Материал | Где использовать | Что подготовить |
|---|---|---|
| Реальные отзывы | Главная, About, Corporate Gifts | 3–6 коротких отзывов, имя/компания, ссылка на источник (Etsy, Google, marketplace). Получите разрешение на публикацию. |
| Etsy/Google Business proof | Trust, footer, About | Ссылка на профиль и, если есть, средний рейтинг/количество отзывов только с актуальными данными. |
| Case studies | Portfolio / Our Work | Client type, задача, quantity, material, method, result + 2–4 фото. Не раскрывать клиента без разрешения. |
| Founder/team story | About | Кто отвечает за производство, опыт, подход к QC, фото реального человека/команды. |
| Сертификаты/оборудование | About / Capabilities | Только реальные сертификаты, training, supplier/brand references и ссылки, которые разрешены к публикации. |
| Google Business Profile | Footer / Local SEO | Создать/проверить профиль, единое имя/город/контакты, link. |

Не добавляйте вымышленные logos клиентов, fake testimonials, фиктивные сертификаты, либо утверждения об официальном партнёрстве с поставщиком без разрешения.

## 6. SEO и analytics: заполнить до запуска

Путь: **Online Store → Themes → Customize → Theme settings**.

| Поле | Что вставить |
|---|---|
| Google Search Console verification code | Только значение verification code, не весь `<meta>` тег. |
| GA4 measurement ID | Значение вида `G-XXXXXXXXXX`. |
| Meta Pixel ID | Только числовой ID пикселя. |
| Instagram / Etsy | Полные URL реальных профилей. |
| Favicon | Квадратный PNG с узнаваемым знаком EV, минимум 512 × 512 px. |

После подключения:

1. Откройте сайт в incognito и проверьте GA4 Realtime.
2. В Google Search Console пройдите verification и отправьте sitemap Shopify: `/sitemap.xml`.
3. В Meta Events Manager проверьте PageView.
4. Пропишите уникальные SEO title и meta description для ключевых pages в **Search engine listing**.

## 7. Товары и коллекции

Тема поддерживает retail/catalog workflow, но B2B позиционирование должно остаться главным.

1. **Products → Add product**: title, B2B-описание, реальные фото, цена (или contact-for-price workflow), варианты, SKU, inventory.
2. **Products → Collections → Create collection**: например `Corporate gifts`, `Branded drinkware`, `Engraved pens`.
3. В **Customize → Home page → Featured products** выберите curated collection.
4. Не включайте на главную полный старый Etsy-каталог, если товары не соответствуют B2B-позиционированию.

## 8. Что требует дополнительной доработки, если нужно

Это не блокирует запуск, но повысит конверсию:

- автоматический email-ответ на Request a Quote (Shopify Flow либо email-service);
- отдельный блок реальных testimonials с ссылками на источник;
- case study template с полями client / quantity / material / method / result;
- отдельный contact/pickup page с реальными часами и инструкцией;
- custom product quote flow вместо обычного Add to cart для high-volume products;
- оптимизация Google Fonts: локальная загрузка/Shopify-hosted font при необходимости максимального PageSpeed;
- проверка mobile tap targets, contrast и всех форм на реальном телефоне.

## 9. Финальный launch checklist

### Контент

- [ ] Загружены 3 hero-изображения.
- [ ] Загружены минимум 6 реальных portfolio photos.
- [ ] У каждой фотографии есть полезный alt text.
- [ ] Везде заменены placeholder/общие подписи на фактические кейсы.
- [ ] Подтверждены цифры, сроки, материалы и capabilities.
- [ ] Добавлены реальные отзывы/соцдоказательства либо временно удалены неподтверждённые claims.

### Shopify setup

- [ ] Новая тема стоит в **Current theme** нужного магазина.
- [ ] Все 12 страниц созданы, template назначен, Visibility = Visible.
- [ ] Main menu выбран в Header; Services и Company menus выбраны в Footer.
- [ ] В incognito открываются все пункты меню и CTA без 404.
- [ ] Quote form успешно отправляет тестовую заявку.
- [ ] Если используются товары: products active, published to Online Store, collections созданы.

### SEO / measurement

- [ ] Заполнены GSC, GA4, Meta Pixel и social URLs.
- [ ] LocalBusiness schema проверена в Rich Results Test / Schema Validator.
- [ ] FAQ schema есть только на страницах с видимыми FAQ.
- [ ] Проверены title, meta description и canonical для ключевых страниц.
- [ ] Google Business Profile и NAP-данные совпадают с сайтом.

### UX / quality

- [ ] Проверены Home, все pages, catalog, product page, cart и quote form на mobile.
- [ ] Hero carousel: стрелки, точки, ссылки, autoplay и 3 фото работают.
- [ ] Все изображения сжаты и не тяжелее необходимого; предпочтительно WebP/JPEG.
- [ ] Нет ссылок на скрытые, несуществующие или тестовые страницы.

## 10. Рекомендуемый порядок работы

1. Создать и сделать Visible ключевые 6 страниц.
2. Настроить Main menu и проверить ссылки в incognito.
3. Заполнить Hero carousel тремя настоящими B2B-фотографиями.
4. Заполнить Portfolio минимум шестью реальными кейсами.
5. Добавить контент About: команда, location, expertise, real proof.
6. Заполнить GA4 / GSC / Meta Pixel и проверить события.
7. Добавить отзывы и Google Business Profile link.
8. Провести mobile + quote form + navigation smoke test.
9. После проверки — включить публичный трафик / кампании.

---

## 11. Дополнение по Document.pdf / Document-2.pdf

Оба приложенных PDF идентичны. Они расширяют исходное ТЗ: фокус не только на общем B2B-производстве, но на персонализированных программах признания, client gifting и повторяемом процессе заказа.

### Критические недостающие элементы

| Приоритет | Чего нет / что нужно проверить | Что сделать |
|---|---|---|
| Высокий | **Client Milestone Calendar** landing page | Создать `/pages/client-gifting` для real estate, mortgage и financial services. Template должен включать closing gifts, anniversaries, referral thank-yous, top-producer awards и CTA на mockup/call. |
| Высокий | **Service Awards & Recognition** landing page | Создать `/pages/service-awards` для healthcare, hospitality и крупных работодателей: monthly awards, years-of-service, appreciation weeks, donor recognition. |
| Высокий | Контактные данные для procurement | В футере сейчас можно редактировать email и location, но нет телефона и рабочих часов; default email — Gmail. Добавить телефон, доменную почту (например, `hello@...`), полный город/адрес или pickup instructions, часы. |
| Высокий | Реальные proof и social proof | Нет подтверждённых на сайте цифр `[N],000+ orders shipped`, average rating, ссылок на Etsy/Google Reviews, коротких цитат клиентов. Собрать реальные значения и письменные разрешения. |
| Высокий | Реальные фото вместо AI/стока | Три hero images технически готовы как временные B2B-визуалы, но PDF прямо рекомендует реальные фото студии, оборудования и выполненных проектов. Заменить AI/stocks на production photos до рекламного запуска. |
| Средний | Лестница CTA | Сейчас есть Quote form. Добавить отдельные пути **Request a free mockup**, **Request a physical sample**, **Book a 15/20-minute call**. У каждого CTA нужен понятный next step и автоматический/ручной процесс обработки. |
| Средний | Страница / блок Milestone pricing | Если реально продаётся annual recognition program, добавить прозрачное pricing message: `Programs from $59 per person / year · Annual programs start at $1,800` — только после подтверждения бизнеса. |
| Средний | About: реальная история и 10 lasers claim | About template существует, но его нужно наполнить: founder/team, studio photo, verified equipment count, expertise и process. Не писать `Ten lasers under one roof`, пока это не подтверждено. |
| Средний | Compliance content | Опционально создать short Compliance FAQ: real estate (RESPA/IRS), financial firm policy/FINRA, healthcare/Stark, corporate gift-acceptance. Нужны первоисточники, ссылка и фраза `not legal or tax advice`; этот контент требует юридической проверки до публикации. |
| Низкий / сезонный | Q4 campaign banner | До 31 October 2026 добавить временный promo banner на Home и Milestone page. Скидка/offer должны быть фактически утверждены бизнесом. |

### Точные тексты, которые предлагает PDF

Ниже — не факты, а рекомендуемый copy. Использовать после подтверждения business claims.

- **Tagline:** `Personalized Gifts for People-First Teams`.
- **Hero phrase:** `Gifts for moments that were earned`.
- **Our Work intro:** `Every piece below was produced in our Plano studio — engraved, packed and delivered by the same team that would run your order.`
- **Capabilities intro:** `Ten lasers under one roof. Nothing leaves the building — which is why artwork changes take hours, not vendor emails.` Только если количество и in-house workflow верны.
- **Quote intro:** `Already know what you need? Tell us the occasion, quantity and date — we reply within one business day. Not sure yet? Start with a free mockup instead.` Только если reply SLA и mockup действительно обеспечиваются.

### Client Gifting: что должно быть на новой странице

- H1: `Client Gifts That Outlive the Transaction`.
- Аудитория: realtors, mortgage professionals, financial advisors.
- 4 сценария: Closing Gifts, Home & Client Anniversaries, Referral & Partner Thank-Yous, Top Producer Awards.
- 4 starting products: engraved cutting board, personalized client pen, crystal keepsake, top producer award.
- Уникальное обещание: имя получателя, а не только logo; reorder from approved file; работа в рамках gift policy клиента.
- Для повторяемой программы: квартальная сверка roster — new hires/additions and departures changes must be confirmed by business process.

### Service Awards: что должно быть на новой странице

- H1: `Recognition Programs That Run Every Month, Not Once a Year`.
- Аудитория: hospitals, hotels, multi-site employers.
- 4 сценария: staff recognition, years of service, appreciation weeks, donor/named recognition.
- Proof points: individually named, monthly cadence, multi-material, one facility or whole system — только при фактической возможности.
- Дополнительно для hospitality: VIP guest amenities with recipient name.

### Микрокопия и визуальная QA из PDF

- Проверить, что шаг процесса отображается читабельно: `Mockup → Sample → Proof → Production → Fulfillment`.
- Не допускать наложения CTA на steps, cards или headings на desktop/mobile.
- Проверить на странице milestone, что microcopy соответствует CTA: для call — `20 minutes, no preparation needed`; для mockup — срок подготовки, если он реален.
- Перед запуском проверить по реальному preview mobile layout, потому что PDF описывает статичный дизайн, а не Shopify implementation.
- Если в portfolio используются Sony, Intel × Arrow McLaren, St. Regis, Coastal Wealth или другие клиентские имена/фото, получить письменное разрешение до публикации.

### Вывод по PDF

Тема закрывает базовое B2B-ТЗ, но PDF меняет следующий приоритет работы: сначала реальные контакты и social proof, затем две целевые программы (Client Gifting и Service Awards), затем CTA/process для mockup/sample/call. Это важнее, чем добавлять ещё общие SEO-страницы.

---

## Техническая проверка

Последний Theme Check не показывает ошибок. Имеются ожидаемые warnings о внешних ресурсах: Google Fonts и optional GA4/Meta scripts. Это не ломает сайт, но может быть оптимизировано отдельно для максимального performance score.
