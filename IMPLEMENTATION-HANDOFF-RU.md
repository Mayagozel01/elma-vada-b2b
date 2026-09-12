# Elma Vada — implementation handoff

> Дополнение 12 сентября 2026: этот отчёт сохранён как история предыдущего этапа. Новая полная инструкция и список выполненного — [SHOPIFY-CONTENT-GUIDE-RU.md](SHOPIFY-CONTENT-GUIDE-RU.md), фотографии по страницам — [PHOTO-UPLOAD-MAP-RU.md](PHOTO-UPLOAD-MAP-RU.md). Шаблоны теперь JSON, у Our Work есть настоящие настройки Photo, а встроенная форма принимает ссылку на artwork вместо file input.

Дата: 11 сентября 2026  
Статус: безопасные изменения в коде выполнены и проверены Shopify Theme Check.

## Что сделано в коде

### 1. Новые B2B-посадочные страницы

Добавлены два шаблона, которых не было в исходной теме:

| Страница | Файл | Цель |
|---|---|---|
| Client & Relationship Gifting | `templates/page.client-gifting.liquid` | Closing gifts, client milestones, referral thank-yous, top-producer awards для real estate, mortgage и financial services. |
| Service Awards | `templates/page.service-awards.liquid` | Monthly staff recognition, years-of-service, appreciation weeks, donor recognition для healthcare, hospitality и крупных работодателей. |

Обе страницы используют безопасные CTA на Request a Quote. Цены, legal/compliance claims и неподтверждённые цифры в них намеренно не добавлены.

### 2. Контакты в футере

В Footer Customizer добавлены поля:

- Phone;
- Business hours;
- уже существующие Email, Location и Service area.

Телефон отображается как кликабельный `tel:` link, только когда поле заполнено.

### 3. Отзывы без вымышленных данных

Добавлена секция `Customer testimonials`:

- до 6 отзывов;
- review text, customer name, company/role;
- ссылка на оригинальный источник.

Секция скрыта, пока не добавлен хотя бы один блок — фейковые отзывы не публикуются.

В Trust Bar убрана неподтверждённая жёстко заданная цифра `4.9 / 5 Rating (10k+)`. Вместо неё появились editable поля: review headline, detail и verified review profile link.

### 4. Quote form / CTA

- Устранён русский текст на англоязычной странице Request a Quote.
- В Project Type добавлены `Free Digital Mockup` и `Physical Sample`.
- Текст формы теперь явно предлагает запросить digital mockup или physical sample.

Это добавляет путь заявки. Автоматический mockup, physical sample и booking call требуют отдельного бизнес-процесса и не создаются темой автоматически.

### 5. Перелинковка

В footer и related services добавлены:

- Client Gifting → `/pages/client-gifting`;
- Service Awards → `/pages/service-awards`.

### 6. Исправления качества контента

- Исправлена CSS-опечатка `2/5rem` → `2.5rem` в Portfolio.
- Убран двуязычный русский/английский абзац на Our Work.
- Hero carousel и три B2B-image assets были сделаны раньше и остаются в теме как временные визуалы.

## Что нужно добавить локально

Это материалы, которые нельзя и не следует выдумывать в коде.

### Обязательные материалы

- Реальный рабочий телефон.
- Доменный рабочий email вместо Gmail, если доменная почта настроена.
- Рабочие часы, точный город/адрес или pickup instructions.
- 3–6 customer-approved reviews: текст, имя, компания/роль, URL оригинального review.
- Подтверждённые рейтинг и число заказов, если они будут показываться.
- Письменное разрешение на любые client names, client logos, кейсы и фотографии.
- Реальные studio / team / equipment photos.
- 6–12 реальных case-study photos: общий кадр, close-up personalization, packaging/QC, finished batch.

### Подтверждения до публикации claims

Проверьте у владельца бизнеса до размещения на сайте:

