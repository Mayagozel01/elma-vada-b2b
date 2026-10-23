# Office visits — implementation and Shopify Admin handoff

## Implemented locally

- The five `b2b-feature` meeting instances on Home, About, Book a Call, Free Mockup and Request a Quote now say **We Come to Your Office**. Their images and captions are preserved; `show_address` is false. The footer and shared contact address are unchanged.
- Home's meeting FAQ and related sample-review FAQs explicitly describe a representative visiting the customer's office. The address FAQ retains the business address, but no longer invites a consultation at the studio.
- `/pages/book-a-call?request=in-person` selects **Request an Office Visit**. The ordinary Book a Call URL (or `?request=call`) keeps the existing call/quote form and optional calendar link. The call instructions ask for availability in Project details.
- The dedicated **Office visit request** section is actually included in `page.book-a-call.json`. With no app block it renders a real Shopify Liquid `contact` form, not a mockup or AJAX simulation. It sends to Shopify's native contact endpoint.
- Native fields: Contact name*, Company name*, Email*, Phone, Office address*, City*, ZIP code*, Preferred date, Preferred time or availability, Project details. `*` means browser-required. Email and ZIP formats are validated by native browser controls. Shopify performs its own email/anti-spam checks; additional custom-field `required` checks are browser-side, not a new server validation API.
- Native submission includes `contact[Request type] = Office visit — Dallas–Fort Worth`, appointment status, all customer fields, Texas and United States. It does not opt the customer into marketing.
- The button does not book a meeting. Success is rendered only from `form.posted_successfully?`; errors come from `form.errors`. No JavaScript intercepts submission or fabricates success. Shopify owns the native contact redirect: no custom `return_to` is supplied. A rendered server result takes priority over UI routing; JavaScript restores only `request=in-person` if needed and preserves Shopify's other URL parameters.
- With JavaScript disabled, both clearly labelled office-visit and project-call sections remain usable. In the Theme Editor, selecting the relevant section switches the preview scenario.

## Request a Quote is protected

All existing Shopify Forms app blocks retain Form ID **1155185**, settings and block order. The nine app-managed fields remain First name, Email, Phone, Upload your logo, Company name, Quantity, Project details, Needed by, How can we help? No app configuration, consent, notifications or automation has been changed. Only surrounding explanatory text was updated.

## Required Admin checks for the native contact option

1. Upload to an **unpublished duplicate theme**. Confirm `/pages/book-a-call` uses the `book-a-call` template.
2. Verify the recipient/sender-email settings under **Settings → Notifications**. Native contact submissions use Shopify's contact email pipeline, not the existing Forms lead workflow. Verify the inbox and spam folder with an approved test submission.
3. Check empty required fields, invalid email/ZIP, Shopify validation/anti-spam errors, successful return to `?request=in-person`, and the exact success message. Confirm receipt of the complete office address, contact details, request type and preferred availability.
4. Check the ordinary project-call route and Form 1155185 on Request a Quote and product pages. Calendar URL is currently unset in local settings; if an external call scheduler is desired, configure **consultation_calendar_url** separately and test it.

## Preferred integration: a separate Shopify Forms inline form

The existing configuration supports app blocks, but creating a new Form ID and notifications requires Shopify Admin. No new app Form ID has been fabricated.

1. Open **Apps → Forms → Create form → Inline**. Name it **Office Visit — DFW**. Do not edit or reuse Form **1155185**.
2. Add the ten native-equivalent fields listed above. Require Contact name, Company name, Email, Office address, City and ZIP code. Use Email, Phone, Date and multiline text types where available. Keep ZIP as text so formatting is not lost.
3. Use title/button **Request an Office Visit**. The full description is already rendered by the theme; do not truncate it to fit the app's shorter Content field. Leave redundant app description empty if necessary.
4. Include the disclaimer: **Submitting this request does not book an appointment. We’ll contact you to confirm the location, date and time.** Do not automatically subscribe consultation leads to marketing.
5. Configure the success state: **Thank you! We’ve received your office visit request. Our team will contact you to confirm the location, date and time.** Use the app's success message, not a redirect to a fabricated confirmation.
6. Set a dedicated **office-visit** tag. Enable submission email notifications; if using Flow, filter by the new form/tag and include the form name/type, contact details, company, full address and availability in the team's notification. Confirm all custom fields are included. Select any required customer-metafield mappings in Admin rather than inventing them in the theme.
7. Activate the form and confirm the Shopify Forms theme app embed is enabled. In Theme Editor → Pages → book-a-call → **Office visit request**, add the **Forms inline** app block with the **new** Form ID. Add it here only, not to the existing B2B quote form. With that app block present, the native contact form is replaced automatically; there must be just one office form.
8. Configure the app's submit/success text in Apps → Forms. Theme settings labelled “Native form…” do not override app-managed text. Match the existing navy/cream/gold palette and verify mobile layout.
9. Submit an approved test, confirm tag/type, full address and delivery to the team. Also test required-field errors and ensure the ordinary quote workflow still works.

## Verification boundary

Local tests can verify Liquid rendering, schemas, route selection, browser validation, submitted field names/payload, responsive layout and simulated server error/success branches. They cannot verify actual Shopify Forms Admin settings, Shopify's live contact redirects/CAPTCHA, email delivery or staff notifications. No live customer or test lead has been submitted as part of this implementation. Do not publish until the Admin checks above pass.

## Files changed for this task

