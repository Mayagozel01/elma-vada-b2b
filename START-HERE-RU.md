# Начните здесь — Elma Vada: настройка каждой страницы

Обновлено: 25 сентября 2026, на основе экспорта 24SEP2026-0517pm. **Начните с [полных инструкций по страницам](docs/page-media/README.md): в каждой есть все секции, карточки, поля, медиа и alt.** Разделы ниже оставлены как справочник по общим требованиям; актуальный порядок и значения блоков смотрите в отдельных файлах страниц.

Это инструкция к работе в Shopify, а не отчёт о завершённом запуске. Здесь сверены локальные шаблоны, PDF-макет Elma_Vada_Website_Mockup_V4_FINAL_CLEAN_v2 и последующие требования Дарьи из переписки. Новые требования важнее старого PDF: Dallas, только лазерная гравировка, 1–5K+ единиц, новый email, видео без автозапуска. Показатели бизнеса предоставила Дарья; независимая проверка цифр и статусов маркетплейсов не проводилась.

**Сохранность:** локальные файлы темы заменены экспортом `theme_export__elmavada-com-elma-vada-b2b-2026-09-15-banner__24SEP2026-0517pm.zip`. Его настройки, тексты, ссылки на медиа и подключения приложений сохранены. Резерв предыдущего локального кода: `output/backups/pre-import-24sep2026/`. Формы приложения, SEO Pages и меню хранятся отдельно в Shopify. Не удаляйте изображения и видео из Shopify Files. Если после этого экспорта вы меняли тему в Shopify, перед загрузкой локальной версии понадобится новый экспорт.

В локальном коде добавлен выбор изображения или видео в медиа-блоках внутренних страниц и карточках. Видео запускается по нажатию Play, без звука, с обложкой. Новые поля появятся в Shopify после загрузки обновлённой темы. Сначала проверьте её как черновик.

**Архив для Shopify:** [elma-vada-24sep2026-media-update.zip](output/elma-vada-24sep2026-media-update.zip). В нём только 69 файлов темы; инструкции, скрипты и резервные копии не включены. Проверка упакованной темы: 0 ошибок, 5 предупреждений об имеющихся внешних шрифтах/аналитике. Видеоплеер проверен в локальном Chrome на ширинах 375, 768 и 1280 px; после загрузки проверьте свои реальные ролики и форму в предпросмотре Shopify.

**Нужен готовый список фото для загрузки?** Откройте [отдельные карты медиа по страницам](docs/page-media/README.md). В них есть прямые ссылки на проверенные файлы Google Drive, точные Alt text и брифы для тех кадров, которых в папках нет. Эта карта не меняет магазин сама.

## С чего начать

