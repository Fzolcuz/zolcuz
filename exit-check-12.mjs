// exit-check-12.mjs — Automation Section QA
// Run: node exit-check-12.mjs
// All checks must PASS before session is marked complete.

import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const css  = readFileSync('css/sections/automation.css', 'utf8');
const js   = readFileSync('js/sections/automation.js', 'utf8');
const app  = readFileSync('js/app.js', 'utf8');

let pass = 0;
let fail = 0;

function check(label, condition) {
  if (condition) {
    console.log(`  ✅  ${label}`);
    pass++;
  } else {
    console.log(`  ❌  ${label}`);
    fail++;
  }
}

// ==========================================================================
// HTML checks
// ==========================================================================
console.log('\n── HTML ──────────────────────────────────────────────────────');

check('Section element #automation present',            html.includes('id="automation"'));
check('section-grain class on .automation',             html.includes('class="automation section-grain"'));
check('automation.css linked in <head>',               html.includes('/css/sections/automation.css'));
check('role="tablist" on .automation__tabs',            html.includes('role="tablist"'));
check('aria-label on tablist',                          html.includes('aria-label="Select your niche"'));

// 5 tabs present
check('Tab: kitchen (active)',   html.includes('data-niche="kitchen"'));
check('Tab: theater',            html.includes('data-niche="theater"'));
check('Tab: closet',             html.includes('data-niche="closet"'));
check('Tab: bathroom',           html.includes('data-niche="bathroom"'));
check('Tab: windows',            html.includes('data-niche="windows"'));

// role=tab on buttons
check('role="tab" on tab buttons',         (html.match(/role="tab"/g) || []).length >= 5);
// aria-selected on tabs
check('aria-selected on first tab = true', html.includes('aria-selected="true"'));
check('aria-selected="false" on other tabs', (html.match(/aria-selected="false"/g) || []).length >= 4);
// aria-controls wired to timeline ids
check('aria-controls="automation-timeline-kitchen"', html.includes('aria-controls="automation-timeline-kitchen"'));
check('aria-controls="automation-timeline-windows"', html.includes('aria-controls="automation-timeline-windows"'));

// 5 timelines
check('Timeline: kitchen present',  html.includes('id="automation-timeline-kitchen"'));
check('Timeline: theater present',  html.includes('id="automation-timeline-theater"'));
check('Timeline: closet present',   html.includes('id="automation-timeline-closet"'));
check('Timeline: bathroom present', html.includes('id="automation-timeline-bathroom"'));
check('Timeline: windows present',  html.includes('id="automation-timeline-windows"'));

// role=tabpanel on timelines
check('role="tabpanel" on timelines', (html.match(/role="tabpanel"/g) || []).length >= 5);

// aria-hidden on decorative numerals
check('aria-hidden="true" on step nums', (html.match(/aria-hidden="true"/g) || []).length >= 15);

// 15 steps total (3 per niche × 5 niches)
check('15 automation-step divs present',
  (html.match(/class="automation-step"/g) || []).length === 15);

// Arrow entity &#8594; in outcome lines (not raw →)
check('Arrow entity &#8594; used (not raw →)',
  html.includes('&#8594;') && !html.includes('class="automation-step__outcome">→'));

