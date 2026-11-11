# Education & Government Procurement (`/pages/service-awards`)


> Обновлено 5 ноября 2026. Адрес и шаблон `page.service-awards` прежние, содержание новое: одна страница для школ, университетов, государственных учреждений и community organizations. Years-of-Service остаётся одним из сценариев.

Правило для фото: сюда ставим только снимки реальных изделий. Происхождение проверено по метаданным: EXIF камеры подтверждает реальный снимок, метка C2PA `trainedAlgorithmicMedia` (OpenAI или Google) подтверждает генерацию. Изображения из `output/imagegen` и файлы `google-ai-photo-*` не использовать.

| Блок | Новый файл | Alt text |
|---|---|---|
| Hero | Нет подтверждённого реального кадра. Поле оставлено пустым, текст стоит по центру. Нужен реальный снимок наград или подарков без логотипов школ и агентств без разрешения | Заполнить по фактическому кадру |
| Teacher & Staff Appreciation | `IMG_4625.jpg`, исходник `images/home/IMG_4625.JPG`, EXIF iPhone 15 Pro | `Black pen with gold-tone trim beside an open black presentation case.` |
| Student & Academic Recognition | `Executive_Gifts.jpg`, исходник `images/business_solutions/Executive Gifts.jpeg`, EXIF iPhone 12 Pro | `Engraved Parker pen in an open gold-tone case with a personalized congratulations message.` |
| Employee Service & Retirement | `para.jpg`, исходник `images/home/para.JPG`, EXIF iPhone 15 Pro. Временный кадр: нужна реальная награда за стаж | `Two black pens with gold-tone trim in an open brown presentation case.` |
| Donor, Volunteer & Community Recognition | `gift.jpg`, исходник `images/business_solutions/gift.JPG`, EXIF iPhone 15 Pro. Временный кадр: нужна реальная награда для донора или волонтёра | `Gift bag, ribbon-tied box and personalized pen presented as a gift set.` |
| Awards & Recognition Pieces | `assets/procurement-appreciation-award.webp`, исходник `images/business_solutions/event_awar.JPG`, EXIF iPhone 15 Pro | `Clear circular Retirement Appreciation Award set in a curved wooden base.` |
| Pens & Writing Sets | `assets/industries-distributed.webp`, исходник `images/home/IMG_7444.JPG`, EXIF iPhone 15 Pro | `Three wooden pen cases engraved with the same team name, each holding a personalized wooden pen.` |
| Glassware & Drinkware | Нет реального кадра: все снимки стекла в проекте сгенерированы или не подтверждены. Поле пустое, карточка текстовая | Заполнить по фактическому кадру |
| Desk Accessories & Promotional Products | `assets/procurement-wood-keychain.webp`, исходник `images/home/IMG_7607.JPG`, EXIF iPhone 15 Pro | `Wooden keychain with a leather strap, engraved with a house emblem and a family name.` |

Убраны как подтверждённо сгенерированные: `personal-message-cube-v1.png`, `five-ten-fifteen-year-service-awards-elma-vada-dfw.png`, `professional-recognition-wooden-desk-holder-elma-vada-dfw.png`, `everyday-pens.png`, `drinkware.png` (все из `output/imagegen`), `awards.png` и `personalized-recognition-gifts-award-pen-tumbler-desk-organizer.png` (метка C2PA OpenAI). Убрано как неподтверждённое: `personalized-sponsor-vip-event-gift-set.jpg`, файл без метаданных из той же серии, что и сгенерированные снимки.

Папка `images/elma-vada-20-real-site-images` реальной подтверждённой не считается: метаданных нет, а края снимков дорисованы размытием. Подходит только после сверки с оригиналом.

**Какие фото нужны:** hero с наградами или подарками; награда за стаж или выход на пенсию (вторая, отличная от снимка в Awards); награда для донора или волонтёра; гравированное стекло или посуда; настольный аксессуар вроде держателя визиток; при наличии разрешения — работа для школы или учреждения.

