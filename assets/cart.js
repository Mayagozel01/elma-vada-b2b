/* Cart mutations use Shopify's locale-aware Ajax API; checkout stays native. */
(() => {
  'use strict';
  if (window.elmaCartMounted) return;
  window.elmaCartMounted = true;

  let locked = false;
  let countRequest;
  const cartForm = () => document.querySelector('[data-cart-form]');
  const cartLink = () => document.querySelector('[data-header-cart]');

  function updateCount(count) {
    if (!Number.isInteger(count) || count < 0) return;
    document.querySelectorAll('[data-header-cart]').forEach(link => {
      link.querySelector('[data-cart-count]').textContent = String(count);
      link.setAttribute('aria-label', 'Cart, ' + count + (count === 1 ? ' item' : ' items'));
    });
    document.dispatchEvent(new CustomEvent('elma:cart-updated'));
  }

  async function refreshCount() {
    const link = cartLink();
    if (!link || locked || countRequest) return;
    countRequest = new AbortController();
    const timeout = setTimeout(() => countRequest?.abort(), 15000);
    try {
      const response = await fetch(link.dataset.cartJsonUrl, {
        credentials: 'same-origin', cache: 'no-store', redirect: 'error',
        headers: {Accept: 'application/json'}, signal: countRequest.signal
      });
      if (!response.ok) return;
      const cart = await response.json();
      if (!locked) updateCount(cart.item_count);
    } catch {
      // Retain the last confirmed count; never replace a failed read with zero.
    } finally {
      clearTimeout(timeout);
      countRequest = null;
    }
  }

  function lockForm(form) {
    locked = true;
    countRequest?.abort();
    form.setAttribute('aria-busy', 'true');
    form.querySelectorAll('input, button').forEach(control => { control.disabled = true; });
    form.querySelectorAll('[data-cart-remove]').forEach(link => link.setAttribute('aria-disabled', 'true'));
  }

  async function mutate(form, endpoint, payload) {
    if (locked) return;
    lockForm(form);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const message = form.querySelector('[data-cart-message]');
    message.hidden = true;
    try {
      // Send quantities only. Sending properties here would overwrite personalization.
      const response = await fetch(endpoint, {
        method: 'POST', credentials: 'same-origin', redirect: 'error',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        body: JSON.stringify(payload), signal: controller.signal
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const cart = await response.json();
      if (!Array.isArray(cart.items) || !Number.isInteger(cart.item_count) || cart.item_count < 0) {
        throw new Error('Invalid response');
      }
      updateCount(cart.item_count);
      // Server-render prices, discounts, quantities and properties with a fresh GET.
      // Reload/Back cannot replay this mutation as a document POST.
      window.location.replace(form.action);
    } catch (error) {
      const status = /^HTTP \d+$/.test(error.message) ? ' (' + error.message + ')' : '';
      form.querySelector('[data-cart-error-text]').textContent =
        'We could not confirm the cart update' + status + '. Your cart may have changed. Reload the cart before trying again.';
      message.hidden = false;
      message.focus();
      // Keep mutations/checkout locked until the shopper explicitly reloads with GET.
      // A timeout or failed response does not prove the server rejected the change.
    } finally {
      clearTimeout(timeout);
      form.removeAttribute('aria-busy');
    }
  }

  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('[data-cart-form]')) return;
    if (locked) { event.preventDefault(); return; }
    if (event.submitter?.name === 'checkout') {
      // Shopify's documented POST /cart with name=checkout also saves unsaved quantities.
      // Do not disable successful controls or reconstruct this request in JavaScript.
      locked = true;
      return;
    }
    event.preventDefault();
    if (!form.reportValidity()) return;
    const updates = Object.create(null);
    form.querySelectorAll('[data-cart-quantity]').forEach(input => {
      if (Number(input.value) !== Number(input.dataset.initialQuantity)) {
        updates[input.dataset.lineKey] = Number(input.value);
      }
    });
    if (!Object.keys(updates).length) {
      window.location.replace(form.action);
      return;
    }
    mutate(form, form.dataset.cartUpdateUrl, {updates});
  });

  document.addEventListener('click', event => {
    const remove = event.target.closest('[data-cart-remove]');
    if (!remove) return;
    const form = remove.closest('[data-cart-form]');
    if (!form) return;
    event.preventDefault();
    if (!locked) mutate(form, form.dataset.cartChangeUrl, {id: remove.dataset.lineKey, quantity: 0});
  });

  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    const form = cartForm();
    if (form) window.location.replace(form.action);
    else refreshCount();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshCount();
  });
  document.addEventListener('shopify:section:load', refreshCount);
})();
