/* ============================================================
   BACKYARD BLOOMSTEAD — V3  main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Reveal on scroll ──────────────────────────────────── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Mobile nav toggle ─────────────────────────────────── */
  function initNav() {
    var hamburger = document.querySelector('.nav-hamburger');
    var navLinks  = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

      // Animate hamburger lines
      var spans = hamburger.querySelectorAll('span');
      if (open) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });

    // Mark active page
    var path = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href').split('/').pop();
      if (href === path) link.classList.add('active');
    });
  }

  /* ── FAQ accordion ─────────────────────────────────────── */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all
        items.forEach(function (i) { i.classList.remove('open'); });
        // Toggle clicked
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ── Signup form prevent default ──────────────────────── */
  function initSignupForm() {
    var forms = document.querySelectorAll('.signup-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          var btn = form.querySelector('.btn');
          var original = btn ? btn.textContent : '';
          if (btn) {
            btn.textContent = 'Thank you!';
            btn.style.background = 'var(--sage)';
          }
          setTimeout(function () {
            if (btn) {
              btn.textContent = original;
              btn.style.background = '';
            }
            if (input) input.value = '';
          }, 3000);
        }
      });
    });
  }

  /* ── Init on DOMContentLoaded ──────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initNav();
    initFaq();
    initSignupForm();
  });

})();
