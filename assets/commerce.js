/* Product gallery, variant state, engraving validation and Shopify Forms context. */
(() => {
  'use strict';
  const mounted = new Map();

  function mount(root) {
    if (mounted.has(root)) return;
    const abort = new AbortController();
    const on = (element, event, callback) => element?.addEventListener(event, callback, {signal: abort.signal});
    const variantSelect = root.querySelector('[data-variant-select]');
    const quantity = root.querySelector('[data-product-quantity]');
    const engraving = root.querySelector('[data-engraving-text]');
    const personalization = root.querySelector('[data-personalization]');
    const engravingError = root.querySelector('[data-engraving-error]');
    const quoteContext = root.querySelector('[data-quote-context]');
    const copyProductDetails = root.querySelector('[data-copy-product-details]');
    const copyProductStatus = root.querySelector('[data-copy-product-status]');
    const productTitle = root.querySelector('h1').textContent;
    const slides = [...root.querySelectorAll('[data-gallery-image]')];
    const thumbs = [...root.querySelectorAll('[data-gallery-thumb]')];
    const dialog = root.querySelector('[data-product-lightbox]');
    let lightboxOpener;

    function validateEngraving(showError = false) {
      if (!engraving) return true;
      let message = '';
      if (!engraving.disabled) {
        const maximum = Number(engraving.dataset.maxLength) || 0;
        if (engraving.required && !engraving.value.trim()) {
          message = 'Please enter the name or text to engrave.';
        } else if (maximum > 0 && engraving.value.length > maximum) {
          message = 'Please use ' + maximum + ' characters or fewer for engraving.';
        }
      }
      engraving.setCustomValidity(message);
      const visible = showError && Boolean(message);
      engravingError.textContent = visible ? message : '';
      engravingError.hidden = !visible;
      if (visible) engraving.setAttribute('aria-invalid', 'true');
      else engraving.removeAttribute('aria-invalid');
      return !message;
    }
    function syncEngraving(option) {
      if (!engraving) return;
      const disabled = option.dataset.engravingDisabled === 'true';
      personalization.hidden = disabled;
      engraving.disabled = disabled;
      engraving.required = !disabled && engraving.dataset.required === 'true';
      // Preserve the draft while excluding it from the native POST for opt-out variants.
      validateEngraving(!engravingError.hidden);
    }
    function showImage(id) {
      if (!id || !slides.some(slide => slide.dataset.galleryImage === id)) return;
      slides.forEach(slide => { slide.hidden = slide.dataset.galleryImage !== id; });
      thumbs.forEach(thumb => {
        if (thumb.dataset.galleryThumb === id) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
    }
    function syncQuote() {
      const option = variantSelect?.selectedOptions[0];
      if (!option) return;
      // Strip the availability suffix from the display name, not from form values.
      const variantName = option.textContent.trim().replace(/ — Sold out$/, '');
      if (quoteContext) quoteContext.textContent = productTitle + ' — ' + variantName;
      if (copyProductDetails) {
        const url = new URL(copyProductDetails.dataset.productUrl, window.location.origin);
        url.searchParams.set('variant', option.value);
        copyProductDetails.dataset.productVariant = variantName;
        copyProductDetails.dataset.productUrl = url.href;
      }
    }
    function updateVariant(updateUrl = true) {
      const option = variantSelect?.selectedOptions[0];
      if (!option) return;
      const available = option.dataset.available === 'true';
      const price = root.querySelector('[data-variant-price]');
      const compare = root.querySelector('[data-variant-compare]');
      const stock = root.querySelector('[data-variant-stock]');
      const buy = root.querySelector('[data-add-to-cart]');
      if (price) price.textContent = option.dataset.price;
      if (compare) {
        compare.textContent = option.dataset.compare;
        compare.hidden = option.dataset.onSale !== 'true';
      }
      if (stock) stock.textContent = option.dataset.stockStatus || (available ? 'Available to order' : 'Out of stock');
      if (buy && buy.dataset.subscriptionOnly !== 'true') {
        buy.disabled = !available;
        buy.textContent = available ? buy.dataset.buyLabel : 'Sold out';
      }
      const minimum = Number(option.dataset.min) || 1;
      const step = Number(option.dataset.step) || 1;
      const maximum = Number(option.dataset.max) || null;
      quantity.min = String(minimum);
      quantity.step = String(step);
      if (maximum !== null) quantity.max = String(maximum);
      else quantity.removeAttribute('max');
      const previous = Number(quantity.value) || minimum;
      let value = minimum + Math.max(0, Math.ceil((previous - minimum) / step)) * step;
      if (maximum !== null && value > maximum) value = minimum + Math.floor((maximum - minimum) / step) * step;
      quantity.value = String(value);
      showImage(option.dataset.image);
      syncQuote();
      syncEngraving(option);
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', option.value);
        window.history.replaceState({}, '', url);
      }
    }
    const buy = root.querySelector('[data-add-to-cart]');
    if (buy) buy.dataset.buyLabel = buy.dataset.purchaseLabel || 'Add to cart';
    const variantFallback = root.querySelector('[data-variant-fallback]');
    if (variantFallback) {
      variantSelect.disabled = false;
      variantFallback.disabled = true;
    }
    if (engraving) {
      // Validate the whole value instead of silently truncating a pasted name.
      // The Liquid maxlength remains a native fallback when JavaScript is unavailable.
      engraving.removeAttribute('maxlength');
      on(engraving, 'input', () => validateEngraving(true));
      on(engraving, 'invalid', () => validateEngraving(true));
      on(engraving.form, 'submit', event => {
        syncEngraving(variantSelect.selectedOptions[0]);
        if (!validateEngraving(true)) {
          event.preventDefault();
          engraving.reportValidity();
          engraving.focus();
        }
        // Successful submissions stay native: id, quantity and ALL properties are sent.
      });
    }
    on(variantSelect, 'change', () => updateVariant());
    on(quantity, 'input', syncQuote);
    on(root.querySelector('[data-bulk-link]'), 'click', syncQuote);
    on(copyProductDetails, 'click', async () => {
      syncQuote();
      const details = [
        'Product: ' + copyProductDetails.dataset.productTitle,
        'Variant: ' + copyProductDetails.dataset.productVariant,
        'Link: ' + copyProductDetails.dataset.productUrl
      ].join('\n');
      try {
        await navigator.clipboard.writeText(details);
        copyProductStatus.textContent = 'Copied. Paste these details into the Project details field below.';
      } catch {
        copyProductStatus.textContent = 'Copy was blocked by your browser. Copy the product name and selected option shown above, then paste them into Project details.';
      }
      copyProductStatus.hidden = false;
    });
    thumbs.forEach(thumb => on(thumb, 'click', event => {
      event.preventDefault();
      showImage(thumb.dataset.galleryThumb);
    }));
    if (dialog && typeof dialog.showModal === 'function') {
      slides.forEach(slide => on(slide, 'click', event => {
        event.preventDefault();
        const original = slide.querySelector('img');
        const enlarged = dialog.querySelector('[data-lightbox-image]');
        enlarged.src = slide.href;
        enlarged.alt = original.alt;
        enlarged.width = original.width;
        enlarged.height = original.height;
        lightboxOpener = slide;
        dialog.showModal();
      }));
      on(dialog.querySelector('[data-lightbox-close]'), 'click', () => dialog.close());
      on(dialog, 'click', event => { if (event.target === dialog) dialog.close(); });
      on(dialog, 'close', () => lightboxOpener?.focus());
    }
    // Browser Back/Forward can restore a different variant URL.
    on(window, 'popstate', () => {
      const id = new URL(window.location.href).searchParams.get('variant');
      if (id && [...variantSelect.options].some(option => option.value === id)) {
        variantSelect.value = id;
        updateVariant(false);
      }
    });
    on(window, 'pageshow', () => updateVariant(false));
    updateVariant(false);
    mounted.set(root, () => { if (dialog?.open) dialog.close(); abort.abort(); });
  }
  function mountAll(scope) {
    if (scope.matches?.('[data-product-detail]')) mount(scope);
    scope.querySelectorAll('[data-product-detail]').forEach(mount);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAll(document), {once: true});
  else mountAll(document);
  document.addEventListener('shopify:section:load', event => mountAll(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, dispose] of mounted) if (event.target.contains(root)) { dispose(); mounted.delete(root); }
  });
})();
