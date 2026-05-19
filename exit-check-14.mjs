/**
 * exit-check-14.mjs — Session 14: About Section
 * Run: node exit-check-14.mjs
 */

import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const css  = readFileSync('css/sections/about.css', 'utf8');
const js   = readFileSync('js/sections/about.js', 'utf8');
const app  = readFileSync('js/app.js', 'utf8');

let pass = 0;
let fail = 0;

function check(label, condition) {
  if (condition) {
    console.log(`  ✓  ${label}`);
    pass++;
  } else {
    console.error(`  ✗  ${label}`);
    fail++;
  }
}

// ── HTML checks ──────────────────────────────────────────────────────────────
console.log('\nHTML');
check('Section #about exists',                     html.includes('id="about"'));
check('class="about section-grain" present',       html.includes('class="about section-grain"'));
check('about__inner wrapper present',              html.includes('class="about__inner"'));
check('about__grid present',                       html.includes('class="about__grid"'));
check('about__statement-col present',              html.includes('class="about__statement-col"'));
check('label "The Studio" present',                html.includes('>The Studio<'));
check('about__h2 present',                         html.includes('class="about__h2"'));
check('H2 copy: Built for Premium.',               html.includes('Built for Premium.'));
check('H2 copy: Engineered for Performance.',      html.includes('Engineered for Performance.'));
check('Two .about__body paragraphs',               (html.match(/class="about__body"/g) || []).length === 2);
check('about__details present',                    html.includes('class="about__details"'));
check('about__rule present',                       html.includes('class="about__rule"'));
check('about__rule aria-hidden',                   html.includes('class="about__rule" aria-hidden="true"'));
check('about__detail-list present',                html.includes('class="about__detail-list"'));
check('role="list" on detail list',                html.includes('class="about__detail-list" role="list"'));
check('Five .about__detail-item elements',         (html.match(/class="about__detail-item"/g) || []).length === 5);
check('Niche dot: var(--niche-kitchen)',           html.includes('var(--niche-kitchen)'));
check('Niche dot: var(--niche-theater)',           html.includes('var(--niche-theater)'));
check('Niche dot: var(--niche-closet)',            html.includes('var(--niche-closet)'));
check('Niche dot: var(--niche-bathroom)',          html.includes('var(--niche-bathroom)'));
check('Niche dot: var(--niche-windows)',           html.includes('var(--niche-windows)'));
check('Custom Kitchen listed',                     html.includes('Custom Kitchen'));
check('Home Theater listed',                       html.includes('Home Theater'));
check('Custom Closet listed',                      html.includes('Custom Closet'));
check('Bathroom Renovation listed',                html.includes('Bathroom Renovation'));
check('Luxury Windows listed',                     html.includes('Luxury Windows'));
check('about__meta present',                       html.includes('class="about__meta"'));
check('Three .about__meta p items',                (html.match(/class="about__meta"/g) || []).length >= 1);
check('CSS link: about.css in head',               html.includes('href="/css/sections/about.css"'));
check('CSS link after ai-assistant.css',           html.indexOf('about.css') > html.indexOf('ai-assistant.css'));
check('Section placed after #ai-assistant',        html.indexOf('id="about"') > html.indexOf('id="ai-assistant"'));
check('No raw & in headings (use &amp;)',           !html.match(/class="about__h2"[^<]*>[^<]*&[^a-z#]/));
check('No raw mailto: link',                       !html.includes('mailto:'));

// ── CSS checks ───────────────────────────────────────────────────────────────
console.log('\nCSS');
check('background: var(--bg-1) on .about',         css.includes('background: var(--bg-1)'));
check('var(--font-body) on .about__body',          css.includes("font-family: var(--font-body)"));
check('max-width: 56ch on .about__body',           css.includes('max-width: 56ch'));
check('max-width: none on mobile body',            css.includes('max-width: none'));
check('list-style: none on detail-list',           css.includes('list-style: none'));
check('padding: 0 on detail-list',                 css.includes('padding: 0'));
check('1px grid mobile breakpoint',                css.includes('grid-template-columns: 1fr'));
check('@media max-width: 768px present',           css.includes('max-width: 768px'));
check('@media prefers-reduced-motion present',     css.includes('prefers-reduced-motion'));
check('animation-duration: 0.01ms in reduced',     css.includes('animation-duration: 0.01ms'));
check('transition-duration: 0.01ms in reduced',    css.includes('transition-duration: 0.01ms'));
check('No raw #000000',                            !css.includes('#000000'));
check('No raw #ffffff',                            !css.toLowerCase().includes('#ffffff'));
check('No banned font: Inter',                     !css.match(/\binter\b/i));
check('No banned font: Roboto',                    !css.toLowerCase().includes('roboto'));
check('No banned font: Arial',                     !css.toLowerCase().includes('arial'));
check('No banned font: Poppins',                   !css.toLowerCase().includes('poppins'));
check('No banned font: Montserrat',                !css.toLowerCase().includes('montserrat'));
check('writing-mode: vertical-rl on rule label',   css.includes('writing-mode: vertical-rl'));
check('border-left on .about__details',            css.includes('border-left: 1px solid var(--border-subtle)'));
check('border-top on .about__meta',                css.includes('border-top: 1px solid var(--border-subtle)'));
check('letter-spacing: 0.2em on rule label',       css.includes('letter-spacing: 0.2em'));
check('letter-spacing: 0.1em on meta p',           css.includes('letter-spacing: 0.1em'));
check('text-transform: uppercase on meta p',       css.includes('text-transform: uppercase'));
check('flex-shrink: 0 on detail-dot',              css.includes('flex-shrink: 0'));

// ── JS checks ────────────────────────────────────────────────────────────────
console.log('\nJavaScript');
check('export function initAbout()',               js.includes('export function initAbout()'));
check('getElementById("about") guard',             js.includes("getElementById('about')") || js.includes('getElementById("about")'));
check('gsap.matchMedia() used',                    js.includes('gsap.matchMedia()'));
check('isDesktop condition',                       js.includes('isDesktop'));
check('isMobile condition',                        js.includes('isMobile'));
check('prefersReduced condition',                  js.includes('prefersReduced'));
check('prefersReduced branch: gsap.set clearProps', js.includes("clearProps: 'all'"));
check('SplitText on .about__h2',                   js.includes("'.about__h2'") || js.includes('".about__h2"'));
check('split = new SplitText',                     js.includes('new SplitText'));
check('stagger: 0.018 on chars',                   js.includes('stagger: 0.018'));
check('split?.revert() in cleanup',                js.includes('split?.revert()'));
check('return () => cleanup pattern',              js.includes('return () => {'));
check('once: true on all ScrollTriggers',          (js.match(/once:\s*true/g) || []).length >= 4);
check('autoAlpha used (not opacity)',              js.includes('autoAlpha'));
check('No bare opacity: 0 animations',             !js.match(/\bopacity:\s*0\b/));
check('power3.out ease used',                      js.includes("'power3.out'"));
check('No bare ease string',                       !js.match(/'ease'\s*:/));
check('stagger: 0.07 on detail items (desktop)',   js.includes('stagger: 0.07'));
check('stagger: 0.06 on meta p (desktop)',         js.includes('stagger: 0.06'));
check('stagger: 0.05 on detail items (mobile)',    js.includes('stagger: 0.05'));
check('start: "top 80%" on desktop triggers',      js.includes("'top 80%'"));
check('start: "top 85%" on mobile triggers',       js.includes("'top 85%'"));
check('.about__statement-col .label targeted',     js.includes("'.about__statement-col .label'"));
check('.about__body targeted',                     js.includes("'.about__body'"));
check('.about__detail-item targeted',              js.includes("'.about__detail-item'"));
check('.about__meta p targeted',                   js.includes("'.about__meta p'"));
check('.about__details targeted',                  js.includes("'.about__details'"));

// ── app.js checks ─────────────────────────────────────────────────────────────
console.log('\napp.js');
check('import initAbout present',                  app.includes("from '/js/sections/about.js'"));
check('initAbout() called (uncommented)',           app.match(/^\s*initAbout\(\)/m) !== null);
check('initAbout after initAiAssistant',           app.indexOf('initAbout()') > app.indexOf('initAiAssistant()'));

// ── Summary ──────────────────────────────────────────────────────────────────
const total = pass + fail;
console.log(`\n${'─'.repeat(50)}`);
console.log(`Session 14 exit check: ${pass}/${total} PASS`);
if (fail > 0) {
  console.error(`\n${fail} check(s) failed — do not commit.\n`);
  process.exit(1);
} else {
  console.log('\nAll checks pass. Ready to commit.\n');
}
