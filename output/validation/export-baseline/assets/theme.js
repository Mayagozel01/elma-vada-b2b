/**
 * ELMA VADA STUDIO — THEME JS
 * Handles: sticky header, mobile menu, solution tabs, scroll animations
 */

(function () {
  'use strict';

  /* ─── STICKY HEADER ──────────────────────────────────────────── */
  const header = document.getElementById('SiteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── MOBILE MENU ────────────────────────────────────────────── */
  const hamburger = document.getElementById('MobileMenuToggle');
  const mobileMenu = document.getElementById('MobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));

      // Animate hamburger lines
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
        spans[1].style.cssText = 'opacity: 0';
        spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => s.removeAttribute('style'));
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(s => s.removeAttribute('style'));
      }
    });
  }

  /* ─── SOLUTION TABS ──────────────────────────────────────────── */
  const tabs = document.querySelectorAll('.solutions__tab');
  const panels = document.querySelectorAll('.solutions__panel');

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');

        // Update tabs
        tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');

        // Update panels
        panels.forEach(p => p.classList.remove('is-active'));
        const target = document.getElementById(targetId);
        if (target) target.classList.add('is-active');
      });
    });
  }

  /* ─── SCROLL REVEAL ANIMATION ────────────────────────────────── */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(
      '.capability-card, .why-us__card, .portfolio__item, .process__step, .industries__tag, .comparison__col'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger the animation for siblings
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ─── VOLUME BAR HEIGHTS ─────────────────────────────────────── */
  // Set heights for volume tier bars based on data-height attribute
  document.querySelectorAll('.volume__tier-bar').forEach((bar) => {
    const h = bar.getAttribute('data-height') || '40';
    bar.style.height = h + 'px';
  });

  /* ─── HERO CAROUSEL ──────────────────────────────────────────── */
  document.querySelectorAll('[data-hero-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-hero-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-hero-dot]'));
    const previous = carousel.querySelector('[data-hero-prev]');
    const next = carousel.querySelector('[data-hero-next]');
    if (slides.length < 2) return;

    let current = 0;
    let timer;
    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', String(active));
      });
    };
    const stop = () => { if (timer) window.clearInterval(timer); };
    const start = () => {
      stop();
      if (carousel.dataset.autoplay === 'true' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = window.setInterval(() => show(current + 1), Number(carousel.dataset.interval) || 6000);
      }
    };
    previous?.addEventListener('click', () => { show(current - 1); start(); });
    next?.addEventListener('click', () => { show(current + 1); start(); });
    dots.forEach((dot) => dot.addEventListener('click', () => { show(Number(dot.dataset.slideIndex)); start(); }));
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    start();
  });

  /* ─── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    });
  });

})();
