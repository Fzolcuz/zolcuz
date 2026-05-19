---
name: section-process
description: Use only when building the Process section. Includes scroll illumination implementation.
---
# Process Section

## Four Steps
01 Architecture (Days 1–3) | 02 Visualization (Days 4–7) | 03 Bespoke Build (Week 2) | 04 Launch (Week 3)

## HTML
```html
<section class="process section-grain" id="process">
  <div class="process__inner">
    <div class="process__header">
      <span class="label">The Process</span>
      <h2>Four Steps to<br>Your Showroom</h2>
    </div>
    <div class="process__timeline">
      <div class="process-step" data-step="1">
        <div class="process-step__num-wrap">
          <span class="process-step__num">01</span>
          <div class="process-step__line"></div>
        </div>
        <div class="process-step__body">
          <span class="process-step__period">Days 1–3</span>
          <h3 class="process-step__title">Architecture</h3>
          <p class="process-step__desc">Discovery, niche research, animation concept, copy brief. We define the story your space will tell before writing a single line of code.</p>
        </div>
      </div>
      <div class="process-step" data-step="2">
        <div class="process-step__num-wrap">
          <span class="process-step__num">02</span>
          <div class="process-step__line"></div>
        </div>
        <div class="process-step__body">
          <span class="process-step__period">Days 4–7</span>
          <h3 class="process-step__title">Visualization</h3>
          <p class="process-step__desc">Design system, section layouts, animation prototype. You see exactly what the site will feel like before it is built.</p>
        </div>
      </div>
      <div class="process-step" data-step="3">
        <div class="process-step__num-wrap">
          <span class="process-step__num">03</span>
          <div class="process-step__line"></div>
        </div>
        <div class="process-step__body">
          <span class="process-step__period">Week 2</span>
          <h3 class="process-step__title">Bespoke Build</h3>
          <p class="process-step__desc">Full development, CMS setup, animation implementation. Plain code, no page builders, no bloat. Engineered for performance.</p>
        </div>
      </div>
      <div class="process-step" data-step="4">
        <div class="process-step__num-wrap">
          <span class="process-step__num">04</span>
        </div>
        <div class="process-step__body">
          <span class="process-step__period">Week 3</span>
          <h3 class="process-step__title">Launch and Optimize</h3>
          <p class="process-step__desc">QA, performance audit, Vercel deployment, CMS handoff. You get the keys. We stay on for 30 days of support.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS
```css
.process { padding: var(--space-14) 0; }
.process__inner { max-width: 760px; margin: 0 auto; padding: 0 24px; }
.process__header { margin-bottom: 64px; }
.process__timeline { display: flex; flex-direction: column; }
.process-step {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 32px;
  padding-bottom: 48px;
  opacity: 0.35;
  transition: opacity 400ms ease;
}
.process-step.active { opacity: 1; }
.process-step.done { opacity: 0.6; }
.process-step__num-wrap { display: flex; flex-direction: column; align-items: center; }
.process-step__num {
  font-family: var(--font-display);
  font-size: 64px; font-weight: 600;
  color: var(--accent); line-height: 1;
  opacity: 0.3;
  transition: opacity 400ms ease, color 400ms ease;
}
.process-step.active .process-step__num { opacity: 1; color: var(--accent); }
.process-step__line {
  flex: 1; width: 1px;
  background: var(--border-subtle); margin-top: 8px;
}
.process-step:last-child .process-step__line { display: none; }
.process-step__period {
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-2); display: block; margin-bottom: 8px;
}
.process-step__title {
  font-family: var(--font-display); font-size: 28px; font-weight: 600;
  color: var(--text-0); margin-bottom: 12px;
}
.process-step__desc {
  font-family: var(--font-body); font-size: 16px; color: var(--text-1); line-height: 1.7;
  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
}
```

## JavaScript — Scroll Illumination
Past steps: done (60% opacity) | Current: active (100%) | Future: dim (35%)
```javascript
const steps = document.querySelectorAll('.process-step');

steps.forEach((step, index) => {
  ScrollTrigger.create({
    trigger: step,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => {
      steps.forEach((s, i) => {
        s.classList.remove('active', 'done');
        if (i < index) s.classList.add('done');
        if (i === index) s.classList.add('active');
      });
    },
    onEnterBack: () => {
      steps.forEach((s, i) => {
        s.classList.remove('active', 'done');
        if (i < index) s.classList.add('done');
        if (i === index) s.classList.add('active');
      });
    }
  });
});

// Activate first step by default
if (steps.length) steps[0].classList.add('active');
```

## Exit Check
Timeline illumination works on scroll? First step active by default? Large decorative numerals behind content? Period labels visible? Mobile single column? CMS text clamped to 4 lines?
