/* ══════════════════════════════════════════════════════════
   MISTI BAKERY & CAFE — script.js
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ─── DOM Ready ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Loader ──────────────────────────────────── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger initial reveals after load
      checkReveal();
    }, 900);
  });

  /* ── Navbar scroll + active link ─────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    const scrolled = window.scrollY > 60;
    navbar.classList.toggle('scrolled', scrolled);
  }

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
    checkReveal();
    toggleBackTop();
  }, { passive: true });

  updateNavbar();
  updateActiveLink();

  /* ── Hamburger menu ──────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    }
  });

  /* ── Order Now Popup ─────────────────────────── */
  const orderOverlay = document.getElementById('orderOverlay');
  const orderNowBtn  = document.getElementById('orderNowBtn');
  const popupClose   = document.getElementById('popupClose');

  function openOrderPopup() {
    orderOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeOrderPopup() {
    orderOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  orderNowBtn.addEventListener('click', openOrderPopup);
  popupClose.addEventListener('click', closeOrderPopup);

  // Close on overlay background click
  orderOverlay.addEventListener('click', (e) => {
    if (e.target === orderOverlay) closeOrderPopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOrderPopup();
  });

  /* ── Scroll Reveal ───────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  function checkReveal() {
    const winH = window.innerHeight;
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < winH - 80) {
        el.classList.add('visible');
      }
    });
  }

  // IntersectionObserver for better performance
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  }
  checkReveal();

  /* ── Menu Category Filter Tabs ───────────────── */
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const menuCats   = document.querySelectorAll('.menu-category');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;

      // Update active tab
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide categories
      menuCats.forEach(section => {
        const sectionCat = section.dataset.cat;
        if (cat === 'all' || cat === sectionCat) {
          section.style.display = '';
          section.style.animation = 'fadeSlideIn 0.4s ease forwards';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  /* ── Back to Top Button ──────────────────────── */
  const backTop = document.getElementById('backTop');

  function toggleBackTop() {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleBackTop();

  /* ── Smooth Scroll for Anchor Links ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return; // Let popup links be
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ── Menu Card hover micro-interaction ───────── */
  const menuCards = document.querySelectorAll('.menu-card');
  menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform, box-shadow';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = '';
    });
  });

  /* ── Gallery hover zoom ──────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-placeholder');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.willChange = 'transform';
    });
    item.addEventListener('mouseleave', () => {
      item.style.willChange = '';
    });
  });

  /* ── Staggered menu card reveals ─────────────── */
  // Add staggered delays to menu cards within same grid
  document.querySelectorAll('.menu-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.menu-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${(i % 6) * 0.06}s`;
    });
  });

  console.log('☕ Misti Bakery & Cafe — Ready to serve!');
});

/* ─── CSS Animation injection ──────────────── */
const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule(`
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `, styleSheet.cssRules.length);
} catch(e) {
  // Ignore cross-origin errors
}