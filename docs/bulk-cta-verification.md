# Bulk-order CTA update — 7 October 2026

Historical report: the one-time effect described below was replaced on 8 October at the user's request. See [continuous pulse and pause-control verification](bulk-cta-pulsing.md). The canonical theme is now in the repository root; the extracted working folder was removed after migration.

Implemented in `shopify-export-2026-10-07`, the existing working theme folder. No theme copy, new section, popup, sticky bar, dependency or published Shopify change.

## CTA locations

| Location | Change |
| --- | --- |
| Homepage hero | Existing quote destination promoted to the primary “Get a Bulk Quote” button. Existing “Explore Bulk Orders” navigation retained as the secondary button, with its original destination. |
| Homepage Fast, In-House Engraving | Existing quote CTA renamed “Get a Bulk Quote” and opted into the effect. The physical-sample link is unchanged. |
| Homepage final CTA | “Get a Bulk Quote,” one-time halo, readable navy-on-gold treatment on the dark background. |
| Quantity/Volume component | Existing quote CTA prepared with the same treatment. The section remains disabled in the homepage configuration; it was not enabled or added. |
| Our Work portfolio | Three approved bulk cases: Engraved Glass Project; Individually Named Pen Batch; Packing & Fulfillment Project. With user approval, their existing empty link fields now point to the existing quote page and say “Request a Similar Bulk Order.” |
| Bulk Orders landing page | Existing timeline and final quote CTAs updated. |
| Other corporate landing pages | Existing final quote CTAs updated on Corporate Gifts, Branded Merchandise, Promotional Products, Client Gifting, Employee Recognition, Events & Awards, Onboarding, Service Awards, Business Solutions, Industries and Our Work. |

The homepage portfolio’s unapproved cases remain hidden. The Recognition Award case was not treated as a verified bulk batch. Free mockup, sample, consultation, calendar-audit, ordinary shopping and product purchase CTAs are unchanged.

Supporting text is server-rendered and always visible, not revealed by JavaScript: “Bulk & Corporate Orders · From 1 to 5,000+ Units.” The existing theme approves 1–5,000+ units; a new 10-unit minimum was not introduced. The original hero price line and all other quantity claims are preserved.

## Animation and integration

- One 700 ms brand-gold halo on a pseudo-element; only opacity and transform animate. No button or label fading, moving, bouncing, scaling or continuous pulse.
- 200 ms desktop hover transitions. The existing arrow on case links moves 3 px; arrows were not added to ordinary buttons.
- Immediate pressed feedback; selected targets have at least 44 px tap height. Measured hero targets: 54.39 px desktop and 51.66 px mobile.
- Visible 3 px keyboard outline: navy on light backgrounds, gold on navy.
- Selected text contrast: 15.50:1 white/navy, 12.84:1 white/navy-light, 5.81:1 navy/gold and 7.47:1 navy/gold-light.
- Explicit per-component `bulk_quote` editor checkboxes scope the treatment. Defaults are false on reusable components.
- One shared IntersectionObserver, unobserve immediately after entry. Logical section/block keys retain “seen” state across editor re-renders. Duplicate section-load events do not duplicate observation. Section removal unobserves pending nodes, disconnects unused observers, and removes any active halo; stale queued callbacks are ignored.
- Reduced-motion preference disables the halo, arrow movement and transitions. Changing preferences does not replay a consumed highlight.
- No click interception: links remain native anchors with unchanged quote destinations. JavaScript/IntersectionObserver absence leaves all labels and links visible and usable.

## Verification

Chrome 151: desktop 1440×900 and mobile 390×844 emulation. Local browser requests were intercepted and served the actual modified CSS/JS, fonts and Liquid-rendered CTA components. Image/video fixtures isolate UI checks; this is not a physical-phone, Safari, published-Shopify or end-to-end inquiry-delivery test.

All 11 checks passed:

- Liquid rendering of all 13 changed templates; disabled sections and publication permissions preserved.
- Desktop/mobile: label visibility during the halo, exactly one effect after repeated scrolling, unchanged button bounds during animation, keyboard Tab/Shift+Tab and visible focus, immediate pressed feedback.
- Portfolio: three selected cases, original arrow moves 3 px, no repeated halo for the same logical button after editor reload; duplicate initialization and removal cleanup exercised.
- Reduced motion, preference changes, no JavaScript and no IntersectionObserver fallbacks.
- Ordinary purchase/browse buttons remain unmarked and have no halo.
- No extra image, animation-library or script request from the treatment. Existing image attributes and all image-loading optimization files are unchanged.
- Six paired controlled local image-paint tests, reversed order between pairs: median 40 ms before versus 38 ms after. This 2 ms difference is noise, not a claimed speed improvement. No measurable regression in this fixture; it is not a live Shopify load-time measurement.

`node --check` passes. Shopify Theme Check reports zero errors and the same four pre-existing warnings: two AssetPreload recommendations and two tracking RemoteAsset warnings.

A source-hash/content audit confirms that product forms, quote form configuration, images, video sources/settings, SEO, typography assets, approval flags, quantities and unrelated files were not changed. Existing footer sizing and video behavior are preserved.

## Quote-flow limitation

Read-only GET checks returned HTTP 200 for the [quote page](https://elmavada.com/pages/request-a-quote), [Bulk Orders](https://elmavada.com/pages/bulk-orders), and [Our Work](https://elmavada.com/pages/our-work).

The quote page already uses a Shopify Forms app block (form ID 1155185) with the native fallback disabled. In the live browser check, its container was empty and no inputs, accessible fields, form or iframe appeared after six seconds, including checks for shadow-DOM fields. This is an observation from this test environment, not proof that the form fails for every visitor or a confirmed diagnosis of why it did not render. App activation, consent dependencies and inquiry delivery need separate verification before publishing. The app block, fallback setting and all quote URLs were deliberately left unchanged. No inquiry was submitted.

## Changed theme files

- [assets/revision.css](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/assets/revision.css)
- [assets/revision.js](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/assets/revision.js)
- [sections/b2b-content.liquid](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/sections/b2b-content.liquid)
- [sections/b2b-feature.liquid](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/sections/b2b-feature.liquid)
- [sections/cta-banner.liquid](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/sections/cta-banner.liquid)
- [sections/hero.liquid](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/sections/hero.liquid)
- [sections/volume.liquid](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/sections/volume.liquid)
- [templates/index.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/index.json)
- [templates/page.branded-merchandise.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.branded-merchandise.json)
- [templates/page.bulk-orders.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.bulk-orders.json)
- [templates/page.client-gifting.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.client-gifting.json)
- [templates/page.corporate-gifts.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.corporate-gifts.json)
- [templates/page.employee-recognition.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.employee-recognition.json)
- [templates/page.events-awards.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.events-awards.json)
- [templates/page.industries.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.industries.json)
- [templates/page.onboarding.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.onboarding.json)
- [templates/page.portfolio.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.portfolio.json)
- [templates/page.promotional-products.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.promotional-products.json)
- [templates/page.service-awards.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.service-awards.json)
- [templates/page.solutions.json](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/templates/page.solutions.json)
- [snippets/bulk-order-note.liquid](/home/yus/Документы/Elma/slack_design/theme/shopify-export-2026-10-07/snippets/bulk-order-note.liquid)

Detailed test results: [bulk-cta-verification-2026-10-07.json](/home/yus/Документы/Elma/slack_design/theme/output/bulk-cta-verification-2026-10-07.json).
