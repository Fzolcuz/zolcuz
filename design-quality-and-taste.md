---
name: design-quality-and-taste
description: Use before any visual build. Owns premium taste rules, anti-generic rules, button CSS, cursor system, and grain overlays. Read before starting any new section.
---
# Design Quality and Taste

## Must feel
Deliberate. Spacious. Editorial. Controlled. Technically sharp.

## Must NOT feel
Template-like. Crowded. Gimmicky. Over-animated. Fake-luxury.

## Double-bezel cards
```css
.card-outer {
  background: var(--surface-0);
  border: 1px solid var(--border-subtle);
  padding: 2px;
  border-radius: 2rem;
}
.card-inner {
  background: var(--surface-1);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.08);
  border-radius: calc(2rem - 2px);
  padding: 32px;
}
```

## Primary button
```css
.button-primary {
  border-radius: 100px;
  background: var(--accent);
  color: #030712;
  padding: 14px 32px;
  min-height: 48px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-family: var(--font-body);
  transition:
    transform 120ms cubic-bezier(0.4,0,0.2,1),
    background 120ms cubic-bezier(0.4,0,0.2,1),
    box-shadow 120ms cubic-bezier(0.4,0,0.2,1);
}
/* REQUIRED: all hover states inside this media query — prevents sticky hover on touch */
@media (hover: hover) and (pointer: fine) {
  .button-primary:hover {
    transform: scale(1.05);
    background: var(--accent-hover);
    box-shadow: 0 0 20px var(--accent-glow);
  }
}
.button-primary:active {
  transform: scale(0.98);
}
```

## Secondary button (ghost/outline)
```css
.button-secondary {
  border-radius: 100px;
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 13px 32px;
  min-height: 48px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-family: var(--font-body);
  transition: background 120ms cubic-bezier(0.4,0,0.2,1), color 120ms;
}
/* REQUIRED: all hover states inside this media query — prevents sticky hover on touch */
@media (hover: hover) and (pointer: fine) {
  .button-secondary:hover {
    background: var(--accent);
    color: #030712;
  }
}
```

## Grain overlay — IMPORTANT: use position:absolute not position:fixed
```css
/* position:fixed on a pseudo-element of a non-root element causes scroll glitches */
/* Always use position:absolute for section grain overlays */
.section-grain::after {
  content: '';
  position: absolute; /* NOT fixed */
  inset: 0;
  background-image: url('/assets/img/noise.png');
  opacity: 0.02; /* 2% default, 3% on AI-generated images */
  pointer-events: none;
  z-index: 1;
}
/* The section must have position:relative for this to work */
.section-grain {
  position: relative;
  overflow: hidden;
}
```

## Image grading
`filter: contrast(1.05) saturate(0.9)`

## Icons
1px stroke SVG. Never filled. Never emoji. Never Font Awesome.

## Cursor system — two zones, two behaviors
Zone 1: Global site (outside Three.js canvas)
24px circle, mix-blend-mode: difference, desktop only, 0.12 lerp smoothing
HTML element (`<div class="cursor-global">`) placed in index.html from project-setup.md.
```css
.cursor-global {
  width: 24px; height: 24px;
  border: 1px solid var(--text-0);
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  position: fixed;
  z-index: 99998;
  transition: transform 0.12s linear;
  /* Hidden by default on touch devices */
  display: none;
}
@media (hover: hover) and (pointer: fine) {
  .cursor-global { display: block; }
}
```
```javascript
// Global cursor lerp (desktop only)
const cursorGlobal = document.querySelector('.cursor-global');
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;

window.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

gsap.ticker.add(() => {
  cursorX += (targetX - cursorX) * 0.12;
  cursorY += (targetY - cursorY) * 0.12;
  if (cursorGlobal) {
    cursorGlobal.style.transform = `translate(${cursorX - 12}px, ${cursorY - 12}px)`;
  }
});
```

Zone 2: Inside Three.js canvas boundary (phoenix hero section)
Cursor transforms to teal ember particle. See sys-threejs-phoenix.md for implementation.
body.cursor--ember hides the global cursor and shows the ember particle instead.
Never show both cursors simultaneously.
```css
body.cursor--ember .cursor-global { display: none; }
.cursor-dot {
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  position: fixed;
  z-index: var(--z-cursor);
  box-shadow: 0 0 8px var(--accent-glow);
  transform: translate(-50%, -50%);
  display: none;
}
body.cursor--ember .cursor-dot { display: block; }
```

## One signature moment per section
Each section gets exactly one premium motion moment. Never two competing effects in the same section.

## The golden rule
If an effect harms readability or speed: remove it without hesitation.
If simplification feels more expensive and deliberate: keep it.
When in doubt: add whitespace, not effects.
