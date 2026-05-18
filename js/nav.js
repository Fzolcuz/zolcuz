// nav.js — navigation, mobile menu, theme toggle, email obfuscation, GDPR consent
// Requires: lenis singleton from lenis-init.js, gsap global

import { lenis } from '/js/motion/lenis-init.js';

export function initNav() {
  initScrollBehaviour();
  initMobileMenu();
  initThemeToggle();
  initEmailObfuscation();
  initConsent();
}

// ─── SCROLL — tint pill after 80px ───────────────────────────────────────────
function initScrollBehaviour() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  // lenis.on('scroll') instead of window.scroll — Lenis owns the scroll loop
  lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('scrolled', scroll > 80);
  });
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────────────
function initMobileMenu() {
  const navToggle  = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!navToggle || !mobileMenu) return;

  function openMobileMenu() {
    lenis.stop(); // prevent scroll behind overlay
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    const links = mobileMenu.querySelectorAll('.mobile-menu__links li');
    gsap.fromTo(links,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );
  }

  function closeMobileMenu() {
    lenis.start(); // resume scroll
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });
}

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zolcuz-theme', next);
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
  });
}

// ─── EMAIL OBFUSCATION ────────────────────────────────────────────────────────
// Never raw mailto: in HTML source — assembled client-side to deter scrapers
function initEmailObfuscation() {
  renderEmail('hello', 'zolcuz', 'com');
}

function renderEmail(user, domain, tld) {
  const email = `${user}@${domain}.${tld}`;
  const links = document.querySelectorAll('[data-email-link]');
  links.forEach(link => {
    link.href        = `mailto:${email}`;
    link.textContent = email;
  });
  // Legacy single-id support
  const single = document.getElementById('contact-email');
  if (single) { single.href = `mailto:${email}`; single.textContent = email; }
}

// ─── GDPR CONSENT ─────────────────────────────────────────────────────────────
// Analytics and non-essential scripts cannot load without consent.
// Turnstile (forms) loads without consent — necessary category.
const CONSENT_KEY = 'zolcuz-consent';

function hasConsent(category) {
  const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}');
  return stored[category] === true;
}

// Exposed on window for HTML onclick handlers in consent-banner
window.grantConsent = function grantConsent(categories) {
  const stored = JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}');
  categories.forEach(c => { stored[c] = true; });
  localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  loadConsentedScripts(categories);
};

function loadConsentedScripts(categories) {
  if (categories.includes('analytics') && hasConsent('analytics')) {
    const s = document.createElement('script');
    s.src = 'https://plausible.io/js/script.js';
    s.setAttribute('data-domain', 'zolcuz.com');
    s.defer = true;
    document.head.appendChild(s);
  }
}

function initConsent() {
  // Show banner if no consent decision recorded yet
  if (!localStorage.getItem(CONSENT_KEY)) {
    const banner = document.getElementById('consent-banner');
    if (banner) banner.style.display = 'flex';
  }
  // On page load, activate already-consented scripts
  loadConsentedScripts(['analytics']);
}
