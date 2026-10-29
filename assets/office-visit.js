/* Book a Call only. UI routing; Shopify owns both native form submissions and results. */
(() => {
  'use strict';
  const root = document.documentElement;
  const submittedKey = 'elma-consultation-form';
  let visitorInteracted = false;

  ['pointerdown', 'keydown'].forEach(type => document.addEventListener(type, () => {
    visitorInteracted = true;
  }, { once: true, capture: true }));

  const officeStatus = () => document.querySelector('[data-office-visit] [data-office-status]');
  const callStatus = () => document.querySelector('[data-consultation-call] [data-call-status]');
  const lastSubmitted = () => {
    try { return sessionStorage.getItem(submittedKey); } catch { return null; }
  };

  function scenario() {
    if (location.hash === '#OfficeVisitForm' || location.hash === '#OfficeVisitStatus') return 'office';
    if (location.hash === '#CallRequestForm' || location.hash === '#CallRequestStatus') return 'call';
    const requested = new URLSearchParams(location.search).get('request');
    if (requested === 'in-person') return 'office';
    if (requested === 'call') return 'call';
    // Shopify can drop a custom query after a native form POST. The submit marker
    // chooses which *server-rendered* result to show; it never creates a result.
    if (officeStatus() || callStatus()) {
      const previous = lastSubmitted();
      if (previous === 'office' || previous === 'call') return previous;
      if (officeStatus() && !callStatus()) return 'office';
    }
    return 'call';
  }

  function route() {
    const current = scenario();
    root.dataset.consultation = current;
    return current;
  }

  function scrollToStatus(status) {
    const header = document.getElementById('SiteHeader');
    const offset = Math.max(0, header?.getBoundingClientRect().bottom || 0) + 16;
    const section = status.closest('[data-office-visit], [data-consultation-call]');
    section?.style.setProperty('--office-status-offset', `${offset}px`);
    window.scrollTo({ top: Math.max(0, window.scrollY + status.getBoundingClientRect().top - offset), behavior: 'instant' });
  }

  function alignCallAnchor() {
    if (location.hash !== '#CallRequestForm') return;
    const form = document.getElementById('CallRequestForm');
    const wrapper = form?.closest('.callback-request__form-wrap');
    if (!wrapper || root.dataset.consultation !== 'call') return;
    const header = document.getElementById('SiteHeader');
    const offset = Math.max(0, header?.getBoundingClientRect().bottom || 0) + 16;
    wrapper.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      if (document.activeElement !== wrapper) return;
      window.scrollTo({ top: Math.max(0, window.scrollY + form.getBoundingClientRect().top - offset), behavior: 'instant' });
    });
  }

  function showServerResult() {
    const current = route();
    const status = current === 'office' ? officeStatus() : callStatus();
    if (!status) { alignCallAnchor(); return; }
    const url = new URL(location.href);
    const requestValue = current === 'office' ? 'in-person' : 'call';
    if (url.searchParams.get('request') !== requestValue) {
      url.searchParams.set('request', requestValue);
      history.replaceState(history.state, '', url);
    }
    try { sessionStorage.removeItem(submittedKey); } catch { /* Storage may be disabled. */ }
    status.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      if (document.activeElement === status) scrollToStatus(status);
    });
  }

  document.addEventListener('submit', event => {
    const current = event.target?.id === 'OfficeVisitForm' ? 'office' :
      event.target?.id === 'CallRequestForm' ? 'call' : null;
    if (!current) return;
    try { sessionStorage.setItem(submittedKey, current); } catch { /* URL/hash still route the result. */ }
  }, { capture: true });

  route();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showServerResult, { once: true });
  else showServerResult();

  function realignFocusedStatus() {
    const status = scenario() === 'office' ? officeStatus() : callStatus();
    if (status && document.activeElement === status) requestAnimationFrame(() => {
      if (document.activeElement === status) scrollToStatus(status);
    });
  }

  window.addEventListener('load', () => requestAnimationFrame(() => {
    if (!visitorInteracted) showServerResult();
  }), { once: true });
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
