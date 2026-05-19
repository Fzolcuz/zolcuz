---
name: sys-motion-engine
description: Lenis, GSAP, ScrollTrigger, Flip, SplitText. Owns the complete motion engine including 120Hz sync, ProMotion fix, ResizeObserver, matchMedia leak prevention, and Three.js scroll integration.
---
# Motion Engine

## CDN Scripts — Load End of Body in This Order
GSAP is pinned to 3.12.5. Do not change this version without testing.
SplitText is GSAP's official character-split plugin — do NOT also load Splitting.js (redundant weight).
```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js"></script>
```

## Registration
```javascript
gsap.registerPlugin(ScrollTrigger, Flip, SplitText);
```

## 120Hz ProMotion + Observer Loop Init — CRITICAL
Run this block ONCE at app start, before any animations.
```javascript
// Prevent scroll restoration fighting Lenis
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ProMotion and mobile resize fixes
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.normalizeScroll(true);

// Prevent lag on tab switch
gsap.ticker.lagSmoothing(0);

// Tab visibility — pause ticker when tab hidden, resume when visible
document.addEventListener('visibilitychange', () => {
  document.hidden ? gsap.ticker.sleep() : gsap.ticker.wake();
});

// Auto-refresh ScrollTrigger when DOM size changes (fonts load, images appear)
new ResizeObserver(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
  .observe(document.body);

// Global ScrollTrigger defaults for performance
ScrollTrigger.defaults({ fastScrollEnd: true, preventOverlaps: true });

// Wait for fonts before initializing animations to prevent layout shift.
// initAnimations() is defined in app.js — it calls each section's animation
// init function in build order. Never call section animations directly here.
Promise.race([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 2500)) // timeout fallback
]).then(() => {
  initAnimations();
});
```

## Lenis Setup
```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 2.0
});

lenis.on('scroll', ScrollTrigger.update);

// GSAP ticker provides time in SECONDS — multiply by 1000 for Lenis (expects ms)
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
```

## Anchor Link Interception — Required
All internal anchor links must use Lenis for smooth scroll, not native browser scroll.
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) lenis.scrollTo(target);
  });
});
```

## Mobile Menu — Stop/Start Lenis
```javascript
// When mobile menu opens: stop scroll
function openMobileMenu() {
  lenis.stop();
  // ... rest of open logic
}
// When mobile menu closes: resume scroll
function closeMobileMenu() {
  lenis.start();
  // ... rest of close logic
}
```

## matchMedia — MUST use ctx to prevent memory leaks
```javascript
// CORRECT — assign to ctx, call ctx.revert() on cleanup
let ctx = gsap.matchMedia();

ctx.add({
  isDesktop: '(min-width: 769px)',
  isMobile: '(max-width: 768px)',
  prefersReduced: '(prefers-reduced-motion: reduce)'
}, (context) => {
  const { isDesktop, isMobile, prefersReduced } = context.conditions;

  if (prefersReduced) {
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.set('[data-animate]', { opacity: 1, y: 0, x: 0 });
    return;
  }

  if (isDesktop) {
    // Desktop animations
  }
  if (isMobile) {
    // Mobile animations — lighter
  }

  return () => ctx.revert(); // cleanup on breakpoint change
});
```

Also add CSS reduced motion fallback:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Assembly Animation — Scrubbed (duration is ignored when scrub is set)
```javascript
// NO duration — scrub controls ALL timing in scrubbed animations
function buildAssemblyAnimation(container, components, opts = {}) {
  return gsap.from(components, {
    scrollTrigger: {
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      preventOverlaps: true
    },
    y: opts.fromY || 80,
    autoAlpha: 0,    // use autoAlpha not opacity — handles visibility too
    stagger: 0.08,
    ease: 'expo.out'
  });
}
```

## Standard Scroll Entrance — Not Scrubbed (duration applies here)
```javascript
function scrollEntrance(elements, opts = {}) {
  gsap.from(elements, {
    scrollTrigger: { trigger: elements, start: 'top 80%', once: true },
    y: 40,
    autoAlpha: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
    ...opts
  });
}
```

## Text Reveal with GSAP SplitText
Use GSAP SplitText (already in the stack). Do NOT use Splitting.js — it is removed from the build.
```javascript
// SplitText is registered via gsap.registerPlugin(SplitText) in app.js
const split = new SplitText('.split-text', { type: 'chars,words' });
gsap.from(split.chars, {
  scrollTrigger: { trigger: '.split-text', start: 'top 80%', once: true },
  y: 60,
  autoAlpha: 0,
  stagger: 0.02,
  duration: 0.7,
  ease: 'power3.out'
});
```

## Gallery — Flip with Image Decode
```javascript
// MUST await image.decode() before running Flip
async function expandGalleryCard(card) {
  const img = card.querySelector('img');
  const state = Flip.getState(img);
  await img.decode(); // wait for browser to decode before Flip
  // move image to expanded container
  Flip.from(state, { duration: 0.6, ease: 'expo.out', absolute: true });
}
```

## Three.js ScrollTrigger Integration
```javascript
// Never animate Three.js properties directly — use intermediate state object
const phoenixState = { rotY: 0, rotX: 0, rotZ: 0, posX: 0, posY: -0.5, wingMorph: 0 };

gsap.to(phoenixState, {
  rotY: 0, posX: 0, posY: -0.3, wingMorph: 1.0,
  scrollTrigger: {
    trigger: '#section-kitchen',
    start: 'top center',
    end: 'bottom center',
    scrub: 0.6
    // NO duration — scrub controls timing
  },
  onUpdate: () => {
    if (window.applyPhoenixState) window.applyPhoenixState(phoenixState);
  }
});
```

## Easings Reference
```
CSS entrance:    cubic-bezier(0.05, 0.7, 0.1, 1.0)
CSS assembly:    cubic-bezier(0.68, -0.6, 0.32, 1.6)
CSS hover:       cubic-bezier(0.4, 0, 0.2, 1)
GSAP entrance:   power3.out
GSAP assembly:   expo.out
GSAP hover:      power2.out
```

## Rules
- transform + opacity only — never animate layout properties
- Use autoAlpha not opacity for scroll reveals — handles visibility:hidden correctly
- Never put Three.js inside the same ScrollTrigger pin as DOM elements
- Never add duration to a scrubbed animation
- Always assign matchMedia to a variable and call .revert() on cleanup
- initAnimations() is defined in app.js — this file does NOT define it
- Do NOT load Splitting.js — use GSAP SplitText which is already in the stack
