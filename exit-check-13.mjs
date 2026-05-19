// exit-check-13.mjs — Session 13: AI Assistant section
// Run: node exit-check-13.mjs
// All checks must PASS before session is marked complete.

import { readFileSync } from 'fs';

const html  = readFileSync('index.html',                    'utf8');
const css   = readFileSync('css/sections/ai-assistant.css', 'utf8');
const js    = readFileSync('js/sections/ai-assistant.js',   'utf8');
const appJs = readFileSync('js/app.js',                     'utf8');

let pass = 0;
let fail = 0;
const results = [];

function check(name, condition) {
  if (condition) {
    pass++;
    results.push(`  PASS  ${name}`);
  } else {
    fail++;
    results.push(`  FAIL  ${name}`);
  }
}

// ── HTML checks ─────────────────────────────────────────────────────────────
console.log('\nHTML');

check(
  'section#ai-assistant exists in index.html',
  html.includes('id="ai-assistant"')
);
check(
  'section has class "ai-assistant section-grain"',
  html.includes('class="ai-assistant section-grain"')
);
check(
  'ai-assistant.css linked in <head>',
  html.includes('css/sections/ai-assistant.css')
);
check(
  'exactly 9 .ai-wave__bar elements',
  (html.match(/class="ai-wave__bar"/g) || []).length === 9
);
check(
  'aria-hidden="true" on #ai-wave',
  /id="ai-wave"[^>]*aria-hidden="true"|aria-hidden="true"[^>]*id="ai-wave"/.test(html)
);
check(
  'type="button" on #ai-activate-btn',
  /type="button"[^>]*id="ai-activate-btn"|id="ai-activate-btn"[^>]*type="button"/.test(html)
);
check(
  'role="region" on #ai-demo-card',
  /id="ai-demo-card"[^>]*role="region"|role="region"[^>]*id="ai-demo-card"/.test(html)
);
check(
  'aria-label="Virtual Concierge demo" on demo card',
  html.includes('aria-label="Virtual Concierge demo"')
);
check(
  'demo card has style="display:none" initial state',
  /id="ai-demo-card"[^>]*style="display:none"|style="display:none"[^>]*id="ai-demo-card"/.test(html)
);
check(
  '.ai-cost-value--crossed present in HTML',
  html.includes('ai-cost-value--crossed')
);
check(
  '.ai-cost-value--accent present in HTML',
  html.includes('ai-cost-value--accent')
);
check(
  'No "chatbot" string anywhere in HTML section',
  !html.includes('chatbot')
);
check(
  '"Virtual Concierge" or "Concierge" wording present',
  html.includes('Concierge')
);
check(
  '#ai-assistant placed after #automation in document order',
  html.indexOf('id="ai-assistant"') > html.indexOf('id="automation"')
);

// ── CSS checks ──────────────────────────────────────────────────────────────
console.log('\nCSS');

check(
  '.ai-assistant has background: var(--bg-0)',
  css.includes('background: var(--bg-0)')
);
check(
  '.ai-activate-btn transition uses cubic-bezier — no bare ease/linear',
  /\.ai-activate-btn[\s\S]*?cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)/.test(css)
);
check(
  'Hover state inside @media (hover: hover) and (pointer: fine)',
  css.includes('@media (hover: hover) and (pointer: fine)')
);
check(
  '.ai-assistant__demo-wrapper has position: relative',
  /\.ai-assistant__demo-wrapper[\s\S]*?position:\s*relative/.test(css)
);
check(
  '.ai-assistant__demo-wrapper has min-height',
  /\.ai-assistant__demo-wrapper[\s\S]*?min-height/.test(css)
);
check(
  '@media (prefers-reduced-motion: reduce) block present',
  css.includes('prefers-reduced-motion: reduce')
);
check(
  '.ai-cost-value uses var(--font-display)',
  css.includes('var(--font-display)')
);
check(
  '.ai-activate-btn uses var(--font-body)',
  /\.ai-activate-btn[\s\S]*?var\(--font-body\)/.test(css)
);
check(
  '.ai-assistant__copy p has max-width: none',
  /\.ai-assistant__copy p[\s\S]*?max-width:\s*none/.test(css)
);
check(
  '.ai-wave__bar has transform-origin: bottom center',
  css.includes('transform-origin: bottom center')
);
check(
  'Mobile breakpoint (@media max-width: 768px) present',
  css.includes('max-width: 768px')
);

// ── JS checks ───────────────────────────────────────────────────────────────
console.log('\nJS');

