---
name: section-how-it-works
description: Use only when building the How It Works section.
---
# How It Works Section

## Three Steps
1. DECONSTRUCT — We analyze your space, your brand, and your buyers
2. SEQUENCE — We engineer the scroll-driven assembly animation
3. REVEAL — We deploy a cinematic showroom that converts premium leads

## HTML
```html
<section class="how section-grain" id="how">
  <div class="how__inner">
    <div class="how__header">
      <span class="label">The Method</span>
      <h2>Cinema. Not Code.<br>Results. Not Templates.</h2>
    </div>
    <div class="how__grid">
      <div class="how-step" data-animate>
        <span class="how-step__num">01</span>
        <div class="how-step__body">
          <h3 class="how-step__title">Deconstruct</h3>
          <p class="how-step__desc">We study your space, your competitors, and your ideal buyer. Every animation decision is backed by what makes premium clients book.</p>
        </div>
      </div>
      <div class="how-step" data-animate>
        <span class="how-step__num">02</span>
        <div class="how-step__body">
          <h3 class="how-step__title">Sequence</h3>
          <p class="how-step__desc">We engineer your scroll-driven assembly animation. Your kitchen, your theater, your closet — it builds itself as the buyer scrolls.</p>
        </div>
      </div>
      <div class="how-step" data-animate>
        <span class="how-step__num">03</span>
        <div class="how-step__body">
          <h3 class="how-step__title">Reveal</h3>
          <p class="how-step__desc">We deploy a cinematic showroom that qualifies premium leads before they pick up the phone. Performance audited. CMS ready. Yours.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS
```css
.how { padding: var(--space-14) 0; }
.how__inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.how__header { margin-bottom: 64px; }
.how__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}
@media (max-width: 768px) {
  .how__grid { grid-template-columns: 1fr; gap: 40px; }
}
.how-step { display: flex; flex-direction: column; gap: 20px; }
.how-step__num {
  font-family: var(--font-display);
  font-size: 72px; font-weight: 600;
  color: var(--accent); opacity: 0.2;
  line-height: 1; display: block;
}
.how-step__title {
  font-family: var(--font-display);
  font-size: 28px; font-weight: 600;
  color: var(--text-0); margin-bottom: 12px;
}
.how-step__desc {
  font-family: var(--font-body);
  font-size: 16px; color: var(--text-1); line-height: 1.7;
  /* CMS protection */
  display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden;
}
```

## JavaScript — Staggered scroll entrance
```javascript
gsap.from('.how-step', {
  scrollTrigger: { trigger: '.how__grid', start: 'top 80%', once: true },
  y: 40,
  autoAlpha: 0,
  stagger: 0.15,
  duration: 0.7,
  ease: 'power3.out'
});
```

## Exit Check
Three equal columns desktop? Single column mobile? Numbers decorative and low opacity? No icons — typography only? Stagger reveals on scroll? Copy instantly understandable without technical knowledge?
