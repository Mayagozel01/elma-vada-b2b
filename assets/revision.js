/* Local UI only. No file-storage endpoint, analytics SDK or external service is implied. */
(() => {
  'use strict';
  const controllers = new Map();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Only explicitly opted-in quote CTAs; never delays or hides their content.
  const bulkPulseSelector = '[data-ev-bulk-cta][data-ev-bulk-pulse]';
  const bulkButtons = new Map();
  let bulkObserver;
  let bulkSizeObserver;
  // Scale percentages differ by axis so the ring moves 4px per edge at full expansion.
  function sizeBulkHalo(button, width = button.offsetWidth, height = button.offsetHeight) {
    if (width > 0 && height > 0) {
      button.style.setProperty('--ev-bulk-halo-x', String(8 / width));
      button.style.setProperty('--ev-bulk-halo-y', String(8 / height));
    }
  }
  function resizeBulkHalos() {
    for (const [button] of bulkButtons) sizeBulkHalo(button);
  }
  if (!('ResizeObserver' in window)) {
    window.addEventListener('resize', resizeBulkHalos);
    document.fonts?.ready.then(resizeBulkHalos);
  }
  function syncBulkCtas() {
    const supported = 'IntersectionObserver' in window;
    const disabled = !supported || reduced.matches;
    for (const [button, visible] of bulkButtons) {
      button.classList.toggle('is-bulk-highlight', !disabled);
      const running = !disabled && !document.hidden && visible;
      button.style.setProperty('--ev-bulk-play-state', running ? 'running' : 'paused');
    }
  }
  function mountBulkCtas(scope) {
    if (!('IntersectionObserver' in window)) { syncBulkCtas(); return; }
    const buttons = [...scope.querySelectorAll(bulkPulseSelector)];
    if (scope.matches?.(bulkPulseSelector)) buttons.unshift(scope);
    for (const button of buttons) {
      if (bulkButtons.has(button)) continue;
      if (!bulkObserver) {
        bulkObserver = new IntersectionObserver((entries, observer) => {
          if (bulkObserver !== observer) return;
          for (const entry of entries) {
            const target = entry.target;
            if (!bulkButtons.has(target)) continue;
            bulkButtons.set(target, entry.isIntersecting);
          }
          syncBulkCtas();
        }, {threshold: 0});
      }
      bulkButtons.set(button, false);
      sizeBulkHalo(button);
      if ('ResizeObserver' in window) {
        if (!bulkSizeObserver) {
          bulkSizeObserver = new ResizeObserver((entries, observer) => {
            if (bulkSizeObserver !== observer) return;
            for (const entry of entries) {
              if (!bulkButtons.has(entry.target)) continue;
              const box = entry.borderBoxSize?.[0];
              if (box) sizeBulkHalo(entry.target, box.inlineSize, box.blockSize);
              else sizeBulkHalo(entry.target);
            }
          });
        }
        bulkSizeObserver.observe(button, {box: 'border-box'});
      }
      bulkObserver.observe(button);
    }
    syncBulkCtas();
  }
  function unmountBulkCtas(scope) {
    for (const [button] of bulkButtons) {
      if (scope.contains(button)) {
        bulkObserver?.unobserve(button);
        bulkSizeObserver?.unobserve(button);
        bulkButtons.delete(button);
        button.classList.remove('is-bulk-highlight');
        button.style.removeProperty('--ev-bulk-play-state');
        button.style.removeProperty('--ev-bulk-halo-x');
        button.style.removeProperty('--ev-bulk-halo-y');
      }
    }
    if (!bulkButtons.size) {
      bulkObserver?.disconnect(); bulkObserver = null;
      bulkSizeObserver?.disconnect(); bulkSizeObserver = null;
    }
  }
  document.addEventListener('visibilitychange', syncBulkCtas);
  reduced.addEventListener('change', syncBulkCtas);
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
    const isHomepageHero = root.classList.contains('ev-hero');
    const shouldAutoplayVideo = () => isHomepageHero && !reduced.matches && !window.Shopify?.designMode;
    let paused = root.dataset.autoplay !== 'true' || reduced.matches || !!window.Shopify?.designMode;
    const videos = [...root.querySelectorAll('video')];
    const manuallyPausedVideos = new Set();
    const stop = () => { window.clearTimeout(timer); timer = null; };
    const pauseVideos = () => videos.forEach(video => video.pause());
    const playVideoIfEligible = video => {
      if (!shouldAutoplayVideo() || manuallyPausedVideos.has(video) || video.closest('[data-ev-slide]')?.hidden || !visible || document.hidden || !video.paused) return;
      video.muted = true;
      video.volume = 0;
      video.play().catch(() => {});
    };
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
      if (video) {
        playVideoIfEligible(video);
        return;
      }
      if (slides.length < 2 || paused || reduced.matches || hovered || focused || !visible || document.hidden) return;
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
      video.autoplay = shouldAutoplayVideo() && !slide.hidden;
      if (video.autoplay) video.setAttribute('autoplay', '');
      else video.removeAttribute('autoplay');
      if (isHomepageHero) video.loop = true;
      video.defaultMuted = true;
      silence();
      if (toggle) {
        video.controls = false;
        toggle.hidden = false;
        on(toggle, 'click', async () => {
          if (slide.hidden || document.hidden) return;
          if (!video.paused) { manuallyPausedVideos.add(video); video.pause(); return; }
          manuallyPausedVideos.delete(video);
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
      on(video, 'ended', () => {
        if (shouldAutoplayVideo()) {
          video.currentTime = 0;
          playVideoIfEligible(video);
        }
        syncPlayback();
        start();
      });
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
  function mount(scope) {
    if (scope.matches?.('[data-ev-hero]')) mountHero(scope);
    scope.querySelectorAll('[data-ev-hero]').forEach(mountHero);
    mountBulkCtas(scope);
  }
  mount(document);
  document.addEventListener('shopify:section:load', event => mount(event.target));
  document.addEventListener('shopify:section:unload', event => {
    unmountBulkCtas(event.target);
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
