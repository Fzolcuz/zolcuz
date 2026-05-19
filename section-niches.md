---
name: section-niches
description: Use only when building the Niches section on the main agency site.
---
# Niches Section

## Selectors
.niches, .niches__grid, .niche-card, .niche-card__media, .niche-card__body

## Dependencies
sys-core-tokens, typography-and-fonts, layout-and-spacing, gallery-and-media, conversion-and-forms

## Five cards
Custom Kitchen Design-Build Firms
Custom Home Theater and Media Room Installers
Custom Closet and Wardrobe Companies
Premium Bathroom Renovation Firms
Luxury Windows, Doors, and Conservatory Companies

## Each card contains
Hero image or demo video preview
Niche headline
Short 15-word description (use vocabulary from copy-voice-and-vocabulary.md)
"View Demo" CTA linking to Vercel demo URL

## Niche color temperatures (section accents only — never CTA fills)
Kitchen: warm #8B3B2C
Theater: cool #1E2B44
Closet: neutral #9AA3A9
Bathroom: clean #2F6F6D
Windows: earthy #244836

## HTML structure
```html
<section class="niches section-grain" id="niches">
  <div class="niches__header">
    <span class="label">Five Niches. One Studio.</span>
    <h2>Specialist Territory</h2>
  </div>
  <div class="niches__grid">
    <article class="niche-card active" data-niche="kitchen">
      <div class="niche-card__media">
        <img src="/assets/img/niche-kitchen.avif" alt="Custom kitchen design" width="600" height="750" loading="lazy">
      </div>
      <div class="niche-card__body">
        <span class="niche-card__label">01</span>
        <h3 class="niche-card__title">Custom Kitchen Design-Build</h3>
        <p class="niche-card__desc">Scroll-driven kitchen assembly for firms building $100K+ culinary spaces.</p>
        <a href="https://zolcuz-kitchen.vercel.app" class="button-secondary" target="_blank">View Demo</a>
      </div>
    </article>
    <!-- Repeat for theater, closet, bathroom, windows -->
  </div>
</section>
```

## GSAP cross-fade on card selection
```javascript
// activeMedia removed — was declared but never used (dead code)
const cards = document.querySelectorAll('.niche-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const niche = card.dataset.niche;
    const currentActive = document.querySelector('.niche-card.active');

    if (card === currentActive) return;

    // Cross-fade active state
    // Use autoAlpha (not opacity) — consistent with system standard
    gsap.to(currentActive, { autoAlpha: 0.5, duration: 0.2, onComplete: () => {
      currentActive.classList.remove('active');
      card.classList.add('active');
      gsap.to(card, { autoAlpha: 1, duration: 0.3 });
    }});

    // Swap accent color on section
    const colors = {
      kitchen: '#8B3B2C', theater: '#1E2B44',
      closet: '#9AA3A9', bathroom: '#2F6F6D', windows: '#244836'
    };
    document.documentElement.style.setProperty('--niche-active', colors[niche]);
  });
});
```

## Media warming — load on idle, not all at once
```javascript
// Load only default niche (kitchen) on first paint
// Warm remaining niche images during browser idle time
const nicheImages = [
  '/assets/img/niche-theater.avif',
  '/assets/img/niche-closet.avif',
  '/assets/img/niche-bathroom.avif',
  '/assets/img/niche-windows.avif'
];

function warmNicheMedia() {
  nicheImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Use requestIdleCallback if available, setTimeout fallback
if ('requestIdleCallback' in window) {
  requestIdleCallback(warmNicheMedia, { timeout: 3000 });
} else {
  setTimeout(warmNicheMedia, 2000);
}
```

## Coming soon state
Never hide a card. Show "COMING SOON" pill badge with accent border.
Card is visible but CTA changes to "Coming Soon" and is non-interactive.
```html
<div class="niche-card__coming-soon">
  <span class="pill-badge">Coming Soon</span>
</div>
```

## Exit check
Each niche feels like specialist territory? Default niche loaded on first paint? Other media warmed on idle? Cross-fade smooth on card selection? All demo URLs correct?
