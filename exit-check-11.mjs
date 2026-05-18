// exit-check-11.mjs — Session 11 Packages Section exit checks
import { readFileSync } from 'fs';

const html  = readFileSync('index.html', 'utf8');
const css   = readFileSync('css/sections/packages.css', 'utf8');
const js    = readFileSync('js/sections/packages.js', 'utf8');
const appJs = readFileSync('js/app.js', 'utf8');

let pass = 0;
let fail = 0;

function check(label, condition) {
  if (condition) { console.log('PASS ', label); pass++; }
  else           { console.log('FAIL ', label); fail++; }
}

// ── HTML checks ──────────────────────────────────────────────────────────────
check('packages.css linked in head',            html.includes('href="/css/sections/packages.css"'));
check('section.packages present',               html.includes('class="packages section-grain"'));
check('id="packages" present',                  html.includes('id="packages"'));
check('packages__inner present',                html.includes('class="packages__inner"'));
check('packages__header present',               html.includes('class="packages__header"'));
check('packages__stack present',                html.includes('class="packages__stack"'));
check('3 package-card elements',                (html.match(/class="package-card[" ]/g) || []).length >= 3);
check('package-card--featured present',         html.includes('package-card--featured'));
check('package-card__badge present',            html.includes('class="package-card__badge"'));
check('"Most Requested" badge text',            html.includes('>Most Requested<'));
check('package-card__highlight present',        html.includes('class="package-card__highlight"'));
check('"Studio Services" addons label',         html.includes('Studio Services'));
check('package-card__addons-label present',     html.includes('class="package-card__addons-label"'));
check('packages__maintenance present',          html.includes('class="packages__maintenance"'));
check('packages__maintenance-label present',    html.includes('class="packages__maintenance-label"'));
check('packages__maintenance-price present',    html.includes('class="packages__maintenance-price"'));
check('"Ongoing Partnership" label',            html.includes('Ongoing Partnership'));
check('3 package-card__amount elements',        (html.match(/class="package-card__amount"/g) || []).length === 3);
check('3 package-card__footer elements',        (html.match(/class="package-card__footer"/g) || []).length === 3);
check('.label span "The Investment"',           html.includes('<span class="label">The Investment</span>'));
check('button-primary links present',           html.includes('class="button-primary"'));
check('button-secondary present',               html.includes('class="button-secondary"'));
check('section ends with /.packages comment',   html.includes('</section><!-- /.packages -->'));

// ── CSS checks ───────────────────────────────────────────────────────────────
check('packages padding var(--space-14)',        css.includes('padding: var(--space-14)'));
check('packages__inner max-width 760px',         css.includes('max-width: 760px'));
check('packages__stack gap 2px',                 css.includes('gap: 2px'));
check('package-card position:relative',          css.includes('position: relative'));
check('hover transition uses cubic-bezier',      css.includes('cubic-bezier(0.4, 0, 0.2, 1)'));
check('no linear easing in transitions',         !css.match(/transition:[^;]*\blinear\b/));
check('featured border-color var(--accent)',     css.includes('border-color: var(--accent)'));
check('featured z-index: 1',                     css.includes('z-index: 1'));
check('@keyframes featured-pulse present',       css.includes('@keyframes featured-pulse'));
check('featured pulse uses cubic-bezier',        css.match(/@keyframes featured-pulse/) && css.includes('cubic-bezier(0.4, 0, 0.2, 1)'));
check('badge background var(--accent)',          css.includes('background: var(--accent)'));
check('accent-gold on addons-label',             css.includes('var(--accent-gold)'));
check('-webkit-line-clamp:3 on outcomes li',     css.includes('-webkit-line-clamp: 3'));
check('-webkit-line-clamp:4 on maintenance-desc',css.includes('-webkit-line-clamp: 4'));
check('first-child top border-radius',           css.includes('border-radius: 2rem 2rem 0 0'));
check('last-child bottom border-radius',         css.includes('border-radius: 0 0 2rem 2rem'));
check('mobile breakpoint present',               css.includes('@media (max-width: 768px)'));
check('reduced-motion block present',            css.includes('@media (prefers-reduced-motion: reduce)'));

// ── JS checks ────────────────────────────────────────────────────────────────
check('initPackages exported',                   js.includes('export function initPackages()'));
check('guard: if (!section) return',             js.includes('if (!section) return'));
check('gsap.matchMedia() used',                  js.includes('gsap.matchMedia()'));
check('prefersReduced path present',             js.includes('prefersReduced'));
check('clearProps used on reduced path',         js.includes('clearProps'));
check('SplitText used on h2',                    js.includes('SplitText') && js.includes('.packages h2'));
check('autoAlpha used (not opacity)',            js.includes('autoAlpha'));
check("'power3.out' easing used",               js.includes("'power3.out'"));
check('once: true on ScrollTriggers',            js.includes('once: true'));
check('isDesktop block present',                 js.includes('if (isDesktop)'));
check('isMobile block present',                  js.includes('if (isMobile)'));
check('cleanup return fn present',               js.includes('return () => {'));
check('split.revert() in cleanup',               js.includes('split.revert()'));

// ── app.js checks ────────────────────────────────────────────────────────────
check('initPackages imported in app.js',         appJs.includes("from '/js/sections/packages.js'"));
check('initPackages() called',                   appJs.includes('initPackages();'));

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('');
console.log(`Results: ${pass} PASS, ${fail} FAIL`);
if (fail > 0) process.exit(1);
