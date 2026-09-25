# Elma Vada — что сделать в Shopify после загрузки темы

> АРХИВ — сохранено для истории, не инструкция к запуску. Часть сведений ниже устарела. Начните с [единого актуального руководства](../../START-HERE-RU.md).

Эта инструкция относится к архиву темы после правок от 14 сентября 2026. Сначала загрузите его как **новую неопубликованную тему** и работайте только в её preview. Не нажимайте Publish, пока не закончите проверку.

## 1. Загрузка темы

1. Shopify Admin → **Online Store → Themes**.
2. В блоке Theme library нажмите **Add theme → Upload zip file**.
3. Выберите актуальный архив Elma Vada B2B-2026-09-15-banner.zip (логотипы хедера/футера и обновлённый баннер с видео).
4. После загрузки у новой темы откройте **… → Preview**. Старый опубликованный сайт не изменится.

## Логотип сайта в хедере и футере — обновление 15 сентября

После загрузки обновлённой темы:

1. **Customize / Edit theme → Header → Logo image → Select image → Upload** — загрузите полный логотип бренда.
2. Настройте **Logo width — desktop** и **Logo width — mobile**.
3. **Footer → Logo image → Select image → Upload** — загрузите отдельную версию для тёмного фона футера.
4. Настройте **Logo width** и нажмите **Save**.

Для светлого хедера подойдёт тёмный логотип, для тёмного футера — светлый; удобно использовать PNG с прозрачным фоном. Изображение заменяет прежний значок EV и текст бренда. Если убрать выбранное изображение, прежнее оформление вернётся. Пропорции сохраняются, высота ограничена размером блока.

Это логотип Elma Vada на сайте. Поле SVG в форме заявки служит для файлов клиентов и настраивается отдельно.

Если вы уже редактировали тему в Shopify после скачивания исходного ZIP, сначала сохраните её свежую копию: новый архив содержит локальную версию настроек. Для переноса только возможности загрузки логотипов нужны изменения в sections/header.liquid, sections/footer.liquid и assets/revision.css; их следует совместить с актуальными файлами темы.

## 2. Общие данные: заполняются один раз

Откройте **Customize → Theme settings → Business & contact**.

| Поле | Что поставить |
|---|---|
| Public email | daria@elmavada.com |
| Street and suite | 18383 Preston Rd, #202 |
| City / State / ZIP | Dallas / TX / 75252 |
| Service area | Dallas–Fort Worth |
| Phone | Оставить пустым, пока нет готового номера |
| Business hours | Заполнить только реальными часами |
| Real studio / team photo | Загрузить настоящее фото студии или команды |
| WhatsApp number | Только когда номер подключён к WhatsApp Business; международные цифры без + |
| Show Text Us | Включать только если этот телефон принимает SMS |
| Optional external booking calendar | Вставить ссылку после настройки календаря |

После телефона в футере и hero автоматически появится Call; после WhatsApp — отдельная ссылка. До этого пустых кнопок не будет.

В **Theme settings → SEO & social preview**:

- оставьте Title и Description, уже подготовленные для главной;
- загрузите реальное brand photo для social preview;
- проверьте, что это не AI placeholder.

В **Theme settings → Social Media** удалите Etsy URL, если профиль больше нигде не должен использоваться. Ссылка Etsy уже исключена из футера даже если поле пока заполнено.

## 3. Главная: изображения, видео и тексты

Откройте **Customize → Home page → Hero — photos & video**.

1. В первом Slide оставьте постоянный текст: Corporate Gifts Made Personal; Get a FREE custom mockup before you order.
2. Для каждого из трёх Slide выберите Media type: Image и реальное фото, либо Shopify video и загрузите видео через Shopify Files/video picker.
3. Для каждого ролика выберите **Video cover preset**: Gold engraved lines, Gold gift ribbon или Navy and gold layers. Обложки уже включены в тему. **Frame from video** оставляет кадр самого ролика. Если загрузить свою картинку в **Video poster**, она будет использована вместо выбранного пресета.
4. Не загружайте AI-изображения вместо реальной студии; пустой слайд посетителям не показывается.
5. Видео запускается **только нажатием прозрачной кнопки Play в центре**, без звука. Повторное нажатие ставит его на паузу. Переключение слайда и уход баннера из экрана останавливают ролик; возврат не запускает его автоматически.
6. **Auto-rotate slides** по умолчанию выключен. Если включить, автоматически меняются фотографии; на видеослайде прокрутка останавливается. Стрелки позволяют перейти дальше вручную.

На компьютере изображение/видео заполняет правую половину баннера на всю высоту. На планшете и телефоне медиа расположено под текстом и занимает всю ширину. Стрелки находятся поверх изображения/видео, внизу справа. Медиа заполняет область с кадрированием, без растягивания: держите важные детали ближе к центру и проверяйте мобильный Preview.

Обложки сгенерированы как декоративные фоны в палитре бренда, а не как фотографии ваших работ. Файлы: assets/hero-video-cover-metal.png, assets/hero-video-cover-ribbon.png, assets/hero-video-cover-layers.png. Промпты сохранены в HERO-COVERS-PROMPTS.md.

Звук отключён в плеере сайта; исходные видеофайлы не перекодированы. Если нужно удалить аудиодорожку из самого файла, экспортируйте ролик без аудио перед загрузкой. Самих роликов в локальном проекте пока нет — их нужно выбрать в Shopify и проверить воспроизведение на iPhone/Android.

**Если после последнего скачивания вы уже меняли тему в Shopify:** сначала скачайте свежую резервную копию. Для переноса только этих изменений совместите sections/hero.liquid, assets/revision.css, assets/revision.js и три assets/hero-video-cover-*.png с текущей темой. Не заменяйте config/settings_data.json и templates/index.json старой локальной версией: там хранятся ваши выбранные картинки, видео и тексты. Новый ZIP загружайте отдельной темой, он сам не перенесёт более поздние настройки опубликованной темы.

