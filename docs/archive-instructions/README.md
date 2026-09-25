# elma-vada-b2b

> АРХИВ — сохранено для истории, не инструкция к запуску. Часть сведений ниже устарела. Начните с [единого актуального руководства](../../START-HERE-RU.md).

Elma Vada Studio — Shopify B2B theme with 18 editable page templates, photo sections, a three-slide homepage hero, and a quote form.

## Current setup instructions

- [Shopify upload, editable content and launch checklist (RU)](SHOPIFY-CONTENT-GUIDE-RU.md)
- [Photo upload map by page (RU)](PHOTO-UPLOAD-MAP-RU.md)
- [B2B launch report (RU)](B2B-LAUNCH-REPORT-RU.md)

The theme folders are at the repository root. Uploading this repository to GitHub does not publish the theme to Shopify. ZIP packages and local credentials are excluded from version control. Earlier template sources are preserved in `docs/legacy-before-visual-update/`.

The notes below describe the original theme; follow the current setup guide above for the updated JSON page templates and photo galleries.

**Production studio theme for** [engravedpens.shop](https://engravedpens.shop/)  
**Design reference:** [Figma site](https://laptop-slack-60697926.figma.site/)

---

## Directory Structure

```
theme/
├── layout/
│   └── theme.liquid              # Main layout file
├── templates/
│   ├── index.json                # Homepage section order
│   └── page.quote.liquid         # Request a Quote page
├── sections/
│   ├── header-group.liquid       # Header wrapper (OS 2.0)
│   ├── header.liquid             # Sticky nav + mobile menu
│   ├── hero.liquid               # Full-height hero section
│   ├── stats-bar.liquid          # Dark navy metrics bar
│   ├── trust-bar.liquid          # Trust indicators
│   ├── industries.liquid         # Who we help (tag grid)
│   ├── business-solutions.liquid # Tabbed solutions panel
│   ├── production-capabilities.liquid # 6-tech capability cards
│   ├── why-choose-us.liquid      # 6 differentiator cards
│   ├── comparison.liquid         # Local vs overseas table
│   ├── portfolio.liquid          # Portfolio image grid
│   ├── how-it-works.liquid       # 5-step process timeline
│   ├── cta-banner.liquid         # Final dark CTA
│   └── footer.liquid             # 4-column footer
├── assets/
│   ├── base.css                  # Design system variables & reset
│   ├── theme.css                 # Component-level styles
│   └── theme.js                  # Interactive behaviors
├── config/
│   ├── settings_schema.json      # Theme settings definition
│   └── settings_data.json        # Default values
└── locales/
    └── en.default.json           # English strings
```

---

## Design System

| Token         | Value     | Usage |
|---------------|-----------|-------|
| Navy          | `#1E252B` | Header, buttons, footer, dark sections |
| Gold          | `#C09858` | Accent, eyebrows, checkmarks, CTAs |
| Cream         | `#F4F2ED` | Page background |
| Beige         | `#EFECE6` | Section alternates |
| Font Heading  | DM Serif Display | All H1–H3 |
| Font Body     | Inter     | Body, labels, nav |

---

## How to Install on Shopify

### Method 1: Shopify Admin (Theme Kit / CLI)
1. Install [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
2. `shopify theme push --path ./theme --store engravedpens.myshopify.com`

### Method 2: Upload via Admin
1. Zip the `theme/` folder → `elma-vada-theme.zip`
2. Go to **Shopify Admin → Online Store → Themes**
3. Click **Add theme → Upload zip file**
4. Upload the zip file

### Method 3: Theme Kit
```bash
cd theme
theme push
```

---

## Homepage Section Order

1. Hero (full-height split layout)
2. Stats Bar (10× lasers, 10–5K+ units, 6 technologies, DFW)
3. Trust Bar (badges with icons)
4. Industries We Serve (tag grid)
5. Business Solutions (tabbed panels)
6. Production Capabilities (6 tech cards, dark navy)
7. Why Choose Us (6 feature cards)
8. Comparison (Navy vs White columns)
9. Portfolio (1 featured + 5 grid)
10. How It Works (5-step timeline)
11. CTA Banner (dark navy)

---

## Quick Setup After Installation

1. **Upload hero image** — Shopify Admin → Theme → Customize → Hero section
2. **Upload portfolio images** — Theme customizer → Portfolio section (6 images)
3. **Create pages** in Shopify Admin:
   - Handle `request-a-quote` → Set template to `page.quote`
   - Handle `our-work` → Portfolio page
   - Handle `about` → About page
   - Handle `production-capabilities` → Capabilities page
   - Handle `business-solutions` → Solutions page
   - Handle `industries` → Industries page
4. **Update navigation** — Online Store → Navigation → Main menu

---

## JavaScript Behaviors

- **Sticky header** — adds `.scrolled` class with blur/shadow on scroll
- **Mobile menu** — animated hamburger toggle with aria support
- **Solution tabs** — keyboard-accessible tab switching
- **Scroll reveal** — staggered IntersectionObserver animations
- **Smooth scroll** — all `#anchor` links scroll smoothly

---

## Quote Form

The `page.quote.liquid` template uses Shopify's native `{% form 'contact' %}` tag.
All submissions go to **Shopify Admin → Orders → Contacts**.

Fields:
- Name, Company, Email, Phone
- Project Type (dropdown)
- Quantity (dropdown: 10–5000+)
- Deadline (date picker)
- Budget Range (dropdown)
- Delivery preference
- Notes / description
