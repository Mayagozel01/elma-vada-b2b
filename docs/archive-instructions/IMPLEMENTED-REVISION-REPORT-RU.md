# Elma Vada — выполненные локальные правки

> АРХИВ — сохранено для истории, не инструкция к запуску. Часть сведений ниже устарела. Начните с [единого актуального руководства](../../START-HERE-RU.md).

Дата: 14 сентября 2026. Изменения внесены локально и собраны в ZIP, но **не загружены и не опубликованы в Shopify**.

## Готово в теме

- Дополнение 15 сентября: отдельная загрузка логотипов в Header и Footer, настройка ширины, отдельный размер для мобильного хедера; инструкция обновлена.
- Баннер 15 сентября: медиа на всю высоту правой части на desktop и на всю ширину на mobile/tablet; полупрозрачные стрелки поверх медиа, центральная кнопка Play/Pause. Видео запускаются только по нажатию и остаются без звука, скрытые видео останавливаются. Исходные аудиодорожки файлов не перекодированы.
- Добавлены три декоративные AI-обложки в палитре бренда и выбор Video cover preset в каждом слайде. Собственный Video poster имеет приоритет; уже выбранные изображения и видео не заменены.
- Восстановлена схема Theme settings и добавлены единые настройки Business & contact, SEO & social preview.
- Новый email: daria@elmavada.com; единый адрес: 18383 Preston Rd, #202, Dallas, TX 75252.
- Убран публичный UV printing; оставлены технологии именно laser engraving, включая UV laser engraving.
- Диапазон заказа изменён на 1–5K+ units per order.
- Главная получила один H1: Corporate Gifts Made Personal.
- Hero теперь поддерживает до трёх настоящих изображений или Shopify-hosted video. AI fallback и подпись AI-generated не выводятся посетителям.
- Hero и форма адаптированы для телефона/планшета. В Quote форма находится раньше подробного объяснения на mobile.
- Добавлены Free Mockup, Physical Sample, Consultation, In-Person Consultation и Gifting Calendar Audit как типы запросов.
- Добавлены шаблоны страниц page.free-mockup и page.book-a-call.
- Добавлены блоки Fast, In-House Engraving и Meet With Us Face to Face с оговоркой для производственных сроков.
- Добавлены доверительные показатели: 5+ years, 10+ team members, 50,000+ happy customers, 100,000+ engraved gifts.
- Etsy удалён из футера; Amazon’s Choice не показывается без URL конкретного подходящего товара.
- Добавлены URL и ссылки для Client Gifting, Onboarding и Milestone Program.
- Добавлены резервные SEO title/description для 21 страницы, OG/Twitter meta и обновлённый LocalBusiness JSON-LD.
- Добавлены настройки phone, SMS, WhatsApp и booking calendar. Поля скрываются, пока пустые.
- Добавлены ограничения для reduced motion, остановка скрытых видео и управление слайдером.

## Не может быть сделано только кодом

| Что | Почему | Где сделать |
|---|---|---|
| Загрузка нового ZIP | Требует входа и решения, какую тему публиковать | Shopify → Online Store → Themes |
| Создание публичных Pages | Шаблон не создаёт Shopify Page | Content → Pages |
| Реальные фото и видео | Нужны ваши материалы и разрешения | Theme editor / Shopify Files |
| SVG upload и получение файлов | Нужна включённая Shopify Form и тест доставки | Shopify Forms + Theme editor |
| Телефон, SMS, WhatsApp | Нужен настоящий обслуживаемый номер | Theme settings → Business & contact |
| Inbox / WhatsApp / календарь | Требует подключения сервиса и процесса ответа | Shopify Apps / Theme settings |
| Метаданные Shopify Page | Лучше сохранить в каждой Page в админке | Content → Pages → Search engine listing |
| Редиректы и проверка 404 | Pages, visibility и redirects — данные магазина | Shopify Admin |
| Публикация | Нужна ваша финальная проверка и решение | Shopify → Themes → Publish |

## Проверка

- Shopify Theme Check: 0 errors. Есть только прежние warnings о внешних Google Fonts/tracking assets и отдельном root-файле hero.liquid, который не входит в структуру Shopify theme package.
- Локальный browser smoke test: 20 page templates × 9 ширин (180 проверок страниц), плюс главная и hero; размеры 360, 375, 768, 820, 1024, 1200, 1201, 1280 и 1440 px. Проверяются один H1, форма, FAQ JSON-LD, переключение image/video и отсутствие горизонтального переполнения. Поведение видео проверяется на управляемой тестовой модели, а не декодированием реальных роликов Shopify CDN.
- Проверены ZIP и основные новые файлы внутри него.

## Готовый файл

[Elma Vada B2B-2026-09-15-banner.zip](<Elma Vada B2B-2026-09-15-banner.zip>) — актуальный архив для загрузки как новой неопубликованной темы, включая логотипы и обновлённый баннер.

Все ваши дальнейшие действия по Shopify описаны в [SHOPIFY-SETUP-AFTER-UPLOAD-RU.md](SHOPIFY-SETUP-AFTER-UPLOAD-RU.md).
