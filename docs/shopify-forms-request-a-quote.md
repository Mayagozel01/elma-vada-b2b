# Shopify Forms: Request a Quote

The theme uses the existing Shopify Forms inline form with Form ID `1155185`.
Do not create a replacement contact form or change the Form ID for quote and bulk-order requests.

## Configure the form in Shopify admin

Open **Apps → Forms**, select form `1155185`, and keep its current field bindings,
required settings, validation, consent text, privacy/terms links, submission success
message, notifications, tags, and automations.

Arrange the existing fields in this order:

1. First name
2. Email
3. Phone
4. Upload your logo
5. Company name
6. Quantity
7. Project details
8. Needed by
9. How can we help?

Use the native Shopify Forms field types:

- **Phone** for Phone. Confirm in the published form that the native country selector
  and international code are available for the store locale. Do not replace it with
  theme JavaScript if the app does not provide that control.
- **File upload** for Upload your logo. Keep the current file restrictions and the
  native **Add file** control.
- **Number** for Quantity.
- **Multi-line text** for Project details.
- **Date** for Needed by.
- **Dropdown** for How can we help? Keep the existing options.

Set the submit button label to **Send My Request**. Save the form and confirm that it
is active. Also confirm that the Shopify Forms theme app embed is enabled.

## Theme placements

The quote form is configured in:

- `templates/page.quote.json` for `/pages/request-a-quote#ProjectForm`
- `templates/page.free-mockup.json`
- `templates/product.json`

Product pages include a **Copy product details** action because Shopify Forms does not
provide a documented theme API for dynamically prefilling this app block. The copied
text contains the product title, selected variant, and product URL and should be pasted
into Project details.

## Keep consultations separate

Office visits now have a dedicated `office-visit` section on Book a Call, selected by
`?request=in-person`. Its native Shopify contact form is separate from Form 1155185;
it can be replaced with a dedicated Forms inline app block. Follow
[`office-visit-setup.md`](office-visit-setup.md) for required address fields,
notifications and testing. The choices below concern the ordinary **project call**
route only, not the office-visit section.

`templates/page.book-a-call.json` already used Form ID `1155185` before this change.
To further separate the ordinary project-call workflow, do one of the following in Shopify:

1. Create or select a dedicated consultation form and replace only the app block on
   the Book a Call template with that form's ID; or
2. Set the theme's consultation calendar URL and remove the Forms app block from the
   Book a Call template after verifying the calendar button.

Do not change the quote form on the Request a Quote, Free Mockup, or product templates.

## Verification after upload

Use a duplicated unpublished theme. Check desktop and mobile layouts, then verify the
phone control, file upload, date picker, dropdown options, required-field errors,
privacy/terms links, success state, and notifications. Submit only with approved test
contact details.
