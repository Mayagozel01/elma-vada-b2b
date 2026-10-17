# Industries We Serve — content and media review

Review date: 2026-10-16. This document separates verified listing counts from product-family estimates. A listing count is not a count of unique product types: shops reuse the same base product for different recipients, occasions, finishes, and bundles.

## Page decisions

- Preserved the existing hero, its image and buttons, the original four audience cards, FAQ, and the original bottom CTA. The repeated `Where would you like to go next?` navigation block was subsequently removed site-wide from all page templates that used it.
- Added the four requested audiences after the four existing cards, using the supplied copy: Military & Law Enforcement; Direct Sales & Distributed Teams; Healthcare & Medical Practices; Executive & Administrative Teams.
- No existing audience title, description, image, link, or section order was changed.
- The existing hero image remains in place. Its provenance as a real Elma Vada event photograph was not independently confirmed; replace it separately if an approved real event image becomes available.

## Selected photographs

The four new cards use different real product photographs supplied in the project or Drive source material. Images were resized only for web delivery; they were not generated or creatively altered. The original four cards retain their existing Shopify images.

| Audience | Bundled asset | Factual content/source |
| --- | --- | --- |
| Military & Law Enforcement | `industries-military.webp` | Two engraved bullet-style pens in a silver case; source: [Officer Kobe Long.png](https://drive.google.com/file/d/17JBa2KikqrnwVb1C0xfyXm5-JtZKoOY0/view) |
| Direct Sales & Distributed Teams | `industries-distributed.webp` | Three matching engraved wooden pen cases; source: `images/home/IMG_7444.JPG` |
| Healthcare & Medical Practices | `industries-healthcare.webp` | Two engraved black-and-gold pens in a presentation case; source: `images/home/IMG_4018.JPG` |
| Executive & Administrative Teams | `industries-executive.webp` | Black-and-gold engraved pens and presentation case; source: `images/home/IMG_4625.JPG` |

Several source photographs show personal names. The page copy and alt text describe only the physical products and do not claim a client relationship, completed corporate program, public contract, or certification.

## Store inventory review

Counts below are the active listing totals visible on 2026-10-16. Product-family counts are conservative groupings based on visible listings and the supplied media filenames; they are not SKU counts.

| Store/source | Verified listings | Product families identified |
| --- | ---: | --- |
| [ElmaVadaStudio on Etsy](https://www.etsy.com/shop/ElmaVadaStudio) | 183 | At least 8: engraved pens; pen-and-pencil sets; awards/plaques; name badges and badge reels; medical penlights; engraved charms/tags; chopsticks; small desk/business accessories. Etsy also groups the same formats by medical, event, office, premium-client, lawyer, first-responder, family, and graduation use cases. |
| [AldaProduction on Etsy](https://www.etsy.com/shop/AldaProduction) | 137 | At least 8: engraved pens; mechanical pencils and sets; wooden chopsticks and cases; wooden jewelry/keepsake boxes; cross jewelry; memorial/urn jewelry; multitool pens; small wooden accessories such as mirrors, combs, and blocks. |
| [NiKoEngraving on Etsy](https://www.etsy.com/shop/NiKoEngraving) | 92 | At least 8: Parker and other engraved pens; bolt-action/bullet pens; clipboards; guitar picks and cases; coasters; stylus/teacher pens; personalized keychains/keepsakes; pen refills. |
| [DaDa23TeamStudio](https://www.etsy.com/shop/DaDa23TeamStudio) | — | The supplied URL was not readable by the research tools, so no current listing count is asserted. Its accessible successor/redirect is documented below. |
| [DanielEngraves / former DaDaTeamEngraving](https://www.etsy.com/shop/DaDaTeamEngraving) | 69 | At least 13: pens; metal chopsticks; bookmarks; necklaces; bracelets; golf divot tools; wooden and AirTag keychains; pocket mirrors; combs; business-card holders; cufflinks/tie clips; pet tags/collars; guitar-pick holders. Etsy exposes 12 merchandising sections, which are audience/occasion groupings rather than strict product types. |
| [ElmaVadaStudio on eBay](https://www.ebay.com/str/elmavadastudio) | 114 | Seven top-level groups are visible: jewelry & keepsakes; wedding & event gifts; personalized gifts; pet gifts; pens & writing gifts; business & professional gifts; Christian & faith gifts. These overlap the Etsy catalog and should not be added together as unique products. |
| [ELMA VADA STUDIO on Amazon](https://www.amazon.com/s?k=ELMA+VADA+STUDIO&ref=bl_dp_s_mw_0) | — | The search page was not accessible to the research tools, so no count is asserted. |

## Drive and video review

Direct file inventory from the supplied Google Drive folders:

| Folder | Images | Videos | Notes |
| --- | ---: | ---: | --- |
| Proof / products | 274 | 53 | Includes real product photography and named personalization examples. |
| Social media | 7 | 69 | Mostly edited vertical/social clips. |
| Engraving process | 0 | 60 | Named product and laser-process clips plus one subfolder. |
| Elma Vada store | 0 | 92 | Product videos plus a 49-video vertical subfolder. |
| Alda store | 0 | 144 | Product videos; many filenames are camera IDs or copies. |
| Niko store | 0 | 98 | Product videos plus two Google Vids items and a 32-video process subfolder. |
| About / Team / Production space | 38 | 2 | Real workshop and team photography; no clearly suitable business-networking hero photo was found. |

Thirteen representative local source videos were visually sampled. They show:

- laser engraving of standard pens and bolt-action/bullet pens;
- engraving of badge reels, wooden keychains/bars, chopsticks, and wooden jewelry boxes;
- finished compact mirrors, glassware, and personalized pen products;
- a workshop/operator scene and an edited high-quantity pen workflow clip.

The samples are useful as production/process evidence for `Our Work` or `Production Capabilities`. They were not added to Industries because that page is intended to explain audiences and use cases, and still photographs keep the eight-card page compact. Full file-level metadata is in `output/industries-media-inventory-2026-10-16.json`; visually sampling representative clips does not imply that every duplicated or generically named video was watched end-to-end.

## Still needed

- If the existing hero is to be replaced: one approved, real horizontal photograph from a business event or networking setting, ideally at least 1600 × 1000 px with room for responsive cropping.
- Confirmation that photographs containing visible personal names may be used publicly. They came from the supplied project/Drive material, but privacy approval was not independently verified.

## Verification status

- Local theme-CSS layout passed at 320, 390, 768, and 1440 px.
- All four original audience cards and all four new audience cards are present. Their eight images loaded with descriptive alt text.
- Verified 4/2/1-column responsive layout, no horizontal overflow, absence of the removed `Where would you like to go next?` block, preserved FAQ and original CTA, and the existing quote link pointing to `/pages/request-a-quote`.
- Shopify Theme Check found no new errors in the changed Industries files. The repository still has a pre-existing root-level `hero.liquid` error (`{% schema %}` outside `sections/`), unrelated to this page.
- Created the unpublished Shopify theme `Elma Vada Industries Review 2026-10-16` (theme ID `160505692346`) by duplicating the active theme, then uploaded only the Industries files. Existing catalog settings therefore remain intact and no theme was published.
- Shopify preview passed at 320, 390, 768, and 1440 px with all eight photos loaded, no horizontal overflow, and the expected 4/2/1-column layout.
- `/pages/request-a-quote` returned HTTP 200 and the existing Shopify Forms form was observed loading. No form was submitted.
