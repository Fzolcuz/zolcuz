// lenis-init.js — smooth scroll initialisation
// CLAUDE.md: Lenis v1.1.14, duration 1.2
// Exported as singleton — import in app.js and nav.js

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
});

// Integrate with GSAP ticker for 120Hz ProMotion sync
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

export { lenis };
