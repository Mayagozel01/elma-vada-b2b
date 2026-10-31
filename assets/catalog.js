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

  function revealPolicy(hash = window.location.hash) {
    if (hash !== '#payment-policy' && hash !== '#return-policy') return;
    const policy = document.getElementById(hash.slice(1));
    if (!policy?.classList.contains('catalog-policy')) return;
    policy.open = true;
    requestAnimationFrame(() => {
      const summary = policy.querySelector('summary');
      if (!summary) return;
      summary.focus({ preventScroll: true });
      summary.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }

  normalizeCatalogUrl();
  revealPolicy();
  window.addEventListener('hashchange', () => revealPolicy());
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const target = new URL(link.href);
    if (target.origin === window.location.origin &&
        target.pathname === window.location.pathname &&
        target.search === window.location.search) {
      revealPolicy(target.hash);
      // The theme's general smooth-scroll handler prevents default on local # links.
      // Keep the policy hash in the URL without changing any other anchor behavior.
      if (event.defaultPrevented &&
          (target.hash === '#payment-policy' || target.hash === '#return-policy') &&
          target.hash !== window.location.hash) {
        window.location.hash = target.hash;
      }
    }
  });
  document.addEventListener('shopify:section:load', event => {
    normalizeCatalogUrl();
    if (event.target.querySelector('.catalog-policies')) revealPolicy();
  });
})();