- `sections/office-visit.liquid`
- `sections/b2b-page-hero.liquid`
- `sections/b2b-quote.liquid`
- `assets/office-visit.css`
- `assets/office-visit.js`
- `layout/theme.liquid`
- `snippets/seo-meta.liquid`
- `scripts/verify-office-visit.cjs`
- `docs/office-visit-setup.md`
- `docs/shopify-forms-request-a-quote.md`
- `templates/index.json`
- `templates/page.about.json`
- `templates/page.book-a-call.json`
- `templates/page.branded-merchandise.json`
- `templates/page.bulk-orders.json`
- `templates/page.capabilities.json`
- `templates/page.client-gifting.json`
- `templates/page.corporate-gifts.json`
- `templates/page.custom-engraving.json`
- `templates/page.employee-recognition.json`
- `templates/page.events-awards.json`
- `templates/page.faq.json`
- `templates/page.free-mockup.json`
- `templates/page.industries.json`
- `templates/page.milestone-program.json`
- `templates/page.onboarding.json`
- `templates/page.portfolio.json`
- `templates/page.promotional-products.json`
- `templates/page.quote.json`
- `templates/page.service-awards.json`
- `templates/page.solutions.json`

## Local verification result

- Automated checks passed for all five meeting blocks, original quote app blocks and image selections, shared contact/footer files, query routing, required/email/ZIP validation, complete address/type in an intercepted local POST, and server error/success fixtures.
- Responsive checks passed at 375, 768 and 1440px. Screenshot artifacts were kept outside the project in a temporary directory.
- `shopify theme check` reports no errors in the files changed for this task. The full project check still reports pre-existing errors in root `hero.liquid` (section schema outside sections) and `sections/footer.liquid` (unclosed span around line 105), plus existing warnings. These unrelated files were not changed.

## Official references (implementation basis)

- [Shopify native contact fields and validation](https://shopify.dev/docs/storefronts/themes/customer-engagement/add-contact-form)
- [Liquid form tag and return_to](https://shopify.dev/docs/api/liquid/tags/form)
- [Receiving native contact submissions](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/common-customizations/add-contact-page)
- [Create a Shopify Forms form](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/create)
- [Forms fields, success, tags and notifications](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app/settings/all-forms)

## Success-display correction — 2026-10-22

### Diagnosis and scope

The user confirmed delivery to the shop email but no visible confirmation. A read-only GET of the live office-visit page confirmed the same form markup as the imported theme: `action="/contact#OfficeVisitForm"` with a hidden `return_to` of `/pages/book-a-call?request=in-person#OfficeVisitForm`. That custom URL overrides Shopify's normal return path and is the likely cause of losing the Liquid success state. The actual POST/redirect response from the user's test was not available: this remains a diagnosis from code and live GET markup, not a captured successful POST trace.

The previous local test injected a successful Liquid state directly and could not catch a Shopify redirect losing that state. The browser tests also exposed a separate focus race on return to `#OfficeVisitForm`: native fragment navigation could reset the initial programmatic focus. Both paths are now addressed, but Shopify's actual redirect must still be retested live.

### Changes

- Removed the custom `return_to`; kept the native Shopify contact form, its ID, all fields and submit markup unchanged. No endpoint, recipient or notification settings were changed.
- Updated the exact success copy in both the section schema and saved template settings. The message is still rendered only inside `form.posted_successfully?`; errors still use `form.errors | default_errors`.
- Server-rendered status takes priority over query routing. Only the UI parameter `request=in-person` can be restored via `replaceState`; there is no client-generated success flag or submission interception.
- Added a visible status panel, focus target, native autofocus, scroll margin, and measured fixed-header clearance. A load-time pass accounts for native anchor navigation; it does not steal focus after visitor interaction. Without JavaScript, the server-rendered confirmation and errors remain visible.
- Production files changed: `sections/office-visit.liquid`, `assets/office-visit.js`, `assets/office-visit.css`, `templates/page.book-a-call.json`. Supporting files: this document and `scripts/verify-office-visit.cjs`.

### Local verification and remaining live test

- Compared all 117 theme files against the imported `22OCT2026-0146am` ZIP: only the four production files above differ. Book a Call configuration is identical except the office success message; existing Form 1155185 and all contact fields are unchanged.
- Browser tests cover the exact server-success text, server errors, focus and visibility below the actual theme header at 375/768/1440px, missing/wrong scenario queries, native fragment navigation, preserved preview parameters, late script loading, normal call routing, and no-JavaScript rendering. Success states are local Liquid fixtures, not evidence of delivery.
- Local POST interception confirms the address/type/contact fields remain in the payload. No live POST or email was sent during this correction. Delivery of the previous version is confirmed by the user, not independently by this test.
- Theme Check reports no offenses in the corrected files. Pre-existing errors remain in root `hero.liquid` and `sections/footer.liquid`; they were not changed.

Retest on an unpublished theme preview:

1. Open `/pages/book-a-call?request=in-person` with the preview theme active. Submit one clearly labelled test using a real inbox and office address; complete Shopify's CAPTCHA if shown.
2. Record the final URL and, if possible, the `/contact` response/redirect in DevTools with Preserve log enabled. Confirm the visit scenario remains selected and the exact confirmation receives focus below the fixed header on desktop and phone. Do not manually add any success parameter.
3. Confirm email receipt with the full address and request type. Revisit the plain form URL: there must be no confirmation on a fresh request. Check empty/invalid fields; server errors must remain visible when Shopify returns them.
4. Test `?request=call` and the ordinary Book a Call URL; the existing call app must remain unchanged. Repeat an approved submission with JavaScript disabled only if Shopify's anti-spam flow permits it. No Admin form or recipient changes are required for this fix.
