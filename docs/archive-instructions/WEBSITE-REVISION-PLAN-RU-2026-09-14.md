# Elma Vada — план правок сайта и идеи

> АРХИВ — сохранено для истории, не инструкция к запуску. Часть сведений ниже устарела. Начните с [единого актуального руководства](../../START-HERE-RU.md).

Дата: 14 сентября 2026. Статус: ПЛАН, НЕ ВЫПОЛНЕННЫЕ ИЗМЕНЕНИЯ.

Код темы, настройки Shopify и опубликованный сайт в рамках этого задания не менялись. Создан только этот документ. Существующие локальные изменения assets/b2b-pages.css сохранены без вмешательства.

## 1. На чём основан план

- ZIP: theme_export__engravedpens-shop-elma-vada-b2b-2026-09-12__12SEP2026-1129pm.zip.
- PDF: Elma_Vada_Website_Mockup_V4_FINAL_CLEAN_v2.pdf, 9 страниц.
- Скриншот IMG_7341.png и новые комментарии Дарьи.
- Локальные шаблоны, секции и предыдущие инструкции проекта.
- Просмотр публичной главной и проверка актуальной документации по формам, чату и видео.

При противоречиях новые указания Дарьи важнее старого макета: Dallas вместо адреса студии в Plano, 1–5K+ вместо 10–5,000+, только лазерная гравировка вместо UV printing, новый email. Цифры опыта, команды и клиентов ниже — предоставленные владельцем данные, а не результаты независимого аудита маркетплейсов.

ZIP датирован 12 сентября: он не гарантирует сохранность изменений, сделанных в Shopify после скачивания. Перед реализацией потребуется свежий снимок актуальной темы.

### Что действительно обнаружено

| Наблюдение | Основание | Что делать |
|---|---|---|
| В экспортированной теме config/settings_schema.json содержит пустой массив | Прочитан ZIP; локально определения настроек есть | Восстановить определения общих настроек, сохранив актуальные значения и идентификаторы |
| Старый Gmail, Plano, UV printing и минимум 10 остались в настройках футера | config/settings_data.json в ZIP; скриншот | Менять сохранённые значения, а не только defaults в коде |
| UV printing есть не только в футере | Hero, Production Capabilities, index.json, LocalBusiness schema | Исправить видимый текст, карточки, настройки и JSON-LD |
| Hero выводит H1 для каждого из трёх слайдов | sections/hero.liquid и публичная главная | Оставить один главный H1; остальные заголовки сделать H2/обычным текстом |
| Пояснения в Quote стоят перед полями в разметке | sections/b2b-quote.liquid; отдельный hero перед формой | Изменить порядок на мобильном и сократить верхнюю часть |
| Поле логотипа сейчас принимает URL | sections/b2b-quote.liquid | Подключить реальный приём файлов с SVG |
| LocalBusiness содержит жёстко заданные старые контакты и часы | snippets/schema-local-business.liquid | Общий источник бизнес-данных; не оставлять неподтверждённые часы |
| Метаданные зависят от Shopify page_title/page_description; собственных OG-тегов в layout нет | layout/theme.liquid | Заполнить SEO в админке и добавить согласованные OG/Twitter-теги, проверив отсутствие дублей от приложений |
| На главной видны старый Title, служебные подписи и UV Print | Публичный просмотр | Обновить предложение, метаданные и реальные медиа |
| Открытие engravedpens.shop перенаправило на elmavada.com | Публичный просмотр | Проверить основной домен, canonical и сохранение путей при редиректах |
| Los Angeles / los-angeles в текстовых файлах ZIP не найдено | Поиск по архиву | Проверить отдельно Shopify SEO, Pages, товары, карты, приложения и ссылки; не утверждать, что источник уже найден |
| Четыре 404 и отсутствие ссылок на Milestone Program сообщены владельцем | Новые комментарии | Проверить реальные Page-записи и HTTP-ответы при реализации; браузерная проверка этих внутренних URL здесь не дала надёжного подтверждения статусов |