check(
  'export function initAiAssistant() defined',
  js.includes('export function initAiAssistant()')
);
check(
  'Guard — early return if elements missing',
  js.includes('if (!section') && js.includes('return;')
);
check(
  'gsap.matchMedia() ctx used',
  js.includes('gsap.matchMedia()')
);
check(
  'ctx cleanup return function present',
  js.includes('return () =>')
);
check(
  'IntersectionObserver used to guard wave init',
  js.includes('IntersectionObserver')
);
check(
  'waveObserver.disconnect() after first intersection',
  js.includes('waveObserver.disconnect()')
);
check(
  'IntersectionObserver threshold: 0.3',
  js.includes('threshold: 0.3')
);
check(
  'sine.inOut ease on wave bars',
  js.includes("'sine.inOut'")
);
check(
  'transformOrigin: bottom center on bars',
  js.includes("'bottom center'")
);
check(
  'delay: i * 0.08 stagger pattern',
  js.includes('i * 0.08')
);
check(
  'repeat: -1 on wave bars',
  /repeat:\s+-1/.test(js)
);
check(
  'yoyo: true on wave bars',
  /yoyo:\s+true/.test(js)
);
check(
  'gsap.killTweensOf(bars) called in showDemo',
  js.includes('gsap.killTweensOf(bars)')
);
check(
  'autoAlpha used (not raw opacity)',
  js.includes('autoAlpha') && !js.match(/opacity:\s*0[^.]/) && !js.match(/opacity:\s*1[^.]/)
);
check(
  'power3.out on scroll entrances',
  js.includes("'power3.out'")
);
check(
  'power2.out on wave fade',
  js.includes("'power2.out'")
);
check(
  'once: true on all ScrollTriggers',
  (js.match(/once:\s*true/g) || []).length >= 4
);
check(
  'SplitText only on isDesktop branch',
  js.includes('isDesktop') && js.includes('SplitText')
);
check(
  'split.revert() called in cleanup',
  js.includes('split.revert()')
);
check(
  '{ once: true } on button addEventListener',
  js.includes("addEventListener('click', showDemo, { once: true })")
);
check(
  'Embed script lazy-loaded via createElement — never on page load',
  js.includes("createElement('script')")
);
check(
  'demoCard.style.display = block before GSAP reveal',
  js.includes("demoCard.style.display = 'block'")
);
check(
  'prefersReduced path clears props and returns early',
  js.includes('reduced') && js.includes('clearProps')
);
check(
  'No "chatbot" in JS user-visible strings (SDK attr names exempt)',
  // chatbotId / YOUR_CHATBOT_ID are Chatbase SDK API params — not UI copy.
  // Rule: never say "chatbot" in copy/labels. SDK internals are exempt.
  !js.match(/'[^']*chatbot[^']*'/) || js.match(/'[^']*chatbot[^']*'/).every(m =>
    m.includes('chatbotId') || m.includes('CHATBOT_ID')
  )
);
check(
  'prefersReduced check gates IntersectionObserver wave start',
  js.includes('prefersReduced') && js.includes('waveObserver.observe')
);

// ── app.js wiring checks ─────────────────────────────────────────────────────
console.log('\napp.js wiring');

check(
  'initAiAssistant imported in app.js',
  appJs.includes("initAiAssistant") && appJs.includes("ai-assistant.js")
);
check(
  'initAiAssistant() called (uncommented) in initAnimations()',
  appJs.includes('initAiAssistant()') && !appJs.match(/\/\/\s*initAiAssistant\(\)/)
);

// ── Spec exit criteria ───────────────────────────────────────────────────────
console.log('\nSpec exit criteria');

check(
  'Wave animation guarded by IntersectionObserver (starts on enter, not page load)',
  js.includes('IntersectionObserver') && js.includes('waveObserver.observe(section)')
);
check(
  'Widget never loads until button clicked',
  js.includes("addEventListener('click', showDemo, { once: true })") &&
  js.includes("createElement('script')")
);
check(
  'Cost comparison present (crossed + accent values)',
  html.includes('ai-cost-value--crossed') && html.includes('ai-cost-value--accent')
);
check(
  'AI framed as infrastructure (no chatbot in HTML copy, SDK attrs exempt in JS)',
  !html.includes('chatbot')
);

// ── Report ───────────────────────────────────────────────────────────────────
console.log('');
results.forEach(r => console.log(r));
console.log('');
console.log(`─────────────────────────────────────────────`);
console.log(`Total: ${pass + fail} | PASS: ${pass} | FAIL: ${fail}`);
if (fail > 0) {
  console.log(`\n${fail} check(s) FAILED. Fix before marking session complete.\n`);
  process.exit(1);
} else {
  console.log(`\nAll checks PASS. Session 13 complete.\n`);
}
