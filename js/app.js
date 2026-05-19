// app.js — entry point (ES module)
// Runs after all CDN scripts have loaded (end of body)

import { initNav }     from '/js/nav.js';
import { initProblem } from '/js/sections/problem.js';
import { initHow }     from '/js/sections/how.js';
import { initNiches }     from '/js/sections/niches.js';
import { initRetention } from '/js/sections/retention.js';
import { initProcess }   from '/js/sections/process.js';
import { initPackages }    from '/js/sections/packages.js';
import { initAutomation }   from '/js/sections/automation.js';
import { initAiAssistant }  from '/js/sections/ai-assistant.js';
import { initAbout }        from '/js/sections/about.js';
import { initFooter }       from '/js/sections/footer.js';
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
  // Build order — uncomment as each section is completed:
  // initHeroAnimations();       // session-5  — section-hero-phoenix.md
  initProblem();                 // session-6  — section-problem.md
  initHow();                     // session-7  — section-how-it-works.md
  initNiches();                  // session-8  — section-niches.md
  initRetention();               // session-9  — section-retention-stats.md
  initProcess();                 // session-10 — section-process.md (built session-10)
  initPackages();                // session-11 — section-packages.md
  initAutomation();              // session-12 — section-automation.md
  initAiAssistant();             // session-13 — section-ai-assistant.md
  initAbout();                   // session-14 — section-about.md
  initFooter();                   // session-15 — section-footer.md
}

// 5. Wait for fonts, then init section animations
Promise.race([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 2500))
]).then(() => {
  initAnimations();
});
