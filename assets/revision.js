/* Local UI only. No file-storage endpoint, analytics SDK or external service is implied. */
(() => {
  'use strict';
  const controllers = new Map();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  function mountHero(root) {
    if (controllers.has(root)) return;
    const slides = [...root.querySelectorAll('[data-ev-slide]')];
    if (!slides.length) return;
    const abort = new AbortController();
    const on = (el, type, fn) => el?.addEventListener(type, fn, {signal: abort.signal});
    const controls = root.querySelector('[data-ev-controls]');
    const pauseButton = root.querySelector('[data-ev-pause]');
    const status = root.querySelector('[data-ev-status]');
    let current = 0, timer = null, hovered = false, focused = false, visible = true;
    let paused = root.dataset.autoplay !== 'true' || reduced.matches || !!window.Shopify?.designMode;
    const videos = [...root.querySelectorAll('video')];
    const stop = () => { window.clearTimeout(timer); timer = null; };
    const pauseVideos = () => videos.forEach(video => video.pause());
    const updateControl = () => {
      if (!pauseButton) return;
      pauseButton.setAttribute('aria-pressed', String(paused || reduced.matches));
      pauseButton.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Play slideshow' : 'Pause slideshow';
      pauseButton.disabled = reduced.matches;
      pauseButton.hidden = root.dataset.autoplay !== 'true';
    };
    function start() {
      stop();
      updateControl();
      const video = slides[current].querySelector('video');
      // A video cover stays in place until the visitor chooses Play or another slide.
      if (slides.length < 2 || video || paused || reduced.matches || hovered || focused || !visible || document.hidden) return;
      timer = window.setTimeout(() => show(current + 1), Number(root.dataset.interval) || 6000);
    }
    function show(index) {
      stop();
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.hidden = !active;
        slide.inert = !active;
        if (!active) slide.querySelector('video')?.pause();
      });
      if (status) status.textContent = (current + 1) + ' / ' + slides.length;
      start();
    }
    if (controls) controls.hidden = slides.length < 2;
    on(root.querySelector('[data-ev-prev]'), 'click', () => show(current - 1));
    on(root.querySelector('[data-ev-next]'), 'click', () => show(current + 1));
    on(pauseButton, 'click', () => { paused = !paused; start(); });
    on(root, 'mouseenter', () => { hovered = true; stop(); });
    on(root, 'mouseleave', () => { hovered = false; start(); });
    on(root, 'focusin', () => { focused = true; stop(); });
    on(root, 'focusout', event => { focused = root.contains(event.relatedTarget); start(); });
    on(document, 'visibilitychange', () => { if (document.hidden) { stop(); pauseVideos(); } else start(); });
    on(reduced, 'change', () => { if (reduced.matches) { paused = true; pauseVideos(); } start(); });
    for (const video of videos) {
      const slide = video.closest('[data-ev-slide]');
      const toggle = slide.querySelector('[data-ev-video-toggle]');
      const message = slide.querySelector('[data-ev-video-message]');
      const silence = () => {
        if (!video.muted) video.muted = true;
        if (video.volume !== 0) video.volume = 0;
      };
      const syncPlayback = () => {
        const playing = !video.paused && !video.ended;
        slide.classList.toggle('is-playing', playing);
        toggle?.setAttribute('aria-pressed', String(playing));
        toggle?.setAttribute('aria-label', playing ? 'Pause video' : 'Play video without sound');
      };
      const showError = () => {
        if (message) {
          message.textContent = 'The video could not be played. Please try again.';
          message.hidden = false;
        }
        syncPlayback();
      };
      video.autoplay = false;
      video.removeAttribute('autoplay');
      video.defaultMuted = true;
      silence();
      if (toggle) {
        video.controls = false;
        toggle.hidden = false;
        on(toggle, 'click', async () => {
          if (slide.hidden || document.hidden) return;
          if (!video.paused) { video.pause(); return; }
          if (message) message.hidden = true;
          silence();
          try { await video.play(); } catch { showError(); }
        });
      }
      on(video, 'volumechange', silence);
      on(video, 'play', () => {
        silence();
        if (slide.hidden || document.hidden) video.pause();
        else stop();
        syncPlayback();
      });
      on(video, 'pause', () => { syncPlayback(); start(); });
      on(video, 'ended', () => { syncPlayback(); start(); });
      on(video, 'error', () => { stop(); showError(); });
      syncPlayback();
    }
    on(document, 'shopify:block:select', event => {
      const index = slides.findIndex(slide => slide.dataset.blockId === event.detail?.blockId);
      if (index < 0) return;
      paused = true; show(index);
    });
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (!visible) { stop(); pauseVideos(); } else start();
      });
      observer.observe(root);
    }
    show(0);
    controllers.set(root, () => { stop(); abort.abort(); observer?.disconnect(); pauseVideos(); });
  }
  const requestTypes = {'mockup':'Free mockup','sample':'Physical sample','consultation':'Consultation','in-person':'In-person consultation','audit':'Gifting calendar audit','quote':'Quote'};
  function mountForms(scope) {
    scope.querySelectorAll('.b2b-form').forEach(form => {
      if (form.dataset.revisionReady) return;
      form.dataset.revisionReady = 'true';
      const success = form.querySelector('[role="status"]');
      const error = form.querySelector('[role="alert"]');
      const requested = requestTypes[new URLSearchParams(location.search).get('request')];
      const select = form.querySelector('[data-request-type]');
      if (select && requested && !success && !error) select.value = requested;
      if (success || error) (success || error).focus();
      // Only the native form's confirmed response emits success, never a Submit click.
      // Consumers must handle analytics consent and deduplication themselves.
      if (success) document.dispatchEvent(new CustomEvent('elma:lead-success', {detail:{formId:form.id || 'native-contact'}}));
    });
  }
  function mount(scope) {
    if (scope.matches?.('[data-ev-hero]')) mountHero(scope);
    scope.querySelectorAll('[data-ev-hero]').forEach(mountHero);
    mountForms(scope);
  }
  mount(document);
  document.addEventListener('shopify:section:load', event => mount(event.target));
  document.addEventListener('shopify:section:unload', event => {
    for (const [root, destroy] of controllers) if (event.target.contains(root)) { destroy(); controllers.delete(root); }
  });
  // Close the existing mobile menu with Escape and return focus to its toggle.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const menu = document.getElementById('MobileMenu'), toggle = document.getElementById('MobileMenuToggle');
    if (menu?.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.querySelectorAll('span').forEach(span => span.removeAttribute('style'));
      toggle?.focus();
    }
  });
})();
