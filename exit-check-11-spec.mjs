// exit-check-11-spec.mjs
// Runs the 6 prose checks from section-packages.md exit check:
// "Single-column layout? Featured card visually distinct with teal border?
//  Assembly animation outcome highlighted? Studio Services labeled separately?
//  Maintenance block separate and clear? Mobile stack clean?"

import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const css  = readFileSync('css/sections/packages.css', 'utf8');
const js   = readFileSync('js/sections/packages.js', 'utf8');

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

// ── 1. Single-column layout ───────────────────────────────────────────────
// max-width 760px centred; flex-direction: column; gap: 2px stacked tablets
check(
  'Single-column — packages__inner max-width 760px',
  css.includes('max-width: 760px')
);
check(
  'Single-column — packages__stack flex-direction column',
  css.includes('flex-direction: column')
);
check(
  'Single-column — 2px gap between cards',
  css.includes('gap: 2px')
);

// ── 2. Featured card visually distinct with teal border ───────────────────
check(
  'Featured card — border-color var(--accent) (teal)',
  css.includes('border-color: var(--accent)')
);
check(
  'Featured card — elevated with z-index: 1',
  css.includes('z-index: 1')
);
check(
  'Featured card — ambient pulse animation present',
  css.includes('@keyframes featured-pulse')
);
check(
  'Featured card — "Most Requested" badge in HTML',
  html.includes('>Most Requested<')
);
check(
  'Featured card — badge floats at top: -12px',
  css.includes('top: -12px')
);

// ── 3. Assembly animation outcome highlighted ─────────────────────────────
check(
  'Assembly highlight — .package-card__highlight class in HTML',
  html.includes('class="package-card__highlight"')
);
check(
  'Assembly highlight — copy contains "builds on scroll"',
  html.includes('builds on scroll')
);
check(
  'Assembly highlight — text color forced to var(--text-0)',
  css.includes('color: var(--text-0) !important')
);
check(
  'Assembly highlight — arrow forced to var(--accent)',
  css.includes('color: var(--accent) !important')
);

// ── 4. Studio Services labeled separately ────────────────────────────────
check(
  'Studio Services — package-card__addons block present',
  html.includes('class="package-card__addons"')
);
check(
  'Studio Services — addons-label text is "Studio Services"',
  html.includes('Studio Services')
);
check(
  'Studio Services — addons-label color var(--accent-gold)',
  css.includes('var(--accent-gold)')
);
check(
  'Studio Services — separated by border-top',
  css.includes('border-top: 1px solid var(--border-subtle)')
);

// ── 5. Maintenance block separate and clear ───────────────────────────────
check(
  'Maintenance block — .packages__maintenance exists in HTML',
  html.includes('class="packages__maintenance"')
);
check(
  'Maintenance block — outside .packages__stack (after closing div)',
  (() => {
    const stackClose = html.lastIndexOf('</div>\n\n        <div class="packages__maintenance"');
    return stackClose !== -1 || html.includes('</div>\n\n        <div class="packages__maintenance"');
  })()
);
check(
  'Maintenance block — margin-top: 48px separation',
  css.includes('margin-top: 48px')
);
check(
  'Maintenance block — "Ongoing Partnership" label present',
  html.includes('Ongoing Partnership')
);
check(
  'Maintenance block — price $149–$199/month present',
  html.includes('$149')
);

// ── 6. Mobile stack clean ─────────────────────────────────────────────────
check(
  'Mobile stack — @media (max-width: 768px) breakpoint',
  css.includes('@media (max-width: 768px)')
);
check(
  'Mobile stack — reduced card padding on mobile',
  css.includes('padding: 28px 24px')
);
check(
  'Mobile stack — footer flex switches to column',
  css.includes('flex-direction: column') && css.includes('align-items: flex-start')
);
check(
  'Mobile stack — reduced motion respected',
  css.includes('@media (prefers-reduced-motion: reduce)')
);
check(
  'Mobile stack — JS mobile stagger lighter (0.08)',
  js.includes('0.08')
);

// ── Summary ───────────────────────────────────────────────────────────────
console.log('');
console.log(`Results: ${pass} PASS, ${fail} FAIL`);
if (fail > 0) process.exit(1);