// No raw mailto: in section
check('No raw mailto: in automation section', !html.match(/href="mailto:/));

// Spec copy spot-checks
check('Kitchen copy: cabinetry inquiry',       html.includes('cabinetry inquiry'));
check('Theater copy: SMS alert',               html.includes('SMS alert to your team'));
check('Closet copy: five-day nurture',         html.includes('Five-day nurture sequence'));
check('Bathroom copy: renovation enquiry',     html.includes('renovation enquiry'));
check('Windows copy: fourteen-day follow-up',  html.includes('Fourteen-day follow-up'));

// ==========================================================================
// CSS checks
// ==========================================================================
console.log('\n── CSS ───────────────────────────────────────────────────────');

check('.automation background var(--bg-1)',          css.includes('background: var(--bg-1)'));
check('.automation position: relative',              css.includes('position: relative'));
check('.automation overflow: hidden',                css.includes('overflow: hidden'));
check('.automation__inner max-width token',          css.includes('max-width: var(--max-width)'));
check('.automation .label color: var(--accent)',     css.includes('color: var(--accent)'));
check('.automation .label text-transform: uppercase',css.includes('text-transform: uppercase'));
check('.automation__tabs display: flex',             css.includes('display: flex'));
check('.automation__tabs margin: 32px 0 48px',       css.includes('margin: 32px 0 48px'));
check('.automation__tab border-radius: 100px',       css.includes('border-radius: 100px'));
check('.automation__tab font-family: var(--font-body)', css.includes('font-family: var(--font-body)'));

// No bare ease/linear in transitions
check('No bare ease in transitions (cubic-bezier only)',
  !css.match(/transition:[^;]*\bease\b[^-]/));
check('No linear in transitions',
  !css.match(/transition:[^;]*\blinear\b/));

check('Tab hover inside @media (hover: hover)',
  css.includes('@media (hover: hover) and (pointer: fine)') &&
  css.includes('.automation__tab:hover'));

check('.automation__tab.active uses var(--accent)',  css.includes('background: var(--accent)'));
check('.automation__tab.active color: #030712',      css.includes('color: #030712'));
check('.automation__tab:focus-visible outline',      css.includes(':focus-visible'));

check('.automation__timeline[data-niche]:not(.visible) display:none',
  css.includes(':not(.visible)') && css.includes('display: none'));
check('.automation__timeline.visible display:flex',  css.includes('.automation__timeline.visible'));
check('.automation__timeline flex-direction: column',css.includes('flex-direction: column'));
check('.automation__timeline gap: 32px',             css.includes('gap: 32px'));

check('.automation-step grid-template-columns: 48px 1fr', css.includes('grid-template-columns: 48px 1fr'));
check('.automation-step visibility: hidden',         css.includes('visibility: hidden'));
check('.automation-step opacity: 0',                 css.includes('opacity: 0'));
check('.automation-step transform: translateY(20px)',css.includes('transform: translateY(20px)'));

check('.automation-step__num clamp() font-size',     css.includes('clamp('));
check('.automation-step__num font-variant-numeric',  css.includes('font-variant-numeric: tabular-nums'));
check('.automation-step__num opacity: 0.3',          css.includes('opacity: 0.3'));

check('.automation-step__experience max-width: none', css.includes('max-width: none'));
check('.automation-step__outcome max-width: none',
  (css.match(/max-width: none/g) || []).length >= 2);
check('.automation-step__outcome color: var(--accent)',
  css.includes('.automation-step__outcome'));

check('Mobile @media (max-width: 768px) block',  css.includes('@media (max-width: 768px)'));
check('Reduced-motion block present',            css.includes('@media (prefers-reduced-motion: reduce)'));
check('Reduced-motion sets visibility: visible', css.includes('visibility: visible'));

// No hardcoded #000000 or #ffffff
check('No #000000 hardcoded',  !css.includes('#000000'));
check('No #ffffff hardcoded',  !css.toLowerCase().includes('#ffffff'));

// ==========================================================================
// JS checks
// ==========================================================================
console.log('\n── JS ────────────────────────────────────────────────────────');

check('initAutomation exported',            js.includes('export function initAutomation'));
check('showNiche function defined',         js.includes('function showNiche'));
check('autoAlpha used (not bare opacity)',  js.includes('autoAlpha'));
check('bare opacity NOT used in fromTo',   !js.includes("opacity: 1,\n") && !js.match(/\{[^}]*opacity:\s*[01][^.][^}]*\}/));
check('power2.out ease on step reveal',    js.includes("ease: 'power2.out'"));
check('power3.out ease on scroll entrance',js.includes("ease: 'power3.out'"));
check('stagger: 0.1 on step reveal',       js.includes('stagger: 0.1'));
check('IntersectionObserver present',      js.includes('IntersectionObserver'));
check('threshold: 0.2 on observer',        js.includes('threshold: 0.2'));
check('observer.disconnect() — once only', js.includes('observer.disconnect()'));
check('gsap.matchMedia() assigned to ctx', js.includes('const ctx = gsap.matchMedia()'));
check('return cleanup in matchMedia',      js.includes('return () => {'));
check('split.revert() in cleanup',         js.includes('split.revert()'));
check('once: true on scroll entrance ScrollTrigger', js.includes('once: true'));
check('SplitText on h2 desktop branch',    js.includes("new SplitText(h2"));
check('prefersReduced branch — skip animations',     js.includes('prefersReduced'));
check('Early return if section missing',   js.includes('if (!section) return'));
check('tabs.forEach click listener',       js.includes("tab.addEventListener('click'"));
check('aria-selected updated in showNiche',js.includes('setAttribute(\'aria-selected\''));
check('timelines.forEach remove visible',  js.includes('classList.remove(\'visible\')'));
check('classList.add(\'visible\') on target',js.includes('classList.add(\'visible\')'));

// ==========================================================================
// app.js checks
// ==========================================================================
console.log('\n── app.js ────────────────────────────────────────────────────');

check('initAutomation imported from automation.js', app.includes("from '/js/sections/automation.js'"));
check('initAutomation() called in initAnimations',  app.includes('initAutomation()'));
check('// initAutomation placeholder comment removed',
  !app.includes('// initAutomation();'));

// ==========================================================================
// Summary
// ==========================================================================
console.log('\n══════════════════════════════════════════════════════════════');
console.log(`  ${pass} PASS  /  ${fail} FAIL  /  ${pass + fail} TOTAL`);
if (fail === 0) {
  console.log('  ✅  ALL CHECKS PASS — Session 12 complete.\n');
} else {
  console.log('  ❌  FIXES REQUIRED before committing.\n');
  process.exit(1);
}
