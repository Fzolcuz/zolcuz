---
name: sys-core-tokens
description: Single source of truth for ALL design tokens — colors, fonts, spacing, z-index. Also owns theme toggle, FOUT prevention, hover media query fix, and client text sabotage protection. Read before writing any CSS.
---
# Core Design Tokens

## Color Hierarchy (LOCKED)
Primary: teal-emerald — CTAs, focus rings, borders, phoenix energy
Secondary: deep gold — sparse accents max 3% pixel area
Tertiary: crimson — one micro-accent per section max, never CTA

## variables.css — Complete Token File
This is what goes in /css/variables.css. Copy exactly.
```css
/* ZOLCUZ Design Tokens — single source of truth */

:root {
  color-scheme: light dark;

  /* Fonts */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Teal-emerald scale */
  --teal-500: #0D9488;
  --teal-700: #0F766E;
  --teal-900: #134E4A;
  --teal-glow: rgba(13, 148, 136, 0.35);

  /* Gold secondary */
  --gold-400: #D6B46B;
  --gold-600: #B45309;
  --gold-800: #92400E;

  /* Crimson tertiary */
  --crimson-600: #9F1239;
  --crimson-800: #7F1D1D;

  /* Niche accents — dividers and micro-icons only */
  --niche-kitchen:  #8B3B2C;
  --niche-theater:  #1E2B44;
  --niche-closet:   #9AA3A9;
  --niche-bathroom: #2F6F6D;
  --niche-windows:  #244836;

  /* Spacing scale (8px base) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;
  --space-14: 112px;

  /* Z-index scale */
  --z-canvas:      1;
  --z-content:     10;   /* general content above canvas */
  --z-reveal:      20;
  --z-nav:         100;
  --z-mobile-cta:  150;  /* sticky mobile CTA bar */
  --z-mobile-menu: 200;
  --z-loader:      9999;
  --z-supernova:   10000;
  --z-tap-prompt:  10001;
  --z-cursor:      99999;

  /* Section stacking (used by signature-animation-moments.md overlap pattern) */
  --section-z: 2;
}

:root[data-theme="dark"] {
  --bg-0: #030712;
  --bg-1: #0B0B0C;
  --surface-0: #111113;
  --surface-1: #151518;
  --border-subtle: #1B1B20;
  --border-strong: #24242A;
  --text-0: #F5F1E8;
  --text-1: #CFC8BB;
  --text-2: #A7A195;
  --accent: #0D9488;
  --accent-hover: #0F766E;
  --accent-glow: rgba(13, 148, 136, 0.35);
  --accent-gold: #D6B46B;
  --accent-crimson: #9F1239;
}

:root[data-theme="light"] {
  --bg-0: #F5F0E6;
  --bg-1: #EBE3D5;
  --surface-0: #FEFCF9;
  --surface-1: #F7F3EB;
  --border-subtle: #D6CBBA;
  --border-strong: #C4B7A3;
  --text-0: #1A1A1B;
  --text-1: #3A3A3D;
  --text-2: #636366;
  --accent: #0D9488;
  --accent-hover: #0F766E;
  --accent-glow: rgba(13, 148, 136, 0.25);
  --accent-gold: #B45309;
  --accent-crimson: #7F1D1D;
}
```

## Theme Flash Prevention — CRITICAL
This inline script MUST be the first thing in <head> before any CSS loads.
Place it in /js/theme.js and include as inline script in HTML head.
```javascript
// theme.js — prevents flash of wrong theme on page load
// Must run before CSS renders
(function() {
  const saved = localStorage.getItem('zolcuz-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();
```
In index.html head (copy this exact minified version — must be inline, not a file reference):
```html
<script>
  /* Theme flash prevention — must be inline, before CSS */
  (function(){const t=localStorage.getItem('zolcuz-theme');document.documentElement.setAttribute('data-theme',t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')||'dark');})();
</script>
```

## Theme Toggle JavaScript
```javascript
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('zolcuz-theme', next);
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
});
```

## Theme Transition CSS
```css
.theme-transitioning,
.theme-transitioning *,
.theme-transitioning *::before,
.theme-transitioning *::after {
  transition:
    background-color 300ms cubic-bezier(0.25,0.1,0.25,1),
    border-color 300ms cubic-bezier(0.25,0.1,0.25,1),
    color 300ms cubic-bezier(0.25,0.1,0.25,1) !important;
}
```

## FOUT Prevention — Font Metric Override
CSS size-adjust ensures layout does not shift when Cormorant Garamond loads.
The system fallback font occupies identical space so no layout jump occurs.
```css
/* System fallback sized to match Cormorant Garamond metrics */
@font-face {
  font-family: 'Cormorant Garamond Fallback';
  src: local('Georgia');
  size-adjust: 102%;
  ascent-override: 94%;
  descent-override: 22%;
  line-gap-override: 0%;
}

/* Use fallback in font stack until web font loads */
h1, h2, h3, h4 {
  font-family: 'Cormorant Garamond', 'Cormorant Garamond Fallback', Georgia, serif;
}
```

## Hover Media Query — Required on ALL hover states
All hover states must be inside this media query.
Prevents hover states from sticking on touch devices after tap.
```css
/* CORRECT — hover only on devices that support it */
@media (hover: hover) and (pointer: fine) {
  .button-primary:hover {
    transform: scale(1.05);
    background: var(--accent-hover);
    box-shadow: 0 0 20px var(--accent-glow);
  }
}

/* WRONG — never do this */
.button-primary:hover { ... }
```

## Client Text Sabotage Protection
All text grids that display CMS content must clamp overflow.
If a client types 800 words into a field designed for 20 words the layout must not break.
```css
.niche-card__desc,
.package-card__outcomes li,
.testimonial__quote,
.automation-step__experience,
.automation-step__outcome {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## Token Usage Rules
--accent (teal): CTAs, focus rings, progress borders, energy effects, hover states
--accent-gold: eyebrow dots, stat numerals, sparse highlights — max 3% pixel area
--accent-crimson: one micro-accent per section — never CTAs, never large fills
--z-content: general DOM content layers above Three.js canvas (z=1)
--section-z: incremental stacking for section overlap pattern (z=2)
--z-mobile-cta: sticky mobile CTA bar (z=150, between nav and mobile menu)
Niche accents: dividers and micro-icons only
Never use rgba(0,0,0) — use var(--bg-0) or var(--bg-1)
Never use #000000 or #FFFFFF directly

## Image Treatment
All images: `filter: contrast(1.05) saturate(0.9)`
Dark mode: `filter: brightness(0.8) contrast(1.2)`
All media wrappers need explicit aspect-ratio + width/height for Zero CLS
Missing assets show labeled inline SVG placeholder — never broken image icon
