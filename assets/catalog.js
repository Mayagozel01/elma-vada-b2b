/* Reload legacy price URLs so Shopify applies the permitted sort and filters. */
(() => {
  'use strict';

  function normalizeCatalogUrl() {
    const catalog = document.querySelector('[data-catalog]');
    if (!catalog) return;
    const url = new URL(window.location.href);
    const bannedSorts = ['price-ascending', 'price-descending'];
    let changed = false;

    if (url.searchParams.getAll('sort_by').some(sort => bannedSorts.includes(sort)) ||
        catalog.dataset.priceSortActive === 'true') {
      url.searchParams.set('sort_by', catalog.dataset.defaultSort);
      changed = true;
    }
    // Old bookmarks must not keep filtering by a control that is no longer shown.
    for (const name of ['filter.v.price.gte', 'filter.v.price.lte']) {
      if (url.searchParams.has(name)) {
        url.searchParams.delete(name);
        changed = true;
      }
    }
    if (changed) {
      url.searchParams.delete('page');
      if (url.href !== window.location.href) window.location.replace(url.href);
    }
  }

  normalizeCatalogUrl();
  document.addEventListener('shopify:section:load', normalizeCatalogUrl);
})();
