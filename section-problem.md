---
name: section-problem
description: Use only when building the Problem section.
---
# Problem Section

## Selectors
.problem, .problem__inner, .problem__lines, .problem__line

## Dependencies
sys-core-tokens, typography-and-fonts, layout-and-spacing

## Structure
Eyebrow label + H2 + maximum 3 pain lines. No images. Under 40 words total.

## Pain lines (adapt as needed)
"Your website looks like every other contractor's."
"Premium work. Generic presentation. Clients can't tell the difference."
"You're losing high-value leads to brands with better digital presence."

## Tone
Sharp. Restrained. Not melodramatic. Not aggressive.
The prospect should read this and think "yes, that is exactly my problem."

## HTML
```html
<section class="problem section-grain" id="problem">
  <div class="problem__inner">
    <span class="label">The Problem</span>
    <h2 class="problem__h2">Your Work is Premium.<br>Your Website is Not.</h2>
    <div class="problem__lines">
      <p class="problem__line" data-animate>Your website looks like every other contractor's.</p>
      <p class="problem__line" data-animate>Premium work. Generic presentation. Clients can't tell the difference.</p>
      <p class="problem__line" data-animate>You're losing high-value leads to brands with better digital presence.</p>
    </div>
  </div>
</section>
```

## CSS
```css
.problem {
  padding: var(--space-14) 0;
}
.problem__inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 24px;
}
.problem__h2 {
  margin-bottom: 48px;
}
.problem__lines {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.problem__line {
  font-family: var(--font-body);
  font-size: clamp(18px, 2vw, 22px);
  color: var(--text-1);
  line-height: 1.6;
  padding-left: 24px;
  border-left: 2px solid var(--border-subtle);
  transition: border-color 400ms ease, color 400ms ease;
}
.problem__line.active {
  border-left-color: var(--accent);
  color: var(--text-0);
}
```

## JavaScript — Staggered scroll entrance
```javascript
const lines = document.querySelectorAll('.problem__line');

lines.forEach(line => {
  ScrollTrigger.create({
    trigger: line,
    start: 'top 75%',
    once: true,
    onEnter: () => line.classList.add('active')
  });
});

// Staggered fade-in
gsap.from('.problem__line', {
  scrollTrigger: { trigger: '.problem__lines', start: 'top 80%', once: true },
  y: 24,
  autoAlpha: 0,
  stagger: 0.15,
  duration: 0.6,
  ease: 'power3.out'
});
```

## Performance
Text-only section. Nearly zero performance cost.

## Exit check
Reads in under 10 seconds? No clutter? Prospect feels understood not attacked? Three lines max? Stagger entrance on scroll?
