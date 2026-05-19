---
name: section-packages
description: Use only when building the Packages section. Contains complete HTML and CSS.
---
# Packages Section

## Dependencies
Requires design-quality-and-taste.md for .button-primary and .button-secondary CSS.
Always load design-quality-and-taste.md in the same session as this file.

## Selectors
.packages, .packages__inner, .packages__stack, .package-card, .package-card--featured, .packages__maintenance

## HTML
```html
<section class="packages section-grain" id="packages">
  <div class="packages__inner">
    <div class="packages__header">
      <span class="label">The Investment</span>
      <h2>Builds That Match<br>Your Craftsmanship</h2>
    </div>
    <div class="packages__stack">

      <div class="package-card">
        <div class="package-card__header">
          <span class="package-card__tier">Entry Point</span>
          <p class="package-card__amount">$249</p>
          <h3 class="package-card__name">Concept Sprint</h3>
        </div>
        <ul class="package-card__outcomes">
          <li>Custom visual concept for your homepage</li>
          <li>Scroll-driven animation idea for your niche</li>
          <li>Conversion audit of your current site</li>
          <li>Technical roadmap and timeline</li>
        </ul>
        <div class="package-card__footer">
          <span class="package-card__timeline">Delivered in 48 hours</span>
          <a href="#contact" class="button-secondary">Request Sprint</a>
        </div>
      </div>

      <div class="package-card">
        <div class="package-card__header">
          <span class="package-card__tier">Core Offer</span>
          <p class="package-card__amount">$1,500</p>
          <h3 class="package-card__name">Showroom Landing Page</h3>
        </div>
        <ul class="package-card__outcomes">
          <li>Single-page cinematic showroom experience</li>
          <li>GSAP scroll-driven assembly animation</li>
          <li>Sanity CMS for self-managed content updates</li>
          <li>Vercel deployment with full performance audit</li>
          <li>Mobile-optimised throughout</li>
        </ul>
        <div class="package-card__footer">
          <span class="package-card__timeline">Delivered in 2 weeks</span>
          <a href="#contact" class="button-primary">Request Your Concept Sprint</a>
        </div>
      </div>

      <div class="package-card package-card--featured">
        <div class="package-card__badge">Most Requested</div>
        <div class="package-card__header">
          <span class="package-card__tier">Premium</span>
          <p class="package-card__amount">$2,800</p>
          <h3 class="package-card__name">Premium Showroom Site</h3>
        </div>
        <ul class="package-card__outcomes">
          <li>Full multi-section cinematic website</li>
          <li class="package-card__highlight">Scroll-driven assembly animation — your space builds on scroll</li>
          <li>Five niche-adapted animation sequences</li>
          <li>Sanity CMS with client-friendly editing interface</li>
          <li>Performance-optimised Vercel deployment</li>
          <li>30-day post-launch support</li>
        </ul>
        <div class="package-card__addons">
          <p class="package-card__addons-label">Studio Services</p>
          <p>Lead Automation — $600–$1,200 setup + $200/mo</p>
          <p>AI Virtual Concierge — $750 setup + $150/mo</p>
        </div>
        <div class="package-card__footer">
          <span class="package-card__timeline">Delivered in 3 weeks</span>
          <a href="#contact" class="button-primary">Request Your Concept Sprint</a>
        </div>
      </div>

    </div>

    <div class="packages__maintenance">
      <p class="packages__maintenance-label">Ongoing Partnership</p>
      <p class="packages__maintenance-price">$149–$199/month</p>
      <p class="packages__maintenance-desc">Monthly performance monitoring, content updates, uptime tracking, and priority support. Available to all clients post-launch.</p>
    </div>
  </div>
</section>
```

## CSS
```css
.packages { padding: var(--space-14) 0; }
.packages__inner { max-width: 760px; margin: 0 auto; padding: 0 24px; }
.packages__header { margin-bottom: 64px; }
.packages__stack { display: flex; flex-direction: column; gap: 2px; }
.package-card {
  background: var(--surface-0);
  border: 1px solid var(--border-subtle);
  padding: 40px; position: relative;
}
.package-card:first-child { border-radius: 2rem 2rem 0 0; }
.package-card:last-child { border-radius: 0 0 2rem 2rem; }
.package-card--featured { background: var(--surface-1); border-color: var(--accent); z-index: 1; }
.package-card__badge {
  position: absolute; top: -12px; left: 40px;
  background: var(--accent); color: #030712;
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 100px;
}
.package-card__tier {
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-2); display: block; margin-bottom: 12px;
}
.package-card__amount {
  font-family: var(--font-display); font-size: 48px; font-weight: 600;
  color: var(--text-0); line-height: 1; margin-bottom: 8px;
}
.package-card__name {
  font-family: var(--font-display); font-size: 22px; font-weight: 600;
  color: var(--text-0); margin-bottom: 24px;
}
.package-card__outcomes { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.package-card__outcomes li {
  font-family: var(--font-body); font-size: 15px; color: var(--text-1);
  padding-left: 20px; position: relative;
  /* CMS sabotage protection */
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.package-card__outcomes li::before { content: '→'; position: absolute; left: 0; color: var(--text-2); }
.package-card__highlight { color: var(--text-0) !important; font-weight: 500; }
.package-card__highlight::before { color: var(--accent) !important; }
.package-card__addons {
  border-top: 1px solid var(--border-subtle); padding-top: 20px; margin-bottom: 24px;
  font-family: var(--font-body); font-size: 13px; color: var(--text-2);
  display: flex; flex-direction: column; gap: 4px;
}
.package-card__addons-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent-gold); margin-bottom: 8px;
}
.package-card__footer {
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.package-card__timeline { font-size: 12px; color: var(--text-2); font-family: var(--font-body); }
.packages__maintenance {
  margin-top: 48px; padding: 32px;
  border: 1px solid var(--border-subtle); border-radius: 1rem; text-align: center;
}
.packages__maintenance-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-2); margin-bottom: 8px; font-family: var(--font-body); display: block;
}
.packages__maintenance-price {
  font-family: var(--font-display); font-size: 28px; color: var(--text-0); margin-bottom: 12px;
}
.packages__maintenance-desc {
  font-family: var(--font-body); font-size: 14px; color: var(--text-2);
  max-width: 480px; margin: 0 auto; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden;
}
```

## Exit Check
Single-column layout? Featured card visually distinct with teal border? Assembly animation outcome highlighted? Studio Services labeled separately? Maintenance block separate and clear? Mobile stack clean?
