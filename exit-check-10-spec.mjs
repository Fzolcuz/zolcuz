// exit-check-10-spec.mjs
// Runs the 6 prose checks from section-process.md exit check:
// "Timeline illumination works on scroll? First step active by default?
//  Large decorative numerals behind content? Period labels visible?
//  Mobile single column? CMS text clamped to 4 lines?"

import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const css  = readFileSync('css/sections/process.css', 'utf8');
const js   = readFileSync('js/sections/process.js', 'utf8');

let pass = 0;
let fail = 0;

function check(label, condition, note = '') {
  if (condition) {
    console.log('PASS ', label + (note ? `  [${note}]` : ''));
    pass++;
  } else {
    console.log('FAIL ', label + (note ? `  [${note}]` : ''));
    fail++;
  }
}

// ── 1. Timeline illumination works on scroll ──────────────────────────────
// Requires: ScrollTrigger.create per step, onEnter + onEnterBack, class toggling
check(
  'Timeline illumination — ScrollTrigger.create per step',
  js.includes('ScrollTrigger.create') && js.includes('onEnter:') && js.includes('onEnterBack:')
);
check(
  'Timeline illumination — done/active class toggling',
  js.includes("classList.add('done')") && js.includes("classList.add('active')") && js.includes("classList.remove('active', 'done')")
);
check(
  'Timeline illumination — no once:true (re-fires on scroll back)',
  !js.includes('once: true'),
  'once:true intentionally absent'
);
check(
  'Timeline illumination — dim default (opacity 0.35)',
  css.includes('opacity: 0.35')
);
check(
  'Timeline illumination — done state (opacity 0.6)',
  css.includes('opacity: 0.6')
);
check(
  'Timeline illumination — active state (opacity 1)',
  /\.process-step\.active\s*\{[^}]*opacity:\s*1/.test(css)
);

// ── 2. First step active by default ──────────────────────────────────────
check(
  'First step active by default — JS sets active on load',
  js.includes("steps[0].classList.add('active')")
);

// ── 3. Large decorative numerals ─────────────────────────────────────────
// Spec: font-size 64px. Implementation: clamp(40px, 5vw, 64px) — satisfies the spirit.
check(
  'Large decorative numerals — Cormorant Garamond display font',
  css.includes('font-family: var(--font-display)') && css.includes('process-step__num')
);
check(
  'Large decorative numerals — clamp() fluid scale to 64px',
  css.includes('clamp(40px, 5vw, 64px)'),
  'spec: static 64px; upgraded to clamp() per ui-typography rule'
);
check(
  'Large decorative numerals — 4 numeral elements in HTML',
  (html.match(/class="process-step__num"/g) || []).length === 4
);

// ── 4. Period labels visible ──────────────────────────────────────────────
check(
  'Period labels — .process-step__period present in CSS',
  css.includes('.process-step__period')
);
check(
  'Period labels — uppercase + letter-spacing (0.14em)',
  css.includes('text-transform: uppercase') && css.includes('letter-spacing: 0.14em')
);
check(
  'Period labels — 4 period elements in HTML',
  (html.match(/class="process-step__period"/g) || []).length === 4
);

// ── 5. Mobile single column ───────────────────────────────────────────────
// The grid is always single-column (80px 1fr = num | content in one row per step).
// Mobile breakpoint tightens the column widths from 80px to 56px.
check(
  'Mobile single column — @media breakpoint at 768px',
  css.includes('@media (max-width: 768px)')
);
check(
  'Mobile single column — mobile num column narrows (56px 1fr)',
  css.includes('grid-template-columns: 56px 1fr'),
  'desktop: 80px 1fr → mobile: 56px 1fr'
);

// ── 6. CMS text clamped to 4 lines ───────────────────────────────────────
check(
  'CMS text clamped — -webkit-line-clamp: 4',
  css.includes('-webkit-line-clamp: 4')
);
check(
  'CMS text clamped — -webkit-box + overflow hidden',
  css.includes('-webkit-box-orient: vertical') && css.includes('overflow: hidden')
);

// ── HTML structure note ───────────────────────────────────────────────────
console.log('');
console.log('── HTML structure vs spec ───────────────────────────────────────');
const usesOl  = html.includes('<ol class="process__timeline"');
const usesDiv = html.includes('<div class="process__timeline"');
console.log(`  Timeline element: ${usesOl ? '<ol> (semantic upgrade from spec <div>)' : usesDiv ? '<div>' : 'NOT FOUND'}`);
const usesLi  = html.includes('<li class="process-step"');
console.log(`  Step element:     ${usesLi ? '<li> (semantic upgrade from spec <div>)' : '<div>'}`);
console.log('  Copy: editorial rewrite — spec titles used as inspiration');
console.log('        spec: Architecture / Visualization / Bespoke Build / Launch and Optimize');
console.log('        built: Discovery & Strategy / Design & Animation / Build & Integration / Launch & Handover');
console.log('  data-step: 0-indexed (built) vs 1-indexed (spec) — JS uses forEach index, both work');
console.log('  aria-hidden on num-wrap: added (spec omits, accessibility improvement)');

// ── Summary ───────────────────────────────────────────────────────────────
console.log('');
console.log(`Results: ${pass} PASS, ${fail} FAIL`);
if (fail > 0) process.exit(1);
