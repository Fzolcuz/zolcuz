// app.js — entry point
// Runs after all CDN scripts have loaded (end of body)

// 1. Unhide main content immediately — boot failsafe removal
// (reset.css hides .main-content to prevent FOUC; we reveal it here)
document.querySelector('.main-content').style.visibility = 'visible';
document.querySelector('.main-content').style.opacity = '1';

// 2. Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

// 3. All animation init functions called here after fonts ready
function initAnimations() {
  // Import and call each section's animation init in build order:
  // initHeroAnimations();       // section-hero-phoenix.md
  // initHowItWorksAnimations(); // section-how-it-works.md
  // initNichesAnimations();     // section-niches.md
  // initCounters();             // section-retention-stats.md + signature-animation-moments.md
  // initAutomation();           // section-automation.md
  // initProcessTimeline();      // section-process.md
  // Add each as you build sections
}

// 4. Wait for fonts, then init
Promise.race([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 2500))
]).then(() => {
  initAnimations();
});
