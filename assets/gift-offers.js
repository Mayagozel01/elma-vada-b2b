/* Cart-only offers share Shopify data and the cart mutation coordinator. */
(() => {
  'use strict';
  const root = document.querySelector('[data-cart-offers]');
  if (!root || root.dataset.mounted || !window.elmaCart) return;
  root.dataset.mounted = 'true';
  const cart = window.elmaCart;
  const form = root.closest('[data-cart-form]');
  const panel = root.querySelector('[data-offers-panel]');
  const dialog = root.querySelector('[data-offers-dialog]');
  const notice = root.querySelector('[data-offers-open]');
  const lists = [...root.querySelectorAll('[data-offers-list]')];
  const sessionKey = 'elma:gift-offers:seen:v1';
  const states = new Map();
  let available = new Map();
  let visible = [];
  let busy = false, leaving = false, timer, scheduled = false, opener, scrollLock;

  const dirty = () => [...form.querySelectorAll('[data-cart-quantity]')].some(input =>
    Number(input.value) !== Number(input.dataset.initialQuantity));
  function say(text) {
    for (const selector of ['[data-offers-status]', '[data-dialog-status]']) {
      const element = root.querySelector(selector);
      element.textContent = text;
      element.hidden = !text;
    }
  }
  function seen() {
    try { return sessionStorage.getItem(sessionKey) === 'true'; } catch { return true; }
  }
  function storageAvailable() {
    try {
      const probe = sessionKey + ':probe';
      sessionStorage.setItem(probe, '1');
      sessionStorage.removeItem(probe);
      return true;
    } catch { return false; }
  }
  function remember() {
    try { sessionStorage.setItem(sessionKey, 'true'); } catch { /* Manual opening still works. */ }
  }
  function otherDialog(scope = document) {
    for (const element of scope.querySelectorAll('dialog[open], [role="dialog"], [role="alertdialog"], [aria-modal="true"]')) {
      if (element === dialog || element.closest('[hidden], [aria-hidden="true"]') || (element.tagName === 'DIALOG' && !element.open)) continue;
      const style = document.defaultView.getComputedStyle(element);
      if (style.display !== 'none' && style.visibility !== 'hidden') return true;
    }
    // Also respect dialogs in accessible app shadow roots, without modifying their DOM.
    for (const element of scope.querySelectorAll('*')) if (element.shadowRoot && otherDialog(element.shadowRoot)) return true;
    return false;
  }
  function canOpen(automatic) {
    return !busy && !leaving && !dialog.open && !cart.isLocked() && !dirty() &&
      document.visibilityState !== 'hidden' && !otherDialog() &&
      (!automatic || (!seen() && storageAvailable()));
  }
  function readCandidates() {
    available = new Map([...root.querySelector('[data-offer-candidates]').content.querySelectorAll('[data-gift-offer]')]
      .map(card => [card.dataset.variantId, card]));
  }
  function syncCards() {
    const active = document.activeElement;
    lists.forEach(list => {
      const existing = new Map([...list.children].map(card => [card.dataset.variantId, card]));
      for (const id of visible) {
        const state = states.get(id);
        let card = existing.get(id);
        if (!card || card.dataset.offerRevision !== state.card.dataset.offerRevision) {
          const next = state.card.cloneNode(true);
          if (card) card.replaceWith(next); else list.append(next);
          card = next;
        }
        const quantity = card.querySelector('[data-offer-quantity]');
        const button = card.querySelector('[data-offer-add]');
        const finished = state.status === 'added' || state.status === 'present';
        quantity.value = state.quantity;
        quantity.disabled = finished || busy || cart.isLocked();
        // aria-disabled retains the active button when its text becomes Added.
        button.disabled = false;
        button.setAttribute('aria-disabled', String(finished || busy || cart.isLocked()));
        button.textContent = state.status === 'loading' ? 'Adding…' : state.status === 'added' ? 'Added ✓' : state.status === 'present' ? 'In cart' : 'Add to cart';
        card.setAttribute('aria-busy', String(state.status === 'loading'));
        const error = card.querySelector('[data-offer-error]');
        error.textContent = state.error || '';
        error.hidden = !state.error;
        const result = card.querySelector('[data-offer-result]');
        result.textContent = finished ? (state.status === 'added' ? 'Added ✓. ' : '') + 'Change the quantity in your cart.' : '';
        result.hidden = !finished;
      }
      for (const [id, card] of existing) if (!visible.includes(id)) card.remove();
      // Preserve predictable order, moving only nodes whose position changed.
      visible.forEach((id, index) => {
        const card = [...list.children].find(child => child.dataset.variantId === id);
        if (list.children[index] !== card) list.insertBefore(card, list.children[index] || null);
      });
    });
    panel.hidden = !visible.length;
    notice.hidden = !visible.length || typeof dialog.showModal !== 'function';
    notice.disabled = busy || cart.isLocked();
    if (active && !active.isConnected) {
      const target = dialog.open ? dialog.querySelector('[data-offers-close]') : notice;
      if (!target.hidden && !target.disabled) target.focus({preventScroll: true});
    }
  }
  function reconcile(detail = {}) {
    readCandidates();
    const presentIds = new Set([...form.querySelectorAll('[data-cart-items] [data-cart-variant]')].map(line => line.dataset.cartVariant));
    for (const [id, state] of states) {
      if (detail.confirmedIds?.includes(id) && presentIds.has(id)) { state.status = 'added'; state.error = ''; }
      else if (presentIds.has(id) && state.status !== 'added') state.status = 'present';
      else if (!presentIds.has(id) && state.status !== 'loading') state.status = 'idle';
    }
    const retained = visible.filter(id => {
      const state = states.get(id);
      return presentIds.has(id) && (dialog.open || state.status === 'added' || state.status === 'loading');
    });
    visible = (retained.length ? [...new Set([...visible.filter(id => available.has(id) || retained.includes(id)), ...available.keys()])] : [...available.keys()]).slice(0, 3);
    for (const id of visible) {
      const card = available.get(id);
      const previous = states.get(id);
      if (!previous) states.set(id, {card, quantity: '1', status: 'idle', error: ''});
      else if (card) {
        if (card.dataset.offerRevision !== previous.card.dataset.offerRevision) {
          previous.quantity = '1';
          previous.error = 'This offer changed. Review the price and quantity before adding it.';
        }
        previous.card = card;
      }
    }
    syncCards();
    if (!visible.length && dialog.open) {
      say('There are no additional gift offers available for your cart.');
      dialog.close();
    }
  }
  function freezeScroll() {
    const body = document.body;
    const properties = ['position', 'top', 'left', 'width', 'overflow', 'paddingRight'];
    scrollLock = {x: window.scrollX, y: window.scrollY, styles: Object.fromEntries(properties.map(key => [key, body.style[key]])), overflow: document.documentElement.style.overflow};
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    if (gutter > 0) body.style.paddingRight = (parseFloat(document.defaultView.getComputedStyle(body).paddingRight) + gutter) + 'px';
    Object.assign(body.style, {position: 'fixed', top: -scrollLock.y + 'px', left: -scrollLock.x + 'px', width: '100%', overflow: 'hidden'});
    document.documentElement.style.overflow = 'hidden';
  }
  function releaseScroll() {
    if (!scrollLock) return;
    Object.assign(document.body.style, scrollLock.styles);
    document.documentElement.style.overflow = scrollLock.overflow;
    window.scrollTo?.(scrollLock.x, scrollLock.y);
    scrollLock = null;
  }
  async function open(automatic = false) {
    if (!canOpen(automatic)) {
      if (!automatic && dirty()) say('Update your cart quantities before choosing extras.');
      return;
    }
    busy = true;
    syncCards();
    try {
      const fresh = await cart.read();
      busy = false;
      if (!canOpen(automatic)) return;
      cart.apply(fresh);
      if (!visible.some(id => available.has(id))) return;
      opener = automatic ? document.activeElement : notice;
      dialog.showModal();
      if (!dialog.open) return;
      // The durable seen flag is written only after showModal actually succeeded.
      remember();
      clearTimeout(timer);
      freezeScroll();
      say('');
      dialog.querySelector('[data-offers-close]').focus({preventScroll: true});
    } catch {
      say('We could not refresh gift offers. Please try again.');
    } finally { busy = false; syncCards(); }
  }
  async function add(card) {
    const id = card.dataset.variantId;
    const state = states.get(id);
    if (!state || busy || leaving || cart.isLocked() || state.status !== 'idle') return;
    if (dirty()) { say('Update your cart quantities before adding extras.'); return; }
    const quantity = card.querySelector('[data-offer-quantity]');
    if (!quantity.reportValidity()) return;
    state.quantity = quantity.value;
    const revision = state.card.dataset.offerRevision;
    busy = true;
    state.status = 'loading'; state.error = '';
    syncCards();
    try {
      const fresh = await cart.read();
      if (leaving || cart.isLocked() || dirty()) return;
      const changed = fresh.dataset.cartFingerprint !== form.dataset.cartFingerprint;
      cart.apply(fresh);
      if (changed || !available.has(id) || available.get(id).dataset.offerRevision !== revision) {
        state.error = 'Your cart or this offer changed. Review it before trying again.';
        say(state.error);
        return;
      }
      const result = await cart.addItems({endpoint: root.dataset.addUrl,
        items: [{id, quantity: Number(state.quantity), properties: {_elma_gift_offer: 'true'}}]});
      if (!result.ok) {
        state.error = result.synced ? 'We could not confirm this addition. Review your cart and try again if it is still available.' :
          'We could not refresh your cart. Use Refresh cart below before trying again.';
        say(state.error);
      } else say('');
    } catch {
      state.error = 'We could not refresh gift offers. Please try again.';
    } finally {
      busy = false;
      if (state.status === 'loading') state.status = 'idle';
      reconcile();
    }
  }
  root.addEventListener('input', event => {
    if (!event.target.matches('[data-offer-quantity]')) return;
    const id = event.target.closest('[data-gift-offer]').dataset.variantId;
    states.get(id).quantity = event.target.value;
    syncCards();
  });
  root.addEventListener('click', event => {
    if (event.target.closest('[data-offers-close]')) dialog.close();
    else if (event.target.closest('[data-offers-open]')) open();
    else if (event.target.closest('[data-offer-add]')) add(event.target.closest('[data-gift-offer]'));
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href]')].filter(el => !el.closest('[hidden]'));
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener('close', () => {
    releaseScroll();
    clearTimeout(timer);
    for (const state of states.values()) if (state.status !== 'loading') state.status = 'idle';
    reconcile();
    const target = opener?.isConnected && opener !== document.body && !opener.disabled ? opener :
      !notice.hidden && !notice.disabled ? notice : form.querySelector('button[name="checkout"]') || document.querySelector('.commerce-cart h1');
    if (target && !target.disabled) { target.setAttribute('tabindex', target.getAttribute('tabindex') || '0'); target.focus({preventScroll: true}); }
  });
  function checkoutStart() { leaving = true; clearTimeout(timer); }
  document.addEventListener('click', event => {
    if (event.target.closest('[name="checkout"], a[href*="/checkout"]')) checkoutStart();
  }, true);
  document.addEventListener('elma:checkout-start', checkoutStart);
  window.addEventListener('pagehide', checkoutStart);
  window.addEventListener('pageshow', event => { if (event.persisted) leaving = false; });
  document.addEventListener('elma:cart-busy', () => { clearTimeout(timer); syncCards(); });
  document.addEventListener('elma:cart-idle', () => { reconcile(); });
  document.addEventListener('elma:cart-updated', event => reconcile(event.detail));
  reconcile();
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    if (root.dataset.autoOpen !== 'false' && visible.length && !seen() && storageAvailable()) {
      timer = setTimeout(() => open(true), (Number(root.dataset.delay) || 5) * 1000);
    }
  }
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once: true});
})();
