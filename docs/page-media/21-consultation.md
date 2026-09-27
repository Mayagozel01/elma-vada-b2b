# Schedule a Consultation

> Новый подбор: 27 сентября 2026. Три отдельные композиции для этой страницы в едином светлом тёпло-сером фоне. Полный чек-лист и исходные значения настроек сохранены ниже.

Изображения созданы встроенным imagegen на основе фотографий ваших товаров. Это иллюстрации вариантов подарков и макетов, не реальные консультации или завершённые заказы. Видимая подпись: `Illustrative gift concept.` Для макетов: `Illustrative mockup — your final proof is prepared for your project.`

[Галерея всех семи страниц](../../output/imagegen/recognition-pages/README.md) · [Alt-тексты CSV](../../output/imagegen/recognition-pages/alt-texts.csv)

| Блок | Новый файл | Alt text |
|---|---|---|
| Hero | [gifting-consultation-chopsticks-pick-box-samples-elma-vada-dfw-v2.png](../../output/imagegen/recognition-pages/gifting-consultation-chopsticks-pick-box-samples-elma-vada-dfw-v2.png) | `Wooden chopstick cases, a guitar-pick case and an engraved keepsake box around an open blank notebook.` |
| Боковое изображение формы | [award-consultation-project-planning-sheet-elma-vada-dfw.png](../../output/imagegen/recognition-pages/award-consultation-project-planning-sheet-elma-vada-dfw.png) | `Clear appreciation award on a wooden base beside a project worksheet for occasion, quantity and date.` |
| Meet With Us Face to Face | [consultation-sample-tray-cube-keychain-elma-vada-dfw.png](../../output/imagegen/recognition-pages/consultation-sample-tray-cube-keychain-elma-vada-dfw.png) | `Wooden thank-you cube, engraved keychain and guitar pick arranged in a charcoal sample tray.` |

Для Hero нужно включить Include image or video: в исходном экспорте стоит false. Боковое фото формы необязательно; если форма стала слишком длинной на телефоне, его можно не использовать. Логотип, поля формы, FAQ и футер сохранены — новые фото им не нужны.

<!-- COMPLETE-THEME-CHECKLIST -->

## Полный чек-лист

Источник: свежий экспорт 24SEP2026-0517pm + поддержка видео в локальной теме. Шаблон: `book-a-call`. URL: `/pages/book-a-call`.

Откройте редактор темы → Pages → book-a-call. Проходите блоки ниже по порядку. Названия взяты из текущей темы, скрытые секции тоже перечислены. После изменения нажмите Save.

### Как добавить видео

В Hero внутренних страниц, B2B feature, Photo / content card, Solution card и боковом медиа формы доступны **Media type → Image / Video**, **Video** и **Video cover**. Выберите Video, загрузите ролик, задайте обложку и описание сюжета в Photo description. Если есть Include image or video — включите. Видео запускается по Play, без звука; повторное нажатие ставит паузу. На главной Hero уже имеет собственные настройки слайдов. Обложка по умолчанию берётся из видео. Эти новые поля появятся после загрузки обновлённой темы.

### Header. Header

Редактор: **Header**; идентификатор `header`. Общая секция всех страниц. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Logo image (logo_image) | shopify://shop_images/logo.png | Ваш логотип. Сохраняйте пропорции. |
| Logo width — desktop (logo_width) | 180 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Logo width — mobile (logo_mobile_width) | 150 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Main menu (menu) | Не заполнено | Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP. |
| Logo badge (logo_badge) | EV | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Logo name (logo_name) | Elma Vada | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Logo subtitle (logo_subtitle) | Corporate Gifts & Engraving | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| CTA label (cta_label) | Request a Quote | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| CTA link (cta_url) | /pages/request-a-quote | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

Проверьте меню, все ссылки, логотип, телефон и email. Общие контакты: Theme settings → Business & contact. Адрес: 18383 Preston Rd, #202, Dallas, TX 75252. Ссылку на Etsy в футер не добавляйте.

Вложенных карточек в текущем экспорте нет.

### 1. Let’s talk about your gifting project

