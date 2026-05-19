---
name: signature-animation-moments
description: Use for counters, marquee, section overlap, hero wipe, and advanced non-core motion moments. Does NOT own the loader (see phoenix-loader.md) or Three.js animations (see sys-threejs-phoenix.md).
---
# Signature Animation Moments

## Counters
```javascript
function initCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || '0');
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    gsap.from({ val: 0 }, {
      val: target,
      duration: 2,
      ease: 'power1.out',
      snap: { val: decimals === 0 ? 1 : 0.1 },
      onUpdate: function () {
        el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix;
      },
      scrollTrigger: {
        trigger: el.closest('.stat-block'),
        start: 'top 70%',
        once: true
      }
    });
  });
}
```

## Marquee (max 1 per page)
```javascript
gsap.to('.marquee__track', {
  xPercent: -25,
  ease: 'none',
  scrollTrigger: {
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
```

## Section overlap
Token  is defined in variables.css (value: 2). It is NOT a GSAP token — it is a CSS custom property.
Do not use a raw integer here. Do not add it to the GSAP token object. Just use it in CSS as shown.
```css
/* Creates premium stacking depth between sections */
/* --section-z: 2 is defined in /css/variables.css via sys-core-tokens.md */
.section--overlap {
  margin-top: -48px;
  position: relative;
  z-index: var(--section-z); /* = 2 */
}
```

## Hero wipe reveal (for non-phoenix pages if needed)
```javascript
gsap.from('.hero-section', {
  clipPath: 'circle(0% at 50% 50%)',
  duration: 1.2,
  ease: 'power3.out'
});
```

## Text character stagger reveal
```javascript
// Requires Splitting.js loaded first
Splitting();
gsap.from('.reveal-chars .char', {
  y: 60,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.reveal-chars',
    start: 'top 80%',
    once: true
  }
});
```

## Loader — IMPORTANT
The loading screen is the phoenix video sequence with teal-emerald SVG progress border and Three.js supernova explosion. It is NOT an SVG logo draw or a counter. See phoenix-loader.md for the complete loader system. Never implement a spinner, branded counter, or SVG path draw as the primary loader.

## Rule
Signature moments are optional enhancements only. If an effect harms readability or speed, remove it. If simplification feels more expensive, keep it. Maximum one signature moment per section.
