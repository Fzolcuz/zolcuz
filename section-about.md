---
name: section-about
description: Use only when building the About section.
---
# About Section

## Selectors
.about, .about__inner, .about__grid, .about__statement, .about__details, .about__rule, .about__detail-item

## Dependencies
sys-core-tokens, typography-and-fonts, layout-and-spacing

## Positioning
"We build animated websites for premium home improvement brands."
Specialist studio. Not a freelancer. Not a generalist. Not a template shop.
Five niches. Limited builds per quarter. Serious brands only.
Never mention India, being solo, or being new. Studio confidence not autobiography.

## HTML
```html
<section class="about section-grain" id="about">
  <div class="about__inner">
    <div class="about__grid">
      <!-- Left: large statement -->
      <div class="about__statement-col">
        <span class="label">The Studio</span>
        <h2 class="about__h2">Built for Premium.<br>Engineered for Performance.</h2>
        <p class="about__body">
          ZOLCUZ Studios builds scroll-driven cinematic websites for luxury home improvement brands
          in the US and UK. We occupy five specialist niches — and we do not stray outside them.
        </p>
        <p class="about__body">
          Every site is engineered in plain HTML, CSS, and JavaScript on Vercel. No page builders.
          No bloat. No templates. Only assembly animation that makes your craftsmanship impossible to ignore.
        </p>
      </div>

      <!-- Right: detail panel -->
      <div class="about__details">
        <div class="about__rule" aria-hidden="true">
          <span class="about__rule-label">STUDIO</span>
        </div>
        <ul class="about__detail-list">
          <li class="about__detail-item">
            <span class="about__detail-dot" style="background: var(--niche-kitchen)"></span>
            Custom Kitchen Design-Build Firms
          </li>
          <li class="about__detail-item">
            <span class="about__detail-dot" style="background: var(--niche-theater)"></span>
            Custom Home Theater and Media Room Installers
          </li>
          <li class="about__detail-item">
            <span class="about__detail-dot" style="background: var(--niche-closet)"></span>
            Custom Closet and Wardrobe Companies
          </li>
          <li class="about__detail-item">
            <span class="about__detail-dot" style="background: var(--niche-bathroom)"></span>
            Premium Bathroom Renovation Firms
          </li>
          <li class="about__detail-item">
            <span class="about__detail-dot" style="background: var(--niche-windows)"></span>
            Luxury Windows, Doors, and Conservatory Companies
          </li>
        </ul>
        <div class="about__meta">
          <p>Scroll-driven assembly animation</p>
          <p>Plain HTML / CSS / JS on Vercel</p>
          <p>Limited builds per quarter</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS
```css
.about {
  padding: var(--space-14) 0;
}
.about__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.about__grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 80px;
  align-items: start;
}
@media (max-width: 768px) {
  .about__grid { grid-template-columns: 1fr; gap: 48px; }
}
.about__h2 {
  margin-bottom: 24px;
}
.about__body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.75;
  color: var(--text-1);
  max-width: 56ch;
  margin-bottom: 20px;
}
.about__details {
  position: relative;
  padding-left: 32px;
  border-left: 1px solid var(--border-subtle);
}
.about__rule {
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
}
.about__rule-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--text-2);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  margin-left: -6px;
}
.about__detail-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}
.about__detail-item {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-1);
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.4;
}
.about__detail-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.about__meta {
  border-top: 1px solid var(--border-subtle);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.about__meta p {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-2);
}
```

## JavaScript — Scroll entrance
```javascript
gsap.from('.about__statement-col', {
  scrollTrigger: { trigger: '.about__grid', start: 'top 80%', once: true },
  y: 40,
  autoAlpha: 0,
  duration: 0.7,
  ease: 'power3.out'
});
gsap.from('.about__details', {
  scrollTrigger: { trigger: '.about__grid', start: 'top 80%', once: true },
  y: 40,
  autoAlpha: 0,
  duration: 0.7,
  delay: 0.15,
  ease: 'power3.out'
});
```

## Exit check
Positions brand as specialist studio? Never sounds like a solo freelancer or a cheap service? All five niches listed with niche color dots? Typography IS the visual — no photos? Clear in under 30 seconds?
