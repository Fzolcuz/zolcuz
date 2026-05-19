---
name: ui-chrome-compliance
description: Navigation, mobile menu, theme toggle, GDPR consent banner, SEO meta, email obfuscation, iOS zoom fix, form serverless endpoint, and all legal compliance. Owns global UI and legal layer.
---
# Global Chrome and Compliance

## Navigation HTML
```html
<nav class="nav" id="nav" role="navigation" aria-label="Main navigation">
  <div class="nav__pill">
    <a href="#hero" class="nav__logo">ZOLCUZ</a>
    <ul class="nav__links" role="list">
      <li><a href="#niches">Work</a></li>
      <li><a href="#niches">Niches</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="#packages">Pricing</a></li>
    </ul>
    <div class="nav__right">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark theme">
        <span class="theme-toggle__knob"></span>
      </button>
      <a href="#packages" class="nav__cta button-primary">Book a Call</a>
      <button class="nav__toggle" id="nav-toggle"
        aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span class="nav__toggle-bar"></span>
        <span class="nav__toggle-bar"></span>
      </button>
    </div>
  </div>
</nav>

<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <ul class="mobile-menu__links" role="list">
    <li><a href="#niches">Work</a></li>
    <li><a href="#niches">Niches</a></li>
    <li><a href="#process">Process</a></li>
    <li><a href="#packages">Pricing</a></li>
  </ul>
  <a href="#packages" class="mobile-menu__cta button-primary">Book a Call</a>
</div>

<a href="#packages" class="mobile-cta-sticky button-primary" aria-label="Book a consultation">Book a Call</a>
```

## Navigation CSS
```css
.nav {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: var(--z-nav);
  padding: 24px 24px 0;
  pointer-events: none;
}
.nav__pill {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; gap: 32px;
  background: rgba(11,11,12,0.4);
  border: 1px solid transparent; border-radius: 100px; height: 56px;
  pointer-events: auto;
  transition: background 300ms ease, border-color 300ms ease;
}
.nav.scrolled .nav__pill {
  background: rgba(11,11,12,0.85);
  border-color: var(--border-subtle);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
}
.nav__logo {
  font-family: var(--font-display); font-size: 18px; font-weight: 600;
  color: var(--text-0); letter-spacing: 0.08em;
}
.nav__links { display: flex; gap: 32px; margin: 0 auto; padding: 0; }
.nav__links a {
  font-family: var(--font-body); font-size: 14px; font-weight: 500;
  color: var(--text-1); transition: color 200ms;
}
@media (hover: hover) and (pointer: fine) {
  .nav__links a:hover { color: var(--text-0); }
}
.nav__right { display: flex; align-items: center; gap: 16px; margin-left: auto; }
.nav__cta { font-size: 14px; padding: 10px 20px; min-height: 40px; }
.nav__toggle {
  display: none; flex-direction: column; gap: 5px;
  padding: 8px; min-width: 44px; min-height: 44px;
  align-items: center; justify-content: center;
}
.nav__toggle-bar {
  display: block; width: 22px; height: 2px;
  background: var(--text-0);
  transition: transform 300ms, opacity 300ms;
}
.nav__toggle[aria-expanded="true"] .nav__toggle-bar:first-child {
  transform: translateY(7px) rotate(45deg);
}
.nav__toggle[aria-expanded="true"] .nav__toggle-bar:last-child {
  transform: translateY(-7px) rotate(-45deg);
}
@media (max-width: 768px) {
  .nav__links, .nav__cta { display: none; }
  .nav__toggle { display: flex; }
}
.mobile-menu {
  position: fixed; inset: 0;
  background: rgba(11,11,12,0.95);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  z-index: var(--z-mobile-menu);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px;
  opacity: 0; pointer-events: none; visibility: hidden;
  transition: opacity 300ms ease, visibility 300ms ease;
}
.mobile-menu.open { opacity: 1; pointer-events: auto; visibility: visible; }
.mobile-menu__links { text-align: center; display: flex; flex-direction: column; gap: 8px; }
.mobile-menu__links a {
  font-family: var(--font-display); font-size: 40px; font-weight: 600;
  color: var(--text-0); display: block; padding: 8px 0;
}
.mobile-cta-sticky {
  position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
  z-index: var(--z-mobile-cta); display: none; white-space: nowrap;
}
@media (max-width: 768px) { .mobile-cta-sticky { display: block; } }
.theme-toggle {
  width: 44px; height: 24px; background: var(--border-strong);
  border-radius: 100px; position: relative; transition: background 300ms;
  min-width: 44px;
}
.theme-toggle__knob {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
  background: var(--accent); border-radius: 50%;
  transition: transform 300ms cubic-bezier(0.4,0,0.2,1);
}
[data-theme="light"] .theme-toggle__knob { transform: translateX(20px); }
```

## Navigation JavaScript — Lenis Stop/Start on Menu
```javascript
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Use lenis.on('scroll') instead of window.scroll — Lenis owns the scroll loop
// lenis is initialized in app.js / lenis-init.js before this runs
lenis.on('scroll', ({ scroll }) => {
  nav.classList.toggle('scrolled', scroll > 80);
});

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
```