На кадрах видны имена и названия: «Bea & Martin», «Dr. Ronnie H. Joudeh», «The Babin Family», «TEAM EPIC», «Touch of Elegance LLC», имя на ручке Parker. Перед публикацией нужно разрешение. Не называйте эти снимки выполненными заказами для школ или государственных учреждений.

**Закупочные документы.** Форма Request a Quote 1155185 подтверждённо содержит поле для логотипа. Способ передачи RFQ/RFP не подтверждён, поэтому страница не обещает загрузку. Публичный контакт темы: daria@elmavada.com. **Capability Statement:** PDF подключается в секции Purchasing Support, поля Second button text и Second button link. Без ссылки кнопки нет.

<!-- COMPLETE-THEME-CHECKLIST -->

## Полный чек-лист

Источник: локальная тема, 5 ноября 2026. Шаблон: `service-awards`. URL: `/pages/service-awards`.

Откройте редактор темы → Pages → service-awards. Проходите блоки ниже по порядку. Названия взяты из текущей темы, скрытые секции тоже перечислены. После изменения нажмите Save.

### Как добавить видео

В Hero внутренних страниц, B2B feature, Photo / content card, Solution card и боковом медиа формы доступны **Media type → Image / Video**, **Video** и **Video cover**. Выберите Video, загрузите ролик, задайте обложку и описание сюжета в Photo description. Если есть Include image or video — включите. Видео запускается по Play, без звука; повторное нажатие ставит паузу. На главной Hero уже имеет собственные настройки слайдов. Обложка по умолчанию берётся из видео. Эти новые поля появятся после загрузки обновлённой темы.

### Header. Header

Редактор: **Header**; идентификатор `header`. Общая секция всех страниц. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Logo image (logo_image) | shopify://shop_images/e4o-OL2JxlUBwtAtRTZmHA.png | Ваш логотип. Сохраняйте пропорции. |
| Image width — desktop (logo_width) | 70 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Image width — mobile (logo_mobile_width) | 50 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Line 1 (brand_line_one) | Elma Vada | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Line 2 (brand_line_two) | CORPORATE GIFTS | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Line 3 (brand_line_three) | IN-HOUSE ENGRAVING | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Name font (brand_name_font) | serif | Настройка оформления. Проверьте настольный и мобильный вид. |
| Lines 2–3 font (brand_detail_font) | sans | Настройка оформления. Проверьте настольный и мобильный вид. |
| Name size — desktop (brand_name_size) | 32 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Name size — mobile (brand_name_mobile_size) | 20 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Lines 2–3 size — desktop (brand_detail_size) | 11 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Lines 2–3 size — mobile (brand_detail_mobile_size) | 9 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Name color (brand_name_color) | #001333 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Lines 2–3 color (brand_detail_color) | #a8752a | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text line height (brand_line_height) | 1.3 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Main menu (menu) | Не заполнено | Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP. |
| Logo badge (logo_badge) | EV | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Logo name (logo_name) | Elma Vada | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Logo subtitle (logo_subtitle) | Corporate Gifts & Engraving | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| CTA label (cta_label) | Request a Quote | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| CTA link (cta_url) | /pages/request-a-quote#ProjectForm | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

Проверьте меню, все ссылки, логотип, телефон и email. Общие контакты: Theme settings → Business & contact. Адрес: 18383 Preston Rd, #202, Dallas, TX 75252. Ссылку на Etsy в футер не добавляйте.

Вложенных карточек в текущем экспорте нет.

### 1. Custom Engraved Awards & Gifts for Schools and Public Agencies

Редактор: **Procurement hero**; идентификатор `hero`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Eyebrow (eyebrow) | Education & Government Procurement | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Heading (H1) (heading) | Custom Engraved Awards & Gifts for Schools and Public Agencies | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | Elma Vada Studio provides custom engraved awards, personalized pens, glassware and promotional products for schools, universities, government agencies and community organizations. With in-house laser engraving in Dallas–Fort Worth, Texas, we help coordinate organization logos, individual names, quantities and delivery requirements for recognition programs and public-sector purchasing. Planning an appreciation event or preparing a formal purchasing request? Send us your project details or RFQ/RFP requirements for review. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Hero photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Choose an approved real photo of engraved awards or gifts. Do not use school or agency logos, names, or identifiable information without permission. | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |
| Primary button (button_label) | Request a Procurement Quote | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Primary link (button_link) | /pages/request-a-quote#ProjectForm | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Secondary button (secondary_label) | Explore Products | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Secondary link (secondary_link) | /collections/all | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Background (color_scheme) | cream | Настройка оформления. Проверьте настольный и мобильный вид. |