- реальные volumes и MOQ;
- actual production methods and materials;
- срок ответа на заявку;
- сроки производства;
- количество лазеров;
- наличие free mockup / physical sample / booking call;
- annual program pricing;
- local pickup/delivery availability;
- разрешение на mention клиентов Sony, Intel, St. Regis, Coastal и других.

### Не добавлено намеренно

- Legal/compliance advice (RESPA, IRS, FINRA, Stark): нужен review компетентного юриста/CPA и ссылки на authoritative sources.
- Q4 discount/banner: нужен утверждённый offer, даты и правила.
- Автоответ на form: нужен Shopify Flow или подключённый email CRM/service.

## Что сделать в Shopify Admin

### 1. Создать две новые Pages

Перейдите в **Content → Pages → Add page** и создайте:

| Title | URL handle | Theme template |
|---|---|---|
| Client & Relationship Gifting | `client-gifting` | `page.client-gifting` |
| Service Awards & Recognition | `service-awards` | `page.service-awards` |

Для каждой страницы:

1. Save.
2. Внизу открыть **Search engine listing → Edit** и установить указанный handle.
3. В **Theme template** выбрать template из таблицы.
4. Visibility установить **Visible**.

### 2. Обновить меню

В **Content → Menus**:

- не добавляйте новые две страницы в верхнее main menu, если хотите сохранить согласованный короткий header;
- добавьте их в Services menu;
- назначьте Services menu в **Customize → Footer → Services menu**.

### 3. Заполнить Footer

**Customize → Footer**:

- Email;
- Phone;
- Location / Service area;
- Business hours;
- Services menu и Company menu.

**Theme settings → Social Media**:

- Instagram URL;
- Etsy URL.

### 4. Добавить отзывы

**Customize → Home page → Add section → Customer testimonials**:

1. Добавить блок для каждого customer-approved review.
2. Заполнить quote, name, company/role.
3. Добавить URL Etsy/Google/marketplace review, если он доступен.
4. В **Trust Bar** указать только фактические rating/order count и ссылку на review source.

### 5. Заменить визуалы

- Hero carousel: загрузить реальные фотографии поверх текущих AI placeholders.
- Home Portfolio: загрузить 6–12 реальных project photos.
- Our Work page: текущие placeholders и example case details должны быть заменены подтверждёнными фото/данными до публичного запуска.

### 6. Настроить запросы

На странице **Request a Quote** новые варианты уже будут приходить в `Project Type`:

- Free Digital Mockup;
- Physical Sample;
- остальные типы проектов.

В Shopify Flow или вашей CRM настройте разные ответы/labels для этих двух вариантов. Если Flow не используется, назначьте ответственному сотруднику правило: проверять новые contact form submissions и отвечать вручную.

### 7. Analytics

**Customize → Theme settings → Analytics & verification**:

- Google Search Console verification code;
- GA4 measurement ID;
- Meta Pixel ID.

## Проверка перед публикацией

- [ ] Все page URLs открываются в incognito без 404.
- [ ] New pages `client-gifting` and `service-awards` are Visible.
- [ ] Header, footer, CTA и related-services links не ведут на скрытые страницы.
- [ ] Contact form доставляет тестовую заявку с `Free Digital Mockup` и `Physical Sample`.
- [ ] Footer phone/email/hours заполнены.
- [ ] Нет placeholder photos, fake claims или неразрешённых client references.
- [ ] Mobile проверен на iPhone/Android: hero carousel, forms, dropdowns, navigation.
- [ ] GA4 realtime и Meta PageView подтверждены после подключения.

## Технический результат

- JSON templates и section schemas валидны.
- Shopify Theme Check: **0 errors**.
- Остаются warnings про внешние Google Fonts и optional GA4/Meta resources.
- Отдельный старый файл `hero.liquid` в корне проекта не используется Shopify; рабочий carousel находится в `sections/hero.liquid`. Его лучше удалить или перенести вне theme folder после того, как вы убедитесь, что открытая в IDE копия больше не нужна.
