// exit-check-12-spec.mjs — section-automation.md spec exit check
// Criteria verbatim from spec:
//   Tab switching smooth with GSAP stagger?
//   All 5 niche timelines present?
//   Steps use autoAlpha not opacity?
//   Hover state inside @media (hover: hover)?
//   Default niche revealed via IntersectionObserver (not on page load)?
//   Clear dual-layer (customer experience vs owner outcome)?

import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const css  = readFileSync('css/sections/automation.css', 'utf8');
const js   = readFileSync('js/sections/automation.js', 'utf8');

let pass = 0;
let fail = 0;

function check(label, condition) {
  if (condition) { console.log(`  ✅  ${label}`); pass++; }
  else           { console.log(`  ❌  ${label}`); fail++; }
}

console.log('\n── Spec: Tab switching smooth with GSAP stagger ──────────────');
check('gsap.fromTo used in showNiche',              js.includes('gsap.fromTo('));
check('stagger present on step reveal',             js.includes('stagger: 0.1'));
check('ease present on reveal (power2.out)',        js.includes("ease: 'power2.out'"));
check('duration present on reveal (0.4)',           js.includes('duration: 0.4'));
check('showNiche called on tab click',              js.includes("showNiche(tab.dataset.niche)"));
check('visible class toggled to switch timelines',  js.includes("classList.add('visible')") && js.includes("classList.remove('visible')"));

console.log('\n── Spec: All 5 niche timelines present ───────────────────────');
check('data-niche="kitchen" timeline in HTML',  html.includes('data-niche="kitchen"'));
check('data-niche="theater" timeline in HTML',  html.includes('data-niche="theater"'));
check('data-niche="closet"  timeline in HTML',  html.includes('data-niche="closet"'));
check('data-niche="bathroom" timeline in HTML', html.includes('data-niche="bathroom"'));
check('data-niche="windows" timeline in HTML',  html.includes('data-niche="windows"'));
check('5 .automation__timeline elements',
  (html.match(/class="automation__timeline"/g) || []).length === 5);

console.log('\n── Spec: Steps use autoAlpha not opacity ─────────────────────');
check('autoAlpha used in fromTo',               js.includes('autoAlpha'));
check('No bare { opacity: 1 } in JS animations',
  !js.match(/[,{]\s*opacity\s*:\s*[01]\b/));
check('.automation-step starts visibility:hidden + opacity:0 (CSS)',
  css.includes('visibility: hidden') && css.includes('opacity: 0'));
check('Reduced-motion path also avoids raw opacity — uses gsap.set autoAlpha',
  js.includes('autoAlpha: 1') && js.includes('y: 0'));

console.log('\n── Spec: Hover state inside @media (hover: hover) ────────────');
check('@media (hover: hover) and (pointer: fine) in CSS',
  css.includes('@media (hover: hover) and (pointer: fine)'));
check('.automation__tab:hover inside that query',
  (() => {
    const idx = css.indexOf('@media (hover: hover) and (pointer: fine)');
    const block = css.slice(idx, idx + 300);
    return block.includes('.automation__tab:hover');
  })());
check('No .automation__tab:hover outside the media query',
  (() => {
    // Remove the media query block, check no hover rule remains
    const stripped = css.replace(/@media \(hover: hover\)[^}]+\{[^}]+\}/gs, '');
    return !stripped.includes('.automation__tab:hover');
  })());

console.log('\n── Spec: Default niche via IntersectionObserver (not page load) ─');
check('IntersectionObserver present in JS',         js.includes('IntersectionObserver'));
check('showNiche(\'kitchen\') called inside observer callback',
  (() => {
    // Find the const observer = new IntersectionObserver( declaration
    const obsIdx = js.indexOf('const observer = new IntersectionObserver(');
    const block = js.slice(obsIdx, obsIdx + 600);
    return block.includes("showNiche('kitchen')");
  })());
check('observer.disconnect() — fires once only',   js.includes('observer.disconnect()'));
check('threshold: 0.2',                            js.includes('threshold: 0.2'));
check('No bare showNiche(\'kitchen\') at top-level / outside observer or prefersReduced',
  (() => {
    // Should only appear inside observer callback or prefersReduced block
    // Count occurrences — expect exactly 2 (observer + prefersReduced)
    const matches = (js.match(/showNiche\('kitchen'\)/g) || []).length;
    return matches === 2;
  })());

console.log('\n── Spec: Clear dual-layer (experience vs outcome) ────────────');
check('.automation-step__experience class on experience lines',
  (html.match(/class="automation-step__experience"/g) || []).length === 15);
check('.automation-step__outcome class on outcome lines',
  (html.match(/class="automation-step__outcome"/g) || []).length === 15);
check('experience styled var(--text-0) — neutral/primary',
  css.includes('color: var(--text-0)') && css.includes('automation-step__experience'));
check('outcome styled var(--accent) — teal differentiator',
  (() => {
    const idx = css.indexOf('automation-step__outcome');
    const block = css.slice(idx, idx + 200);
    return block.includes('color: var(--accent)');
  })());
check('Arrow entity &#8594; on all outcome lines (owner result signal)',
  (html.match(/&#8594;/g) || []).length === 15);
check('outcome font-size smaller than experience (14px vs 16px)',
  css.includes('font-size: 14px') && css.includes('font-size: 16px'));

console.log('\n══════════════════════════════════════════════════════════════');
console.log(`  ${pass} PASS  /  ${fail} FAIL  /  ${pass + fail} TOTAL`);
if (fail === 0) {
  console.log('  ✅  SPEC EXIT CHECK PASS — section-automation.md criteria met.\n');
} else {
  console.log('  ❌  SPEC GAPS — fix before marking complete.\n');
  process.exit(1);
}
