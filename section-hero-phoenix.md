---
name: section-hero-phoenix
description: Use only when building the hero section that is revealed after the supernova transition. The hero IS the Three.js phoenix. Read sys-threejs-phoenix.md and threejs-scene-setup.md before this.
---
# Hero Section — Phoenix

## What the hero is
After the loader supernova fades, the hero section is revealed. The Three.js phoenix occupies the full viewport. Hero text is minimal, overlaid bottom-left.

## IMPORTANT: The canvas is position:fixed — this is intentional
The Three.js canvas must be `position: fixed` so the phoenix stays visible as the user scrolls through niche sections below the hero. The phoenix scroll travel depends on this. Do NOT change the canvas position. The canvas is owned by threejs-scene-setup.md. Do not redeclare its position here.

## Selectors this file owns
.hero-section, .hero-section__overlay, .hero-section__headline, .hero-section__sub, .hero-section__cta-row, .hero-section__micro, .hero-section__kicker, .service-reveal, .service-reveal__inner, #phoenix-fallback

## Selectors this file does NOT own
#phoenix-canvas — owned by threejs-scene-setup.md
.cursor-dot — owned by design-quality-and-taste.md

## HTML structure
```html
<section class="hero-section section-grain" id="hero">
  <!-- Canvas is the #phoenix-canvas element placed in index.html — Three.js renders into it -->
  <div id="phoenix-fallback" class="hero-section__fallback" style="display:none">
    <img src="/assets/img/phoenix-hero-fallback.avif"
      alt="ZOLCUZ Studios — premium animated web design for luxury home improvement brands"
      width="1200" height="900">
  </div>
  <div class="hero-section__overlay">
    <span class="hero-section__kicker">Premium Animated Web Design</span>
    <h1 class="hero-section__headline">Websites That<br>Command Premium</h1>
    <p class="hero-section__sub">Scroll-driven cinematic experiences for luxury home improvement brands in the US and UK.</p>
    <div class="hero-section__cta-row">
      <a href="#packages" class="button-primary">Request Your Concept Sprint</a>
    </div>
    <p class="hero-section__micro">48-hour concept sprint &mdash; No long-term contract</p>
  </div>

  <!-- Service reveal: wrapper handles vertical centering; inner handles GSAP y offset -->
  <div class="service-reveal-wrap" aria-live="polite" role="status">
    <div id="service-reveal" class="service-reveal">
      <p class="reveal__title"></p>
      <p class="reveal__body"></p>
    </div>
  </div>

  <div class="cursor-dot" aria-hidden="true"></div>
</section>
```

## CSS — hero section and overlays only
```css
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100dvh;
  background: var(--bg-0);
  overflow: hidden;
  /* Canvas is fixed — sits above this section via z-index */
}
.hero-section__fallback {
  position: absolute;
  inset: 0;
  z-index: var(--z-content);
}
.hero-section__fallback img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.hero-section__overlay {
  position: absolute;
  bottom: 12%;
  left: 6%;
  z-index: var(--z-content);
  max-width: 520px;
  pointer-events: none;
  /* Start hidden — revealHero() in sys-threejs-phoenix.md makes it visible */
  visibility: hidden;
  opacity: 0;
}
.hero-section__overlay .button-primary {
  pointer-events: auto;
}
.hero-section__kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.hero-section__kicker::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}
.hero-section__headline {
  font-family: var(--font-display);
  font-size: 88px;
  line-height: 0.95;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-0);
  margin-bottom: 20px;
}
.hero-section__sub {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.75;
  color: var(--text-1);
  max-width: 420px;
  margin-bottom: 28px;
}
.hero-section__micro {
  font-size: 12px;
  color: var(--text-2);
  margin-top: 10px;
  font-family: var(--font-body);
}

/* Service reveal — wrapper handles vertical centering via CSS, NOT transform */
/* GSAP animates the inner .service-reveal element only — no translateY(-50%) conflict */
.service-reveal-wrap {
  position: absolute;
  top: 0;
  right: 6%;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: var(--z-reveal);
  pointer-events: none;
}
.service-reveal {
  max-width: 280px;
  background: rgba(11,11,12,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-left: 2px solid var(--accent);
  padding: 20px 24px;
  border-radius: 4px;
  /* GSAP autoAlpha handles opacity + visibility — start fully hidden */
  visibility: hidden;
  opacity: 0;
  /* Initial offset for entrance animation — GSAP owns this transform */
  transform: translateY(8px);
}
.reveal__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-0);
  margin-bottom: 8px;
  margin-top: 0;
}
.reveal__body {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-1);
  margin: 0;
}
```

## Mobile
```css
@media (max-width: 768px) {
  .hero-section__headline { font-size: 48px; }
  .hero-section__overlay {
    bottom: 100px;
    left: 5%;
    right: 5%;
    max-width: 100%;
  }
  .service-reveal-wrap { display: none; }
}
```

## GSAP service reveal — correct pattern with wrapper
The wrapper `.service-reveal-wrap` handles vertical centering via flexbox (no CSS transform needed).
GSAP animates only `.service-reveal` (the inner card), so `y: 0` / `y: 8` never conflicts with centering.
```javascript
// In sys-threejs-phoenix.md showServiceReveal / hideServiceReveal:
function showServiceReveal(data) {
  const el = document.getElementById('service-reveal');
  el.querySelector('.reveal__title').textContent = data.title;
  el.querySelector('.reveal__body').textContent = data.body;
  // y: 0 is safe — wrapper handles vertical centering, not the element itself
  gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
}
function hideServiceReveal() {
  gsap.to(document.getElementById('service-reveal'), { autoAlpha: 0, y: 8, duration: 0.2 });
}
```

## Exit check
Does phoenix appear immediately after supernova? Does the canvas stay visible while scrolling through niche sections? Does headline fit on two lines at 88px? Is CTA above sticky mobile CTA? Do service reveals disappear when user scrolls past hero? Is .service-reveal-wrap used (not inline transform centering)? Does revealHero() set .hero-section__overlay to autoAlpha:1?
