/* One mutation coordinator. Shopify renders all cart prices, discounts and properties. */
(() => {
  'use strict';
  if (window.elmaCartMounted) return;
  window.elmaCartMounted = true;
  let locked = false;
  let recovering = false;
  let mutationFocus;
  let countRequest;
  const disabledControls = new Map();
  const cartForm = () => document.querySelector('[data-cart-form]');

  function updateCount(count) {
    if (!Number.isInteger(count) || count < 0) return;
    document.querySelectorAll('[data-header-cart]').forEach(link => {
      const badge = link.querySelector('[data-cart-count]');
      if (badge) badge.textContent = String(count);
      link.setAttribute('aria-label', 'Cart, ' + count + (count === 1 ? ' item' : ' items'));
    });
  }
  async function request(url, payload, accept = 'application/json') {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(url, {
        method: payload ? 'POST' : 'GET', credentials: 'same-origin', cache: 'no-store', redirect: 'error',
        headers: {Accept: accept, ...(payload ? {'Content-Type': 'application/json'} : {})},
        ...(payload ? {body: JSON.stringify(payload)} : {}), signal: controller.signal
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    } finally { clearTimeout(timeout); }
  }
  async function read() {
    const form = cartForm();
    const url = new URL(form.action);
    // Keep the locale-aware cart route and the current preview/market query context.
    const page = new URL(window.location.href || form.action);
    page.searchParams.forEach((value, key) => url.searchParams.set(key, value));
    url.hash = '';
    url.searchParams.delete('section_id');
    url.searchParams.set('sections', form.dataset.sectionId);
    // On /cart, Accept: application/json selects cart JSON ahead of section rendering.
    // The sections request still returns JSON, but must use the storefront negotiation.
    const sections = await request(url.href, undefined, '*/*');
    // Standalone sections are top-level. Only bundled mutation responses use .sections.
    const html = sections && typeof sections === 'object' && !Array.isArray(sections)
      ? sections[form.dataset.sectionId] : null;
    if (typeof html !== 'string' || !html.trim()) throw new Error('Cart section unavailable');
    const fresh = new DOMParser().parseFromString(html, 'text/html').querySelector('[data-cart-form]');
    if (!fresh?.querySelector('[data-cart-items]') || !fresh.querySelector('[data-cart-footer]') ||
        !fresh.dataset.cartFingerprint || !/^\d+$/.test(fresh.dataset.cartCount)) throw new Error('Invalid cart section');
    return fresh;
  }
  function apply(fresh, detail = {}) {
    const form = cartForm();
    const active = mutationFocus || document.activeElement;
    const x = window.scrollX, y = window.scrollY;
    const key = active?.dataset.lineKey;
    const name = active?.name;
    for (const selector of ['[data-cart-items]', '[data-cart-footer]']) {
      const current = form.querySelector(selector), next = fresh.querySelector(selector);
      if (current.innerHTML !== next.innerHTML) current.innerHTML = next.innerHTML;
      current.hidden = next.hidden;
    }
    form.dataset.cartFingerprint = fresh.dataset.cartFingerprint;
    form.dataset.cartCount = fresh.dataset.cartCount;
    // Keep the offers host and native dialog connected. Moving an open dialog can close it.
    const currentCandidates = form.querySelector('[data-offer-candidates]');
    const nextCandidates = fresh.querySelector('[data-offer-candidates]');
    if (currentCandidates) currentCandidates.innerHTML = nextCandidates?.innerHTML || '';
    updateCount(Number(fresh.dataset.cartCount));
    document.dispatchEvent(new CustomEvent('elma:cart-updated', {detail: {...detail, fresh}}));
    if (active && !active.isConnected) {
      const replacement = [...form.querySelectorAll('[data-line-key]')].find(el =>
        key && el.dataset.lineKey === key && el.tagName === active.tagName) ||
        [...form.querySelectorAll('button[name]')].find(el => name && el.name === name) ||
        form.querySelector('[data-cart-message]:not([hidden])') || document.querySelector('.commerce-cart h1');
      if (replacement && !replacement.disabled) {
        if (!replacement.matches('input, button, a')) replacement.setAttribute('tabindex', '-1');
        replacement.focus({preventScroll: true});
      }
    }
    window.scrollTo?.(x, y);
  }
  function lock() {
    if (locked) return false;
    mutationFocus = document.activeElement;
    locked = true;
    countRequest?.abort();
    const form = cartForm();
    form?.setAttribute('aria-busy', 'true');
    form?.querySelectorAll('[data-cart-quantity], button[name]').forEach(control => {
      disabledControls.set(control, control.disabled);
      control.disabled = true;
    });
    form?.querySelectorAll('[data-cart-remove]').forEach(link => link.setAttribute('aria-disabled', 'true'));
    document.dispatchEvent(new CustomEvent('elma:cart-busy'));
    return true;
  }
  function unlock() {
    locked = false;
    disabledControls.forEach((disabled, control) => { if (control.isConnected) control.disabled = disabled; });
    disabledControls.clear();
    mutationFocus = null;
    cartForm()?.removeAttribute('aria-busy');
    cartForm()?.querySelectorAll('[data-cart-remove]').forEach(link => link.removeAttribute('aria-disabled'));
    document.dispatchEvent(new CustomEvent('elma:cart-idle'));
  }
  function message(text, retry = false) {
    const box = cartForm()?.querySelector('[data-cart-message]');
    if (!box) return;
    box.querySelector('[data-cart-error-text]').textContent = text;
    box.hidden = !text;
    box.querySelector('[data-cart-retry]').hidden = !retry;
  }
  async function recover() {
    if (recovering) return false;
    recovering = true;
    try {
      apply(await read());
      message('');
      unlock();
      return true;
    } catch {
      message('We could not refresh your cart. Your cart may have changed. Refresh the cart before trying again.', true);
      return false;
    } finally { recovering = false; }
  }
  async function mutate(endpoint, payload, addedIds = []) {
    if (!lock()) return {ok: false};
    message('');
    let confirmed = false;
    let synced = false;
    try {
      const result = await request(endpoint, payload);
      if (addedIds.length) {
        confirmed = Array.isArray(result.items) && payload.items.every(item => result.items.some(line =>
          String(line.variant_id || line.id) === String(item.id) && Number.isInteger(line.quantity) && line.quantity >= item.quantity));
      } else confirmed = Array.isArray(result.items) && Number.isInteger(result.item_count);
      if (!confirmed) throw new Error('Unconfirmed response');
      apply(await read(), {confirmedIds: addedIds});
      synced = true;
      return {ok: true, confirmed: true, synced: true};
    } catch {
      // Shopify may partially mutate even on 422 or a lost response. Reconcile with a GET;
      // never blindly repeat a POST. A present variant is then disabled by the offer UI.
      try {
        apply(await read(), {confirmedIds: confirmed ? addedIds : []});
        synced = true;
      } catch { /* A read-only retry remains available if the connection is still down. */ }
      if (!synced) message('We could not refresh your cart. Your cart may have changed. Refresh the cart before trying again.', true);
      else if (!confirmed) message('We could not confirm the change. Your cart has been refreshed; review it and try again.');
      return {ok: confirmed && synced, confirmed, synced};
    } finally {
      if (synced) unlock();
      else cartForm()?.removeAttribute('aria-busy');
    }
  }
  window.elmaCart = {
    isLocked: () => locked,
    read, apply, recover,
    lockNative() {
      if (locked) return false;
      locked = true;
      countRequest?.abort();
      document.dispatchEvent(new CustomEvent('elma:cart-busy'));
      return true;
    },
    addItems({endpoint, items}) { return mutate(endpoint, {items}, items.map(item => String(item.id))); }
  };
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('[data-cart-form]')) return;
    if (locked) { event.preventDefault(); return; }
    if (event.submitter?.name === 'checkout') {
      document.dispatchEvent(new CustomEvent('elma:checkout-start'));
      // Native POST includes the shopper's unsaved quantities; do not disable its controls.
      window.elmaCart.lockNative();
      return;
    }
    event.preventDefault();
    if (!form.reportValidity()) return;
    const updates = Object.create(null);
    form.querySelectorAll('[data-cart-quantity]').forEach(input => {
      if (Number(input.value) !== Number(input.dataset.initialQuantity)) updates[input.dataset.lineKey] = Number(input.value);
    });
    if (Object.keys(updates).length) mutate(form.dataset.cartUpdateUrl, {updates});
  });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-cart-retry]')) { recover(); return; }
    const remove = event.target.closest('[data-cart-remove]');
    if (!remove?.closest('[data-cart-form]')) return;
    event.preventDefault();
    if (!locked) mutate(cartForm().dataset.cartChangeUrl, {id: remove.dataset.lineKey, quantity: 0});
  });
  async function refreshCount() {
    const link = document.querySelector('[data-header-cart]');
    if (!link || locked || countRequest) return;
    countRequest = new AbortController();
    const controller = countRequest;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(link.dataset.cartJsonUrl, {credentials: 'same-origin', cache: 'no-store', redirect: 'error',
        headers: {Accept: 'application/json'}, signal: controller.signal});
      if (response.ok) {
        const data = await response.json();
        if (!locked) updateCount(data.item_count);
      }
    } catch { /* Retain the last confirmed count. */ }
    finally { clearTimeout(timeout); countRequest = null; }
  }
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    if (cartForm()) { lock(); recover(); }
    else if (locked) window.location.replace(window.location.href);
    else refreshCount();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshCount();
  });
  document.addEventListener('shopify:section:load', refreshCount);
})();