## Email Obfuscation — Never Raw mailto:
```javascript
// Place this where email links need to appear
// Prevents scraper bots from harvesting client email addresses
function renderEmail(user, domain, tld) {
  const email = `${user}@${domain}.${tld}`;
  const link = document.getElementById('contact-email');
  if (link) {
    link.href = `mailto:${email}`;
    link.textContent = email;
  }
}
// Usage: renderEmail('hello', 'zolcuz', 'com')
// In HTML use: <a id="contact-email" href="#">Contact</a>
```

## GDPR Consent — Scripts Cannot Load Before Consent
```javascript
// Consent categories:
// 'necessary'  — Turnstile (form protection) — legitimate interest, no consent needed
// 'analytics'  — Plausible/Vercel analytics — requires consent
// 'marketing'  — any marketing pixels — requires consent

// Simple consent banner implementation
const consentKey = 'zolcuz-consent';

function hasConsent(category) {
  const stored = JSON.parse(localStorage.getItem(consentKey) || '{}');
  return stored[category] === true;
}

function grantConsent(categories) {
  const stored = JSON.parse(localStorage.getItem(consentKey) || '{}');
  categories.forEach(c => stored[c] = true);
  localStorage.setItem(consentKey, JSON.stringify(stored));
  loadConsentedScripts(categories);
}

function loadConsentedScripts(categories) {
  if (categories.includes('analytics') && hasConsent('analytics')) {
    // Load Plausible or Vercel Analytics here
    const s = document.createElement('script');
    s.src = 'https://plausible.io/js/script.js';
    s.setAttribute('data-domain', 'zolcuz.com');
    s.defer = true;
    document.head.appendChild(s);
  }
}

// Show banner if no consent recorded yet
if (!localStorage.getItem(consentKey)) {
  document.getElementById('consent-banner')?.style.setProperty('display', 'flex');
}
// On page load, load already-consented scripts
loadConsentedScripts(['analytics']);
```

## Form — POST to Vercel Serverless Function
All forms must POST to /api/submit — never directly to third-party services.
This keeps API keys server-side and is required for GDPR compliance.

```javascript
// /api/submit.js — Vercel serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, company, investment, 'cf-turnstile-response': token } = req.body;

  // Verify Cloudflare Turnstile
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET, response: token })
  });
  const { success } = await verify.json();
  if (!success) return res.status(400).json({ error: 'Turnstile verification failed' });

  // Send email via Resend
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'ZOLCUZ Studios <hello@zolcuz.com>',
      to: process.env.CONTACT_EMAIL,
      subject: `New lead: ${company}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Company: ${company}</p><p>Investment: ${investment}</p>`
    })
  });

  return res.status(200).json({ success: true });
}
```

Client-side form submission with cold-start UX:
```javascript
async function submitForm(formData) {
  const btn = document.querySelector('#contact-form button[type="submit"]');
  btn.textContent = 'Requesting...';

  // Cold-start UX — if serverless takes > 2s show updated message
  const coldStartTimer = setTimeout(() => {
    btn.textContent = 'Waking secure server...';
  }, 2000);

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    clearTimeout(coldStartTimer);
    if (res.ok) {
      btn.textContent = 'Sent — we will be in touch';
      // Show success state
    } else {
      btn.textContent = 'Something went wrong — try again';
    }
  } catch (err) {
    clearTimeout(coldStartTimer);
    btn.textContent = 'Connection error — try again';
  }
}
```

## iOS Input Zoom Fix — Required on ALL inputs
iOS Safari auto-zooms when input font-size is below 16px. Breaks scroll experience.
```css
/* REQUIRED on every input, select, textarea */
input, select, textarea {
  font-size: 16px !important; /* iOS zoom fix — never below 16px */
}
```

## SEO Meta Baseline — Required on Every Page
```html
<!-- Required on every page — no exceptions -->
<meta name="description" content="[150-160 characters exactly — includes niche and location keywords]">
<link rel="canonical" href="[full URL of this page]">
```

## Schema — Agency Site
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ZOLCUZ Studios",
  "description": "Premium animated web design for luxury home improvement brands",
  "url": "https://zolcuz.com",
  "serviceType": "Web Design",
  "areaServed": ["US", "GB"]
}
</script>
```

## Schema — Niche Demo Sites (both types required)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Client Name]",
  "url": "[site URL]",
  "@id": "[site URL]",
  "telephone": "[phone]",
  "address": { "@type": "PostalAddress", "addressLocality": "[city]", "addressCountry": "[US or GB]" },
  "priceRange": "$$$"
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "[Demo Name]",
  "creator": { "@type": "Organization", "name": "ZOLCUZ Studios" }
}
</script>
```

## Z-index Reference
Nav: var(--z-nav)=100 | Mobile menu: var(--z-mobile-menu)=200 | Mobile CTA: 150
Canvas: var(--z-canvas)=1 | Reveal: var(--z-reveal)=20 | Loader: var(--z-loader)=9999
