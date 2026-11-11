(() => {
  'use strict';

  const hostSelector = 'shopify-forms-embed, #app-embed-container-1210851';
  const styleId = 'elma-forms-mobile-header-spacing';
  const css = `
    @media (max-width: 749px) {
      section._formHeader_48bzm_42 {
        margin: 5px auto 12px !important;
        line-height: 1.2 !important;
      }

      form._formFieldset_48bzm_110 {
        gap: 5px !important;
      }
    }
  `;
  const observedRoots = new WeakSet();

  function observeShadowRoot(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);

    if (!root.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = css;
      root.appendChild(style);
    }

    root.querySelectorAll('*').forEach((element) => {
      if (element.shadowRoot) observeShadowRoot(element.shadowRoot);
    });

    new MutationObserver((records) => {
      records.forEach(({ addedNodes }) => {
        addedNodes.forEach(findFormHosts);
      });
    }).observe(root, { childList: true, subtree: true });
  }

  function findFormHosts(node) {
    if (!(node instanceof Element)) return;

    if (node.matches(hostSelector) && node.shadowRoot) {
      observeShadowRoot(node.shadowRoot);
    }

    node.querySelectorAll(hostSelector).forEach((host) => {
      if (host.shadowRoot) observeShadowRoot(host.shadowRoot);
    });
  }

  findFormHosts(document.body);

  new MutationObserver((records) => {
    records.forEach(({ addedNodes }) => {
      addedNodes.forEach(findFormHosts);
    });
  }).observe(document.body, { childList: true, subtree: true });

  if (window.customElements) {
    window.customElements.whenDefined('shopify-forms-embed').then(() => {
      findFormHosts(document.body);
    });
  }
})();
