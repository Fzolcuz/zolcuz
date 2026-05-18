// exit-check-10.mjs — Session 10 Process Section exit checks
import { readFileSync } from 'fs';

const html    = readFileSync('index.html', 'utf8');
const css     = readFileSync('css/sections/process.css', 'utf8');
const js      = readFileSync('js/sections/process.js', 'utf8');
const appJs   = readFileSync('js/app.js', 'utf8');

let pass = 0;
let fail = 0;

function check(label, condition) {
  if (condition) { console.log('PASS ', label); pass++; }
  else           { console.log('FAIL ', label); fail++; }
}

// ── HTML checks ──────────────────────────────────────────────────────────────
check('process.css linked in head',           html.includes('href="/css/sections/process.css"'));
check('section.process present',              html.includes('class="process section-grain"'));
check('id="process" present',                 html.includes('id="process"'));
check('process__inner present',               html.includes('class="process__inner"'));
check('process__header present',              html.includes('class="process__header"'));
check('process__timeline is <ol>',            html.includes('<ol class="process__timeline"'));
check('role="list" on timeline',              html.includes('role="list"'));
check('4 process-step <li> elements',         (html.match(/<li class="process-step"/g) || []).length === 4);
check('data-step attributes present',         html.includes('data-step="0"') && html.includes('data-step="3"'));
check('process-step__num-wrap aria-hidden',   (html.match(/aria-hidden="true"/g) || []).length >= 4);
check('process-step__num elements (4)',       (html.match(/class="process-step__num"/g) || []).length === 4);
check('process-step__line elements (4)',      (html.match(/class="process-step__line"/g) || []).length === 4);
check('process-step__body elements (4)',      (html.match(/class="process-step__body"/g) || []).length === 4);
check('process-step__period elements (4)',    (html.match(/class="process-step__period"/g) || []).length === 4);
check('process-step__title h3 elements (4)', (html.match(/class="process-step__title"/g) || []).length === 4);
check('process-step__desc elements (4)',      (html.match(/class="process-step__desc"/g) || []).length === 4);
check('&ndash; used for ranges',              html.includes('&ndash;'));
check('&amp; used for ampersands',            html.includes('&amp;'));
check('.label span in header',                html.includes('<span class="label">How We Work</span>'));
// Scope em-dash check to the process section element only (not surrounding HTML/comments)
const processSection = html.slice(html.indexOf('<section class="process'), html.indexOf('</section><!-- /.process -->') + '</section><!-- /.process -->'.length);
check('No em dashes in process section copy',  !processSection.includes('—'));
check('&nbsp; in post-launch copy',           html.includes('30&nbsp;days'));

// ── CSS checks ───────────────────────────────────────────────────────────────
check('position:relative on .process',        css.includes('position: relative'));
check('overflow:hidden on .process',          css.includes('overflow: hidden'));
check('var(--bg-1) background',               css.includes('background: var(--bg-1)'));
check('opacity 0.35 dim state',               css.includes('opacity: 0.35'));
check('opacity 0.6 done state',               css.includes('opacity: 0.6'));
check('opacity 1 active state',               css.match(/\.process-step\.active\s*\{[^}]*opacity:\s*1/));
check('transition uses cubic-bezier not ease', css.includes('cubic-bezier(0.05, 0.7, 0.1, 1.0)') && !css.match(/transition:[^;]*\bease\b/));
check('clamp() on process-step__num',         css.match(/\.process-step__num\s*\{[^}]*clamp\(/));
check('clamp() on process-step__title',       css.match(/\.process-step__title\s*\{[^}]*clamp\(/));
check('max-width:none on desc',               css.includes('max-width: none'));
check('-webkit-line-clamp on desc',           css.includes('-webkit-line-clamp: 4'));
check('hyphens:none on title',                css.includes('hyphens: none'));
check('grid-template-columns 80px 1fr',       css.includes('grid-template-columns: 80px 1fr'));
check('tabular-nums on num',                  css.includes('font-variant-numeric: tabular-nums'));
check('connector line hidden on last-child',  css.includes('process-step:last-child .process-step__line'));
check('mobile breakpoint present',            css.includes('@media (max-width: 768px)'));
check('reduced-motion block present',         css.includes('@media (prefers-reduced-motion: reduce)'));
check('letter-spacing 0.14em on period',      css.includes('letter-spacing: 0.14em'));

// ── JS checks ────────────────────────────────────────────────────────────────
check('initProcess exported',                 js.includes('export function initProcess()'));
check('guard: section && steps',              js.includes('if (!section || !steps.length) return'));
check('setActiveStep helper defined',         js.includes('function setActiveStep(index)'));
check('classList.add done/active',            js.includes("classList.add('done')") && js.includes("classList.add('active')"));
check('gsap.matchMedia() used',               js.includes('gsap.matchMedia()'));
check('prefersReduced path present',          js.includes('prefersReduced'));
check('onEnter callback present',             js.includes('onEnter:'));
check('onEnterBack callback present',         js.includes('onEnterBack:'));
check('ScrollTrigger.create used',            js.includes('ScrollTrigger.create'));
check('No once:true on state machine ST',     !js.includes('once: true'));
check('Cleanup return fn present',            js.includes('return () => {'));
check('First step activated on load',         js.includes("steps[0].classList.add('active')"));

// ── app.js checks ────────────────────────────────────────────────────────────
check('initProcess imported in app.js',       appJs.includes("from '/js/sections/process.js'"));
check('initProcess() called',                 appJs.includes('initProcess();'));

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('');
console.log(`Results: ${pass} PASS, ${fail} FAIL`);
if (fail > 0) process.exit(1);