1. Сначала один раз проверьте [общие настройки](#shared).
2. Если клиенты ещё не могут отправлять логотип — начните с [Request a Quote](#request-a-quote).
3. Затем [главная](#home), основные страницы и остальные направления по списку ниже.
4. После каждой страницы — Save и проверка как посетитель. Создавать новую тему или заново публиковать уже активную тему ради SEO не нужно. Изменения активной темы после Save могут сразу стать публичными.

<a id="contents"></a>
## Оглавление: выберите страницу

| Страница в админке | Шаблон в редакторе | Инструкция |
|---|---|---|
| Главная / Home page | Home page | [Главная](#home) |
| Business Solutions | solutions | [Решения для бизнеса](#business-solutions) |
| Production Capabilities | capabilities | [Производство](#production-capabilities) |
| Industries | industries | [Отрасли](#industries) |
| Our Work | portfolio | [Работы и кейсы](#our-work) |
| About | about | [О компании](#about) |
| Request a Quote | quote | [Заявка](#request-a-quote) |
| Corporate Gifts | corporate-gifts | [Корпоративные подарки](#corporate-gifts) |
| Bulk Orders | bulk-orders | [Партии изделий](#bulk-orders) |
| Personalized Merchandise / Branded Merchandise | branded-merchandise | [Персонализированные товары](#branded-merchandise) |
| Custom Engraving | custom-engraving | [Лазерная гравировка](#custom-engraving) |
| Promotional Products | promotional-products | [Промоподарки](#promotional-products) |
| FAQ | faq | [Вопросы и ответы](#faq) |
| Client Gifting / Client & Executive Gifts | client-gifting | [Подарки клиентам](#client-gifting) |
| Service Awards | service-awards | [Награды за стаж](#service-awards) |
| Employee Recognition | employee-recognition | [Признание сотрудников](#employee-recognition) |
| Events & Awards | events-awards | [Мероприятия и награды](#events-awards) |
| Onboarding & Relocation | onboarding | [Welcome-наборы](#onboarding) |
| Milestone Program | milestone-program | [Регулярная программа](#milestone-program) |
| Get a Free Mockup | free-mockup | [Бесплатный макет](#free-mockup) |
| Schedule a Consultation | book-a-call | [Консультация](#book-a-call) |

В списке Pages ищите обычное название с пробелами: **Business Solutions**, а не `business-solutions",`. Используйте лупу над таблицей или следующую страницу списка. Не создавайте дубли из-за того, что не видите строку на первом экране.

<a id="where"></a>
## Где менять текст, фото и SEO — это три разных места

| Что вы меняете | Где в Shopify | Что туда вставлять |
|---|---|---|
| Название записи страницы | [Online Store → Pages](https://admin.shopify.com/store/elmavada/pages) → нужная страница → верхнее Title | Короткое название, например Request a Quote |
| Content — большое поле под Title | Там же | Обычный текст страницы, **не Meta description**. В проверенных B2B-шаблонах контент собирается из секций; заполнять это поле ради SEO не нужно. Не удаляйте содержимое других, старых страниц вслепую |
| SEO внутренней страницы | Внизу той же записи → Search engine listing → Edit / карандаш | Отдельно Page title и Meta description из соответствующего раздела ниже |
| Фото, видимый H1, абзацы, карточки | Online Store → Themes → Edit theme → верхний переключатель Pages → нужный шаблон | Heading, Introduction, Text, Photo и ссылки секций |
| SEO главной | Редактор темы → ⚙️ Theme settings → SEO & social preview | Home SEO title и Home meta description — **только для главной**, даже если справа открыта другая страница |
| Форма с загрузкой файла | Apps → Forms → ваша существующая форма | Поля, уведомления и текст кнопки приложения; это не настройки старой встроенной формы |

**Название страницы ≠ шаблон ≠ URL.** Например: Business Solutions → шаблон solutions → ожидаемый адрес `/pages/business-solutions`. Надпись Assigned to 1 page подтверждает назначение шаблона, а не нужный адрес или доступность посетителям.

Для каждой внутренней страницы проверьте **Visible**, Template и URL handle в Search engine listing. В handle — только часть после `/pages/`, без кавычек и запятой. Ради SEO-текстов адрес менять не надо. Если адрес не совпадает со ссылками сайта, сначала определите основную страницу, затем исправьте ссылки либо handle с сохранением нужного перенаправления со старого URL. Не перенаправляйте все отсутствующие страницы на главную.

Существующие пары quote / Request a Quote, Client Gifting / Client & Executive Gifts и Branded Merchandise DFW / branded-merchandise нужно сверить по URL и назначению. **Не удаляйте их по одному лишь названию.**

<a id="shared"></a>
## Общие настройки — один раз для всех страниц

### Header, Footer и контакты

- [ ] **Header → Logo image**: ваш логотип, читаемый на светлом фоне; проверьте ширину на телефоне.
- [ ] **Footer → Logo image**: вариант логотипа для тёмного фона.
- [ ] Верхнее меню: **Business Solutions / Production Capabilities / Industries / Our Work / About** и кнопка **Request a Quote** → `/pages/request-a-quote`.
- [ ] Остальные услуги — футер, Business Solutions или Related services. Milestone Program обязательно имеет входящие ссылки.
- [ ] В **Theme settings → Business & contact** проверьте значения ниже.

| Поле | Значение |
|---|---|
| Public email | daria@elmavada.com |
| Phone | +1 929-509-0117 — номер из переписки; проверьте приём звонка |
| Street and suite | 18383 Preston Rd, #202 |
| City / State / ZIP | Dallas / TX / 75252 |
| Service area | Dallas–Fort Worth |
| Business hours | Только фактические часы ответа/работы |
| WhatsApp number | 19295090117 **только если этот номер подключён к WhatsApp** |
| Show Text Us for this phone | Включить, только если номер принимает SMS |
| Real studio / team photo | Настоящая студия или команда, не логотип и не AI-визуализация |

- [ ] Проверьте звонок, SMS и WhatsApp с телефона. Text Us не гарантирует iMessage.
- [ ] Для оперативных вопросов используйте один обслуживаемый чат: Shopify Inbox или WhatsApp. Виджет не должен закрывать кнопку формы на мобильном.
- [ ] В футере удалите ссылку Etsy, старый Gmail, Los Angeles/старый адрес, UV printing и минимум 10 единиц. Карту открывайте и проверяйте на новый адрес.
- [ ] Текст футера: **Personalized corporate gifts and in-house laser engraving in Dallas–Fort Worth. From individual gifts to orders of 5,000+ units.**
- [ ] Почта в теме не меняет получателя заявок. В Forms → Email notifications проверьте фактический адрес. Если указан старый Gmail, проверьте store email в Settings → General → Store contact details. Не меняйте email входа в аккаунт ради формы.
- [ ] Изменения контента делайте в редакторе Shopify, а не в `config/settings_schema.json`: файл определяет поля и defaults, а не заменяет сохранённые значения.

Если общие разделы пропали и в Shopify `settings_schema.json` содержит `[]`, это отдельное исправление кода после резервной копии. Используйте совместимый [локальный schema](config/settings_schema.json), но **не заменяйте settings_data.json** старой версией. Для поддержки предусмотрен `theme_support_email`, а не URL вида `mailto:`.

### Обязательные формулировки Дарьи

- [ ] Основное предложение — **personalized corporate gifts / custom engraved gifts / in-house laser engraving**. Branded допустимо для описания логотипа, но не вместо персонализации во всём оффере.
- [ ] **1–5K+ units per order** или **from 1 to 5,000+ units**. Не «от 10» и не «5,000 за один день».
- [ ] **Custom engraved gifts from $9.99 to $119.99** — только если этот диапазон всё ещё соответствует доступным подаркам; это не цена любой индивидуальной работы.
- [ ] Только лазерная гравировка. **UV laser engraving не равно UV printing.** UV-лазер оставьте, если он действительно используется; цветную печать и печать на футболках не предлагайте.
- [ ] Бесплатный макет не подменяет утверждённый production proof. До изготовления согласуются имена, даты, написание и размещение.
- [ ] Физический образец по запросу и бесплатная ручка на согласованной очной встрече — разные предложения. Не обещайте бесплатную пересылку любого образца всем.
- [ ] Срок mockup «за 24 часа» из старого макета не публикуйте без отдельного подтверждения Дарьёй возможности соблюдать его.

**Скорость — единый текст для Home, Capabilities и Bulk Orders:**

> Small orders ready in as little as 1 business day.*  
> Up to 1,000 engraved pens produced in just 1 business day.*

Рядом, в **Visible terms / turnaround disclaimer**, оставьте:

> *Turnaround time varies by product, quantity, design complexity, artwork approval, and inventory availability.*

Это срок производства, не доставки. Не скрывайте оговорку в футере.

**Доверие:** в компактном хедере можно оставить `5+ years of experience · 50,000+ happy customers`. В Stats Bar — `5+ Years of Experience`, `10+ Team Members`, `50,000+ Happy Customers`, `100,000+ Engraved Gifts`. Дарья подтверждает актуальность перед публикацией. Не выдавайте клиентов за количество отзывов или исключительно B2B-клиентов. Статусы Etsy Star Seller / eBay Top Rated показывайте только при актуальном подтверждении; Amazon’s Choice связывайте с конкретным отмеченным товаром, не со всей компанией. Никаких придуманных звёзд.

### Правила фото для всех страниц

- **Уже подходящее фото оставьте.** Нет задачи повторно загрузить всё или заполнить каждый слот любой ценой.
- Hero внутренней страницы: одно сильное реальное фото; карточки: 2–4 различающихся сюжета, если нет более подробного списка ниже. FAQ и формы не требуют большого баннера.
- Для карточек удобен единый формат **4:3, около 1200 × 900 px**; это ориентир подготовки, не ограничение Shopify. Для большого hero — качественный исходник примерно 2000 px по длинной стороне с запасом для кадрирования.
- Предметы и гравировка должны оставаться целыми в мобильном кадре. В **B2B content & photos → Photo crop → Show whole product** можно избежать обрезания длинных ручек и наборов.
- На фотографиях не нужны рекламные заголовки поверх изделия. Имена, логотипы и подписи самой гравировки допустимы при разрешении на публикацию.
- **Photo description (alt)** описывает видимый предмет. Пример: `Personalized metal pen in an open gift box`. Не приписывайте Dallas, клиента, материал или производственный метод, если это не подтверждено.
- Подсказка **Photo brief (editor only)** — инструкция для вас, а не описание для клиента.
- В кейсах только реальные заказы. Не включайте **Facts and publication permission confirmed**, пока не проверены факты и разрешения; используйте **Hide cards without photos on storefront**, если без фото кейс не должен выходить.
- Ранее созданные onboarding/promotional/milestone концепты можно использовать как обозначенные **Gift concept**, если комплектация реально возможна. Не выдавайте их за фотографии выполненных заказов. Для Portfolio, отзывов, команды и производства они не подходят. Одно лишь слово concept в alt не заменяет видимую подпись.
- Нет подходящего изображения — выключите **Include photo** у обычной текстовой карточки либо скройте незавершённую секцию. Не оставляйте публичный служебный placeholder. Для услуг не скрывайте единственную ссылку на страницу вместе с фото.

### Как находить одинаково названные блоки

На внутренних страницах секции часто называются одинаково — **B2B content & photos**. Ориентируйтесь на их **Heading**, указанный ниже. Затем раскройте нужную **Photo / content card**.

| Вид блока | Поле фото | Поле текста |
|---|---|---|
| B2B page hero | Include hero photo → Hero photo | Heading / Introduction |
| B2B content & photos → Photo / content card | Include photo → Photo | Title / Text |
| B2B feature & photo | Real photo | Heading / Text / Visible terms |
| Home → Business Solutions → Solution card | Real gift photo | Title / Description |
| B2B quote form | Optional sample photo | Side heading / Side text / Additional information |
| B2B questions & answers | Фото не требуется | Question / Answer |

Названия секций сверены с локальным экспортом; если в Shopify они уже переименованы, найдите блок по содержимому в превью. Новые фото-блоки ниже предлагаются через существующую секцию **Add section → B2B content & photos**, а не объявляются уже установленными.

<a id="common-blocks"></a>
## Общие блоки внутренних страниц

Эти правила применяются к страницам, где соответствующий блок уже есть. Для FAQ и коротких форм не добавляйте длинный процесс ради единообразия.

**How does the project come together?** → текстовые карточки, без обязательных фотографий:

1. **Share the Brief** — Occasion, recipients, quantity, target date and delivery location.
2. **Review the Direction** — Review the free mockup and ask about physical sample options.
3. **Approve the Details** — Confirm the quote, names, dates, artwork and packaging before production.
4. **Produce & Prepare** — Engraving, quality review and packing follow the approved scope; delivery timing is confirmed separately.

Для структуры из PDF можно разделить второй шаг на Mockup и Sample, получив пять карточек. Образец нельзя потерять при сокращении процесса.

**Built for corporate purchasing:** если отдельной секции нет, добавьте короткий текст в Introduction процессного блока, без новых фотографий. Смысл: один ответственный контакт, PO-friendly ordering для одобренных аккаунтов, согласованные макеты для повторных заказов, повторная проверка наличия. Формулировка для вставки после подтверждения Дарьёй:

> One human contact from quote to delivery. PO-friendly ordering for approved accounts. Approved artwork retained for easier reorders; product availability and pricing are reconfirmed.

**Where would you like to go next?** → 2–4 релевантные ссылки, фото не нужны. Ниже указаны рекомендуемые направления. Если текущая подборка уже полезна, сохраните её; уберите повтор одной и той же ссылки. **What do you have in mind?** → короткое предложение и CTA, без обязательной картинки.

**SEO / AEO:** H1 — один основной заголовок в hero. H2 формулируйте вопросами там, где это естественно; утверждённые офферы вроде Meet With Us Face to Face менять на искусственный вопрос не надо. Первый абзац прямо отвечает, что вы предлагаете и кому. В FAQ дайте короткий прямой ответ, затем условия и следующий шаг. Вопросы для каждой страницы ниже — задание для видимых FAQ, не скрытые ключевые слова. Если нужно добавить вопрос, используйте **B2B questions & answers → Add block**.

Не добавляйте JSON-LD в поле Content вручную: сначала проверьте существующую разметку в теме. Подготовленные SEO-тексты помогают описать страницы, но не гарантируют рекомендации Claude или Google. Для AI-функций Google не требуется отдельная «волшебная» разметка; важны доступность и полезный контент. [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features).

<a id="forms"></a>
## Общая проверка формы с логотипом

По вашим скриншотам уже создана **Elma Vada — Quote & Logo Upload** в Shopify Forms. **Не создавайте её заново.** Сначала откройте и проверьте существующую форму.

- [ ] В приложении: форма сохранена и включена; **Upload your logo → File upload**, не текстовая ссылка.
- [ ] SVG и PDF проверить реальной отправкой. Ориентир — файл меньше 20 MB; остальные форматы проверьте по подсказке текущего приложения. В вашем окне был указан и PNG — протестируйте его отдельно.
- [ ] Логотип необязателен: клиент должен иметь возможность обратиться без готового artwork.
- [ ] Поле **How can we help?**: Quote / Free mockup / Physical sample / Consultation / In-person consultation / Gifting calendar audit.
- [ ] Для Quote: Name, Email, Company, Project type/occasion, Quantity, Needed by, Project details; Phone, Budget range, Delivery method и City/ZIP — чтобы не терять поля PDF. Не делайте все поля обязательными; точный состав по страницам ниже.
- [ ] Marketing consent: **Don’t subscribe customers to marketing**.
- [ ] Уведомление сотруднику действительно приходит на daria@elmavada.com; файл доступен. Проверьте вторую заявку от того же email: обе заявки и нужные вложения должны быть найдены.
- [ ] **Success message не является email-автоответом.** Отдельно настройте подтверждение на email клиента и проверьте его без подписки на рекламу. Не используйте рассылку «Welcome subscribers» как замену подтверждению заявки.
- [ ] В редакторе нужного шаблона: **B2B quote form → Add block → Apps → Forms**; выберите/вставьте нужный Form ID. Если уже вставлен, не добавляйте второй.
- [ ] После успешного теста выключите **Show built-in contact form** в настройках B2B quote form. Переключатель ниже **Additional information**, перед **Form heading**. **Remove section не нажимайте:** вместе с секцией может исчезнуть новая форма приложения.
- [ ] Если приложение не выводится — проверьте его app embed и активность формы.

**Важно:** настройки старой формы `Default request type`, `Company is required` и параметры ссылки `?request=sample` не обязаны управлять Shopify Forms. На страницах Mockup и Consultation проверьте выбранный тип в самой форме приложения. Если одна общая форма используется на нескольких страницах, её редактирование меняет все эти встраивания. Разные версии формы нужны только если действительно нужны разные поля/заголовки; используйте отдельные Form ID и понятные имена.

Пример короткого сообщения после отправки:

> Thank you — we’ve received your request. Our team will contact you to discuss the next step.

Пример email-автоответа: тема **We received your Elma Vada request**; текст **Thank you for contacting Elma Vada. We’ve received your request and will review the project details. For additional artwork or questions, reply to daria@elmavada.com. Consultation times and production schedules are confirmed separately.**

Уведомления, согласие и file upload настраиваются в приложении; метаполе клиента может хранить только последнее значение, поэтому оно не заменяет историю заявок. [Shopify Forms: настройки](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/settings/all-forms).

<a id="meeting"></a>
## Общий блок Meet With Us Face to Face

Используется на главной, About, Quote, Free Mockup и Consultation. Каждая секция может иметь собственные сохранённые значения — проверьте все пять.

**B2B feature & photo → Heading:** Meet With Us Face to Face.

**Text — текст Дарьи:**

> Planning gifts for your employees, clients, partners, or an upcoming event? Schedule a complimentary in-person consultation in the Dallas–Fort Worth area.
>
> We’ll discuss your gifting needs, timeline, quantities, and personalization options. You’ll also receive a complimentary pen engraved with your name or company logo as a sample of our work.

**Real photo:** Дарья или реальная команда за встречей, рядом готовая гравированная ручка. Если съёмки встречи нет — настоящая ручка-образец в реальном месте встречи. Не подставлять стоковых людей и не изображать несуществующую студию.

**Primary button:** Schedule an In-Person Consultation. **Primary link:** `/pages/book-a-call?request=in-person`; после перехода проверить тип запроса в приложении. **Show shared business address:** включить. **Visible terms:** Visits are arranged by appointment. We will confirm the meeting details with you.

Не обещать свободный walk-in. На странице самой консультации не оставлять кнопку, которая просто перезагружает ту же страницу: направьте на реально существующий якорь формы или подтверждённый календарь; если такой ссылки ещё нет, временно уберите повторную кнопку.


<a id="home"></a>
## 01. Главная / Home page

**Адрес:** `https://elmavada.com/`. Это не запись в Pages: создавать главную там не нужно. **Редактор:** Home page.

### Тексты и порядок блоков

- [ ] **Hero — photos & video → первый Slide**: Heading = **Corporate Gifts Made Personal**; надзаголовок = **Personalized Corporate Gifts & Laser Engraving**.
- [ ] Основной абзац: **Personalized gifts for milestone celebrations, employee recognition, client appreciation, and company events.**
- [ ] Дополнительная строка: **Get a FREE custom mockup before you order.**
- [ ] Параметры: **Custom engraved gifts from $9.99 to $119.99 · 1–5K+ units per order.** Актуальность цен подтверждает Дарья.
- [ ] Кнопки: **Get a Free Mockup** → `/pages/free-mockup`; **Schedule a Consultation** → `/pages/book-a-call`. Рядом короткое пояснение: **Start with a short request — tell us your occasion, quantity and idea.**
- [ ] В этой версии текст hero берётся из первого слайда и остаётся постоянным; сменяются фото/видео. Не создавайте три H1 ради слайдов.
- [ ] **Stats Bar / Trust Bar**: реальные цифры из общих правил, никаких Add verified rating and order count. Не дублируйте одинаковую длинную полосу несколько раз.
- [ ] **See it before you buy it**: пять шагов Brief → Mockup → Sample → Proof → Production & delivery. В шаге See the quality должна быть возможность запросить физический образец, а не только прочитать про него.
- [ ] **Fast, In-House Engraving**: единые сроки и читаемая оговорка из общих правил.
- [ ] **Featured products**: выбрать реальные товары в Shopify с актуальными названиями, фото и ценами. Не создавать вымышленные карточки товаров по AI-концептам.
- [ ] **What our customers say**: 3–6 подлинных коротких отзывов, автор и источник с разрешением. Пока отзывов нет — секцию скрыть.
- [ ] **Meet With Us Face to Face**: заполнить по [общему блоку встречи](#meeting).
- [ ] **FAQ**: ответить о минимуме заказа, сроках, SVG, физическом образце и очной встрече. Финальная CTA ведёт на реальную форму.
- [ ] Скрытые старые Industries / Why Choose Us / Volume / Comparison не включать автоматически: сначала проверить актуальность, отсутствие повторов и спорных обещаний.

### Фото и видео — что в какой блок

| Куда загрузить | Что выбрать |
|---|---|
| Hero → Slide 1 → Slide image или Shopify video | Готовый подарок: персонализированная ручка/набор и упаковка; ясно видно результат |
| Hero → Slide 2 | Реальная лазерная гравировка и готовое изделие, не цветная печать |
| Hero → Slide 3 | Партия ручек с разными именами или образец подарка на встрече |
| Каждый видео-Slide → Video poster | Качественный кадр именно этого изделия/процесса. Можно оставить подходящую уже выбранную обложку |
| Business Solutions → Corporate Gifts → Real gift photo | Подарочный набор, открытый футляр с ручкой; не только абстрактный макро-фрагмент |
| Employee Appreciation | Именной подарок или награда сотруднику |
| Client Gifts | Подарок клиенту в презентационной упаковке |
| Event Merchandise | Реальная партия для мероприятия, надпись/дата с разрешением |
| Personalized Onboarding Kits | Открытый welcome-набор с именной ручкой; состав должен быть доступен к заказу |
| Promotional Products | Серия гравированных ручек или реально предлагаемые промоизделия |
| Milestone Program | Несколько подарков/наград для разных этапов стажа; годы на примерах не выдавать за выполненный заказ |
| See it before you buy it | Фото не обязательны. Если добавляете: образец → согласованный макет → готовый результат, без приватной переписки |
| Recent work from our studio | Начните с 3–4 реальных проектов: награда, партия именных ручек, набор, упаковка. Остальные слоты не обязаны быть заполнены |
| Fast, In-House Engraving → Real photo | Настоящее рабочее место, гравировка или контроль партии |
| What can we engrave for you? → четыре карточки | CO₂: ваш образец дерева/акрила; Fiber: металл; UV Laser: реальный подтверждённый образец; Glass & Crystal: настоящая гравировка на стекле/кристалле |
| Meet With Us Face to Face → Real photo | Дарья/команда, место встречи и ручка-образец |

**Видео:** Media type позволяет выбрать фото или Shopify video. Auto-rotate slides оставьте выключенным. Видео — только после Play, без звука; прозрачный Play по центру, стрелки поверх медиа. На desktop изображение/видео заполняет высоту правой части hero, на мобильном не должно вытягиваться на весь экран поверх CTA. Если после загрузки кадр обрезает предмет — выберите другое кадрирование/исходник, не меняйте весь код темы.

Доступны прежние декоративные Video cover preset; собственный Video poster имеет приоритет. Код отключает звук воспроизведения, но не удаляет аудиодорожку исходного файла. Если Дарье нужен физически беззвучный исходник, экспортируйте ролик без аудио отдельно.

### See it before you buy it — фото и Alt text

В редакторе: **Home page → B2B content & photos с заголовком See it before you buy it → нужная Photo / content card → Include photo → Photo**. Описание вставьте в **Photo description (alt)**. Нажмите Save.

| Карточка | Что поставить | Alt text — скопировать на английском |
|---|---|---|
| 1. Tell us the occasion | [IMG_0621.JPG](https://drive.google.com/file/d/1jmcP8eBKSN-CFpK07jcRiTCfIbg_QjWM/view): деревянная ручка и футляр с одинаковой надписью | Wooden pen with gold-tone trim beside a matching personalized wooden case. |
| 2. Get a free mockup | [Подготовленный AI-макет](output/imagegen/free-mockup-products-v1.png): металлическая и деревянная ручки, футляр и именной бейдж | AI-generated personalization mockup of metal and wooden pens, a wooden case and a name badge, with sample name and logo placement. |
| 3. See the quality | [IMG_0121.WEBP](https://drive.google.com/file/d/1M0ReyxhkfXjwURDH66ZKzQf3FP6NfbRc/view): крупный план ручки с именем | Close-up of a personalized silver-tone pen with a gold-tone clip and an engraved name. |
| 4. Approve your proof | Пока нет выбранного изображения. Нужен макет ручки с именем, размещением гравировки и размерами; alt справа использовать только если всё это показано | Engraving proof for a personalized pen showing the name, artwork placement and dimensions for review. |
| 5. Produce & deliver | Пока нет выбранного фото. Вариант: реальная партия гравированных ручек в открытых подарочных коробках, подготовленных к отправке | Batch of engraved pens arranged in open gift boxes, ready for shipping. |

Для шага 5, **если вместо коробок выбран кадр процесса**, используйте другое описание: **Laser engraving a name on a metal pen.** Только если на изображении действительно виден такой процесс. Если показана проверка качества или закрытые коробки, описание нужно адаптировать под них.

Alt описывает видимое изображение, а не повторяет рекламный оффер. Не добавляйте Dallas, best gifts, цены и поисковые ключи, если это не нужно для описания. Отдельный «AEO-alt» не требуется: используйте одно точное описание. При замене фото обновляйте alt; без изображения заполнять его не нужно.

Для AI-макета шага 2 сохраните видимую подпись **Illustrative mockup — AI-generated**, например в Text карточки. Alt не заменяет видимое пояснение. Для шагов 4 и 5 тексты выше — варианты под будущие изображения, а не подтверждение наличия этих файлов. Карточки можно оставить без фото до выбора подходящего материала.

### SEO главной — ⚙️ Theme settings → SEO & social preview

**Home SEO title:**

```text
Personalized Corporate Gifts in Dallas | Elma Vada
```

**Home meta description:**

```text
Personalized corporate gifts and laser engraving in Dallas–Fort Worth. Orders from 1 to 5,000+ units. Request a free custom mockup.
```

**Default social sharing image:** превью ссылки, не баннер и не логотип в шапке. Можно оставить Default logo или выбрать реальный набор на аккуратном фоне; ориентир для отдельной обложки 1200 × 630 px.

### Ссылки и готовность

- [ ] Семь карточек ведут соответственно на Corporate Gifts, Employee Recognition, Client Gifting, Events & Awards, Onboarding, Promotional Products и Milestone Program.
- [ ] Главная отвечает: что делаем, кому, где, какие объёмы, как получить mockup/sample/consultation.
- [ ] На телефоне в первом экране понятен переход к короткой заявке; не нужно читать длинную страницу до первой CTA.
- [ ] Публичный просмотр: один H1, нет горизонтального скролла на 360/390/768/1024 px, видео не стартует само, стрелки и Play доступны.
- [ ] Нет публичных служебных надписей. Если AI-концепт оставлен, его происхождение не скрыто; если заменён реальным фото, старую подпись об AI убрать вместе с заменой.

[Вернуться к оглавлению](#contents)

<a id="business-solutions"></a>
## 02. Business Solutions

**Найдите в Pages:** Business Solutions. **Ожидаемый URL:** `/pages/business-solutions`. **Template:** `solutions`.

### 1. Видимый текст — редактор темы → Pages → solutions

**B2B page hero → Heading (H1):** What are you gifting for?

**Introduction — готовый вариант первого абзаца:**

> Personalized employee, client and event gifts start with the occasion. Elma Vada helps you plan the gift, engraving, presentation and delivery for your Dallas–Fort Worth project.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] В Choose your business occasion заполните шесть карточек по фото-карте ниже. В Text объясните получателя, повод и персонализацию; каждая карточка имеет отдельную Link.
- [ ] Карточки Employee Recognition / Client & Executive Gifts / Events & Awards / Onboarding & Relocation / Milestone Program / Bulk Orders должны вести на соответствующие страницы, не на общий каталог.
- [ ] Сохраните связанные Corporate Gifts, Personalized Merchandise, Custom Engraving, Promotional Products, Capabilities и Industries: это внутренние переходы к страницам, которые не нужны в шапке.
- [ ] Первый абзац и карточки должны помогать выбрать сценарий. Не превращайте страницу в копию Corporate Gifts с теми же общими обещаниями.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Композиция из 3–4 реально предлагаемых подарков: ручка в футляре, награда, деревянное изделие и коробка. Показать выбор по поводу, а не случайный склад товаров. |
| Choose your business occasion → Employee Recognition | Именная награда и ручка сотрудника. |
| Choose your business occasion → Client & Executive Gifts | Подарочная ручка в открытом футляре. |
| Choose your business occasion → Events & Awards | Несколько наград с разными именами. |
| Choose your business occasion → Onboarding & Relocation | Готовый welcome-набор в коробке. |
| Choose your business occasion → Milestone Program | Серия подарков к разным годам стажа. |
| Choose your business occasion → Bulk Orders | Ровные ряды готовой партии изделий. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Business Solutions → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Business Solutions**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Corporate Gifting Solutions in DFW | Elma Vada
```

**Meta description:**

```text
Explore personalized gifts for employees, clients, events and onboarding. Plan your project with our Dallas–Fort Worth engraving team.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** How do I choose a gift for my occasion? / Can I see a mockup or sample first? / Can each recipient have a different name? Ответьте: выбор зависит от повода, количества и срока; макет бесплатный, условия физического образца согласуются; список имён проверяется перед производством.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Employee Recognition → `/pages/employee-recognition`; Client Gifting → `/pages/client-gifting`; Events & Awards → `/pages/events-awards`; Onboarding & Relocation → `/pages/onboarding`; Milestone Program → `/pages/milestone-program`; Bulk Orders → `/pages/bulk-orders`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Из этой страницы можно попасть на все шесть сценариев, а в related-блоке — на остальные основные услуги.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="production-capabilities"></a>
## 03. Production Capabilities

**Найдите в Pages:** Production Capabilities. **Ожидаемый URL:** `/pages/production-capabilities`. **Template:** `capabilities`.

### 1. Видимый текст — редактор темы → Pages → capabilities

**B2B page hero → Heading (H1):** In-house laser engraving in Dallas

**Introduction — готовый вариант первого абзаца:**

> Elma Vada provides in-house laser engraving in Dallas–Fort Worth. Share your product, material, artwork and quantity so our team can confirm the suitable process, sample options and production schedule.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Which engraving technologies do we use?: в текущем шаблоне CO₂ Lasers ×3, Fiber Lasers ×4, UV Lasers ×2 и 3D Crystal Laser. Дарья должна подтвердить действующий состав; не публикуйте количество станков автоматически только потому, что оно есть в PDF.
- [ ] У каждой технологии опишите реально подходящие материалы. Не копируйте без проверки таблицу Best/Yes из макета. UV laser — гравировка, а не полноцветная печать.
- [ ] Which material fits your idea?: у каждого материала коротко указать доступные варианты и необходимость проверки конкретного изделия. Чужие заготовки принимаются только после оценки, если услуга действительно доступна.
- [ ] Fast, In-House Engraving: вставьте утверждённый текст скорости и оговорку. Добавьте видимую ссылку Request a Physical Sample в Introduction или процесс: /pages/request-a-quote?request=sample. Проверьте выбор sample в новой форме.
- [ ] В How does the project come together? объясните согласование файла, образец, production proof, QC и упаковку. По PDF полезно кратко указать Faster changes / Quality control / Physical samples / Human accountability — как процесс, не абсолютную гарантию.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Реальный работающий лазер и готовое изделие рядом. Без стокового завода, UV-принтера и декоративного оборудования. |
| Fast, In-House Engraving → Real photo | Реальный процесс лазерной гравировки и готовая партия ручек. |
| How do we approach different materials? → Metal Engraving | Ваш станок для металла и готовый образец рядом. |
| How do we approach different materials? → Wood & Acrylic Work | Ваше оборудование и образцы дерева/акрила. |
| How do we approach different materials? → Glass & Crystal Projects | Ваше реальное оборудование для стекла/кристалла. |
| How do we approach different materials? → Proofing & Quality Review | Сотрудник проверяет настоящий образец. |
| Which material fits your idea? → Metal | Макро вашего образца металла с гравировкой. |
| Which material fits your idea? → Wood | Макро вашего образца дерева. |
| Which material fits your idea? → Acrylic | Макро вашего образца акрила. |
| Which material fits your idea? → Glass & Crystal | Макро настоящей гравировки на стекле. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Production Capabilities → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Production Capabilities**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Laser Engraving Capabilities in Dallas | Elma Vada
```

**Meta description:**

```text
Explore our in-house laser engraving capabilities, materials and production process. Send your artwork and quantity for a project quote.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Which materials can you engrave? / Can you test my item before a full run? / Is UV laser engraving the same as UV printing? Ответы — по реальным возможностям; UV printing не предлагается; тест/образец и его стоимость согласуются.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Custom Engraving → `/pages/custom-engraving`; Bulk Orders → `/pages/bulk-orders`; Our Work → `/pages/our-work`; Milestone Program → `/pages/milestone-program`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] В тексте, карточках и метаданных нет предложения цветной UV-печати. Есть рабочий путь к запросу образца.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="industries"></a>
## 04. Industries

**Найдите в Pages:** Industries. **Ожидаемый URL:** `/pages/industries`. **Template:** `industries`.

### 1. Видимый текст — редактор темы → Pages → industries

**B2B page hero → Heading (H1):** Personalized corporate gifts for your industry

**Introduction — готовый вариант первого абзаца:**

> Elma Vada helps HR teams, client-facing businesses, event organizers and community organizations plan personalized engraved gifts in Dallas–Fort Worth. Start with your recipients, occasion, quantity and deadline.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Find your starting point: четыре сценария из фото-карты. В каждой карточке объясните бизнес-задачу, пример изделия и следующий шаг.
- [ ] Corporate & HR Teams → Employee Recognition; Real Estate & Client Services → Client Gifting; Hospitality & Events → Events & Awards; Education & Community Organizations → Service Awards.
- [ ] Не пишите, что перечисленные отрасли уже являются клиентами, если нет подтверждённых заказов. Здесь допустимы идеи применения, явно описанные как варианты.
- [ ] Не обещайте отраслевую сертификацию, compliance или гарантированный рост продаж/удержания сотрудников.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Подборка реальных подарков для разных задач: награда, клиентский набор, ручки для события. Не стоковые офисы и не лица случайных клиентов. |
| Find your starting point → Corporate & HR Teams | Именная награда сотруднику. |
| Find your starting point → Real Estate & Client Services | Реальный подарок клиенту после сделки. |
| Find your starting point → Hospitality & Events | Ваши награды или сувениры для события. |
| Find your starting point → Education & Community Organizations | Ваша памятная табличка или награда. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Industries → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Industries**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Corporate Gifts by Industry in DFW | Elma Vada
```

**Meta description:**

```text
Find personalized gifting ideas for your industry, team and occasion. Discuss quantities, engraving and delivery with our DFW studio.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What gifts suit our industry? / Can you personalize a batch for different recipients? / What should we send to start? Дайте примеры по реальным изделиям и попросите повод, количество и срок.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Business Solutions → `/pages/business-solutions`; Employee Recognition → `/pages/employee-recognition`; Client Gifting → `/pages/client-gifting`; Events & Awards → `/pages/events-awards`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Каждая отраслевая карточка ведёт к подходящему решению, а не на отсутствующий URL.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="our-work"></a>
## 05. Our Work

**Найдите в Pages:** Our Work. **Ожидаемый URL:** `/pages/our-work`. **Template:** `portfolio`.

### 1. Видимый текст — редактор темы → Pages → portfolio

**B2B page hero → Heading (H1):** Personalized gift projects from our studio

**Introduction — готовый вариант первого абзаца:**

> Explore Elma Vada’s engraved gift projects, personalization details and presentation options. Each published project shows real work and the approved details behind the order.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Project stories: начните с 3–4 настоящих заказов. Для каждого в Text заполните: Client type / Need / Product / Quantity / Material / Engraving method / Presentation or delivery / Result.
- [ ] Количество 2,000 glasses из PDF не переносите как готовый факт без подтверждения. Результат описывайте проверяемо — что изготовлено и согласовано, а не выдуманные проценты роста бизнеса клиента.
- [ ] На кейс подготовьте 2–4 кадра: общий вид, гравировка крупно, партия, упаковка. Одна карточка принимает одно фото: главный кадр — в Project stories, дополнительные — отдельными карточками Details from our studio с понятным названием проекта.
- [ ] Require approval before publishing (case studies) и Facts and publication permission confirmed используйте осознанно. Не включайте подтверждение ради того, чтобы появился пустой кейс.
- [ ] Нет подтверждённых проектов — скройте незавершённые карточки и не оставляйте текст Explore real projects над вымышленными примерами. SEO ниже применяйте после появления реальных работ.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Лучший реальный законченный заказ целиком: изделие и упаковка, не AI-концепт. |
| Project stories → Engraved Glass Project | Общий кадр стеклянного изделия + детали гравировки. |
| Project stories → Individually Named Pen Batch | Партия ручек с разными именами. |
| Project stories → Recognition Award Project | Настоящая награда крупно и общий вид. |
| Project stories → Packing & Fulfillment Project | Ваши реальные упакованные заказы или доставка. |
| Details from our studio → Recognition award | Реальное фото: Recognition award. Только с разрешением на публикацию. |
| Details from our studio → Engraved wooden piece | Реальное фото: Engraved wooden piece. Только с разрешением на публикацию. |
| Details from our studio → Desk keepsake | Реальное фото: Desk keepsake. Только с разрешением на публикацию. |
| Details from our studio → Named pen batch | Реальное фото: Named pen batch. Только с разрешением на публикацию. |
| Details from our studio → Metal engraving detail | Реальное фото: Metal engraving detail. Только с разрешением на публикацию. |
| Details from our studio → Glass engraving detail | Реальное фото: Glass engraving detail. Только с разрешением на публикацию. |
| Details from our studio → Pen gift set | Реальное фото: Pen gift set. Только с разрешением на публикацию. |
| Details from our studio → Personalized everyday pen | Реальное фото: Personalized everyday pen. Только с разрешением на публикацию. |
| Details from our studio → Presentation packaging | Реальное фото: Presentation packaging. Только с разрешением на публикацию. |
| Details from our studio → Wood engraving detail | Реальное фото: Wood engraving detail. Только с разрешением на публикацию. |
| Details from our studio → Recipient personalization | Реальное фото: Recipient personalization. Только с разрешением на публикацию. |
| Details from our studio → Packed order | Реальное фото: Packed order. Только с разрешением на публикацию. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Our Work → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Our Work**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Personalized Gift Projects & Engraving | Elma Vada
```

**Meta description:**

```text
Explore real engraved gift projects, personalized details and production examples. Request a custom mockup for your next corporate gift.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can you make something similar for our team? / Can I see a sample first? Ответ: отправьте ссылку на пример, желаемое изделие и количество; похожий результат согласуется по материалу и макету, чужой логотип не переносится.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**На странице Our Work:** вторую кнопку hero назовите Request a Quote и направьте на `/pages/request-a-quote`, чтобы она не ссылалась на эту же страницу.

**Related services / ссылки в тексте:** Business Solutions → `/pages/business-solutions`; Production Capabilities → `/pages/production-capabilities`; Get a Free Mockup → `/pages/free-mockup`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Любой опубликованный кейс подтверждён; на фото нет адресных наклеек, приватных списков получателей и логотипов без разрешения.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="about"></a>
## 06. About

**Найдите в Pages:** About. **Ожидаемый URL:** `/pages/about`. **Template:** `about`.

### 1. Видимый текст — редактор темы → Pages → about

**B2B page hero → Heading (H1):** Meet the people behind Elma Vada

**Introduction — готовый вариант первого абзаца:**

> Elma Vada creates personalized corporate gifts with in-house laser engraving in Dallas–Fort Worth. Our team helps you plan the details, review the artwork and prepare gifts for the people receiving them.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Who is behind the work? → The People Behind Your Project: добавьте имя, реальную роль и 3–5 предложений об опыте и подходе. Не называйте человека основателем без подтверждения.
- [ ] Inside the Studio: опишите реальный рабочий процесс и Dallas-адрес. Care in the Small Details: как проверяются spelling, позиция гравировки, качество и комплектация.
- [ ] В Introduction секции добавьте подтверждённые 5+ лет и 10+ членов команды. Остальные цифры — по общим правилам, без вымышленных рейтингов.
- [ ] Отзывы — настоящие; если их пока нет, скройте Testimonials. Сертификаты/обучение упоминайте только с проверенными документами.
- [ ] Блок встречи заполните по общей инструкции. Адрес и часы согласуйте с Business & contact; не обещайте приём без записи.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Дарья и/или настоящая команда в реальной студии. Не логотип вместо людей и не сгенерированный коллектив. |
| Who is behind the work? → The People Behind Your Project | Портрет основателя; в тексте затем добавьте имя и настоящую историю. |
| Who is behind the work? → Inside the Studio | Общий вид вашей мастерской. |
| Who is behind the work? → Care in the Small Details | Команда за проверкой качества или упаковкой. |
| Meet With Us Face to Face → Real photo | Реальная Дарья/команда и место встречи или ручка-образец. См. общий блок встречи. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → About → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **About**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
About Our Dallas Engraving Studio | Elma Vada
```

**Meta description:**

```text
Meet the team behind Elma Vada’s personalized corporate gifts. Learn about our Dallas studio, in-house engraving and approach to quality.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Where is your studio? / Can we meet in person? / Who will manage our project? Укажите Dallas-адрес, предварительное согласование встречи и реальный порядок связи.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Production Capabilities → `/pages/production-capabilities`; Our Work → `/pages/our-work`; Schedule a Consultation → `/pages/book-a-call`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Видны реальные люди, адрес и контакт; нет старого города, случайных стоковых лиц и неподтверждённых сертификатов.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="request-a-quote"></a>
## 07. Request a Quote

**Найдите в Pages:** Request a Quote. **Ожидаемый URL:** `/pages/request-a-quote`. **Template:** `quote`.

### 1. Видимый текст — редактор темы → Pages → quote

**B2B page hero → Heading (H1):** Tell us the occasion. We’ll handle the rest.

**Introduction — готовый вариант первого абзаца:**

> Share your occasion, estimated quantity and deadline to request a personalized gift quote. Upload your logo if it is ready, or send your idea and we will help you define the next step.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] В B2B page hero включите Compact intro (forms), выключите Include hero photo. Сразу после короткого вступления должна идти B2B quote form; длинные пояснения, FAQ и встреча — ниже.
- [ ] В Shopify Forms проверьте Name и Email как обязательные, Quantity и Project details — нужные для расчёта; Company, Project type/occasion, Needed by, Phone, Budget range, Pickup/Delivery/Shipping, Delivery City/ZIP и логотип — по реальным нуждам. Не требуйте точную дату, если клиент её ещё не знает.
- [ ] Проверьте все типы обращения, особенно Physical sample. Новый file upload должен принимать SVG, а не только URL. Логотип не обязан быть готов до первого обращения.
- [ ] Side heading: You can reduce the risk before committing. Side text: Free mockup • 15-minute project call • physical sample where qualifying • in-person sample review for qualifying bulk projects. Это формулировка из PDF; длительность звонка оставляйте, если Дарья её поддерживает.
- [ ] Additional information: кратко volume-based quoting, free digital proof, PO для approved accounts, один ответственный и повторные заказы. Эти пояснения не должны отодвигать поля вниз на мобильном.
- [ ] После теста приложения выключите Show built-in contact form. На странице должна остаться одна форма. Саму B2B quote form секцию не удаляйте.
- [ ] Запрос отправляется на daria@elmavada.com, клиент получает подтверждение; отдельно протестируйте sample и загрузку SVG. Пройдите общий чек-лист формы.

### 2. Какие фотографии и куда

**Большой hero здесь не нужен.** Форма важнее баннера; небольшое фото образца и блок встречи допустимы после/рядом с полями.

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B quote form → Optional sample photo | Необязательно: одна настоящая ручка-образец в футляре рядом с пояснениями или ниже полей. Не большой hero перед формой. |
| Meet With Us Face to Face → Real photo | Реальная Дарья/команда и место встречи или ручка-образец. См. общий блок встречи. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Request a Quote → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Request a Quote**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Request a Corporate Gift Quote | Elma Vada
```

**Meta description:**

```text
Tell us your occasion, quantity and deadline. Share your artwork and request a quote for personalized corporate gifts and laser engraving.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What do you need for a quote? / Can I send my logo later? / Can I request a physical sample? Ответьте прямо, что приложить, что необязательно, как уточняются условия образца.

**Related services / ссылки в тексте:** Get a Free Mockup → `/pages/free-mockup`; Schedule a Consultation → `/pages/book-a-call`; Production Capabilities → `/pages/production-capabilities`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] На мобильном поля доступны сразу после короткого вступления; одна форма, SVG дошёл, sample-запрос не потерян.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="corporate-gifts"></a>
## 08. Corporate Gifts

**Найдите в Pages:** Corporate Gifts. **Ожидаемый URL:** `/pages/corporate-gifts`. **Template:** `corporate-gifts`.

### 1. Видимый текст — редактор темы → Pages → corporate-gifts

**B2B page hero → Heading (H1):** Personalized corporate gifts in Dallas–Fort Worth

**Introduction — готовый вариант первого абзаца:**

> Elma Vada creates personalized corporate gifts for employee recognition, client appreciation and company events. Choose an engraved gift, review a free mockup and confirm the presentation and timing before production.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] What could your gift look like?: четыре реально доступные категории из фото-карты. У каждой — материал/комплектация, вариант персонализации, подходящий повод.
- [ ] Проверьте диапазон $9.99–$119.99 и 1–5K+ units. Не выдавайте диапазон всего каталога за цену конкретного набора.
- [ ] В процессе сохраните физический образец и согласование proof; добавьте повторные заказы и одного ответственного.
- [ ] Testimonials: только настоящие отзывы, не placeholder. Отдельно проверьте права на товарные бренды и клиентские логотипы.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Подарочная ручка/набор в открытом футляре; видно имя или согласованный логотип и качество упаковки. |
| What could your gift look like? → Personalized Pen Sets | Ручки в футлярах, видны разные имена. |
| What could your gift look like? → Engraved Drinkware | Стакан или термокружка с читаемой гравировкой. |
| What could your gift look like? → Desk & Recognition Pieces | Деревянный настольный сувенир или награда. |
| What could your gift look like? → Gift-Ready Presentation | Открытая коробка с вашим готовым подарком. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Corporate Gifts → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Corporate Gifts**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Personalized Corporate Gifts in DFW | Elma Vada
```

**Meta description:**

```text
Personalized gifts for employee recognition, client appreciation and company events. Explore engraved gift ideas and request a free mockup.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What can be personalized? / What is the order range? / Can we review a mockup or sample? Укажите имена/сообщения/логотип, 1–5K+ и реальные условия проверки образца.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Client Gifting → `/pages/client-gifting`; Employee Recognition → `/pages/employee-recognition`; Bulk Orders → `/pages/bulk-orders`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Страница продаёт персонализированные подарки, а не услугу печати; примеры совпадают с доступным ассортиментом.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="bulk-orders"></a>
## 09. Bulk Orders

**Найдите в Pages:** Bulk Orders. **Ожидаемый URL:** `/pages/bulk-orders`. **Template:** `bulk-orders`.

### 1. Видимый текст — редактор темы → Pages → bulk-orders

**B2B page hero → Heading (H1):** Bulk personalized gifts, from 1 to 5,000+ units

**Introduction — готовый вариант первого абзаца:**

> Plan a personalized gift order with clear quantities, artwork approvals and packaging requirements. Elma Vada reviews your product, recipient details and deadline before confirming a production and delivery plan.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Fast, In-House Engraving: единая формулировка 1,000 pens/day с оговоркой. Не обещайте такую же скорость для любой награды и заказа 5,000+.
- [ ] Карточки должны показывать Consistent Production Runs / Per-Piece Personalization / Quality Review / Packing & Distribution. Не использовать четыре одинаковых фото ручки.
- [ ] В текстах объясните расчёт по количеству, проверку списка имён, sample/proof до тиража, комплектацию и согласование адресов/доставки.
- [ ] Не публикуйте скидочную сетку, universal free shipping и гарантию rush без согласования. Стоимость зависит от реального проекта.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Ровная реальная партия одинаковых изделий или ручек с разными именами. Один крупный кадр партии убедительнее картинки чужого склада. |
| Fast, In-House Engraving → Real photo | Реальный процесс лазерной гравировки и готовая партия ручек. |
| What could your gift look like? → Consistent Production Runs | Ровные ряды одинаково выгравированных изделий. |
| What could your gift look like? → Per-Piece Personalization | Ручки с разными именами в одной партии. |
| What could your gift look like? → Quality Review | Руки сотрудника проверяют гравировку. |
| What could your gift look like? → Packing & Distribution | Реальные коробки и защитная упаковка. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Bulk Orders → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Bulk Orders**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Bulk Personalized Gifts & Engraving | Elma Vada
```

**Meta description:**

```text
Plan engraved gift orders from 1 to 5,000+ units. Share your quantity, artwork and deadline for a project-specific quote and production timing.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can every item have a different name? / Can you produce 1,000 pens in one day? / How are delivery dates confirmed? Разделите производственную мощность, утверждение artwork, наличие заготовок и время перевозки.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Production Capabilities → `/pages/production-capabilities`; Promotional Products → `/pages/promotional-products`; Milestone Program → `/pages/milestone-program`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Различаются мощность и срок заказа; нет обещания изготовить и доставить любую партию за сутки.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="branded-merchandise"></a>
## 10. Personalized Merchandise

**Найдите в Pages:** Personalized Merchandise (может пока называться Branded Merchandise / Branded Merchandise DFW). **Ожидаемый URL:** `/pages/branded-merchandise`. **Template:** `branded-merchandise`.

### 1. Видимый текст — редактор темы → Pages → branded-merchandise

**B2B page hero → Heading (H1):** Personalized merchandise for teams and clients

**Introduction — готовый вариант первого абзаца:**

> Create useful merchandise with individual names, messages or your company logo. Elma Vada helps you choose suitable laser-engraved products and coordinate presentation for teams, clients and events.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Верхнее название записи можно изменить с Branded Merchandise на Personalized Merchandise; существующий URL /pages/branded-merchandise сохраняйте, чтобы не ломать ссылки.
- [ ] Everyday Pens / Drinkware / Desk Accessories / Coordinated Kits: только реально доступные изделия. Если кружек или наборов нет — замените карточку реальным предложением либо скройте её.
- [ ] Объясните разницу между общей гравировкой логотипа и персональными именами в одной партии. Не добавляйте UV printing, embroidery или футболки по примеру конкурентов.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Реальные ручки и/или другие гравированные изделия с согласованным фирменным оформлением; логотип читаемый, без выдуманного клиента. |
| What could your gift look like? → Everyday Pens | Несколько ваших ручек с гравировкой. |
| What could your gift look like? → Drinkware | Реальные кружки или стаканы. |
| What could your gift look like? → Desk Accessories | Ваш настольный аксессуар. |
| What could your gift look like? → Coordinated Kits | Ваш набор мерча в коробке. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Personalized Merchandise → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Personalized Merchandise**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Personalized Merchandise in Dallas | Elma Vada
```

**Meta description:**

```text
Create personalized merchandise with names, messages or your company logo. Explore laser-engraved gifts for teams, clients and events.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can you add our logo and individual names? / What products can be engraved? / Can we reorder the same design? Возможность и наличие проверяются перед заказом.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Corporate Gifts → `/pages/corporate-gifts`; Promotional Products → `/pages/promotional-products`; Bulk Orders → `/pages/bulk-orders`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Видимое название обновлено, старый рабочий URL сохранён; нет дублирующей страницы с тем же контентом.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="custom-engraving"></a>
## 11. Custom Engraving

**Найдите в Pages:** Custom Engraving. **Ожидаемый URL:** `/pages/custom-engraving`. **Template:** `custom-engraving`.

### 1. Видимый текст — редактор темы → Pages → custom-engraving

**B2B page hero → Heading (H1):** Custom laser engraving in Dallas

**Introduction — готовый вариант первого абзаца:**

> Personalize suitable gifts with names, messages or your logo through laser engraving. Send Elma Vada the product, material, dimensions and artwork so we can review the engraving options before production.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Покажите материал, пример гравировки и допустимый вид персонализации; для каждого материала используйте собственный образец.
- [ ] В процессе объясните SVG/PDF artwork → проверка → mockup → утверждение proof → engraving. Не называйте цифровой макет доказательством физической совместимости материала.
- [ ] Если работаете с изделиями клиента, опишите предварительное согласование: материал, размеры, покрытие и риски. Не обещайте гравировать любую принесённую вещь.
- [ ] Короткий путь к sample и Capabilities обязателен; production-фото можно разместить отдельной карточкой в процессном блоке, но это предложение добавления, а не уже установленный слот.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Макро качественной настоящей гравировки на металле или дереве: видны края букв и материал, не печатная наклейка. |
| What could your gift look like? → Metal Details | Крупный план гравировки на металлической ручке. |
| What could your gift look like? → Wood Keepsakes | Ваше гравированное деревянное изделие. |
| What could your gift look like? → Glass & Crystal Pieces | Настоящее стекло или кристалл с вашей работой. |
| What could your gift look like? → Names & Messages | Несколько изделий с разными именами. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Custom Engraving → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Custom Engraving**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Custom Laser Engraving in Dallas | Elma Vada
```

**Meta description:**

```text
Request custom laser engraving for gifts, awards and business projects. Discuss materials, artwork and quantities with our Dallas team.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can you engrave an item I already own? / What file should I send? / Which materials are suitable? Дайте условия предварительной оценки, SVG/PDF и подтверждённые материалы.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Production Capabilities → `/pages/production-capabilities`; Our Work → `/pages/our-work`; Get a Free Mockup → `/pages/free-mockup`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Крупные планы доказывают именно гравировку; перечислены только проверенные материалы.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="promotional-products"></a>
## 12. Promotional Products

**Найдите в Pages:** Promotional Products. **Ожидаемый URL:** `/pages/promotional-products`. **Template:** `promotional-products`.

### 1. Видимый текст — редактор темы → Pages → promotional-products

**B2B page hero → Heading (H1):** Personalized promotional gifts for your next event

**Introduction — готовый вариант первого абзаца:**

> Choose useful laser-engraved promotional gifts for events, teams and business campaigns. Share your audience, quantity, artwork and deadline so Elma Vada can propose suitable products and packing options.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Event Pens / Personalized Drinkware / Personalized Keepsakes / Event Packs: для каждого показать реальный предмет и объяснить удобство вручения/использования.
- [ ] Сохраните отличие от Events & Awards: здесь массовые полезные промоподарки и раздача; там награды, спикеры, VIP и фиксированное мероприятие.
- [ ] Не обещайте полный ассортимент рекламной типографии. Укажите количество, сроки, упаковку и допустимую гравировку.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Партия готовых гравированных промоизделий одного события, а не набор стоковых ручек с цветной печатью. |
| What could your gift look like? → Event Pens | Партия проморучек. |
| What could your gift look like? → Personalized Drinkware | Ваш брендированный стакан или кружка. |
| What could your gift look like? → Personalized Keepsakes | Ваш сувенир или небольшая табличка. |
| What could your gift look like? → Event Packs | Готовые промонаборы для раздачи. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Promotional Products → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Promotional Products**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Personalized Promotional Gifts in DFW | Elma Vada
```

**Meta description:**

```text
Make your next event personal with laser-engraved promotional gifts. Share your logo, quantity and deadline to explore suitable options.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What works for event handouts? / Can you engrave our event logo? / Can you pack gifts for distribution? Ответы только по реальным товарам и доступной комплектации.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Events & Awards → `/pages/events-awards`; Bulk Orders → `/pages/bulk-orders`; Personalized Merchandise → `/pages/branded-merchandise`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Изображения и текст не создают впечатление, что студия предлагает полноцветную UV-печать.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="faq"></a>
## 13. FAQ

**Найдите в Pages:** FAQ. **Ожидаемый URL:** `/pages/faq`. **Template:** `faq`.

### 1. Видимый текст — редактор темы → Pages → faq

**B2B page hero → Heading (H1):** Corporate Gift & Engraving FAQs

**Introduction — готовый вариант первого абзаца:**

> Find answers about personalized gifts, order quantities, SVG artwork, mockups, physical samples and production timing. For a product-specific answer, send Elma Vada your project details.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Include hero photo выключить. Здесь важны быстрые ответы, а не дополнительные картинки.
- [ ] Проверьте имеющиеся вопросы: адрес Dallas; что нужно для расчёта; разные имена; mockup/sample; срок; 1–5K+; artwork; изделия клиента; упаковка; разные адреса доставки; повторные заказы; дата мероприятия; SVG.
- [ ] Добавьте при отсутствии: Do you offer UV printing? — No. Our service is laser engraving. We can review your material and artwork to suggest a suitable engraving method.
- [ ] Добавьте: Can we meet in person? — объясните согласованную встречу в DFW и бесплатную персонализированную ручку на ней; не обещайте бесплатную пересылку любого образца.
- [ ] В каждом ответе сначала прямой ответ, затем условие. Сроки производства и доставки разделите. Не копируйте одни и те же общие ответы на все страницы без адаптации.
- [ ] Не вставляйте второй FAQPage script в Content. Проверку готовой разметки поручите разработчику; отображение FAQ в Google не гарантируется.

### 2. Какие фотографии и куда

**Большой hero здесь не нужен.** Эту страницу можно оставить полностью без фото.

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Не добавляйте картинки между каждым вопросом.

### 3. SEO — Pages → FAQ → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **FAQ**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Corporate Gift & Engraving FAQs | Elma Vada
```

**Meta description:**

```text
Find answers about gift quantities, SVG artwork, mockups, physical samples and turnaround. Learn how to start your engraving project.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Здесь FAQ — основной контент. Все ответы должны быть видимы посетителю, актуальны и согласованы с формами и предложениями на остальных страницах.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Request a Quote → `/pages/request-a-quote`; Get a Free Mockup → `/pages/free-mockup`; Schedule a Consultation → `/pages/book-a-call`; Production Capabilities → `/pages/production-capabilities`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Любой ключевой вопрос Дарьи имеет понятный ответ и рабочую ссылку на следующий шаг.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="client-gifting"></a>
## 14. Client Gifting

**Найдите в Pages:** Client Gifting (также может называться Client & Executive Gifts). **Ожидаемый URL:** `/pages/client-gifting`. **Template:** `client-gifting`.

### 1. Видимый текст — редактор темы → Pages → client-gifting

**B2B page hero → Heading (H1):** Personalized client, partner and executive gifts

**Introduction — готовый вариант первого абзаца:**

> Plan thoughtful engraved gifts for client milestones, partner relationships and executive occasions. Elma Vada helps you choose the gift, personalize the details and prepare an approved option for future reorders.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Сохраните четыре предметные карточки из макета: Executive Pen Set / Personalized Client Pen / Relationship Keepsake / Engraved Glass Gift.
- [ ] В Introduction блока раскройте Client gifts / Partner gifts / Executive gifts / Approved gift library. Последнее — согласованные изделия и artwork для повторных заявок, не обещание уже работающего личного кабинета.
- [ ] В Process или дополнительной текстовой секции объясните, что перед повтором проверяются наличие, цены и изменения в персонализации.
- [ ] На скриншотах были Client Gifting и Client & Executive Gifts с одним шаблоном: сначала сравните адреса. Не заполняйте два одинаковых дубля как две независимые SEO-страницы.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Презентационный набор в открытом футляре, хорошо видна персонализация. Фото должно говорить о внимании к получателю, а не только рекламном логотипе. |
| What could your gift look like? → Executive Pen Set | Ваш набор ручек в футляре. |
| What could your gift look like? → Personalized Client Pen | Макро ручки с именем, без случайного чужого логотипа. |
| What could your gift look like? → Relationship Keepsake | Деревянный сувенир или памятная табличка. |
| What could your gift look like? → Engraved Glass Gift | Стеклянное изделие с вашей гравировкой. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Client Gifting → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Client Gifting**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Personalized Client & Executive Gifts | Elma Vada
```

**Meta description:**

```text
Plan thoughtful gifts for clients, partners and executives. Explore engraved gifts, personalization and repeat-order options in DFW.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can we keep an approved gift option for reorders? / Can the gift have a name instead of a large logo? / What is included in the presentation? Укажите реальные условия хранения artwork и упаковки.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Corporate Gifts → `/pages/corporate-gifts`; Our Work → `/pages/our-work`; Get a Free Mockup → `/pages/free-mockup`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Понятны клиентский, партнёрский и executive-сценарии; нет заявлений о сотрудничестве с брендами без доказательств.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="service-awards"></a>
## 15. Service Awards

**Найдите в Pages:** Service Awards. **Ожидаемый URL:** `/pages/service-awards`. **Template:** `service-awards`.

### 1. Видимый текст — редактор темы → Pages → service-awards

**B2B page hero → Heading (H1):** Personalized years-of-service awards

**Introduction — готовый вариант первого абзаца:**

> Recognize years of service with engraved awards and gifts featuring each recipient’s name and milestone. Elma Vada helps you coordinate the design, wording and presentation for a consistent recognition program.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Years-of-Service Awards / Staff Appreciation / Professional Recognition / Donor & Named Recognition: если тема донорам не соответствует ассортименту, замените эту карточку актуальным видом признания, не придумывайте выполненный проект.
- [ ] Объясните согласование имён, 1/5/10+ лет, даты вручения, надписей и уровня подарка. Конкретные уровни и цены согласует Дарья.
- [ ] Переход в Milestone Program обязателен: Service Awards — конкретная награда за стаж; Milestone — повторяемый план на год.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Две–три реальные награды за разный стаж, общий стиль, читаемые годы. Демонстрационные надписи обозначить как образцы. |
| What could your gift look like? → Years-of-Service Awards | Две-три награды за разные годы стажа. |
| What could your gift look like? → Staff Appreciation | Именной подарок сотруднику. |
| What could your gift look like? → Professional Recognition | Готовые награды для профессионального события. |
| What could your gift look like? → Donor & Named Recognition | Табличка благодарности, имя только с разрешением. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Service Awards → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Service Awards**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Years-of-Service Awards in DFW | Elma Vada
```

**Meta description:**

```text
Recognize years of service with personalized engraved awards and gifts. Plan names, dates, quantities and presentation with our team.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can awards use different names and service years? / Can we repeat the design next year? / Can we review a physical sample? Укажите proof и проверку наличия перед повторным заказом.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Milestone Program → `/pages/milestone-program`; Employee Recognition → `/pages/employee-recognition`; Bulk Orders → `/pages/bulk-orders`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Есть отличие от Employee Recognition и понятная ссылка на регулярную программу.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="employee-recognition"></a>
## 16. Employee Recognition

**Найдите в Pages:** Employee Recognition. **Ожидаемый URL:** `/pages/employee-recognition`. **Template:** `employee-recognition`.

### 1. Видимый текст — редактор темы → Pages → employee-recognition

**B2B page hero → Heading (H1):** Employee recognition gifts for the moments that matter

**Introduction — готовый вариант первого абзаца:**

> Celebrate work anniversaries, promotions, retirements and years of service with personalized engraved gifts. Elma Vada helps your team plan names, presentation and timing for each occasion.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Четыре карточки: Work Anniversary Pen / Years-of-Service Award / Promotion Gift Set / Retirement Keepsake. Укажите повод и вид персонализации, а не общие комплименты подарку.
- [ ] Раскройте сценарии Work Anniversary / Years of Service / Promotion / Retirement в текстах карточек. Не обещайте измеренный рост вовлечённости без данных.
- [ ] Добавьте короткий переход: Recognition is recurring. Explore the Milestone Program for a coordinated gifting plan. Ссылка /pages/milestone-program.
- [ ] В локальном related-блоке Milestone Program повторяется дважды: если это сохранилось в Shopify, оставьте одну такую карточку; остальные полезные ссылки сохраните.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Именная ручка и награда сотруднику, либо один хорошо снятый подарок к конкретному событию. |
| What could your gift look like? → Work Anniversary Pen | Именная ручка и дата годовщины. |
| What could your gift look like? → Years-of-Service Award | Награда с именем и годами стажа. |
| What could your gift look like? → Promotion Gift Set | Подарочный набор в открытом футляре. |
| What could your gift look like? → Retirement Keepsake | Памятная табличка с персональным текстом. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Employee Recognition → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Employee Recognition**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Employee Recognition Gifts in DFW | Elma Vada
```

**Meta description:**

```text
Celebrate work anniversaries, promotions and retirements with personalized gifts. Explore engraved recognition ideas and a free custom mockup.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What can we give for a work anniversary? / Can every employee receive a named gift? / Can you help with recurring recognition? Ответы связывают реальный ассортимент, список имён и согласованный календарь.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Milestone Program → `/pages/milestone-program`; Service Awards → `/pages/service-awards`; Onboarding & Relocation → `/pages/onboarding`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Все четыре повода раскрыты; Milestone Program доступен по одной понятной ссылке без дубля.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="events-awards"></a>
## 17. Events & Awards

**Найдите в Pages:** Events & Awards. **Ожидаемый URL:** `/pages/events-awards`. **Template:** `events-awards`.

### 1. Видимый текст — редактор темы → Pages → events-awards

**B2B page hero → Heading (H1):** Corporate event gifts and engraved awards

**Introduction — готовый вариант первого абзаца:**

> Plan personalized awards, speaker gifts and conference gifts around your event date. Elma Vada reviews recipient names, artwork, quantities and delivery requirements before confirming the production schedule.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Recognition Award / Conference Pen Run / Speaker Gift Set / Sponsor & VIP Gifts: дать разные примеры, не повторять один товар во всех четырёх карточках.
- [ ] Раскрыть корпоративные награды, спикеров, спонсоров/VIP и участников конференции. Логотипы спонсоров и названия мероприятия публиковать только с разрешением.
- [ ] В процессе указать крайний срок передачи имён, согласование proof и упаковку к вручению. Срок изменения списка и доставки согласуется, не гарантируется автоматически.
- [ ] Ссылка на Quote должна позволять сообщить дату события и город/ZIP; для массовой раздачи предложить Promotional Products.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Готовые награды и подарки спикерам; дата/название реального мероприятия только с разрешением. |
| What could your gift look like? → Recognition Award | Одна готовая награда крупно. |
| What could your gift look like? → Conference Pen Run | Партия ручек в процессе проверки. |
| What could your gift look like? → Speaker Gift Set | Ваш подарочный набор для спикера. |
| What could your gift look like? → Sponsor & VIP Gifts | Подарок VIP или стекло с гравировкой. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Events & Awards → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Events & Awards**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Corporate Event Gifts & Awards in DFW | Elma Vada
```

**Meta description:**

```text
Plan personalized speaker gifts, corporate awards and conference gifts. Share your event date and quantity to discuss production and delivery.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can you meet our event date? / What if recipient names change? / Can awards be packed separately? Дата подтверждается после проверки, изменения до производства отдельно согласуются.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Promotional Products → `/pages/promotional-products`; Bulk Orders → `/pages/bulk-orders`; Our Work → `/pages/our-work`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Срок события не подменён обещанием безусловной доставки в любой день.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="onboarding"></a>
## 18. Onboarding & Relocation

**Найдите в Pages:** Onboarding & Relocation. **Ожидаемый URL:** `/pages/onboarding`. **Template:** `onboarding`.

### 1. Видимый текст — редактор темы → Pages → onboarding

**B2B page hero → Heading (H1):** Personalized onboarding kits and relocation gifts

**Introduction — готовый вариант первого абзаца:**

> Welcome new hires and mark new roles or relocations with personalized engraved gifts. Elma Vada helps you plan the items, names, packaging and delivery arrangements for a considered first-day experience.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Карточки Welcome Pen Set / Desk Keepsake / Role-Specific Gift / Coordinated Fulfillment: подписи совпадают с фото и фактической комплектацией.
- [ ] В Introduction примеров или отдельной текстовой секции раскройте четыре сценария PDF: New hire / Remote employee / Relocation / New role. Отправка напрямую получателю — только по согласованной услуге и стоимости.
- [ ] Добавьте краткий блок: Hiring every month? Discuss a repeatable onboarding workflow. Ссылка на Milestone Program; не обещайте автоматическую HR-интеграцию, которой нет.
- [ ] Личные данные новых сотрудников и адреса на коробках скрыть. Показывайте демонстрационный список имён только как образец.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Открытый реальный welcome-набор с именной ручкой и доступной упаковкой. Если используется прежний AI-концепт, видимо обозначить Gift concept и проверить комплектацию. |
| What could your gift look like? → Welcome Pen Set | Футляр с ручкой для нового сотрудника. |
| What could your gift look like? → Desk Keepsake | Настольный сувенир из дерева. |
| What could your gift look like? → Role-Specific Gift | Ручка или изделие с именем и должностью. |
| What could your gift look like? → Coordinated Fulfillment | Реальные упакованные наборы; адреса скрыть. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Onboarding & Relocation → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Onboarding & Relocation**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Personalized Employee Onboarding Gifts | Elma Vada
```

**Meta description:**

```text
Welcome new hires with personalized gifts and onboarding sets. Discuss engraving, presentation and delivery for your team’s next arrival.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What can be included in a welcome kit? / Can gifts go to remote employees? / Can we reorder for new hires each month? Укажите реальную комплектацию, согласование адресов и повторных заказов.

**Кнопки:** Get a Free Mockup → `/pages/free-mockup`; View Our Work → `/pages/our-work`. В финальном блоке — Discuss Your Project → `/pages/request-a-quote`.

**Related services / ссылки в тексте:** Milestone Program → `/pages/milestone-program`; Employee Recognition → `/pages/employee-recognition`; Bulk Orders → `/pages/bulk-orders`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] URL /pages/onboarding открывается публично; название Onboarding & Relocation само по себе этот handle не устанавливает.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="milestone-program"></a>
## 19. Milestone Program

**Найдите в Pages:** Milestone Program. **Ожидаемый URL:** `/pages/milestone-program`. **Template:** `milestone-program`.

### 1. Видимый текст — редактор темы → Pages → milestone-program

**B2B page hero → Heading (H1):** A personalized employee milestone gifting program

**Introduction — готовый вариант первого абзаца:**

> Build one approved gifting plan for work anniversaries, service milestones and other employee occasions. Start with a 20-minute Gifting Calendar Audit to discuss headcount, gifts, approvals and delivery.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] После hero добавьте при отсутствии текстовую B2B content & photos секцию Which milestones should your program cover?: Work anniversaries / Years of service / Birthdays (optional) / On-demand milestones. Это предложения для согласованной программы, не доказательство работающей автоматизации.
- [ ] В текстах обязательно описать календарь, число сотрудников, матрицу подарков, бюджет/уровни, роли согласования, список получателей, способ доставки и порядок повторного заказа.
- [ ] Essential Recognition / Signature Gift Set / Long-Service Award / Planned Fulfillment: реальные примеры, не пакеты с неподтверждённой фиксированной ценой. В PDF Managed Fulfillment — тот же смысл координации доставки.
- [ ] Кнопка Book a 20-Min Gifting Calendar Audit → /pages/book-a-call?request=audit. Проверьте в приложении тип Gifting calendar audit; параметр сам по себе его не выбирает.
- [ ] Объясните, что после аудита согласуется план; не обещайте HRIS-интеграцию, автоматическое списание, вечное хранение artwork или автоматическую доставку без подтверждения.
- [ ] Входящие ссылки обязательны: Business Solutions, Home, Employee Recognition, Service Awards, Onboarding и Footer.

### 2. Какие фотографии и куда

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B page hero → Hero photo | Реальная линейка подарков/наград для разных этапов программы. Не выдавайте подписанные 1/5/10 years концепты за реальные клиентские заказы. |
| What could your gift look like? → Essential Recognition | Именная ручка, крупный план. |
| What could your gift look like? → Signature Gift Set | Ваш подарочный набор. |
| What could your gift look like? → Long-Service Award | Награда за долгий стаж. |
| What could your gift look like? → Planned Fulfillment | Готовые коробки с подарками, без личных данных. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Milestone Program → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Milestone Program**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Employee Milestone Gifting Program | Elma Vada
```

**Meta description:**

```text
Build a repeatable plan for anniversaries and employee milestones. Discuss your gifting calendar, approvals and delivery in a 20-minute audit.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** What does the 20-minute audit cover? / Can we include birthdays? / Who approves names and gifts? / How are repeat orders scheduled? Ответы: headcount, milestones, delivery, approvals; birthdays добровольно по политике компании; исполнение по согласованному плану.

**Related services / ссылки в тексте:** Employee Recognition → `/pages/employee-recognition`; Service Awards → `/pages/service-awards`; Bulk Orders → `/pages/bulk-orders`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Это страница программы, а не ещё одна общая галерея. Путь к аудиту работает, страницу можно найти без прямого URL.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="free-mockup"></a>
## 20. Get a Free Mockup

**Найдите в Pages:** Get a Free Mockup. **Ожидаемый URL:** `/pages/free-mockup`. **Template:** `free-mockup`.

### 1. Видимый текст — редактор темы → Pages → free-mockup

**B2B page hero → Heading (H1):** Get a free custom mockup

**Introduction — готовый вариант первого абзаца:**

> Share your gift idea, estimated quantity and logo to request a free personalized mockup before ordering. If your artwork is not ready, tell us what you have in mind.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Compact intro (forms) включить, Include hero photo выключить. Форма — сразу после вступления; фото образца не должно отодвигать поля.
- [ ] Форма приложения: имя, email, идея/повод, примерное количество, необязательный логотип, необязательная дата. Если общая Quote-форма слишком длинная, настройте отдельную короткую версию приложения с отдельным Form ID; не меняйте общий ID вслепую.
- [ ] Проверьте текст кнопки Request My Free Mockup и то, что получателю ясно: это запрос mockup, не заказа и не физического образца.
- [ ] Не обещайте срок 24 часа, если не подтверждён. Укажите, что итоговые spelling/layout утверждаются перед производством.
- [ ] Покажите разницу между Digital mockup и Physical sample; ссылку на sample можно дать в FAQ. Наличие бесплатного макета не означает бесплатную пересылку готового изделия.
- [ ] Пройдите общий чек-лист формы: SVG дошёл, автоответ пришёл, старый native form скрыт только после успешного теста.

### 2. Какие фотографии и куда

**Большой hero здесь не нужен.** Форма важнее баннера; небольшое фото образца и блок встречи допустимы после/рядом с полями.

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B quote form → Optional sample photo | Необязательно: одна настоящая ручка-образец в футляре рядом с пояснениями или ниже полей. Не большой hero перед формой. |
| Meet With Us Face to Face → Real photo | Реальная Дарья/команда и место встречи или ручка-образец. См. общий блок встречи. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Get a Free Mockup → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Get a Free Mockup**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Free Corporate Gift Mockup | Elma Vada
```

**Meta description:**

```text
See your personalized gift idea before ordering. Share your occasion, quantity and logo to request a free custom engraving mockup.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Is the mockup free? / Do I need a finished logo? / Is a mockup a physical sample? Ответы: бесплатный цифровой вариант до заказа; можно обратиться с идеей; физический образец согласуется отдельно.

**Related services / ссылки в тексте:** Request a Quote → `/pages/request-a-quote`; Production Capabilities → `/pages/production-capabilities`; Schedule a Consultation → `/pages/book-a-call`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Путь из hero и футера заканчивается короткой работающей формой именно на mockup.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="book-a-call"></a>
## 21. Schedule a Consultation

**Найдите в Pages:** Schedule a Consultation. **Ожидаемый URL:** `/pages/book-a-call`. **Template:** `book-a-call`.

### 1. Видимый текст — редактор темы → Pages → book-a-call

**B2B page hero → Heading (H1):** Let’s talk about your gifting project

**Introduction — готовый вариант первого абзаца:**

> Request a project call or an in-person consultation in Dallas–Fort Worth. Tell us your occasion, quantity and preferred time; our team will confirm the meeting details with you.

Это вариант для вставки, не обязательная замена уже согласованного текста: если текущий абзац отвечает той же задаче, сохраните его.

- [ ] Включите Compact intro (forms), выключите Include hero photo. Сначала контактные поля/календарь, затем фото и подробности встречи.
- [ ] В приложении нужны Name, Email, Phone для обратного звонка (если выбран звонок), Project details, Consultation type и Preferred date/time. Дата и время — пожелание, не автоматическая бронь.
- [ ] Дайте выбор: Project call / In-person consultation / 20-minute Gifting Calendar Audit. Для звонка из PDF 15 минут — только если формат подтверждён; audit — 20 минут, это отдельный запрос.
- [ ] Укажите часовой пояс Dallas — America/Chicago, с учётом сезонного времени, а не постоянно CST для всех дат. Не используйте местное время компьютера редактора.
- [ ] Если есть работающий календарь, задайте Optional external booking calendar в Business & contact и проверьте его. Если календаря нет, оставьте честный запрос времени с последующим подтверждением.
- [ ] Meet With Us Face to Face сохраняет бесплатную именную ручку на согласованной встрече. Адрес точный, посещение по записи. Повторную кнопку не направляйте на тот же URL без перехода к форме.
- [ ] В подтверждении заявки не писать Your meeting is confirmed, пока время не согласовано. Проверьте входы ?request=in-person и ?request=audit в форме приложения.

### 2. Какие фотографии и куда

**Большой hero здесь не нужен.** Форма важнее баннера; небольшое фото образца и блок встречи допустимы после/рядом с полями.

| Блок / карточка в редакторе | Какое фото загрузить |
|---|---|
| B2B quote form → Optional sample photo | Необязательно: одна настоящая ручка-образец в футляре рядом с пояснениями или ниже полей. Не большой hero перед формой. |
| Meet With Us Face to Face → Real photo | Реальная Дарья/команда и место встречи или ручка-образец. См. общий блок встречи. |

Фото-карта описывает слоты локального шаблона, не утверждает, что все они пустые. Подходящие уже выбранные изображения оставьте. Ненужные или неподтверждённые предметные карточки можно скрыть; тексты процесса и Related services не требуют фото.

### 3. SEO — Pages → Schedule a Consultation → Search engine listing → Edit

В верхнем **Title** записи оставьте короткое название **Schedule a Consultation**. Следующие тексты вставляйте **в нижний SEO-блок**, не в большое поле Content.

**Page title:**

```text
Schedule a Gifting Consultation | Elma Vada
```

**Meta description:**

```text
Discuss personalized gifts, quantities and timing with Elma Vada. Request a project call or an in-person consultation in Dallas–Fort Worth.
```

### 4. FAQ, ссылки и проверка

**B2B questions & answers:** Can we meet face to face? / What will we discuss? / Is the appointment confirmed when I submit? Ответ: встреча в DFW по согласованию, обсуждение потребностей/сроков/персонализации, отправка запроса ещё не подтверждает время.

**Related services / ссылки в тексте:** Request a Quote → `/pages/request-a-quote`; Milestone Program → `/pages/milestone-program`; About → `/pages/about`. Используйте существующий related-блок; на коротких страницах без него добавьте ссылки в FAQ или пояснение, не расширяя шапку.

- [ ] Можно запросить звонок, очную встречу и аудит; менеджер видит разницу, клиент не получает ложное подтверждение брони.
- [ ] Save → открыть страницу через меню/CTA без входа в админку: нет 404, нужный заголовок, читаемый текст, фото без обрезанного предмета. Проверить телефон и планшет.

[К оглавлению](#contents)

<a id="final-check"></a>
## Финальная проверка требований Дарьи

Не ставьте галочку только потому, что текст уже есть в локальном файле. Проверяется **сохранённая опубликованная страница**, а для черновика — её Preview плюс проверка публичных Page-записей.

| Требование | Где проверить | Когда считать готовым |
|---|---|---|
| Понятное предложение и быстрый путь к форме | Home, Quote, Mockup, Consultation | CTA видна сразу; форма не спрятана под длинным описанием |
| Персонализация вместо общего branded-оффера | Hero, названия услуг, SEO, Footer | Personalized / laser engraving, реальные поводы и товары |
| Только гравировка | Home, Capabilities, все услуги, FAQ, Footer | Нет предложения UV printing; UV laser описан корректно |
| Данные бизнеса | Header/Footer, About, встреча, Forms, разметка | Dallas-адрес, daria@elmavada.com, рабочий телефон, без Los Angeles |
| Объёмы и цены | Home, Bulk, Corporate Gifts, FAQ | 1–5K+; актуальный диапазон подарков, не фиктивный общий прайс |
| Скорость | Home, Capabilities, Bulk | Оговорка рядом, производство отделено от доставки |
| Доверие | Header trust, Stats Bar, Trust Bar, Testimonials | Подтверждённые цифры и отзывы, нет служебных placeholders |
| Логотип клиента | Quote и Mockup → приложение Forms | SVG действительно отправлен и открыт сотрудником; не только ссылка |
| Образец | Home process, Quote, Capabilities, FAQ | Есть тип Physical sample и обработанный тестовый запрос |
| Встреча и бесплатная ручка | Все Meet With Us, Consultation | Предложение видно, запрос приходит; время подтверждается отдельно |
| Быстрая связь | Контакты, чат, мобильный сайт | Работают только реально обслуживаемые каналы |
| Повторные заказы и закупки | Услуги, Quote, Milestone | Artwork/proof, один контакт, PO approved accounts, согласование повторов |
| Регулярная программа | Milestone, Employee, Service Awards, Onboarding | Календарь, матрица, ответственные и рабочий вход на 20-minute audit |
| Навигация | Header, Footer, карточки, related, CTA | Нужные Page Visible и адреса совпадают; нет 404 и страниц без входящих ссылок |
| Реальные изображения | Portfolio, производство, команда, услуги | Есть разрешение, нет выдачи AI-концепта за реальный заказ |
| Видео | Home hero | Нет автозапуска и звука, есть poster, Play по центру и стрелки поверх медиа |
| SEO/AEO | Каждая страница | Уникальные title/description, один основной H1, прямой ответ, видимый FAQ |
| Адаптивность | Телефон и планшет | Нет горизонтального скролла, обрезанных кнопок и перекрытия чат-виджетом |
| Доставка обращения | Формы | Уведомление на правильную почту, файл доступен, отдельный email-автоответ приходит |

### Что ещё проверяется отдельно от заполнения страниц

- [ ] **Товары:** Products → реальные фотографии изделия/деталей/комплектации, название, материал, варианты, актуальная цена, персонализация, сроки. SEO товара меняется в записи Product, не в Pages. Товарные изображения Featured products берутся из выбранных товаров. SVG в форме заявки не настраивает автоматически загрузку файла на карточке товара.
- [ ] **Политики и Contact:** проверить существующие Privacy Policy, Terms/Store Policies, Contact и ссылки на них. Не копировать сюда SEO сервисных страниц. Контакты обновить; юридические условия должен подтвердить владелец. Эти записи не входят в 20 B2B-шаблонов.
- [ ] **SEO в опубликованном HTML:** title/description, og:title/description/image, canonical на elmavada.com, единая LocalBusiness-разметка с видимыми контактами, FAQ по видимым ответам. Проверка разработчиком; не вставляйте вторую разметку вручную или через приложение без проверки.
- [ ] **Google Search Console:** подтвердить сайт, проверить sitemap.xml и индексируемость основных адресов. Настройки SEO не гарантируют немедленную индексацию.
- [ ] **Google Maps / Business Profile:** отдельно проверить существующую карточку компании, адрес, сайт и контакты. Файл темы не создаёт карточку на карте.
- [ ] **GA4 / Meta Pixel:** выбрать один способ подключения каждого инструмента и проверить события без дублирования. Не отправлять логотипы, имена, email и содержимое заявки в аналитику. Настройку согласия/приватности проверить отдельно.
- [ ] **Скорость:** проверить реальные мобильные страницы после добавления медиа; не загружать тяжёлые оригиналы видео ради короткого превью, не включать одновременно все скрытые секции.
- [ ] **После Save:** повторить путь обычного клиента — главная → услуга → mockup/sample/quote → вложение → подтверждение.

### Где ваши дальнейшие изменения сохраняются

| Где вы работаете | Что сохраняется там | Нужно ли сейчас менять локальный код |
|---|---|---|
| Редактор темы Shopify | Фото, видео, заголовки, секции, общие настройки | Нет |
| Shopify Pages | Название записи, видимость, назначенный шаблон, SEO и URL | Нет |
| Apps → Forms / Inbox | Поля, форма, файлы заявок, уведомления и чат | Нет; отдельно проверить настройки приложения |
| Products | Товары, цены, варианты и фото | Нет |
| Content → Menus | Навигационные ссылки | Нет |
| Локальные файлы темы | Код, который ещё нужно отдельно перенести в актуальную тему | Только если в редакторе отсутствует необходимая возможность |
| Эта инструкция | Ваш план заполнения и проверки | Она сама не обновляет Shopify |

**Перед следующим изменением кода:** скачайте новую копию темы после всех ваших правок и передайте её разработчику. Не загружайте ZIP от 16 сентября поверх новых настроек и не заменяйте settings_data.json. Отдельно сохраните список URL/SEO, используемых меню и Form ID.

## Источники и границы инструкции

- Основной визуальный макет: Elma_Vada_Website_Mockup_V4_FINAL_CLEAN_v2.pdf, 9 страниц, и последующие уточнения Дарьи из переписки. Слова Plano, минимум 10 и старые сроки макета не имеют приоритета над новыми требованиями.
- Фактические поля и карточки: локальные `templates/index.json`, 20 `templates/page.*.json` и схемы соответствующих секций. Это снимок темы, не подтверждение текущей настройки живого магазина.
- SEO для копирования продублированы здесь из [scripts/seo-pages.json](scripts/seo-pages.json). Сам JSON загружать в Shopify не нужно. Если в будущем меняется предложение/SEO, обновите оба источника, чтобы инструкции не расходились.
- Старые планы лежат в `docs/archive-instructions/` только для истории; для заполнения возвращайтесь к этой инструкции.
- Частные данные клиентов, заявления о сертификации, фактические сроки, ассортимент, комплектация и статусы маркетплейсов требуют подтверждения Дарьёй. Инструкция не заменяет эти подтверждения.

[Вернуться к оглавлению](#contents)