Редактор: **B2B page hero**; идентификатор `hero`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Eyebrow (eyebrow) | Elma Vada · Dallas, Texas | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Heading (heading) | Let’s talk about your gifting project | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Introduction (text) | Request a project call or an in-person consultation in Dallas–Fort Worth. We will confirm a suitable time with you. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Include image or video (show_image) | false | Включает фото или видео; у текстовых шагов можно оставить выключенным. |
| Media type (media_type) | image | Image — фото; Video — ролик с ручным Play без звука. |
| Hero photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Video — no autoplay or sound (video) | Не заполнено | Выберите ролик из Shopify Files; проверьте, что он показывает именно этот этап/товар. |
| Video cover (optional) (poster) | Не заполнено | Обложка видео: чёткий кадр того же ролика. Пустое поле использует превью видео. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Не заполнено | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |
| Background (color_scheme) | cream | Настройка оформления. Проверьте настольный и мобильный вид. |
| Primary button (button_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Primary link (button_link) | /pages/request-a-quote | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Secondary button (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Secondary link (secondary_link) | /pages/our-work | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Compact intro (forms) (compact) | true | Проверьте переключатель в редакторе и результат в предпросмотре. |

**Сюжет / файл:** [gifting-consultation-chopsticks-pick-box-samples-elma-vada-dfw-v2.png](../../output/imagegen/recognition-pages/gifting-consultation-chopsticks-pick-box-samples-elma-vada-dfw-v2.png) — новая AI-композиция по фотографиям ваших товаров.

**Alt для предложенного сюжета:** `Wooden chopstick cases, a guitar-pick case and an engraved keepsake box around an open blank notebook.`

**В редакторе:** Hero сейчас выключен: включите Include image or video, затем Media type → Image. В Photo description вставьте alt выше. Сохраните видимую подпись `Illustrative gift concept.`

Сейчас Include image or video выключен; для нового варианта с Hero включите его. Можно сохранить прежний компактный текстовый Hero — тогда этот файл не загружайте.

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

Вложенных карточек в текущем экспорте нет.

### 2. You can reduce the risk before committing.

Редактор: **B2B quote form**; идентификатор `form`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Default request type (default_request) | Consultation | Настройка оформления. Проверьте настольный и мобильный вид. |
| Company is required (company_required) | false | Проверьте переключатель в редакторе и результат в предпросмотре. |
| Show consultation time request (consultation_mode) | true | Проверьте переключатель в редакторе и результат в предпросмотре. |
| Side heading (heading) | You can reduce the risk before committing. | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Side text (text) | Free mockup • 15-minute project call • physical sample where qualifying • in-person sample review for qualifying bulk projects. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Media type (media_type) | image | Image — фото; Video — ролик с ручным Play без звука. |
| Optional sample photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Video — no autoplay or sound (video) | Не заполнено | Выберите ролик из Shopify Files; проверьте, что он показывает именно этот этап/товар. |
| Video cover (optional) (poster) | Не заполнено | Обложка видео: чёткий кадр того же ролика. Пустое поле использует превью видео. |
| Photo description (alt) (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Один реальный готовый подарок рядом с согласованным эскизом. Не обязательно. | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |
| Additional information (after_text) | One human contact from quote to delivery. Free digital proof before production. PO-friendly ordering for approved accounts. Approved artwork retained for easy reorders. Request a free mockup or request an in-person consultation . | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Show built-in contact form (show_native_form) | true | При подключённом app block Shopify Forms выключите, чтобы не показывать две формы. Без app block остаётся резервная форма. |
| Form heading (form_heading) | Request a consultation | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Name label (name_label) | Full name | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Company label (company_label) | Company | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Email label (email_label) | Work email | Публичный email: daria@elmavada.com. Уведомления Forms настраиваются отдельно. |
| Phone label (phone_label) | Phone (optional) | Подтверждённый номер +1 (929) 509-0117; проверьте звонок и SMS перед включением. |
| Project label (project_label) | Project type | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Project options (one per line) (project_options) | Not sure yet Digital mockup request Physical sample request Corporate gifts Employee recognition Client gifts Events and awards Onboarding kits Milestone program Bulk engraving Promotional products | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Quantity label (quantity_label) | Estimated quantity | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Deadline label (deadline_label) | Needed by | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Budget label (budget_label) | Budget range (optional) | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Delivery label (delivery_label) | Preferred fulfillment | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Delivery options (one per line) (delivery_options) | Please advise Pickup inquiry Local delivery inquiry Shipping inquiry Multiple recipient addresses | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| City label (city_label) | Delivery city / ZIP | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Artwork label (artwork_label) | Logo / artwork link (optional) | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Artwork instructions (artwork_help) | Share a viewable artwork link, or email your SVG/PDF logo to daria@elmavada.com . You can send your request now and provide artwork later. Do not share private recipient lists in a public link. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Notes label (notes_label) | Occasion, materials, names and project details | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Privacy note (privacy_text) | We use the details you share to respond to your project inquiry. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Submit button (submit_label) | Request a Consultation | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Success message (success_message) | Thank you. Your request has been sent. We will contact you to discuss the next step. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |

**Сюжет / файл:** [award-consultation-project-planning-sheet-elma-vada-dfw.png](../../output/imagegen/recognition-pages/award-consultation-project-planning-sheet-elma-vada-dfw.png) — новая AI-композиция по фотографиям ваших товаров.

**Alt для предложенного сюжета:** `Clear appreciation award on a wooden base beside a project worksheet for occasion, quantity and date.`

**В редакторе:** В секции формы выберите Media type → Image и загрузите файл в Optional sample photo. В Photo description вставьте alt выше. Сохраните видимую подпись `Illustrative gift concept.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

В Apps → Forms проверьте Upload your logo (SVG поддерживается), имя, email, количество, срок, детали проекта и запрос Physical sample. Загрузка логотипа необязательна. Проверьте адрес уведомлений daria@elmavada.com и сделайте тестовую отправку. Встроенная резервная форма принимает ссылку; загрузку файла обеспечивает app block.

Вложенных карточек в текущем экспорте нет.

### 3. What else would you like to know?

Редактор: **B2B questions & answers**; идентификатор `questions`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Heading (heading) | What else would you like to know? | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| FAQ structured data (matches visible answers) (structured_data) | true | Проверьте переключатель в редакторе и результат в предпросмотре. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

Каждая пара Question / Answer ниже — отдельный блок. Ответы должны быть видимы посетителю; добавлять к ним фото не требуется.

#### 3.1. What information should I send for a quote?

- [ ] Проверить блок `question_1`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | What information should I send for a quote? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Share the occasion, estimated quantity, target date, delivery location and any artwork you already have. A budget range helps narrow the options. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 3.2. Can every gift have a different name?

- [ ] Проверить блок `question_2`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Can every gift have a different name? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Include personalization requirements in your request. We will confirm the suitable product, method and recipient-list format for the project. | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

#### 3.3. Can I review a mockup or sample first?

- [ ] Проверить блок `question_3`.

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Question (question) | Can I review a mockup or sample first? | Один реальный вопрос покупателя; ответ должен находиться в этой же карточке. |
| Answer (answer) | Get a free custom mockup before you order. Physical samples and in-person sample reviews are available for qualifying projects; our team will confirm arrangements and any delivery cost. Request a sample . | Краткий прямой ответ, затем условия. Не обещайте неподтверждённые сроки или услуги. |

Медиа: отдельного слота изображения/видео в этом блоке нет.

### 4. Meet With Us Face to Face

Редактор: **B2B feature & photo**; идентификатор `meeting`. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Eyebrow (eyebrow) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Heading (heading) | Meet With Us Face to Face | Понятный заголовок по теме блока; H1 — только в hero страницы. |
| Text (text) | Planning gifts for your employees, clients, partners, or an upcoming event? Schedule a complimentary in-person consultation in the Dallas–Fort Worth area. We’ll discuss your gifting needs, timeline, quantities, and personalization options. You’ll also receive a complimentary pen engraved with your name or company logo as a sample of our work. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Visible terms / turnaround disclaimer (fine_print) | Visits are arranged by appointment. We will confirm the meeting details with you. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Media type (media_type) | image | Image — фото; Video — ролик с ручным Play без звука. |
| Real photo (image) | Не заполнено | Выберите изображение по рекомендации блока ниже; проверьте кадрирование на телефоне. |
| Video — no autoplay or sound (video) | Не заполнено | Выберите ролик из Shopify Files; проверьте, что он показывает именно этот этап/товар. |
| Video cover (optional) (poster) | Не заполнено | Обложка видео: чёткий кадр того же ролика. Пустое поле использует превью видео. |
| Photo description (image_alt) | Не заполнено | Опишите только видимое на английском. Для видео это описание сюжета; отдельного SEO/AEO alt нет. |
| Photo brief (editor only) (photo_note) | Реальное фото Дарьи/места встречи и персонализированной ручки-образца. | Подсказка редактору, посетители её не видят. Это задание на съёмку, а не alt. |
| Show shared business address (show_address) | true | Проверьте переключатель в редакторе и результат в предпросмотре. |
| Primary button (button_label) | Schedule an In-Person Consultation | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Primary link (button_link) | /pages/book-a-call?request=in-person | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Secondary button (secondary_label) | Не заполнено | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Secondary link (secondary_link) | Не заполнено | Откройте ссылку как посетитель; она должна вести на нужную страницу или форму без 404. |
| Background (color_scheme) | cream | Настройка оформления. Проверьте настольный и мобильный вид. |

**Сюжет / файл:** [consultation-sample-tray-cube-keychain-elma-vada-dfw.png](../../output/imagegen/recognition-pages/consultation-sample-tray-cube-keychain-elma-vada-dfw.png) — новая AI-композиция по фотографиям ваших товаров.

**Alt для предложенного сюжета:** `Wooden thank-you cube, engraved keychain and guitar pick arranged in a charcoal sample tray.`

**В редакторе:** В B2B feature выберите Media type → Image. Это предметная иллюстрация образцов, не фото сотрудника или реальной встречи. В Photo description вставьте alt выше. Сохраните видимую подпись `Illustrative gift concept.`

Для нового кадра: формат 4:3, ровный свет, изделие и гравировка в фокусе, запас по краям для мобильного кадрирования. Для реального процесса/команды/кейса нужна настоящая съёмка. Если создаёте цифровой концепт подарка, обозначьте его как концепт; размеры и комплектацию берите из реального ассортимента. Предложенный alt применяйте только если кадр действительно ему соответствует.

Вложенных карточек в текущем экспорте нет.

### Footer. Footer

Редактор: **Footer**; идентификатор `footer`. Общая секция всех страниц. Включена в шаблоне; фактический показ зависит от заполнения и настроек.

- [ ] Проверить все поля секции:

| Поле в редакторе | Сейчас / значение по умолчанию | Что сделать |
|---|---|---|
| Logo image (logo_image) | shopify://shop_images/logo.png | Ваш логотип. Сохраняйте пропорции. |
| Logo width (logo_width) | 150 | Настройка оформления. Проверьте настольный и мобильный вид. |
| Tagline (tagline) | Personalized corporate gifts and in-house laser engraving in Dallas–Fort Worth. From individual gifts to orders of 5,000+ units. | Проверьте видимый текст по требованиям Дарии: personalized gifts, лазерная гравировка, Dallas–Fort Worth, актуальные условия. |
| Services menu (services_menu) | Не заполнено | Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP. |
| Company menu (company_menu) | Не заполнено | Выберите действующее меню; проверьте все пункты. Меню хранится в Shopify отдельно от ZIP. |
| Email (email) | daria@elmavada.com | Публичный email: daria@elmavada.com. Уведомления Forms настраиваются отдельно. |
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

Title: `Schedule a Gifting Consultation | Elma Vada`

Description: `Discuss personalized gifts, quantities and timing with Elma Vada. Request a project call or an in-person consultation in Dallas–Fort Worth.`

- [ ] Один H1; заголовки и ответы соответствуют содержанию страницы.
- [ ] Все CTA открывают нужную форму; можно запросить макет, образец или консультацию.
- [ ] Personalized gifts, только лазерная гравировка; UV printing отсутствует. Названия технологий UV laser подтверждены отдельно.
- [ ] Цены $9.99–$119.99 и скорость «as little as 1 business day / up to 1,000 pens» используются только с условиями по товару, количеству, сложности, согласованию и наличию.
- [ ] 1–5K+ units per order; контакты Dallas; нет старого Gmail/Los Angeles и служебных заглушек.
- [ ] На телефоне нет горизонтальной прокрутки; фото не обрезает гравировку; видео ждёт Play и остаётся без звука.
- [ ] Изменения сохранены в Shopify; перед следующей правкой кода скачан новый ZIP.
