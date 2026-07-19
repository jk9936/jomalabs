/**
 * Artisan Foundry — theme.js
 * Minimal vanilla JS: nav, cart drawer, reveal animations, form UX
 * No jQuery, no external dependencies
 */

(function () {
  'use strict';

  /* ============================================================
     UTILITIES
     ============================================================ */
  function qs(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }
  function qsa(selector, ctx) {
    return (ctx || document).querySelectorAll(selector);
  }
  function on(el, event, handler, options) {
    if (el) el.addEventListener(event, handler, options || false);
  }

  /* ============================================================
     STICKY HEADER — add class on scroll
     ============================================================ */
  function initStickyHeader() {
    var header = qs('.site-header');
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 16) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  function initMobileMenu() {
    var hamburger = qs('.site-header__hamburger');
    var mobileNav = qs('.site-header__mobile-nav');
    if (!hamburger || !mobileNav) return;

    on(hamburger, 'click', function () {
      var isOpen = mobileNav.classList.contains('open');
      hamburger.classList.toggle('open', !isOpen);
      mobileNav.classList.toggle('open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on nav link click
    qsa('.site-header__mobile-nav .site-header__nav-link').forEach(function (link) {
      on(link, 'click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     CART DRAWER
     ============================================================ */
  function initCartDrawer() {
    var overlay = qs('.cart-overlay');
    var drawer = qs('.cart-drawer');
    var openBtns = qsa('[data-cart-open]');
    var closeBtn = qs('.cart-drawer__close');
    if (!drawer || !overlay) return;

    function openCart() {
      overlay.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      drawer.focus();
      refreshCart();
    }

    function closeCart() {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }

    openBtns.forEach(function (btn) { on(btn, 'click', openCart); });
    on(closeBtn, 'click', closeCart);
    on(overlay, 'click', closeCart);

    // Trap ESC key
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart();
    });

    // Delegate qty buttons
    on(drawer, 'click', function (e) {
      var btn = e.target.closest('[data-cart-qty]');
      if (!btn) return;
      var key = btn.dataset.key;
      var delta = parseInt(btn.dataset.cartQty, 10);
      var qtyEl = btn.closest('.cart-item')
        ? btn.closest('.cart-item').querySelector('.cart-item__qty-value')
        : null;
      if (!qtyEl) return;
      var newQty = Math.max(0, parseInt(qtyEl.textContent, 10) + delta);
      updateCartItem(key, newQty);
    });
  }

  function refreshCart() {
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) { renderCart(cart); })
      .catch(function () { /* silently fail */ });
  }

  function updateCartItem(key, qty) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty }),
    })
      .then(function (r) { return r.json(); })
      .then(function (cart) { renderCart(cart); })
      .catch(function () { /* silently fail */ });
  }

  function renderCart(cart) {
    var itemsWrap = qs('.cart-drawer__items');
    var subtotalValue = qs('.cart-drawer__subtotal-value');
    var countBadge = qs('.cart-count');
    if (!itemsWrap) return;

    // Update count badge
    if (countBadge) {
      var count = cart.item_count || 0;
      countBadge.textContent = count;
      countBadge.classList.toggle('visible', count > 0);
    }

    // Update subtotal
    if (subtotalValue) {
      subtotalValue.textContent = formatMoney(cart.total_price);
    }

    if (!cart.items || cart.items.length === 0) {
      itemsWrap.innerHTML =
        '<p class="cart-drawer__empty">Your cart is empty.</p>';
      return;
    }

    var html = cart.items.map(function (item) {
      return [
        '<div class="cart-item">',
        '  <img class="cart-item__image" src="' + escapeHtml(item.image || '') + '" alt="' + escapeHtml(item.product_title) + '" loading="lazy" width="80" height="80">',
        '  <div>',
        '    <p class="cart-item__title">' + escapeHtml(item.product_title) + '</p>',
        item.variant_title ? '    <p class="cart-item__variant">' + escapeHtml(item.variant_title) + '</p>' : '',
        '    <div class="cart-item__qty">',
        '      <button class="cart-item__qty-btn" data-key="' + escapeHtml(item.key) + '" data-cart-qty="-1" aria-label="Decrease quantity">−</button>',
        '      <span class="cart-item__qty-value">' + item.quantity + '</span>',
        '      <button class="cart-item__qty-btn" data-key="' + escapeHtml(item.key) + '" data-cart-qty="1" aria-label="Increase quantity">+</button>',
        '    </div>',
        '  </div>',
        '  <p class="cart-item__price">' + formatMoney(item.line_price) + '</p>',
        '</div>',
      ].join('');
    });

    itemsWrap.innerHTML = html.join('');
  }

  function formatMoney(cents) {
    var amount = (cents / 100).toFixed(2);
    return window.Shopify && window.Shopify.currency
      ? window.Shopify.currency.active + ' ' + amount
      : '$' + amount;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ============================================================
     ADD TO CART — product page
     ============================================================ */
  function initAddToCart() {
    var form = qs('[data-product-form]');
    if (!form) return;

    on(form, 'submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.add-to-cart-btn');
      var originalText = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Adding…';
      }

      var formData = new FormData(form);
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
        .then(function (r) {
          if (!r.ok) return r.json().then(function (d) { throw new Error(d.description || 'Error'); });
          return r.json();
        })
        .then(function () {
          refreshCart();
          var overlay = qs('.cart-overlay');
          var drawer = qs('.cart-drawer');
          if (overlay && drawer) {
            overlay.classList.add('open');
            drawer.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
          if (btn) { btn.disabled = false; btn.textContent = originalText; }
        })
        .catch(function (err) {
          if (btn) { btn.disabled = false; btn.textContent = originalText; }
          var flash = qs('[data-flash]');
          if (flash) {
            flash.textContent = err.message || 'Something went wrong.';
            flash.className = 'flash flash--error';
          }
        });
    });
  }

  /* ============================================================
     GALLERY CAROUSEL & THUMBNAILS — product page
     ============================================================ */
  function initProductGallery() {
    var slidesContainer = qs('#product-slides-container');
    var thumbs = qsa('.product-gallery__thumb');
    if (!slidesContainer) return;

    var slides = qsa('.product-gallery__slide');
    var prevBtn = qs('[data-nav-prev]');
    var nextBtn = qs('[data-nav-next]');

    // Thumbnail clicks
    thumbs.forEach(function (thumb) {
      on(thumb, 'click', function () {
        var index = parseInt(thumb.dataset.index, 10);
        scrollToSlide(index);
      });
    });

    // Navigation arrows
    if (prevBtn && nextBtn && slides.length) {
      on(prevBtn, 'click', function () {
        var currentIndex = getCurrentSlideIndex();
        var prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        scrollToSlide(prevIndex);
      });

      on(nextBtn, 'click', function () {
        var currentIndex = getCurrentSlideIndex();
        var nextIndex = (currentIndex + 1) % slides.length;
        scrollToSlide(nextIndex);
      });
    }

    // Update thumbs on scroll (debounced/scroll-end detection)
    var isScrolling = null;
    on(slidesContainer, 'scroll', function () {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
        var activeIndex = getCurrentSlideIndex();
        updateActiveThumb(activeIndex);
      }, 50);
    });

    function scrollToSlide(index) {
      var slide = slides[index];
      if (slide) {
        slidesContainer.scrollTo({
          left: slide.offsetLeft,
          behavior: 'smooth'
        });
        updateActiveThumb(index);
      }
    }

    function getCurrentSlideIndex() {
      var scrollLeft = slidesContainer.scrollLeft;
      var containerWidth = slidesContainer.clientWidth;
      if (containerWidth === 0) return 0;
      return Math.round(scrollLeft / containerWidth);
    }

    function updateActiveThumb(index) {
      thumbs.forEach(function (t) {
        t.classList.toggle('active', parseInt(t.dataset.index, 10) === index);
      });
    }
  }

  /* ============================================================
     PREORDER FORM — contact form submission
     ============================================================ */
  function initPreorderForm() {
    var form = qs('[data-preorder-form]');
    if (!form) return;

    on(form, 'submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
        .then(function (r) {
          if (!r.ok) throw new Error('Network error');
          return r.text();
        })
        .then(function () {
          form.style.display = 'none';
          var success = qs('.preorder__success');
          if (success) success.style.display = 'block';
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = 'Seal the Request'; }
          var flash = qs('[data-preorder-flash]');
          if (flash) {
            flash.textContent = 'Something went wrong. Please try again.';
            flash.className = 'flash flash--error';
          }
        });
    });
  }

  /* ============================================================
     REVEAL ANIMATIONS — IntersectionObserver
     ============================================================ */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var els = qsa('.reveal');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    initStickyHeader();
    initMobileMenu();
    initCartDrawer();
    initAddToCart();
    initProductGallery();
    initPreorderForm();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
