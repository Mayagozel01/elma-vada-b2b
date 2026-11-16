/* Cart-only UI. All writes go through cart.js; prices/eligibility come from Liquid. */
(() => {
  'use strict';
  const root = document.querySelector('[data-cart-offers]');
  if (!root || root.dataset.mounted || !window.elmaCart) return;
  root.dataset.mounted = 'true';
  const dialog = root.querySelector('[data-offers-dialog]');
  if (typeof dialog.showModal !== 'function') return;
  const notice = root.querySelector('[data-offers-open]');
  const status = root.querySelector('[data-offers-status]');
  const list = root.querySelector('[data-offers-list]');
  const form = root.querySelector('[data-cart-offers-form]');
  const add = root.querySelector('[data-offers-add]');
  const sessionKey = 'elma:gift-offers:seen:v1';
  let busy = false;
  let timer;
  let opener;

  function cartDirty() {
    return [...document.querySelectorAll('[data-cart-quantity]')].some(input =>
      Number(input.value) !== Number(input.dataset.initialQuantity));
  }
  function say(text) {
    status.textContent = text;
    status.hidden = !text;
  }
  function candidates(host) {
    const grouped = new Map();
    if (Number(host?.dataset.cartCount) > 0) {
      host.querySelector('[data-offer-candidates]')?.content.querySelectorAll('[data-gift-offer]').forEach(card => {
        const id = card.dataset.variantId;
        if (!/^\d+$/.test(id)) return;
        if (!grouped.has(id)) grouped.set(id, {card: card.cloneNode(true), parents: new Set()});
        grouped.get(id).parents.add(card.dataset.parentLabel);
      });
    }
    return grouped;
  }
  function render(grouped) {
    list.replaceChildren();
    grouped.forEach(({card, parents}) => {
      const context = card.querySelector('[data-offer-parents]');
      context.textContent = 'Pairs with: ' + [...parents].filter(Boolean).join('; ');
      context.hidden = false;
      list.append(card);
    });
    notice.hidden = grouped.size === 0;
    add.disabled = true;
  }
  function selectedCards() {
    return [...list.querySelectorAll('[data-gift-offer]')].filter(card => card.querySelector('[data-offer-choice]').checked);
  }
  function syncChoices() {
    if (window.elmaCart.isLocked()) return;
    list.querySelectorAll('[data-gift-offer]').forEach(card => {
      card.querySelector('[data-offer-quantity]').disabled = !card.querySelector('[data-offer-choice]').checked;
    });
    add.disabled = busy || window.elmaCart.isLocked() || !selectedCards().length;
  }
  async function refresh() {
    const url = new URL(root.dataset.cartUrl, window.location.origin);
    // Keep the current preview theme context; no store/domain is hardcoded.
    const preview = new URL(window.location.href).searchParams.get('preview_theme_id');
    if (preview) url.searchParams.set('preview_theme_id', preview);
    url.searchParams.set('sections', root.dataset.sectionId);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url.href, {
        credentials: 'same-origin', cache: 'no-store', redirect: 'error',
        headers: {Accept: 'application/json'}, signal: controller.signal
      });
      if (!response.ok) throw new Error('Unable to refresh offers');
      const sections = await response.json();
      const html = sections[root.dataset.sectionId];
      if (typeof html !== 'string') throw new Error('Unable to render offers');
      const fresh = new DOMParser().parseFromString(html, 'text/html').querySelector('[data-cart-offers]');
      if (!fresh) { render(new Map()); return null; }
      // Avoid submitting the quantities from an older cart (for example another tab).
      if (fresh.dataset.cartFingerprint !== root.dataset.cartFingerprint) {
        window.location.replace(root.dataset.cartUrl);
        return null;
      }
      return candidates(fresh);
    } finally { clearTimeout(timeout); }
  }
  function seen() {
    try { return sessionStorage.getItem(sessionKey) === 'true'; }
    catch { return true; } // No durable tab storage: retain manual opening only.
  }
  function remember() {
    try { sessionStorage.setItem(sessionKey, 'true'); return true; }
    catch { return false; }
  }
  async function open(automatic = false) {
    if (busy || dialog.open || window.elmaCart.isLocked()) return;
    if (automatic && (seen() || document.visibilityState === 'hidden' || document.querySelector('dialog[open]'))) return;
    if (cartDirty()) {
      if (!automatic) say('Update your cart quantities before choosing extras.');
      return;
    }
    busy = true;
    notice.disabled = true;
    say('');
    try {
      const grouped = await refresh();
      if (!grouped || window.elmaCart.isLocked() || cartDirty()) return;
      render(grouped);
      if (!grouped.size) {
        if (!automatic) say('There are no additional gift offers available for your cart.');
        return;
      }
      if (automatic && (seen() || document.visibilityState === 'hidden' || document.querySelector('dialog[open]'))) return;
      if (automatic && !remember()) return;
      if (!automatic) remember();
      clearTimeout(timer);
      opener = automatic ? document.activeElement : notice;
      dialog.showModal();
      dialog.querySelector('[data-offers-close]').focus();
    } catch {
      if (!automatic) say('We could not refresh gift offers. Please try again.');
    } finally {
      busy = false;
      notice.disabled = window.elmaCart.isLocked();
    }
  }

  render(candidates(root));
  notice.addEventListener('click', () => open());
  form.addEventListener('change', syncChoices);
  root.querySelector('[data-offers-close]').addEventListener('click', () => dialog.close());
  // Native dialog supplies modal isolation and Escape. Explicitly cycle Tab as
  // well, so focus never falls onto browser chrome at either end of the form.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')]
      .filter(element => !element.closest('[hidden]'));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener('close', () => {
    clearTimeout(timer);
    remember();
    if (opener?.isConnected && opener !== document.body && !opener.disabled) opener.focus();
    else if (!notice.hidden && !notice.disabled) notice.focus();
    else {
      const fallback = document.querySelector('[data-cart-message]:not([hidden])') || document.querySelector('.commerce-cart h1');
      fallback?.setAttribute('tabindex', '-1');
      fallback?.focus();
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || window.elmaCart.isLocked() || !form.reportValidity()) return;
    const selected = selectedCards();
    if (!selected.length) return;
    busy = true;
    add.disabled = true;
    form.querySelectorAll('input').forEach(input => { input.disabled = true; });
    const error = form.querySelector('[data-add-message]');
    error.hidden = true;
    try {
      const grouped = await refresh();
      if (!grouped || window.elmaCart.isLocked() || !dialog.open) return;
      // Re-check stock, configuration and price before writing. Do not silently
      // swap a choice or accept a price that changed while the dialog was open.
      const changed = selected.some(card => {
        const fresh = grouped.get(card.dataset.variantId)?.card;
        return !fresh || fresh.dataset.offerRevision !== card.dataset.offerRevision;
      });
      if (changed || cartDirty()) {
        render(grouped);
        error.querySelector('[data-add-error-text]').textContent = 'Your gift offers or cart changed. Review your cart and select your extras again.';
        error.hidden = false;
        error.focus();
        return;
      }
      const items = selected.map(card => ({
        id: card.dataset.variantId, quantity: Number(card.querySelector('[data-offer-quantity]').value),
        properties: {_elma_gift_offer: 'true'}
      }));
      await window.elmaCart.addItems({form, endpoint: root.dataset.addUrl, items, cartUrl: root.dataset.cartUrl});
    } catch {
      error.querySelector('[data-add-error-text]').textContent = 'We could not refresh gift offers. Nothing was submitted. Please try again.';
      error.hidden = false;
      error.focus();
    } finally {
      busy = false;
      if (!window.elmaCart.isLocked()) {
        form.querySelectorAll('[data-offer-choice]').forEach(input => { input.disabled = false; });
        syncChoices();
      }
    }
  });
  document.addEventListener('elma:cart-busy', () => { clearTimeout(timer); notice.disabled = true; });
  function schedule() {
    if (!notice.hidden && !seen()) timer = setTimeout(() => open(true), 5000);
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once: true});
})();