Публичная главная на момент просмотра: [elmavada.com](https://elmavada.com/). ZIP не содержит сами записи Shopify Pages, настройки SEO этих записей, данные меню и настройки приложений как полноценный экспорт магазина. Наличие шаблона не доказывает, что страница создана и видима.

## 2. Очерёдность работ

| Приоритет | Работа | Критерий результата |
|---|---|---|
| P0 — сохранность | Свежая копия темы, сравнение с локальными файлами, восстановление schema настроек | Новые тексты, изображения и настройки Shopify не потеряны |
| P0 — достоверность | Услуги, email, Dallas, объёмы, заглушки | Нет UV printing, старых контактов и служебного текста |
| P0 — обращения | Форма в начале страницы, SVG upload, доставка заявки, mockup/sample/consultation | Клиент может отправить запрос и файл; сотрудник получает оба |
| P0 — переходы и SEO | Неработающие URL, Milestone links, Title/H1/description/OG | Целевые страницы открываются, метаданные соответствуют содержимому |
| P1 — главная | Новый оффер, доверие, фото/видео, встреча и образец | С первого экрана понятны услуга, диапазон заказа и следующий шаг |
| P1 — связь | Чат, после получения номера — звонок/SMS/WhatsApp | Рабочие каналы без пустых кнопок |
| P1 — внутренние страницы | Фото, первые абзацы, CTA, FAQ и related services | Каждая страница решает свой покупательский вопрос |
| P2 — запуск и измерение | Адаптивность, скорость, события заявок, Search Console | Проверены реальные пользовательские сценарии |

Не нужно ждать заполнения большой фотогалереи, чтобы исправить контакты, услуги, форму и ссылки.

## 3. Как сохранить уже сделанные изменения Shopify

1. Перед началом сделать дубликат актуальной темы в Shopify и скачать свежий ZIP. Отдельно зафиксировать ID темы и дату.
2. Сохранить локальный проект с существующими CSS-правками; не заменять весь проект старым ZIP.
3. За основу контента брать свежие экспортированные настройки. Сравнить config/settings_data.json, templates/*.json и группы секций, если они появятся в новой версии.
4. Восстановить config/settings_schema.json из совместимых локальных определений. Сохранить прежние IDs настроек, затем добавить новые поля для видео, контактов и CTA.
5. Внести изменения кода и точечно обновить устаревший контент. Не загружать старые JSON поверх новых настроек пользователя.
6. Проверять в неопубликованной копии темы. Создание Pages, изменение общих меню и включение приложений могут затронуть магазин независимо от копии темы — согласовать этот этап отдельно.
7. Перед публикацией снова сверить изменения, сделанные в Shopify за время разработки. Публиковать только после проверки и согласования.

Меню, SEO Pages, домены, почта и формы приложений требуют отдельной фиксации: резервной копии файлов темы для них недостаточно.

## 4. Единые бизнес-данные и формулировки

| Поле | Новое значение / правило |
|---|---|
| Email | daria@elmavada.com |
| Адрес | 18383 Preston Rd, #202, Dallas, TX 75252 |
| Регион обслуживания | Dallas–Fort Worth / DFW; другие реальные зоны обслуживания можно сохранить |
| Услуга | In-house laser engraving; personalized corporate gifts and engraved awards |
| Объём | 1–5K+ units per order; в поясняющем тексте — from 1 to 5,000+ units |
| Цена подарков | Custom engraved gifts from $9.99 to $119.99 — диапазон из новых указаний, не универсальный прайс любой услуги |
| Телефон | Пока пустой. Никаких (XXX) XXX-XXXX на публичном сайте |
| Часы / посещение | Уточнить; не выводить старые жёстко заданные часы и не обещать свободный walk-in |

Пройти по хедеру, футеру, hero, статистике, FAQ, внутренним страницам, формам, SEO-полям, JSON-LD, OG, ссылкам email/карты и старым defaults секций.

Количество в текущей встроенной форме уже допускает 1: сохранить это и привести в соответствие остальной контент. Не заменять все встречающиеся числа 10: «10+ сотрудников» и «10 лет службы» имеют другой смысл.

### UV printing и UV laser — не одно и то же

Удалить предложение полноцветной UV-печати, UV Print badge, соответствующую карточку и обещания цветной печати. В PDF перечислены CO₂ Lasers ×3, Fiber Lasers ×4, UV Lasers ×2 и 3D Crystal Laser. UV laser engraving можно оставить как технологию гравировки, если это действующее оборудование. Таблицу материалов публиковать по реальным возможностям оборудования, не переносить автоматически «Best/Yes» из макета.

Не добавлять печать на футболках: конкурентский Call Now — пример способа связи, а не новая услуга Elma Vada.

### Personalized вместо branded

В основном оффере и названиях подарков использовать personalized gifts, personalized corporate gifts, custom engraved gifts. Corporate gifts сохранить как понятную категорию. Branded допустимо в контексте логотипа компании, но не должно быть единственным способом описания предложения.

Не менять все URL вслед за текстом: /pages/branded-merchandise можно сохранить, переименовав видимый заголовок. Если URL всё-таки меняется, нужны адресный 301 и обновление внутренних ссылок. Нового исследования частотности ключевых слов в рамках этого плана не проводилось.

## 5. Главная: структура, тексты и действия

### Рекомендуемый порядок блоков

| Блок | Содержание | Визуал / действие |
|---|---|---|
| Header | Логотип, короткое меню, одна заметная CTA | Request a Quote; в мобильном меню — способы связи |
| Компактная полоса доверия | 5+ years · 50,000+ happy customers | Без бегущей строки и переполнения; остальные цифры в блоке ниже |
| Hero | Один H1, краткий оффер, free mockup, две кнопки | Реальное фото/видео; CTA ведёт прямо к началу формы |
| Доверие + быстрые параметры | 4 числа, цена, 1–5K+ units | Кратко, без повторения длинного hero |
| What are you gifting for? | Employee Recognition, Client Gifts, Events & Awards, Onboarding | 4 реальные предметные фотографии, отдельные ссылки |
| See it before you buy it | Brief → Mockup → Sample where qualifying → Proof → Production & delivery | Макет рядом с готовой гравировкой; запрос образца |
| Recent work / Fast, In-House Engraving | 3–4 проекта, производство, сроки с оговоркой | Реальная серия изделий и крупный план гравировки |
| Meet With Us Face to Face | Консультация в DFW, бесплатная персонализированная ручка на встрече | Фото Дарьи/места встречи/ручки-образца; запись |
| FAQ + финальный контакт | Короткие ответы и повтор CTA | Не ещё один длинный продающий текст |
| Footer | Реальные контакты, услуги, программа, полезные ссылки | Новый адрес/email; убрать ссылку Etsy |

Большой блок «The cost of doing nothing» из PDF лучше сократить и оставить на подходящих внутренних страницах. Он не должен отодвигать форму и реальные примеры.

### Готовая основа Hero

Надзаголовок: Personalized Corporate Gifts & Laser Engraving

H1: **Corporate Gifts Made Personal**

Подзаголовок: Personalized gifts for milestone celebrations, employee recognition, client appreciation, and company events.

Короткое предложение: Get a FREE custom mockup before you order.

Кнопки: **GET A FREE MOCKUP** / **SCHEDULE A CONSULTATION**

Краткие параметры: Custom engraved gifts from $9.99 to $119.99 · 1–5K+ units per order.

После получения номера: Call or text: [реальный номер].

На мобильном не пытаться вместить в hero одновременно четыре статистики, все сроки, обе формы и большое видео. Приоритет: предложение → CTA → начало формы либо понятный прямой переход к ней. Нужен видимый намёк на форму без обязательного долгого скролла.

### Отдельный блок про скорость

H2: **Fast, In-House Engraving**

Small orders ready in as little as 1 business day.*

Up to 1,000 engraved pens produced in just 1 business day.*

*Turnaround time varies by product, quantity, design complexity, artwork approval, and inventory availability.*

Оговорка должна быть рядом и читабельной на телефоне. Производство за день не равно доставке за день. Не переносить производственную скорость на обещание сроков бесплатного макета. Удалить абсолютные обещания отсутствия задержек доставки.

### Встреча и бесплатная ручка

H2: **Meet With Us Face to Face**

Planning gifts for your employees, clients, partners, or an upcoming event? Schedule a complimentary in-person consultation in the Dallas–Fort Worth area.

We’ll discuss your gifting needs, timeline, quantities, and personalization options. You’ll also receive a complimentary pen engraved with your name or company logo as a sample of our work.

Кнопка: **SCHEDULE AN IN-PERSON CONSULTATION**.

Место: 18383 Preston Rd, #202, Dallas, TX 75252. Посещение — по согласованной записи, если именно так организована работа.

Бесплатная ручка на встрече — отдельное предложение. Оно не означает бесплатную доставку любого физического образца каждому посетителю сайта.

## 6. Форма: сначала действие, потом пояснения

### Компоновка

- Request a Quote: короткий H1 и одно предложение; сразу блок формы. На desktop форма справа, компактное пояснение слева, как на странице 9 PDF.
- На mobile после короткого вступления должны идти поля, а уже затем преимущества, фото и подробное описание процесса.
- Цель первого экрана — показать хотя бы заголовок формы и первые поля на обычных размерах экрана; вся длинная форма не обязана помещаться целиком.
- На главной основной CTA ведёт на /pages/free-mockup, где форма начинается наверху. Дополнительная идея: маленькая форма прямо в hero, если она не перегрузит мобильный экран.
- Можно добавить мобильную закреплённую кнопку Get a Free Mockup, но только после проверки, что она не перекрывает чат, cookie banner и поля при открытой клавиатуре.

### Поля и сценарии

| Поле / режим | Предложение |
|---|---|
| Request type | Free mockup / Quote / Physical sample / Consultation; предвыбирать по нажатой CTA |
| Name, Email | Обязательные; не требовать регистрации или только корпоративного домена почты |
| Company | Видимое поле; обязательность для полной B2B-заявки, в коротком mockup-запросе желательно не создавать лишний барьер |
| Occasion / project type | Employee recognition, client gifts, events, onboarding, milestone program, other / not sure yet |
| Quantity | От 1; для раннего запроса позволить «Not sure yet» |
| Logo / artwork | Настоящий upload, SVG обязательно; дополнительная ссылка как альтернативный способ |
| Phone | Необязательное; предпочтительный способ ответа при необходимости |
| Need it by, budget | Сохранить; во второстепенной части короткой формы |
| Pickup / delivery / shipping, city / ZIP | Сохранить из PDF; не заставлять вводить полный адрес на раннем этапе |
| Notes | Имена, материалы, пожелания; не запрашивать открытые ссылки на приватные списки сотрудников |

Это предложение по снижению сложности формы, не требование удалить поля макета. Полная Quote-форма сохраняет все нужные сведения; короткий mockup-запрос может собирать меньше.

### Реальный SVG upload

Первым вариантом проверить **Shopify Forms**, встроенную форму приложения на странице, а не обычный Liquid contact form. Документация подтверждает поле загрузки одного файла до 20 MB, включая SVG, PDF и JPEG. PNG, AI и EPS в опубликованном списке не указаны: не обещать их поддержку до проверки. Если они нужны, выбрать другое решение после теста требований. [Документация Shopify Forms](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/settings/all-forms).

В текущей b2b-quote уже предусмотрен app block. План: испытать upload в копии темы, затем отключить встроенную URL-only форму, чтобы не оставлять две конкурирующие формы. Просто добавить input file в старую форму недостаточно для гарантированной доставки файла.

Требования к проверке:

- SVG действительно сохраняется; сотрудник получает доступ к правильному файлу вместе с заявкой.
- Есть понятный лимит, сообщение об ошибке, название выбранного файла и возможность заменить его.
- Проверяются допустимые типы и размер на стороне принимающего сервиса; недоверенный SVG не вставляется в HTML сайта как активный код.
- Отправка без файла тоже возможна: «Don’t have your artwork ready? Send your request and we’ll help with the next step.»
- Файлы и персональные данные не попадают в публичную галерею или аналитику.
- Повторная заявка не теряется и не заменяет единственную сохранённую запись проекта в профиле клиента: нужна история обращений.

### Уведомления и автоответ

Отдельно настроить получение заявок ответственным сотрудником и проверить доставку на daria@elmavada.com. Смена email в футере сама по себе не меняет получателя формы и не создаёт почтовый ящик.

Shopify Forms предусматривает уведомления владельцу и интеграцию с автоматизациями; для формы обращения нужно отключить автоматическую подписку на маркетинг. Получателя, Flow/автоответ и формат доступа к файлу проверять в магазине. [Настройки Shopify Forms](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/settings/all-forms).

Текст после отправки: “Thank you — we’ve received your request. Our team will contact you to discuss your project and the next step.”

Автоответ: подтвердить тип запроса, перечислить следующий шаг и контакты. Не писать «Your consultation is confirmed», пока время реально не забронировано. Цель ответа в течение рабочего дня из PDF можно указать после согласования процесса, не подменяя её гарантией 24/7.

## 7. Образец и консультации — обязательные пути

Сохранить формулировку из страницы 9 PDF:

**You can reduce the risk before committing.**

Free mockup • 15-minute project call • physical sample where qualifying • in-person sample review for qualifying bulk projects.

| Действие | Где предложить | Что происходит |
|---|---|---|
| Request a Free Mockup | Hero, услуги, процесс, Quote, footer | Короткая заявка с загрузкой логотипа, выбран тип mockup |
| Request a Physical Sample | Quote, Capabilities, How It Works | Заявка с типом sample; команда уточняет применимость, стоимость/доставку, если они есть |
| Schedule a Consultation | Hero, услуги, footer | Выбор телефонной/онлайн/очной консультации; только реально обслуживаемые варианты |
| Schedule an In-Person Consultation | Meet With Us, About, Quote | Запрос встречи в DFW и бесплатной персонализированной ручки на встрече |
| Book a 20-Min Gifting Calendar Audit | Milestone Program | Отдельный тип консультации про календарь, headcount, поводы и согласования |

Если календарь ещё не выбран, показать Request a consultation с желаемым временем и последующим подтверждением. Не изображать мгновенное бронирование. Для американского клиента явно указывать часовой пояс встреч — Dallas / America/Chicago с учётом сезонного времени.

## 8. Связь: чат, звонок, сообщения

Рекомендация: один основной чат на сайте, а не три перекрывающих виджета. Начать с Shopify Inbox либо WhatsApp, исходя из того, где Дарья сможет оперативно отвечать. Shopify Inbox предназначен для общения с посетителями онлайн-магазина. [Shopify Inbox](https://help.shopify.com/en/manual/inbox).

| Канал | План | Что требуется |
|---|---|---|
| Call Now | Кликабельный телефон; наиболее полезен на mobile | Реальный номер и часы ответа |
| Text Us | SMS-ссылка на поддерживаемых устройствах | Номер с приёмом сообщений; обычная ссылка не гарантирует iMessage |
| WhatsApp | Кнопка с коротким стартовым сообщением о проекте | Подтверждённый номер WhatsApp / WhatsApp Business |
| Shopify Inbox | Один чат-виджет, приветствие, статус доступности, ответ сотрудника | Настройка и ответственный; проверить уведомления |
| Apple Messages for Business | Дополнительный вариант позднее, если действительно нужен | Отдельное подключение; не равно обычной SMS-кнопке |

Apple описывает Messages for Business как отдельный канал общения с участвующими компаниями на поддерживаемых устройствах. Не обещать iMessage всем посетителям. [Apple](https://support.apple.com/en-us/102053).

До получения номера оставить рабочие форму/email/настроенный чат, а телефонные кнопки скрыть. Проверить существующий плавающий элемент со скриншота, прежде чем добавлять новый: по одному изображению его назначение не установлено.

## 9. Навигация и отсутствующие страницы

Верхнее меню не превращать в список всех посадочных страниц. Предлагаю сохранить Business Solutions / Production Capabilities / Industries / Our Work / About + Request a Quote. Внутри Business Solutions и футера раскрыть направления из PDF.

| URL | План действия | Откуда должна быть ссылка |
|---|---|---|
| /pages/client-gifting | Проверить Page, Visible, handle и назначение существующего шаблона client-gifting; создать Page, если её нет | Business Solutions, карточка главной, Footer |
| /pages/onboarding | Аналогично: шаблон onboarding уже есть | Business Solutions, главная, Footer, Employee Recognition |
| /pages/free-mockup | Сделать отдельную короткую посадочную с работающей формой; не оставлять несуществующий URL | Главные CTA, процесс, услуги, Footer |
| /pages/book-a-call | Сделать страницу консультации: календарь либо честный запрос времени | Hero, Meet With Us, услуги, Footer |
| /pages/milestone-program | Сохранить рабочую страницу; проверить назначение шаблона | Business Solutions, Employee Recognition, Service Awards, Onboarding, Footer |
| /pages/request-a-quote | Сохранить основной адрес полной заявки | Header, услуги, Footer |

Для free-mockup и book-a-call нужны новые или специально настроенные шаблоны, чтобы их содержание и формы не менялись одновременно с Quote из-за общего шаблона.

Если новые посадочные откладываются, временно заменить CTA на существующую форму с выбранным типом запроса. Если старые адреса уже используются внешне, настроить осмысленные редиректы к нужному действию. Не перенаправлять всё на главную.

Проверить также дубли «quote» / «Request a Quote» и «Branded Merchandise DFW» / «branded-merchandise», замеченные ранее в списке Pages: определить назначение, затем объединять только действительно дублирующие страницы с редиректом. По названию нельзя безопасно решить, что удалять.

Метки менять в выбранном Shopify menu и в резервных ссылках темы. В ZIP поля меню хедера/футера пустые, поэтому резервная навигация особенно важна. Проверять desktop, мобильное меню, footer, CTA и related services отдельно.

## 10. Правки по внутренним страницам

Каждая страница: один H1, прямой ответ первым абзацем, 2–4 подходящих реальных фото, понятный mockup/quote CTA, короткий FAQ и 2–4 родственные ссылки. Число фото — ориентир; не заполнять страницу одинаковыми картинками ради количества.

| Страница / шаблон | Что добавить или уточнить | Какие изображения |
|---|---|---|
| Business Solutions / solutions | Выбор по поводу подарка; ссылки на все основные сценарии и Milestone Program | 4 разных решения: сотрудник, клиент, событие, onboarding |
| Production Capabilities / capabilities | Только гравировка; технологии и материалы; реальные сроки с оговоркой; sample CTA | Работающий лазер, детали на разных материалах, готовая партия |
| Industries / industries | Реальные отраслевые сценарии без выдуманных клиентов и юридических гарантий | Подходящие изделия для каждой отрасли, не случайные стоковые офисы |
| Our Work / portfolio | Кейсы: задача, изделие, количество, материал, метод, результат | Общий кадр, крупная гравировка, упаковка, партия; не публиковать пример как настоящий кейс |
| About / about | Дарья/команда, 5+ лет, 10+ человек, адрес, QC, встреча | Реальные люди, помещение, контроль качества |
| Request a Quote / quote | Форма наверху, SVG, образец, способ связи, пояснения ниже | Одна небольшая фотография образца после/рядом с формой |
| Corporate Gifts / corporate-gifts | Personalized оффер, поводы, цена диапазоном, реальные отзывы | Ручка, набор, награда; упаковка |
| Bulk Orders / bulk-orders | Заказы 1–5K+, объёмная оценка, 1,000 pens/day с условиями; не обещать 5,000 за день | Партия, раскладка имён, упаковка |
| Branded Merchandise / branded-merchandise | Видимое название Personalized Merchandise; только реально гравируемые товары | Логотип/имя на реальном изделии крупным планом |
| Custom Engraving / custom-engraving | Laser engraving in Dallas, материалы, artwork, mockup → proof | Процесс и результат на металле/дереве/стекле по реальным возможностям |
| Promotional Products / promotional-products | Personalized promotional gifts; убрать впечатление услуги цветной печати | Гравированные промоподарки и партии |
| FAQ / faq | Нормальное название; MOQ, сроки, SVG, образец, доставка, встреча, повторный заказ | Фото необязательно; важнее быстрые ответы |
| Client Gifting / client-gifting | Client / partner / executive; approved gift library, повторные заказы | Подарок клиенту, pen set, гравированное стекло |
| Service Awards / service-awards | Years of service; персонализация имён/дат; связь с программой | Награды за стаж, детали надписи |
| Employee Recognition / employee-recognition | Anniversary, promotion, retirement; переход в Milestone Program | По одному характерному изделию для разных поводов |
| Events & Awards / events-awards | Дедлайн мероприятия, списки получателей, proof, упаковка | Награды, speaker gifts, conference pen batch |
| Onboarding / onboarding | Welcome kits, remote/relocation/new role; recurring workflow | Открытый welcome set, имя нового сотрудника, упаковка |
| Milestone Program / milestone-program | Годовой календарь, матрица подарков, роли согласования, доставка; 20-minute audit | Реальные наборы/награды; схема процесса без приватных данных сотрудников |

Из PDF сохранить One Human Contact, Artwork on File, Easy Reorders; PO-Friendly Ordering — только для approved company accounts. Это описание рабочего процесса, не обещание автоматически реализованных функций кабинета. Не добавлять автоматическую HR-интеграцию, подписку или хранение календаря сотрудников, если сервис пока работает вручную.

## 11. SEO и AEO

### Общие технические изменения

1. Главная: заменить старый SEO Title про pens на корпоративные персонализированные подарки. Проверить итоговый title с учётом автоматического добавления shop.name — бренд не должен повторяться дважды.
2. На каждой странице один основной H1 и логичная структура H2/H3. Это решение для понятной структуры; три H1 сами по себе не доказывают санкцию поисковика.
3. Заполнить уникальные meta descriptions в Shopify, а не рассчитывать на текст в JSON-секции. В текущем layout description выводится только при наличии page_description.
4. Добавить OG title/description/url/type/image и Twitter card; предусмотреть изображение по умолчанию и отдельные изображения страниц. Проверить итоговый HTML на дубли от приложений.
5. Canonical должен соответствовать основному домену и конкретному URL. Проверить редиректы engravedpens.shop → elmavada.com с сохранением пути и нужных параметров.
6. Проверить sitemap, индексируемость целевых страниц, отсутствие случайного noindex и открытие без авторизации. В Search Console смотреть основной домен.
7. LocalBusiness: один согласованный идентификатор компании, новый email, streetAddress с #202, addressLocality Dallas, addressRegion TX, postalCode 75252, addressCountry US. Не подставлять favicon вместо фотографии бизнеса. Телефон/часы добавлять после получения реальных значений.
8. Schema должна соответствовать видимым данным. Не превращать 50,000 клиентов в reviewCount или AggregateRating. BreadcrumbList — по реальной навигации. FAQ-разметка — только для вопросов и ответов, которые пользователь видит; не обещать расширенный сниппет.
9. Не ставить выдуманный Product/Offer на страницу услуги с диапазоном цен всех подарков. Разметку конкретных товаров проверять отдельно.

Google может формировать заголовки и сниппеты по-разному: корректные Title/description не гарантируют буквального показа введённого текста. [Title links](https://developers.google.com/search/docs/appearance/title-link), [snippets](https://developers.google.com/search/docs/appearance/snippet).

### Проекты Title и meta description

Это предлагаемые тексты для следующего этапа, ещё не сохранённые в Shopify. При внедрении проверить итоговую длину с брендом и соответствие реальному содержимому страницы. Указаны полные желаемые Title; не добавлять бренд повторно.

| Страница | Title | Meta description |
|---|---|---|
| Home | Personalized Corporate Gifts in Dallas \| Elma Vada | Personalized corporate gifts and laser engraving in Dallas–Fort Worth. Orders from 1 to 5,000+ units. Request a free custom mockup. |
| Business Solutions | Corporate Gifting Solutions in DFW \| Elma Vada | Explore personalized gifts for employees, clients, events and onboarding. Plan your project with our Dallas–Fort Worth engraving team. |
| Capabilities | Laser Engraving Capabilities in Dallas \| Elma Vada | Explore our in-house laser engraving capabilities, materials and production process. Send your artwork and quantity for a project quote. |
| Industries | Corporate Gifts by Industry in DFW \| Elma Vada | Find personalized gifting ideas for your industry, team and occasion. Discuss quantities, engraving and delivery with our DFW studio. |
| Our Work | Personalized Gift Projects & Engraving \| Elma Vada | Explore real engraved gift projects, personalized details and production examples. Request a custom mockup for your next corporate gift. |
| About | About Our Dallas Engraving Studio \| Elma Vada | Meet the team behind Elma Vada’s personalized corporate gifts. Learn about our Dallas studio, in-house engraving and approach to quality. |
| Request a Quote | Request a Corporate Gift Quote \| Elma Vada | Tell us your occasion, quantity and deadline. Upload your logo, including SVG, and request a quote for personalized gifts and engraving. |
| Corporate Gifts | Personalized Corporate Gifts in DFW \| Elma Vada | Personalized gifts for employee recognition, client appreciation and company events. Explore engraved gift ideas and request a free mockup. |
| Bulk Orders | Bulk Personalized Gifts & Engraving \| Elma Vada | Plan engraved gift orders from 1 to 5,000+ units. Share your quantity, artwork and deadline for a project-specific quote and production timing. |
| Branded Merchandise | Personalized Merchandise in Dallas \| Elma Vada | Create personalized merchandise with names, messages or your company logo. Explore laser-engraved gifts for teams, clients and events. |
| Custom Engraving | Custom Laser Engraving in Dallas \| Elma Vada | Request custom laser engraving for gifts, awards and business projects. Discuss materials, artwork and quantities with our Dallas team. |
| Promotional Products | Personalized Promotional Gifts in DFW \| Elma Vada | Make your next event personal with laser-engraved promotional gifts. Share your logo, quantity and deadline to explore suitable options. |
| FAQ | Corporate Gift & Engraving FAQs \| Elma Vada | Find answers about gift quantities, SVG artwork, mockups, physical samples and turnaround. Learn how to start your engraving project. |
| Client Gifting | Personalized Client & Executive Gifts \| Elma Vada | Plan thoughtful gifts for clients, partners and executives. Explore engraved gifts, personalization and repeat-order options in DFW. |
| Service Awards | Years-of-Service Awards in DFW \| Elma Vada | Recognize years of service with personalized engraved awards and gifts. Plan names, dates, quantities and presentation with our team. |
| Employee Recognition | Employee Recognition Gifts in DFW \| Elma Vada | Celebrate work anniversaries, promotions and retirements with personalized gifts. Explore engraved recognition ideas and a free custom mockup. |
| Events & Awards | Corporate Event Gifts & Awards in DFW \| Elma Vada | Plan personalized speaker gifts, corporate awards and conference gifts. Share your event date and quantity to discuss production and delivery. |
| Onboarding | Personalized Employee Onboarding Gifts \| Elma Vada | Welcome new hires with personalized gifts and onboarding sets. Discuss engraving, presentation and delivery for your team’s next arrival. |
| Milestone Program | Employee Milestone Gifting Program \| Elma Vada | Build a repeatable plan for anniversaries and employee milestones. Discuss your gifting calendar, approvals and delivery in a 20-minute audit. |
| Free Mockup — новая | Free Corporate Gift Mockup \| Elma Vada | See your personalized gift idea before ordering. Share your occasion, quantity and logo to request a free custom engraving mockup. |
| Book a Call — новая | Schedule a Gifting Consultation \| Elma Vada | Discuss personalized gifts, quantities and timing with Elma Vada. Request a project call or an in-person consultation in Dallas–Fort Worth. |

Descriptions про SVG, реальные проекты и audit публиковать вместе с работающей соответствующей функцией/контентом, не раньше.

### AEO: ответы по делу, а не отдельная «магическая настройка»

- Начало страницы сразу отвечает: что делаем, кому подходит, где работаем и как начать.
- FAQ отвечает на реальные вопросы: Can I order one gift? Can I upload an SVG logo? Can I see a mockup first? Can I request a physical sample? How fast can you engrave my order? Can we meet in Dallas?
- Под ответом о скорости — условия; под образцами — различие между qualifying sample и бесплатной ручкой на встрече.
- H2-вопросы использовать там, где это естественно. Название категории не обязательно превращать в искусственный вопрос.
- Тексты должны быть доступны в HTML, а не только на картинке или в видео. Добавить ссылки на конкретные услуги и реальные доказательства работы.
- Google не требует специальной дополнительной разметки для AI Overviews/AI Mode; базовая техническая доступность и полезный контент остаются важными. Попадание в AI-ответы не гарантируется. [Google: AI features](https://developers.google.com/search/docs/appearance/ai-features).

## 12. Доверие и футер

### Заменить служебный placeholder данными Дарьи

- **5+ Years of Experience**
- **10+ Team Members**
- **50,000+ Happy Customers**
- **100,000+ Engraved Gifts**

На desktop можно четыре компактных показателя; на mobile — сетка 2×2. Это совокупный опыт бизнеса, не автоматически B2B-клиенты и не число отзывов. Не размещать все цифры в одной непереносимой строке хедера.

Бейджи: Etsy Star Seller / Amazon’s Choice / eBay Top Rated. Перед использованием логотипов и формулировок сверить актуальное право показа и область награды. Особенно не оформлять Amazon’s Choice как общий рейтинг всей компании: использовать применительно к соответствующему товару. Не выдумывать звёзды, средний рейтинг или число reviews из этих цифр.

Ссылку Etsy убрать именно из публичного футера. Это не означает автоматически удалить упоминание Etsy Star Seller из блока доверия. Социальные профили в schema sameAs проверить отдельно на принадлежность и актуальность.

Предлагаемый footer-текст:

“Personalized corporate gifts and in-house laser engraving in Dallas–Fort Worth. From individual gifts to orders of 5,000+ units.”

Контакты: daria@elmavada.com; 18383 Preston Rd, #202, Dallas, TX 75252; реальный телефон позже. Добавить ссылку карты на новый адрес после проверки точки. Устаревший Gmail найти также в theme support metadata, автоответах и получателях формы.

## 13. Hero: изображения и видео

Рекомендованный вариант: постоянный текст и кнопки слева, сменяемые фото/видео справа. Так ключевой оффер не исчезает во время чтения, а проблема трёх H1 решается естественно. Альтернатива — сохранить меняющийся текст, но оставить H1 только один и продумать доступность скрытых слайдов.

### Что добавить в редактор темы

Для каждого из минимум трёх слайдов: Media type — Image / Video; image picker; Shopify-hosted video picker; poster image; alt/описание; кадрирование/focal point; необязательный mobile poster; подпись и ссылка, если они нужны. Настройки существующих изображений сохранить.

Использовать объект видео и штатный вывод Shopify как основу, а не произвольный HTML от редактора. [Shopify video](https://shopify.dev/docs/api/liquid/objects/video), [video_tag](https://shopify.dev/docs/api/liquid/filters/video_tag).

### Поведение и производительность

- Автовоспроизведение, если включено, — без звука и внутри страницы. Дать pause/play; учитывать reduced motion.
- Не воспроизводить скрытый слайд; при ручном запуске видео не переключать его посреди просмотра.
- Не загружать сразу все тяжёлые ролики. Для первого экрана — подходящий poster и явные размеры, для остальных — отложенная загрузка.
- При запрете autoplay или ошибке загрузки остаются poster и понятная кнопка Play; текст/CTA доступны всегда.
- Клавиатура, фокус, скрытые ссылки слайдов, контраст текста и кнопки управления должны работать.
- Ролик с важной речью требует субтитров/текстового эквивалента. Для декоративного процесса не встраивать рекламные надписи в само видео.
- Проверить загрузку на мобильном соединении. Длительность 8–15 секунд для фонового процесса — идея для съёмки, а не обязательное ограничение Shopify.

### Сюжеты для трёх медиа

| Слайд | Фото / видео | Задача |
|---|---|---|
| 1 | Готовый персонализированный подарок: ручка/набор, красивый крупный план имени и упаковки | Сразу показать, что получит клиент |
| 2 | Реальная лазерная гравировка: короткий процесс + готовый результат | Доказать in-house production, без UV printing |
| 3 | Реальная партия с разными именами или подарки/образец на встрече | Показать масштаб и индивидуальную персонализацию |

## 14. Какие материалы подготовить и куда загрузить

| Материал | Количество / формат как ориентир | Куда |
|---|---|---|
| Hero media | 3 реальных фото или коротких видео; горизонтальные фото примерно 2000–2400 px, отдельный mobile crop при необходимости | Theme editor → Home → Hero → соответствующий slide; видео через Shopify Files/video picker |
| Poster каждого видео | 1 качественный кадр без встроенного текста | Тот же slide → Poster |
| Gifting occasions | 4 фото: recognition / client / event / onboarding | Home → solutions cards и соответствующие страницы |
| Production | 3–5 фото: лазер, материал, QC, партия | Capabilities и блок производства на Home |
| Portfolio | 3–4 реальных проекта, по 2–4 снимка | Our Work; лучшие фото повторить на Home |
| About / meeting | Фото Дарьи/команды, места встречи, ручки-образца | About и Meet With Us |
| Внутренние услуги | По 2–4 релевантных фото; допустимо осмысленно повторять реальные изделия | Image-поля hero/content/gallery нужного шаблона |
| Social preview | Общая брендовая обложка около 1200×630 и при необходимости отдельные обложки | Новые SEO/social image settings, не обязательно hero |
| Отзывы | Реальные короткие тексты с именем/компанией и разрешённым источником | Testimonials на Home/About/Corporate Gifts |

Названия будущих новых полей окончательно закрепить при реализации и обновить SHOPIFY-CONTENT-GUIDE-RU.md / PHOTO-UPLOAD-MAP-RU.md. В действующем редакторе Video/Poster для hero пока не следует ожидать: это часть плана.

AI-placeholder заменять реальными материалами вместе с подписью «Illustrative concept · AI-generated». Просто убрать раскрытие и оставить вымышленное производство как реальное — не решение. Если съёмка ещё не готова, лучше использовать одну настоящую предметную фотографию и скрыть пустые слайды/кейсы.

Не загружать клиентские логотипы, лица, списки имён и заказов без разрешения. Alt описывает реальное изображение; декоративным элементам не нужны набитые ключевыми словами описания.

## 15. Где будут выполняться изменения

| Место | Будущие задачи |
|---|---|
| Локальный код | Header/Hero/video, порядок Quote, адаптивность, OG и schema, восстановление settings_schema, настройки новых блоков, резервные ссылки |
| Данные темы Shopify | Тексты/фото/видео, доверие, footer, адрес/email, новые секции; точечное сохранение актуальных JSON |
| Shopify Pages / Menus / SEO | Создать/показать страницы, назначить templates, исправить меню, Title/description, проверить дубли и редиректы |
| Shopify apps / коммуникации | Forms upload, доставка заявки, автоответы, Inbox/WhatsApp, календарь; установка и внешний запуск только по согласованию |
| Почта / домены | Проверить работу daria@elmavada.com, основной домен и редиректы; не менять DNS без отдельной необходимости |
| Материалы от владельца | Телефон и каналы, часы/порядок посещения, фото/видео, условия отправки sample, доступный график встреч |

Новый email, адрес, цифры доверия и основные английские формулировки уже даны — повторно придумывать их не требуется. Пока не хватает телефона, рабочих медиа и конкретной организации обработки сообщений/встреч/образцов. Эти вопросы не мешают подготовить остальной код после согласования плана.

Для аналитики сначала проверить существующие приложения и пиксели, затем настроить CTA click, form start, upload success/error и успешную отправку. Не считать нажатие Submit успешной заявкой. Не передавать имя, email, файл и текст заявки в GA4/Meta. Не дублировать пиксели, учитывать выбранный механизм согласия на tracking.

## 16. Проверка перед публикацией

- [ ] Сохранены последние Shopify-настройки и существующие локальные CSS-изменения; есть резервная копия.
- [ ] Общие настройки темы снова доступны; тексты и медиа редактируются в Shopify.
- [ ] Нет предложения UV printing, старого Gmail, неверного адреса, MOQ 10 и служебных подсказок на публичных страницах.
- [ ] Новый email получает реальные тестовые письма; получатель формы проверен отдельно от footer.
- [ ] Все шесть ключевых путей из таблицы навигации открываются без авторизации и ведут к ожидаемому действию.
- [ ] Milestone Program доступна из нескольких подходящих страниц и футера.
- [ ] На Quote и Free Mockup форма начинается сразу после короткого вступления, на mobile не спрятана после длинного текста.
- [ ] SVG успешно загружается и доступен сотруднику; протестированы допустимые файлы, большой файл, ошибка сети и заявка без файла.
- [ ] Mockup, sample, quote и consultation различаются в заявках; автоответ не обещает неподтверждённое время встречи.
- [ ] Образец из PDF и бесплатная ручка на очной консультации не потерялись и не смешаны в безусловную бесплатную доставку.
- [ ] Реальный телефон кликабелен после добавления; WhatsApp/чат действительно обслуживаются.
- [ ] Один основной H1 на странице; у целевых страниц корректные Title/description/OG/canonical.
- [ ] Dallas и новый адрес согласованы в видимом тексте, JSON-LD и карте; отдельно проверены возможные Los Angeles в админке/приложениях.
- [ ] Убрана ссылка Etsy из футера; доверие не содержит выдуманных звёзд и количества отзывов.
- [ ] Фото/видео переключаются без потери CTA, звук не включается сам, hidden slides не воспроизводятся.
- [ ] Нет горизонтального скролла на ширинах 360, 375, 768, 820, 1024, 1200 и 1440 px; отдельно проверены длинные заголовки, меню, trust band и формы.
- [ ] Доступны клавиатура, видимый фокус, подписи полей, сообщения ошибок; плавающие элементы не перекрывают форму.
- [ ] Проверены мобильная скорость и смещение макета с настоящими медиа, не только с плейсхолдерами.
- [ ] Тестовая успешная отправка учтена аналитикой один раз, без персональных данных.

Эти пункты — будущие критерии приёмки, не отметка о выполненном тестировании. Следующий шаг после согласования: сохранить свежую тему и реализовать P0 в копии, затем добавить главную с видео, реальные материалы и каналы связи. Публикация — отдельный согласованный этап.
