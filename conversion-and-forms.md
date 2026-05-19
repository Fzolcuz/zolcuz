---
name: conversion-and-forms
description: CTA hierarchy, form HTML/CSS, iOS zoom fix, Turnstile spam protection, JustValidate, and serverless endpoint. All forms POST to /api/submit. See ui-chrome-compliance.md for the serverless handler code.
---
# Conversion and Forms

## CTA Hierarchy
One primary CTA per viewport. Four placements: hero, after niches, after stats, footer.
Primary always: "Request Your Concept Sprint"
Micro-copy below every CTA (12px, var(--text-2)): "48-hour concept sprint — No long-term contract"

## iOS Input Zoom Fix — Non-Negotiable
iOS Safari auto-zooms when any input is below 16px font-size. This breaks the entire scroll experience.
```css
/* Apply to ALL inputs, selects, textareas — no exceptions */
input, select, textarea, .form-input {
  font-size: 16px !important;
}
```

## Form Styling
```css
.form-input {
  height: 52px;
  border-radius: 14px;
  border: 1px solid var(--border-subtle);
  background: var(--surface-0);
  color: var(--text-0);
  font-family: var(--font-body);
  font-size: 16px; /* iOS zoom fix — never below 16px */
  padding: 0 16px;
  width: 100%;
  transition: border-color 200ms, box-shadow 200ms;
}
.form-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
  outline: none;
}
.form-label {
  font-size: 12px; font-weight: 600;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-1); margin-bottom: 8px; display: block;
}
.form-group { display: flex; flex-direction: column; margin-bottom: 20px; }
```

## Complete Form HTML
```html
<form id="contact-form" class="contact-form" novalidate>
  <div class="form-group">
    <label class="form-label" for="name">Your Name</label>
    <input class="form-input" type="text" id="name" name="name"
      autocomplete="name" minlength="2" required>
  </div>
  <div class="form-group">
    <label class="form-label" for="email">Business Email</label>
    <input class="form-input" type="email" id="email" name="email"
      autocomplete="email" required>
  </div>
  <div class="form-group">
    <label class="form-label" for="company">Company Name</label>
    <input class="form-input" type="text" id="company" name="company" required>
  </div>
  <div class="form-group">
    <label class="form-label" for="investment">Investment Range</label>
    <select class="form-input" id="investment" name="investment">
      <option value="">Select range</option>
      <option value="1500">$1,500 — Showroom Landing Page</option>
      <option value="2800">$2,800 — Premium Showroom Site</option>
      <option value="custom">Custom project</option>
    </select>
  </div>
  <!-- Turnstile — loads as 'necessary', no consent required -->
  <div class="cf-turnstile" data-sitekey="YOUR_TURNSTILE_SITE_KEY" data-theme="dark"></div>
  <button type="submit" class="button-primary" id="form-submit-btn">
    Request Your Concept Sprint
  </button>
  <span class="form-label" style="display:block;margin-top:8px;text-align:center;color:var(--text-2)">
    48-hour concept sprint — No long-term contract
  </span>
</form>
```

## Cloudflare Turnstile
```html
<!-- In head — Turnstile is 'necessary' category, loads without consent -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```
Get site key free at: https://dash.cloudflare.com → Turnstile

## JustValidate
```html
<script src="https://cdn.jsdelivr.net/npm/just-validate@4.3.0/dist/just-validate.production.min.js"></script>
```
```javascript
const validator = new JustValidate('#contact-form', {
  errorFieldCssClass: 'form-input--error',
  errorLabelStyle: { color: '#9F1239', fontSize: '12px', marginTop: '4px' }
});
validator
  .addField('#name',    [{ rule: 'required' }, { rule: 'minLength', value: 2 }])
  .addField('#email',   [{ rule: 'required' }, { rule: 'email' }])
  .addField('#company', [{ rule: 'required' }])
  .onSuccess((e) => { e.preventDefault(); submitForm(new FormData(e.target)); });
```

## Form Submission — POST to /api/submit
See ui-chrome-compliance.md for the Vercel serverless handler at /api/submit.js.
```javascript
async function submitForm(formData) {
  const btn = document.getElementById('form-submit-btn');
  btn.textContent = 'Requesting...';
  btn.disabled = true;

  const coldStart = setTimeout(() => { btn.textContent = 'Waking secure server...'; }, 2000);

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    clearTimeout(coldStart);
    if (res.ok) {
      btn.textContent = 'Sent — we will be in touch within 24 hours';
      document.getElementById('contact-form').reset();
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  } catch {
    clearTimeout(coldStart);
    btn.textContent = 'Connection error — try again';
    btn.disabled = false;
  }
}
```

## Pricing Display Rules
Single-column editorial. Never 3-column SaaS grid.
$249 small and understated | $1,500 medium | $2,800 most prominent with teal accent on assembly bullet
Outcome bullets not feature lists. "Investment" not "Price."

## Testimonials (when real clients exist)
One at a time. LinkedIn-verified. 120px Cormorant quote mark in teal.
