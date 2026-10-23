/* Book a Call only. UI routing, never submission handling or synthetic success. */
(() => {
  'use strict';
  const root = document.documentElement;
  let visitorInteracted = false;
  ['pointerdown', 'keydown'].forEach(type => document.addEventListener(type, () => {
    visitorInteracted = true;
  }, {once: true, capture: true}));
  const serverStatus = () => document.querySelector('[data-office-visit] [data-office-status]');
  function route() {
    // Only Liquid creates the status. Neither query parameters nor a button click prove success.
    const office = serverStatus() || new URLSearchParams(location.search).get('request') === 'in-person' || location.hash === '#OfficeVisitForm';
    root.dataset.consultation = office ? 'office' : 'call';
  }
  function scrollToStatus(status) {
    const header = document.getElementById('SiteHeader');
    const offset = Math.max(0, header?.getBoundingClientRect().bottom || 0) + 16;
    status.closest('[data-office-visit]').style.setProperty('--office-status-offset', `${offset}px`);
    window.scrollTo({top: Math.max(0, window.scrollY + status.getBoundingClientRect().top - offset), behavior: 'instant'});
  }
  function showServerResult() {
    route();
    const status = serverStatus();
    if (!status) return;
    // Shopify owns the redirect and its result parameters. Restore only our UI scenario,
    // without a reload or an invented success flag, if Shopify dropped the custom query.
    const url = new URL(location.href);
    if (url.searchParams.get('request') !== 'in-person') {
      url.searchParams.set('request', 'in-person');
      history.replaceState(history.state, '', url);
    }
    status.focus({preventScroll: true});
    requestAnimationFrame(() => {
      if (document.activeElement === status) scrollToStatus(status);
    });
  }
  route();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showServerResult, {once: true});
  else showServerResult();
  // Fonts, the logo and native fragment scrolling can settle after DOMContentLoaded.
  // Do not steal focus or scroll after the visitor has moved on to another control.
  function realignFocusedStatus() {
    const status = serverStatus();
    if (status && document.activeElement === status) requestAnimationFrame(() => {
      if (document.activeElement === status) scrollToStatus(status);
    });
  }
  window.addEventListener('load', () => requestAnimationFrame(() => {
    // Native fragment navigation may reset focus to <body> after the first focus.
    if (!visitorInteracted) showServerResult();
  }), {once: true});
  document.fonts?.ready.then(realignFocusedStatus);
  window.addEventListener('resize', realignFocusedStatus);
  window.addEventListener('popstate', showServerResult);
  window.addEventListener('hashchange', showServerResult);
  document.addEventListener('shopify:section:load', showServerResult);
  document.addEventListener('shopify:section:select', event => {
    if (event.target.querySelector('[data-office-visit]')) root.dataset.consultation = 'office';
    else if (event.target.querySelector('[data-consultation-call]')) root.dataset.consultation = 'call';
  });
})();
