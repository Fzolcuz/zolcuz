// exit-check-15.mjs — Session 15: Footer
// Run: node exit-check-15.mjs
// All checks must PASS before session is marked complete.

import { readFileSync } from 'fs';

const html    = readFileSync('./index.html',                'utf8');
const css     = readFileSync('./css/sections/footer.css',   'utf8');
const js      = readFileSync('./js/sections/footer.js',     'utf8');
const appJs   = readFileSync('./js/app.js',                 'utf8');

let passed = 0;
let failed = 0;

function check(id, description, condition) {
  if (condition) {
    console.log(`  ✓ [${String(id).padStart(2, '0')}] ${description}`);
    passed++;
  } else {
    console.error(`  ✗ [${String(id).padStart(2, '0')}] FAIL: ${description}`);
    failed++;
  }
}

console.log('\nSession 15 — Footer exit checks\n');

// ── HTML structure ────────────────────────────────────────────────────────
check(1,  '<footer id="contact"> exists',
  html.includes('id="contact"') && html.includes('<footer'));

check(2,  'footer.css linked in <head>',
  html.includes('href="/css/sections/footer.css"'));

check(3,  '#footer-form present',
  html.includes('id="footer-form"'));

check(4,  '#footer-email input present',
  html.includes('id="footer-email"'));

check(5,  'type="email" on input',
  html.includes('type="email"'));

check(6,  'autocomplete="email" on input',
  html.includes('autocomplete="email"'));

check(7,  'novalidate on form',
  html.includes('novalidate'));

check(8,  'cf-turnstile div present inside form',
  html.includes('class="cf-turnstile"') && html.includes('data-theme="dark"'));

check(9,  'footer-linkedin anchor present with href="#" (set via JS)',
  html.includes('id="footer-linkedin"') && html.includes('href="#"'));

check(10, 'LinkedIn href NOT hardcoded to linkedin.com in HTML',
  !html.includes('id="footer-linkedin" href="https://linkedin.com'));

check(11, 'No raw mailto: link in HTML',
  !html.includes('href="mailto:'));

check(12, '4 footer__badge elements',
  (html.match(/class="footer__badge"/g) || []).length === 4);

check(13, '3 footer__links anchors (Privacy, Terms, LinkedIn)',
  html.includes('>Privacy<') &&
  html.includes('>Terms<') &&
  html.includes('>LinkedIn<'));

check(14, '.footer__meta wrapper present',
  html.includes('class="footer__meta"'));

check(15, '.footer__divider present',
  html.includes('class="footer__divider"'));

check(16, 'footer__copyright placeholder present',
  html.includes('class="footer__copyright"'));

check(17, 'footer__micro copy present',
  html.includes('class="footer__micro"'));

check(18, 'section-grain class on footer',
  html.includes('class="footer section-grain"'));

check(19, '&#8209; non-breaking hyphen used in micro copy (no bare hyphens in phrases)',
  html.includes('&#8209;'));

check(20, '&#8212; em-dash entity used in micro copy',
  html.includes('&#8212;'));

// ── CSS rules ─────────────────────────────────────────────────────────────
check(21, 'background: var(--bg-0) on .footer',
  css.includes('background: var(--bg-0)'));

check(22, 'font-size: 16px on .footer__email-input (iOS zoom fix)',
  css.includes('font-size: 16px'));

check(23, 'flex-direction: column at ≤600px',
  css.includes('flex-direction: column'));

check(24, 'width: 100% on .footer__cta at ≤600px',
  css.includes('width: 100%'));

check(25, 'cubic-bezier used on transitions (no bare ease/linear)',
  css.includes('cubic-bezier') && !css.match(/transition:[^;]*\bease\b[^;]*;/));

check(26, 'hover states inside @media (hover: hover) and (pointer: fine)',
  css.includes('@media (hover: hover) and (pointer: fine)'));

check(27, '@media (prefers-reduced-motion: reduce) block present',
  css.includes('@media (prefers-reduced-motion: reduce)'));

check(28, 'No #000000 or #ffffff raw values (use tokens or approved darks)',
  !css.includes('#000000') && !css.includes('#ffffff') &&
  !css.includes('#000 ') && !css.includes('#fff ') &&
  !css.includes('#fff;') && !css.includes('#000;'));

check(29, '.footer.section-grain::after disables grain tint',
  css.includes('.footer.section-grain::after'));

check(30, 'border-radius: 100px on .footer__badge (pill shape)',
  css.includes('border-radius: 100px'));

// ── JavaScript ────────────────────────────────────────────────────────────
check(31, 'export function initFooter() present',
  js.includes('export function initFooter()'));

check(32, 'LinkedIn obfuscated via concatenation',
  js.includes("'https://linkedin.com/company/' + 'zolcuz' + '-studios'"));

check(33, 'Copyright year via new Date().getFullYear()',
  js.includes('new Date().getFullYear()'));

check(34, 'Form POSTs to /api/submit (not a third-party URL)',
  js.includes("fetch('/api/submit'") && !js.includes('resend.com') && !js.includes('sendgrid'));

check(35, 'Cold-start timeout at 2000ms',
  js.includes('2000'));

check(36, 'Turnstile token retrieved via window.turnstile?.getResponse()',
  js.includes('window.turnstile?.getResponse()'));

check(37, 'cf-turnstile-response included in POST body',
  js.includes("'cf-turnstile-response'"));

check(38, 'source: "footer" in POST body',
  js.includes("source:") && js.includes("'footer'"));

check(39, 'gsap.matchMedia() ctx present',
  js.includes('gsap.matchMedia()'));

check(40, 'prefersReduced branch present',
  js.includes('prefersReduced'));

check(41, 'SplitText on headline — desktop only',
  js.includes('new SplitText(headline') && js.includes('isDesktop'));

check(42, 'stagger: 0.018 on chars (spec value)',
  js.includes('stagger:   0.018'));

check(43, 'autoAlpha used (not opacity) for all GSAP reveals',
  js.includes('autoAlpha') && !js.match(/opacity:\s*0\s*[,}]/));

check(44, 'once: true on all ScrollTriggers',
  (js.match(/once:\s*true/g) || []).length >= 4);

check(45, 'power3.out ease used',
  js.includes("'power3.out'"));

check(46, 'split?.revert() cleanup in isDesktop return',
  js.includes('split?.revert()'));

check(47, 'prefersReduced path uses clearProps: "all"',
  js.includes("clearProps: 'all'"));

check(48, 'null guards on all DOM queries (.filter(Boolean) or if checks)',
  js.includes('.filter(Boolean)') || js.includes('if (headline)'));

// ── app.js wiring ─────────────────────────────────────────────────────────
check(49, 'initFooter imported in app.js',
  appJs.includes("import { initFooter }") && appJs.includes("from '/js/sections/footer.js'"));

check(50, 'initFooter() called (not commented out)',
  appJs.includes('initFooter();') && !appJs.includes('// initFooter();'));

// ── Summary ───────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(48)}`);
console.log(`  ${passed} passed  |  ${failed} failed  |  ${passed + failed} total`);
console.log(`${'─'.repeat(48)}\n`);

if (failed > 0) {
  console.error('  FAIL — fix the above before marking session complete.\n');
  process.exit(1);
} else {
  console.log('  PASS — all exit checks passed. Session 15 complete.\n');
}
