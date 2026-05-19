---
name: section-footer
description: Use only when building the Footer section. Always dark mode, even on light pages.
---
# Footer Section

## RULE: Always Dark Mode
Footer background is ALWAYS var(--bg-0) = #030712, even when the rest of the site is in light mode. This is non-negotiable.

## HTML
```html
<footer class="footer" id="footer">
  <div class="footer__inner">
    <h2 class="footer__headline">Ready to Build<br>Something Premium?</h2>
    <form class="footer__form" id="footer-form" novalidate>
      <div class="footer__form-row">
        <input class="form-input footer__email-input" type="email" id="footer-email"
          name="email" placeholder="your@company.com" autocomplete="email" required>
        <button type="submit" class="button-primary footer__cta">Request Your Concept Sprint</button>
      </div>
      <div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY" data-theme="dark"></div>
    </form>
    <p class="footer__micro">48-hour concept sprint — No long-term contract — Limited builds per quarter</p>

    <div class="footer__badges">
      <span class="footer__badge">Built on Vercel</span>
      <span class="footer__badge">Powered by GSAP</span>
      <span class="footer__badge">3D via Three.js</span>
      <span class="footer__badge">CMS by Sanity</span>
    </div>

    <div class="footer__meta">
      <hr class="footer__divider">
      <div class="footer__meta-row">
        <p class="footer__copyright">© 2025 ZOLCUZ Studios. All rights reserved.</p>
        <nav class="footer__links" aria-label="Footer navigation">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a id="footer-linkedin" href="#">LinkedIn</a>
        </nav>
      </div>
    </div>
  </div>
</footer>
```

## CSS
```css
.footer {
  background: var(--bg-0); /* ALWAYS dark — never changes */
  padding: var(--space-14) 0 var(--space-8);
  position: relative;
}
.footer .section-grain::after { background-color: transparent; }
.footer__inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.footer__headline {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 600; line-height: 1.0;
  color: #F5F1E8; /* hardcoded — footer is always dark */
  margin-bottom: 40px;
}
.footer__form { margin-bottom: 16px; }
.footer__form-row {
  display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;
}
.footer__email-input {
  flex: 1; min-width: 260px;
  /* Override for dark footer */
  background: #111113; border-color: #24242A; color: #F5F1E8;
}
.footer__cta { flex-shrink: 0; }
.footer__micro { font-size: 12px; color: #A7A195; font-family: var(--font-body); margin-top: 12px; }
.footer__badges {
  display: flex; flex-wrap: wrap; gap: 12px; margin-top: 48px; margin-bottom: 40px;
}
.footer__badge {
  font-family: var(--font-body); font-size: 12px; font-weight: 500;
  color: #A7A195; border: 1px solid #24242A;
  padding: 6px 14px; border-radius: 100px;
}
.footer__divider { border: none; border-top: 1px solid #1B1B20; margin-bottom: 24px; }
.footer__meta-row {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
}
.footer__copyright { font-size: 13px; color: #636366; font-family: var(--font-body); }
.footer__links { display: flex; gap: 24px; }
.footer__links a { font-size: 13px; color: #636366; font-family: var(--font-body); }
@media (hover: hover) and (pointer: fine) {
  .footer__links a:hover { color: #A7A195; }
}
@media (max-width: 600px) {
  .footer__form-row { flex-direction: column; }
  .footer__cta { width: 100%; }
}
```

## JavaScript — LinkedIn obfuscation
```javascript
// Obfuscate LinkedIn URL to prevent scraping
document.getElementById('footer-linkedin').href = 
  'https://linkedin.com/company/' + 'zolcuz' + '-studios';
```

## Exit Check
Background is var(--bg-0) always? Email input at 16px font-size? Turnstile present? LinkedIn link obfuscated? Dark styling applied even in light mode? Mobile form stacks vertically?

## Footer Form JavaScript — Required
The footer form collects email only. Validate and submit to /api/submit.
```javascript
(function initFooterForm() {
  const form = document.getElementById('footer-form');
  const input = document.getElementById('footer-email');
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = 'var(--accent-crimson)';
      input.focus();
      return;
    }
    input.style.borderColor = '';

    btn.textContent = 'Requesting...';
    btn.disabled = true;

    const coldStart = setTimeout(() => { btn.textContent = 'Waking secure server...'; }, 2000);

    try {
      // Get Turnstile token if widget present
      const turnstileToken = window.turnstile?.getResponse() ?? '';

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer', 'cf-turnstile-response': turnstileToken })
      });
      clearTimeout(coldStart);
      if (res.ok) {
        btn.textContent = 'Sent — we will be in touch within 24 hours';
        form.reset();
      } else {
        btn.textContent = 'Something went wrong — try again';
        btn.disabled = false;
      }
    } catch {
      clearTimeout(coldStart);
      btn.textContent = 'Connection error — try again';
      btn.disabled = false;
    }
  });
})();
```

Also obfuscate the LinkedIn URL on page load:
```javascript
document.getElementById('footer-linkedin').href =
  'https://linkedin.com/company/' + 'zolcuz' + '-studios';
```

## Copyright year
Use JavaScript to keep the copyright year current:
```javascript
document.querySelector('.footer__copyright').textContent =
  `© ${new Date().getFullYear()} ZOLCUZ Studios. All rights reserved.`;
```
