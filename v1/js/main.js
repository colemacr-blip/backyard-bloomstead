/* ============================================================
   Backyard Bloomstead — Version 1
   main.js — scroll reveal + mobile nav
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
     Adds class "revealed" to elements with class "reveal"
     ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after first reveal for performance
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------
     MOBILE NAV — hamburger toggle
     ---------------------------------------------------------- */
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const drawer = document.getElementById('nav-drawer');

    if (!hamburger || !drawer) return;

    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close drawer on link click
    const drawerLinks = drawer.querySelectorAll('.nav__link');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close drawer on outside click
    document.addEventListener('click', function (e) {
      if (
        drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------------------------
     EMAIL SIGNUP — prevent default, show feedback
     ---------------------------------------------------------- */
  function initSignupForms() {
    const forms = document.querySelectorAll('.signup__form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('.signup__input');
        const btn = form.querySelector('.btn');
        if (input && input.value.trim()) {
          const original = btn.textContent;
          btn.textContent = 'Thank you!';
          btn.disabled = true;
          input.value = '';
          setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
          }, 3000);
        }
      });
    });
  }

  /* ----------------------------------------------------------
     INIT on DOM ready
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initMobileNav();
    initSignupForms();
  });

})();
