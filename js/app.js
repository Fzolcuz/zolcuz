// app.js — entry point (ES module)
// Runs after all CDN scripts have loaded (end of body)

import { initNav } from '/js/nav.js';
// lenis-init.js is imported by nav.js — Lenis starts on first import

// 1. Unhide main content immediately — boot failsafe removal
// (reset.css hides .main-content to prevent FOUC; we reveal it here)
document.querySelector('.main-content').style.visibility = 'visible';
document.querySelector('.main-content').style.opacity   = '1';

// 2. Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

// 3. Init Lenis + Nav — runs immediately (does not need fonts)
initNav();

// 4. Section animation init — called after fonts are ready
function initAnimations() {
  // Import and call each section's animation init in build order:
  // initHeroAnimations();       // section-hero-phoenix.md
  // initHowItWorksAnimations(); // section-how-it-works.md
  // initNichesAnimations();     // section-niches.md
  // initCounters();             // section-retention-stats.md
  // initAutomation();           // section-automation.md
  // initProcessTimeline();      // section-process.md
  // Add each as sections are built
}

// 5. Wait for fonts, then init section animations
Promise.race([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 2500))
]).then(() => {
  initAnimations();
});