| Слайд | Что показать |
|---|---|
| 1 | Готовый подарок, крупный план имени/гравировки и упаковки |
| 2 | Настоящий процесс лазерной гравировки |
| 3 | Партия персонализированных ручек или встреча с образцом |

Далее на Home page заполните изображения в Business Solutions, Recent work, Fast In-House Engraving, Meet With Us Face to Face и What can we engrave for you?. Для case study используйте только реальные работы с разрешением на публикацию. Карточки, где требуется approval, остаются скрытыми, пока не добавлены фото и подтверждение публикации.

## 4. Создайте или проверьте Pages

Код добавляет шаблоны, но Shopify Pages создаются отдельно. Откройте **Content → Pages**. Для каждого URL: создайте или откройте страницу, нажмите Save, выберите Theme template и установите Visibility = Visible.

| Title | Handle / URL | Theme template |
|---|---|---|
| Business Solutions | business-solutions | page.solutions |
| Production Capabilities | production-capabilities | page.capabilities |
| Industries We Serve | industries | page.industries |
| Our Work | our-work | page.portfolio |
| About | about | page.about |
| Request a Quote | request-a-quote | page.quote |
| Corporate Gifts | corporate-gifts | page.corporate-gifts |
| Bulk Orders | bulk-orders | page.bulk-orders |
| Personalized Merchandise | branded-merchandise | page.branded-merchandise |
| Custom Engraving | custom-engraving | page.custom-engraving |
| Promotional Products | promotional-products | page.promotional-products |
| FAQ | faq | page.faq |
| Client Gifting | client-gifting | page.client-gifting |
| Service Awards | service-awards | page.service-awards |
| Employee Recognition | employee-recognition | page.employee-recognition |
| Events & Awards | events-awards | page.events-awards |
| Onboarding | onboarding | page.onboarding |
| Milestone Program | milestone-program | page.milestone-program |
| Get a Free Mockup | free-mockup | page.free-mockup |
| Schedule a Consultation | book-a-call | page.book-a-call |

Для каждой страницы заполните **Search engine listing → Edit** значениями из файла scripts/seo-pages.json. Заголовки и метаописания уже имеют резерв в коде, но сохранение их в Shopify делает управление прозрачным.

## 5. Форма и SVG: обязательная проверка

В теме есть резервная contact form: она собирает данные и ссылку на artwork. Настоящая загрузка файла требует настройки приложения формы в Shopify.

1. Установите/откройте Shopify Forms.
2. Создайте inline form для Free Mockup и Quote.
3. Добавьте name, email, company, request type, occasion, quantity, deadline, notes и **File upload**.
4. В File upload проверьте загрузку настоящего SVG. Shopify Forms поддерживает один файл до 20 MB, включая SVG, PDF и JPEG. Не обещайте PNG/AI/EPS, пока не проверите их в выбранном решении.
5. В Theme editor откройте Request a Quote и Get a Free Mockup → B2B quote form → Add block → Apps → ваша Shopify Form.
6. После успешного теста выключите Show built-in contact form, чтобы клиент не видел две формы.
7. В настройках формы выберите **Don’t subscribe customers to marketing**: заявка на quote не должна автоматически подписывать человека на рассылку.
8. Настройте уведомление ответственному и сделайте тест с SVG: убедитесь, что файл реально доступен сотруднику вместе с заявкой.

На Free Mockup оставьте короткую форму. На Request a Quote можно оставить обязательной Company. На Book a Call включена просьба о предпочтительном времени; это запрос, а не подтверждённая бронь.

## 6. Меню и 404

В **Content → Menus** назначьте короткое Main menu:

- Business Solutions
- Production Capabilities
- Industries
- Our Work
- About

Header CTA ведёт на Request a Quote. В футере и внутренних страницах уже есть пути к Free Mockup, Book a Call, Client Gifting, Onboarding и Milestone Program.

После создания Pages откройте в Preview, а затем в incognito: /pages/client-gifting, /pages/onboarding, /pages/free-mockup, /pages/book-a-call, /pages/milestone-program. Каждая должна открываться без 404. Если старые адреса уже используются внешне, сделайте осмысленные URL redirects. Не направляйте всё на главную.

## 7. Что ещё добавить вручную

- Реальный номер телефона и решение: SMS, WhatsApp, Shopify Inbox.
- Настоящие часы работы и правило посещений по записи.
- Рабочая ссылка календаря, если нужна мгновенная запись.
- 3–6 реальных отзывов с разрешением и источником.
- Проверяемые статусы Etsy Star Seller / eBay Top Rated; Amazon’s Choice — только с URL конкретного подходящего товара.
- GA4, Search Console и Meta Pixel только если они ещё не подключены; не ставьте один пиксель дважды.
- Google Business Profile / карта по новому адресу.

## 8. Финальный запуск

До Publish:

- отправьте тестовую заявку Quote, Mockup, Sample и Consultation;
- проверьте SVG upload, email-уведомление и ответный текст;
- пройдите все CTA и меню на телефоне;
- проверьте экран 360, 375, 768, 820, 1024 и desktop;
- убедитесь, что в публичном тексте нет UV printing, старого Gmail, Plano как адреса студии, MOQ 10 или AI labels;
- проверьте Title, description, OG image и canonical через preview после публикации;
- только затем нажмите Publish.

Shopify templates применяются к конкретным Pages: добавление файла шаблона само по себе не создаёт публичную страницу. Подробности о шаблонах и назначении ресурсов: [Shopify Help](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates).
