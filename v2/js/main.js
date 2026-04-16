/* ============================================================
   Backyard Bloomstead — Version 2
   main.js
   ============================================================ */

/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   Adds 'revealed' class to elements with class 'reveal'
   ============================================================ */
(function () {
  'use strict';

  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve after reveal so it stays visible
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ============================================================
   NAVIGATION — Hamburger Menu Toggle
   ============================================================ */
(function () {
  'use strict';

  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.contains('open');

    if (isOpen) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.classList.add('open');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', function (e) {
    if (
      !hamburger.contains(e.target) &&
      !mobileNav.contains(e.target) &&
      mobileNav.classList.contains('open')
    ) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ============================================================
   ACTIVE NAV LINK — highlight current page
   ============================================================ */
(function () {
  'use strict';

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Desktop nav links
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('#')) {
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    }
  });
})();

/* ============================================================
   EMAIL SIGNUP — basic form handling
   ============================================================ */
(function () {
  'use strict';

  const forms = document.querySelectorAll('.email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('.btn');

      if (!input || !input.value) return;

      // Provide user feedback
      const originalText = btn ? btn.textContent : '';
      if (btn) {
        btn.textContent = 'Thank you!';
        btn.disabled = true;
      }
      input.value = '';

      setTimeout(function () {
        if (btn) {
          btn.textContent = originalText;
          btn.disabled = false;
        }
      }, 3000);
    });
  });
})();

/* ============================================================
   SMOOTH SCROLL — for anchor links
   ============================================================ */
(function () {
  'use strict';

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = 64; // var(--nav-height)
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
})();
