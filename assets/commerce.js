/* Product gallery and purchase/quote context. Forms submit through Shopify. */
(() => {
  'use strict';
  const mounted = new Map();

  function mount(root) {
    if (mounted.has(root)) return;
    const abort = new AbortController();
    const on = (element, event, callback) => element?.addEventListener(event, callback, {signal: abort.signal});
    const variantSelect = root.querySelector('[data-variant-select]');
    const quantity = root.querySelector('[data-product-quantity]');
    const quoteQuantity = root.querySelector('[data-quote-quantity]');
    const quoteVariant = root.querySelector('[data-quote-variant]');
    const quoteUrl = root.querySelector('[data-quote-url]');
    const quoteContext = root.querySelector('[data-quote-context]');
    const productTitle = root.querySelector('h1').textContent;
    const slides = [...root.querySelectorAll('[data-gallery-image]')];
    const thumbs = [...root.querySelectorAll('[data-gallery-thumb]')];
    const dialog = root.querySelector('[data-product-lightbox]');
    let lightboxOpener;
    let quoteQuantityEdited = false;

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
      if (quoteVariant) quoteVariant.value = variantName;
      if (quoteContext) quoteContext.textContent = productTitle + ' — ' + variantName;
      if (quoteUrl) {
        const url = new URL(quoteUrl.value);
        url.searchParams.set('variant', option.value);
        quoteUrl.value = url.href;
      }
      if (quoteQuantity && !quoteQuantityEdited) quoteQuantity.value = quantity.value;
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
      if (stock) stock.textContent = available ? 'Available to order' : 'Sold out';
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
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', option.value);
        window.history.replaceState({}, '', url);
      }
    }
    const buy = root.querySelector('[data-add-to-cart]');
    if (buy) buy.dataset.buyLabel = buy.dataset.purchaseLabel || 'Add to cart';
    on(variantSelect, 'change', () => updateVariant());
    on(quantity, 'input', syncQuote);
    on(quoteQuantity, 'input', () => { quoteQuantityEdited = true; });
    on(root.querySelector('[data-bulk-link]'), 'click', () => {
      syncQuote();
      const engraving = root.querySelector('[data-engraving-text]')?.value.trim();
      const notes = root.querySelector('[data-quote-body]');
      if (engraving && notes && !notes.value.trim()) notes.value = 'Engraving text: ' + engraving;
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