**Сюжет / файл:** Нет подтверждённого реального кадра. Поле оставлено пустым, текст стоит по центру. Нужен реальный снимок наград или подарков без логотипов школ и агентств без разрешения

**Alt для предложенного сюжета:** Заполнить по фактическому кадру

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 1.1. Highlight

- [ ] Проверить блок `highlight_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Text (text) | In-house engraving in DFW | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 1.2. Highlight

- [ ] Проверить блок `highlight_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Text (text) | Individual names & organization logos | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 1.3. Highlight

- [ ] Проверить блок `highlight_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Text (text) | Itemized quotes | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 1.4. Highlight

- [ ] Проверить блок `highlight_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Text (text) | Nationwide shipping | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

### 2. Awards and Gifts for Your Program

Редактор: **Procurement content**; идентификатор `scenarios`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Awards and Gifts for Your Program | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Items layout (layout) | photo_cards | Настройка оформления. Проверьте настольный и мобильный вид. |
| Photo crop (image_fit) | cover | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text below items (closing_text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button text (button_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button link (button_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Button style (button_style) | primary | Настройка оформления. Проверьте настольный и мобильный вид. |
| Second button text (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Second button link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Signature below button (signature) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Background (color_scheme) | white | Настройка оформления. Проверьте настольный и мобильный вид. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 2.1. Teacher & Staff Appreciation

- [ ] Проверить блок `item_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Teacher & Staff Appreciation | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Personalized pens, bookmarks, drinkware and gift sets for Teacher Appreciation Week, administrative professionals and campus-wide staff recognition. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | shopify://shop_images/IMG_4625.jpg | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Black pen with gold-tone trim beside an open black presentation case. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

Уже загружено фото: `shopify://shop_images/IMG_4625.jpg`. Сохраните его, если оно соответствует сюжету ниже.

**Сюжет / файл:** `IMG_4625.jpg`, исходник `images/home/IMG_4625.JPG`, EXIF iPhone 15 Pro

**Alt для предложенного сюжета:** `Black pen with gold-tone trim beside an open black presentation case.`

Текущий alt: `Black pen with gold-tone trim beside an open black presentation case.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 2.2. Student & Academic Recognition

- [ ] Проверить блок `item_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Student & Academic Recognition | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Engraved awards and keepsakes for graduation, academic achievement, athletic programs and student milestones, personalized with recipient names and your institution’s identity. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | shopify://shop_images/Executive_Gifts.jpg | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Engraved Parker pen in an open gold-tone case with a personalized congratulations message. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

Уже загружено фото: `shopify://shop_images/Executive_Gifts.jpg`. Сохраните его, если оно соответствует сюжету ниже.

**Сюжет / файл:** `Executive_Gifts.jpg`, исходник `images/business_solutions/Executive Gifts.jpeg`, EXIF iPhone 12 Pro

**Alt для предложенного сюжета:** `Engraved Parker pen in an open gold-tone case with a personalized congratulations message.`

Текущий alt: `Engraved Parker pen in an open gold-tone case with a personalized congratulations message.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 2.3. Employee Service & Retirement

- [ ] Проверить блок `item_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Employee Service & Retirement | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Recognition awards and gifts for years of service, promotions, retirement and public service contributions. Include names, titles, service years and a personal message. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | shopify://shop_images/para.jpg | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Two black pens with gold-tone trim in an open brown presentation case. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Replace with a real photo of a years-of-service or retirement award when one is available. | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

Уже загружено фото: `shopify://shop_images/para.jpg`. Сохраните его, если оно соответствует сюжету ниже.

**Сюжет / файл:** `para.jpg`, исходник `images/home/para.JPG`, EXIF iPhone 15 Pro. Временный кадр: нужна реальная награда за стаж

**Alt для предложенного сюжета:** `Two black pens with gold-tone trim in an open brown presentation case.`

Текущий alt: `Two black pens with gold-tone trim in an open brown presentation case.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 2.4. Donor, Volunteer & Community Recognition

- [ ] Проверить блок `item_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Donor, Volunteer & Community Recognition | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Thank donors, volunteers, speakers and community partners with engraved awards and gifts for appreciation events, conferences and outreach programs. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | shopify://shop_images/gift.jpg | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Gift bag, ribbon-tied box and personalized pen presented as a gift set. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Replace with a real photo of a donor or volunteer recognition piece when one is available. | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

Уже загружено фото: `shopify://shop_images/gift.jpg`. Сохраните его, если оно соответствует сюжету ниже.

**Сюжет / файл:** `gift.jpg`, исходник `images/business_solutions/gift.JPG`, EXIF iPhone 15 Pro. Временный кадр: нужна реальная награда для донора или волонтёра

**Alt для предложенного сюжета:** `Gift bag, ribbon-tied box and personalized pen presented as a gift set.`

Текущий alt: `Gift bag, ribbon-tied box and personalized pen presented as a gift set.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

### 3. Choose Your Products

Редактор: **Procurement content**; идентификатор `products`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Choose Your Products | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Items layout (layout) | photo_cards | Настройка оформления. Проверьте настольный и мобильный вид. |
| Photo crop (image_fit) | cover | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text below items (closing_text) | Product availability, materials and suitable personalization methods are confirmed with your quote. If you need an item outside the catalog, send your specifications for a sourcing review. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button text (button_label) | Browse Products | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button link (button_link) | /collections/all | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Button style (button_style) | outline | Настройка оформления. Проверьте настольный и мобильный вид. |
| Second button text (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Second button link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Signature below button (signature) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Background (color_scheme) | cream | Настройка оформления. Проверьте настольный и мобильный вид. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 3.1. Awards & Recognition Pieces

- [ ] Проверить блок `item_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Awards & Recognition Pieces | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Acrylic awards and engraved keepsakes for individual achievements and organized recognition programs. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | procurement-appreciation-award.webp | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Clear circular Retirement Appreciation Award set in a curved wooden base. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** `assets/procurement-appreciation-award.webp`, исходник `images/business_solutions/event_awar.JPG`, EXIF iPhone 15 Pro

**Alt для предложенного сюжета:** `Clear circular Retirement Appreciation Award set in a curved wooden base.`

Текущий alt: `Clear circular Retirement Appreciation Award set in a curved wooden base.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 3.2. Pens & Writing Sets

- [ ] Проверить блок `item_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Pens & Writing Sets | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Metal and wooden pens, Parker pens and writing sets with organization logos and individual names. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | industries-distributed.webp | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Three wooden pen cases engraved with the same team name, each holding a personalized wooden pen. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** `assets/industries-distributed.webp`, исходник `images/home/IMG_7444.JPG`, EXIF iPhone 15 Pro

**Alt для предложенного сюжета:** `Three wooden pen cases engraved with the same team name, each holding a personalized wooden pen.`

Текущий alt: `Three wooden pen cases engraved with the same team name, each holding a personalized wooden pen.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 3.3. Glassware & Drinkware

- [ ] Проверить блок `item_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Glassware & Drinkware | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Personalized glasses, drinkware and gift sets for appreciation events and organizational milestones. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Add a real camera photo of engraved glassware or drinkware. No confirmed real photo exists in the project yet. | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Нет реального кадра: все снимки стекла в проекте сгенерированы или не подтверждены. Поле пустое, карточка текстовая

**Alt для предложенного сюжета:** Заполнить по фактическому кадру

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 3.4. Desk Accessories & Promotional Products

- [ ] Проверить блок `item_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Desk Accessories & Promotional Products | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Bookmarks, business card holders, wooden accessories and branded items for conferences, outreach and office use. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | procurement-wood-keychain.webp | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Wooden keychain with a leather strap, engraved with a house emblem and a family name. | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** `assets/procurement-wood-keychain.webp`, исходник `images/home/IMG_7607.JPG`, EXIF iPhone 15 Pro

**Alt для предложенного сюжета:** `Wooden keychain with a leather strap, engraved with a house emblem and a family name.`

Текущий alt: `Wooden keychain with a leather strap, engraved with a house emblem and a family name.`. Сверьте с фактически выбранным кадром.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

### 4. Purchasing Support for Schools and Public Agencies

Редактор: **Procurement content**; идентификатор `purchasing`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Purchasing Support for Schools and Public Agencies | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Items layout (layout) | text_cards | Настройка оформления. Проверьте настольный и мобильный вид. |
| Photo crop (image_fit) | cover | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text below items (closing_text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button text (button_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button link (button_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Button style (button_style) | primary | Настройка оформления. Проверьте настольный и мобильный вид. |
| Second button text (secondary_label) | Download Capability Statement | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Second button link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Signature below button (signature) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Background (color_scheme) | white | Настройка оформления. Проверьте настольный и мобильный вид. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 4.1. RFQs, RFPs & Invitations to Bid

- [ ] Проверить блок `item_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | RFQs, RFPs & Invitations to Bid | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | We welcome purchasing inquiries and formal solicitations for products within our capabilities. Tell us the specifications, quantities, submission deadline and required documents so we can assess the opportunity. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «RFQs, RFPs & Invitations to Bid»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for rfqs, rfps & invitations to bid.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 4.2. Itemized Quotes

- [ ] Проверить блок `item_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Itemized Quotes | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | We provide quotations with product details, quantities, personalization options and unit pricing to support purchasing review. Include your budget range and required delivery date. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Itemized Quotes»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for itemized quotes.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 4.3. Purchase Orders

- [ ] Проверить блок `item_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Purchase Orders | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Purchase orders are subject to review. Full payment is required before production unless alternative terms have been agreed in writing. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Purchase Orders»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for purchase orders.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 4.4. Vendor Documents & Tax-Exempt Orders

- [ ] Проверить блок `item_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Vendor Documents & Tax-Exempt Orders | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Business information and W-9 are available for vendor review. We support qualifying tax-exempt purchases with appropriate documentation and review additional registration requirements for each opportunity. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Vendor Documents & Tax-Exempt Orders»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for vendor documents & tax-exempt orders.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 4.5. Production & Delivery Planning

- [ ] Проверить блок `item_5`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Production & Delivery Planning | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Production schedules depend on product availability, quantity and artwork approval. Tell us your event date and delivery destinations; requests for multiple campuses or offices are reviewed during quotation. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Реальная готовая партия в одинаковых коробках или ролик упаковки; адресные этикетки не включать в кадр.

**Alt для предложенного сюжета:** `Personalized gift boxes prepared for packing and delivery.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

### 5. Who We Work With

Редактор: **Procurement content**; идентификатор `who`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Who We Work With | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | We welcome inquiries from: | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Items layout (layout) | list | Настройка оформления. Проверьте настольный и мобильный вид. |
| Photo crop (image_fit) | cover | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text below items (closing_text) | Whether you need one retirement gift or a coordinated recognition program, share your requirements so we can review suitable options. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button text (button_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button link (button_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Button style (button_style) | primary | Настройка оформления. Проверьте настольный и мобильный вид. |
| Second button text (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Second button link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Signature below button (signature) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Background (color_scheme) | cream | Настройка оформления. Проверьте настольный и мобильный вид. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 5.1. School districts, charter schools and private schools.

- [ ] Проверить блок `item_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | School districts, charter schools and private schools. | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «School districts, charter schools and private schools.»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for school districts, charter schools and private schools..`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 5.2. Colleges, universities and community colleges.

- [ ] Проверить блок `item_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Colleges, universities and community colleges. | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Colleges, universities and community colleges.»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for colleges, universities and community colleges..`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 5.3. City, county and other public agencies.

- [ ] Проверить блок `item_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | City, county and other public agencies. | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «City, county and other public agencies.»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for city, county and other public agencies..`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 5.4. Libraries, parks and community programs.

- [ ] Проверить блок `item_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Libraries, parks and community programs. | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Libraries, parks and community programs.»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for libraries, parks and community programs..`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 5.5. Educational foundations, nonprofits and volunteer organizations.

- [ ] Проверить блок `item_5`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Educational foundations, nonprofits and volunteer organizations. | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Educational foundations, nonprofits and volunteer organizations.»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for educational foundations, nonprofits and volunteer organizations..`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

### 6. Request a Quote for Your Project

Редактор: **Procurement content**; идентификатор `quote`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Request a Quote for Your Project | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | Please include: | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Items layout (layout) | steps | Настройка оформления. Проверьте настольный и мобильный вид. |
| Photo crop (image_fit) | cover | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text below items (closing_text) | We will review your request and confirm suitable products, pricing, production timing and next steps. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button text (button_label) | Request a Procurement Quote | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button link (button_link) | /pages/request-a-quote#ProjectForm | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Button style (button_style) | primary | Настройка оформления. Проверьте настольный и мобильный вид. |
| Second button text (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Second button link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Signature below button (signature) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Background (color_scheme) | white | Настройка оформления. Проверьте настольный и мобильный вид. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 6.1. Products and quantities

- [ ] Проверить блок `item_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Products and quantities | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | The items you need and estimated order size. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Products and quantities»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for products and quantities.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 6.2. Logos and personalization

- [ ] Проверить блок `item_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Logos and personalization | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Artwork, recipient names, titles, dates and engraving text. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Logos and personalization»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for logos and personalization.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 6.3. Budget and specifications

- [ ] Проверить блок `item_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Budget and specifications | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Preferred materials, budget range and any required product details. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Budget and specifications»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for budget and specifications.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 6.4. Required date and destinations

- [ ] Проверить блок `item_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Required date and destinations | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Event date, delivery deadline and shipping locations. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Required date and destinations»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for required date and destinations.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

#### 6.5. Purchasing requirements

- [ ] Проверить блок `item_5`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Title (title) | Purchasing requirements | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | RFQ/RFP details, submission deadlines, vendor registration instructions or purchase order requirements. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Bundled photo filename (image_asset) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |

**Сюжет / файл:** Новый кадр для «Purchasing requirements»: выберите реальный подарок, соответствующий описанию карточки, покажите его целиком на нейтральном фоне.

**Alt для предложенного сюжета:** `Personalized gift displayed for purchasing requirements.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

### 7. Frequently Asked Questions

Редактор: **B2B questions & answers**; идентификатор `questions`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Frequently Asked Questions | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| FAQ structured data (matches visible answers) (structured_data) | true | Проверьте переключатель в редакторе и результат в предпросмотре. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

Каждая пара Question / Answer ниже — отдельный блок. Ответы должны быть видимы посетителю; добавлять к ним фото не требуется.

#### 7.1. Can each item have a different name?

- [ ] Проверить блок `question_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Can each item have a different name? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Yes. Eligible products can carry individual names, titles, service years or recognition messages within one coordinated order. Send your recipient list and personalization requirements. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 7.2. Can you engrave our school or agency logo?

- [ ] Проверить блок `question_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Can you engrave our school or agency logo? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Yes, on compatible products. We review the artwork, engraving placement and design details before production. Digital proofs can be provided for approval. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 7.3. Is there a minimum order quantity?

- [ ] Проверить блок `question_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Is there a minimum order quantity? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Many products are available without a minimum order quantity. Specialty items, larger orders and custom sourcing projects are quoted according to availability and specifications. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 7.4. Can you respond to our RFQ or RFP?

- [ ] Проверить блок `question_4`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Can you respond to our RFQ or RFP? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | We review solicitations relevant to our products and services. Send the requirements and deadline so we can determine whether we can submit a suitable quotation or proposal. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 7.5. How long will production take?

- [ ] Проверить блок `question_5`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | How long will production take? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Timing depends on the products, quantity, inventory and artwork approval. Production and shipping schedules are confirmed with your quote; share your required delivery date when you contact us. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 7.6. Can you deliver to several campuses or offices?

- [ ] Проверить блок `question_6`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Can you deliver to several campuses or offices? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | We can review requests for multiple delivery locations. Include the quantities for each destination so packaging, shipping and associated costs can be included in your quote. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

### 8. Tell Us What You Are Planning

Редактор: **Procurement content**; идентификатор `cta`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | Tell Us What You Are Planning | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | From teacher appreciation gifts to public service awards, Elma Vada Studio can help you explore products and personalization for your organization. Send your project details or purchasing requirements to start the conversation. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Items layout (layout) | text_cards | Настройка оформления. Проверьте настольный и мобильный вид. |
| Photo crop (image_fit) | cover | Настройка оформления. Проверьте настольный и мобильный вид. |
| Text below items (closing_text) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button text (button_label) | Request a Procurement Quote | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Button link (button_link) | /pages/request-a-quote#ProjectForm | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Button style (button_style) | primary | Настройка оформления. Проверьте настольный и мобильный вид. |
| Second button text (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Second button link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Signature below button (signature) | Elma Vada Studio LLC · Dallas–Fort Worth, Texas | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Background (color_scheme) | navy | Настройка оформления. Проверьте настольный и мобильный вид. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

Вложенных карточек в текущем экспорте нет.

### Footer. Footer

Редактор: **Footer**; идентификатор `footer`. Общая секция всех страниц. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Footer logo image (footer_logo_image) | shopify://shop_images/Logotip_Elma_Vada_dlya_tyomnogo_fona.png | Ваш логотип. Сохраняйте пропорции. |
| Footer logo width (footer_logo_width) | 380 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Tagline (tagline) | Personalized corporate gifts and in-house laser engraving in Dallas–Fort Worth. From individual gifts to orders of 5,000+ units. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Services menu (services_menu) | Не заполнено | Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP. |
| Company menu (company_menu) | Не заполнено | Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP. |
| Email (email) | Не заполнено | Публичный email: daria@elmavada.com. Уведомления Forms настраиваются отдельно. |
| Phone (phone) | Не заполнено | Подтверждённый номер +1 (929) 509-0117; проверьте звонок и SMS перед включением. |
| Location (location) | 18383 Preston Rd, #202, Dallas, TX 75252 | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Service area (service_area) | Dallas–Fort Worth Area | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Business hours (hours) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Orders line one (orders_line_one) | 1–5K+ units per order | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Orders line two (orders_line_two) | Local & Nationwide Shipping | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

Проверьте меню, все ссылки, логотип, телефон и email. Общие контакты: Theme settings → Business & contact. Адрес: 18383 Preston Rd, #202, Dallas, TX 75252. Ссылку на Etsy в футер не добавляйте.

Вложенных карточек в текущем экспорте нет.

### SEO и итоговая проверка

SEO заполняется в Online Store → Pages → нужная страница → Search engine listing → Edit.

Title: `School & Government Awards and Gifts | Elma Vada`

Description: `Custom engraved awards, pens and gifts for schools and public agencies. In-house engraving in Dallas–Fort Worth. Send your project details or RFQ for a quote.`

- [ ] Один H1; заголовки и ответы соответствуют содержанию страницы.
- [ ] Все CTA открывают нужную форму; можно запросить макет, образец или консультацию.
- [ ] Personalized gifts, только лазерная гравировка; UV printing отсутствует. Названия технологий UV laser подтверждены отдельно.
- [ ] Цены $9.99–$119.99 и скорость «as little as 1 business day / up to 1,000 pens» используются только с условиями по товару, количеству, сложности, согласованию и наличию.
- [ ] 1–5K+ units per order; контакты Dallas; нет старого Gmail/Los Angeles и служебных заглушек.
- [ ] На телефоне нет горизонтальной прокрутки; фото не обрезает гравировку; видео ждёт Play и остаётся без звука.
- [ ] Изменения сохранены в Shopify; перед следующей правкой кода скачан новый ZIP.
