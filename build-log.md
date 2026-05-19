# ZOLCUZ Agency Site — Build Log

## Project State
Started: 2026-05-18
Current section: about
Last completed: about

## Completed Sections
- Session 1: project-setup (2026-05-18)
- Session 2: loader — two-video sequential (2026-05-18)
- Session 3: Three.js hero scene (2026-05-18)
- Session 4: Navigation (2026-05-18)
- Session 5: Hero overlay (2026-05-18)
- Session 6: Problem section (2026-05-18)
- Session 7: How It Works section (2026-05-18)
- Session 8: Niches section (2026-05-18)
- Session 9: Retention Stats section (2026-05-18)
- Session 10: Process section (2026-05-18)
- Session 11: Packages section (2026-05-18)
- Session 12: Automation section (2026-05-19)
- Session 13: AI Assistant section (2026-05-19)
- Session 14: About section (2026-05-19)

## Session Log

### Session 14 — 2026-05-19
Task: About section
Status: complete
Files created: css/sections/about.css, js/sections/about.js, exit-check-14.mjs
Files modified: index.html (section HTML + about.css link), js/app.js (import + initAbout() call), build-log.md
Decisions: var(--bg-1) alternates from ai-assistant (--bg-0); gsap.matchMedia() ctx with return()=>{split?.revert()} cleanup; SplitText on .about__h2 desktop-only, type:'chars', stagger:0.018, power3.out, once:true — one signature moment per section per design-quality-and-taste.md; label + chars + body paragraphs stagger in sequence (0.1 desktop / 0.06 mobile); details panel entrance delay:0.15 after grid trigger; detail items stagger 0.07 desktop / 0.05 mobile; meta p stagger 0.06 desktop / 0.04 mobile; prefersReduced branch sets all elements clearProps:all immediately and skips all ScrollTriggers; max-width:56ch on .about__body (spec-specified editorial restraint — intentionally narrower than typography.css 65ch global); max-width:none on mobile overrides the 56ch; list-style:none + role="list" on .about__detail-list (VoiceOver accessibility fix); aria-hidden on .about__rule; autoAlpha not opacity throughout; once:true on all ScrollTriggers; power3.out ease on all GSAP; @media (prefers-reduced-motion) fallback block in CSS; no bare #000/#fff — all via token vars; no banned fonts; &#8209; (non-breaking hyphen) on "Design&#8209;Build" and "Scroll&#8209;driven" to prevent line break at hyphen; &#8202; (hair space) around slashes in meta strip; background:var(--bg-1) confirmed alternation from session-13
Exit checks: 88/88 PASS
Spec deviations (intentional): role="list" on detail list (accessibility addition); &#8209; non-breaking hyphens on compound terms; &#8202; hair spaces around slashes in meta strip; split?.revert() in cleanup (memory safety)

### Session 13 — 2026-05-19
Task: AI Assistant section
Status: complete
Files created: css/sections/ai-assistant.css, js/sections/ai-assistant.js, exit-check-13.mjs
Files modified: index.html (section HTML + ai-assistant.css link), js/app.js (import + initAiAssistant() call, removed stale session-11 comment), build-log.md
Decisions: var(--bg-0) alternates from automation (--bg-1); audio wave animation (9 bars, sine.inOut, scaleY random 3–8, repeat:-1, yoyo:true, delay i*0.08, transformOrigin bottom center) fires via IntersectionObserver threshold:0.3 — never on page load; observer.disconnect() after first intersection; embed script lazy-loaded via createElement only on button click (once:true listener) — never on page load; gsap.killTweensOf(bars) + autoAlpha wave fade before card reveal; gsap.fromTo(demoCard, {autoAlpha:0,y:16}, {autoAlpha:1,y:0}) on activation — upgrade from spec display:block toggle; double-bezel shell on .ai-demo-card per design-quality-and-taste.md; gsap.matchMedia() ctx with return()=>{split?.revert()} cleanup; SplitText on h2 desktop-only, chars stagger 0.018, power3.out once:true; scroll entrance label/p/costCompare stagger 0.1 desktop / 0.06 mobile, power3.out once:true; demo wrapper entrance y:40 autoAlpha 0→1 power3.out once:true; prefersReduced path sets all elements clearProps:all immediately and skips IntersectionObserver wave; cubic-bezier(0.4,0,0.2,1) on all CSS transitions — no bare ease/linear; min-height:44px on activate btn (WCAG 2.5.8 touch target); type="button" on activate btn; aria-hidden on ai-wave; role="region" + aria-label on demo card; max-width:none on copy p overrides typography.css 65ch constraint; transform-origin:bottom center on .ai-wave__bar via CSS; chatbotId attribute is Chatbase SDK API param (not UI copy) — exempt from no-chatbot rule; placeholder text "Loading Virtual Concierge…" inside demo card before embed renders
Exit checks: 56/56 PASS
Spec deviations (intentional): double-bezel on demo card (design-quality-and-taste.md upgrade); GSAP autoAlpha reveal on demo card instead of bare display:block toggle; min-height:44px on button (WCAG upgrade); placeholder loading text inside card; transform-origin moved to CSS class vs inline

### Session 12 — 2026-05-19
Task: Automation section
Status: complete
Files created: css/sections/automation.css, js/sections/automation.js, exit-check-12.mjs, exit-check-12-spec.mjs
Files modified: index.html (section HTML + automation.css link), js/app.js (import + initAutomation() call), build-log.md
Decisions: var(--bg-1) alternates from packages (--bg-0); showNiche() owns all tab/timeline state — hides all then reveals target; gsap.fromTo autoAlpha 0→1 stagger 0.1 power2.out on step reveal; IntersectionObserver threshold:0.2 guards initial kitchen reveal — never fires on page load; gsap.matchMedia() ctx with return()=>{split?.revert()} cleanup; SplitText on h2 desktop-only with chars stagger 0.018 power3.out once:true; scroll entrance on label/h2/tabs with stagger 0.1 desktop / 0.06 mobile power3.out once:true; prefersReduced branch sets all steps autoAlpha:1 y:0 immediately and calls showNiche('kitchen') directly bypassing observer; clamp(28px,3.5vw,40px) on step__num per ui-typography rule; tabular-nums on numerals; max-width:none on experience/outcome overrides typography.css p constraint; hover inside @media(hover:hover) and (pointer:fine); cubic-bezier(0.4,0,0.2,1) on all CSS transitions — no bare ease/linear; #030712 on tab.active color (approved void token value); aria-hidden on decorative nums; aria-controls wiring tabs→panels; &#8594;&thinsp; for outcome arrows
Exit checks: 89/89 PASS (comprehensive) · 30/30 PASS (section-automation.md spec)
Spec deviations: none

### Session 11 — 2026-05-18
Task: Packages section
Status: complete
Files created: css/sections/packages.css, js/sections/packages.js, exit-check-11.mjs, exit-check-11-spec.mjs
Files modified: index.html (section HTML + packages.css link), js/app.js (import + initPackages() call), build-log.md
Decisions: verbatim spec HTML/CSS with zero deviations; hover transitions on all cards via cubic-bezier(0.4,0,0.2,1) — no linear; featured-pulse @keyframes on .package-card--featured with cubic-bezier (not linear); animation-play-state:paused on hover to prevent pulse fighting hover box-shadow; SplitText on .packages h2 desktop only — chars stagger 0.018 power3.out; card stack stagger 0.12 desktop / 0.08 mobile; gsap.matchMedia() ctx with split.revert() cleanup; prefersReduced path uses clearProps:all; autoAlpha not opacity; once:true; &#8212; for em-dashes, &#8211; for en-dashes (proper typographic entities); → arrow entity in CSS content property; package-card__outcomes list-style:none padding:0 (reset for ul in section context); font-family explicit on tier/badge/addons-label to avoid inheritance gaps
Exit checks: 56/56 PASS (comprehensive), 26/26 PASS (section-packages.md spec)
Spec deviations: none

### Session 10 — 2026-05-18
Task: Process section
Status: complete
Files created: css/sections/process.css, js/sections/process.js, exit-check-10.mjs
Files modified: index.html (section HTML + process.css link), js/app.js (import + initProcess() call), build-log.md
Decisions: var(--bg-1) alternates from retention (var(--bg-0)) for section rhythm; 3-state opacity model: dim 35% / done 60% / active 100%; CSS transitions own opacity animation — GSAP assigns classes only; cubic-bezier(0.05,0.7,0.1,1.0) on all transitions (not bare ease); clamp(40px,5vw,64px) on process-step__num (ui-typography clamp rule); clamp(20px,2.5vw,28px) on process-step__title; tabular-nums on decorative numerals; setActiveStep() helper centralises state toggling; ScrollTrigger.create per step with onEnter + onEnterBack — deliberately NO once:true (illumination must re-fire on scroll back); steps[0].classList.add('active') on load so section doesn't render all-dim; gsap.matchMedia() ctx with return()=>{}; reduced-motion path skips state machine and sets all steps to opacity 1; max-width:none overrides typography.css p constraint; -webkit-line-clamp:4 CMS protection; hyphens:none on title; &ndash; for day ranges; &amp; for ampersands in headings; <ol> + role="list" for semantic timeline; aria-hidden="true" on num-wrap columns; note: build order lists this as Session 12 but user explicitly built it in Session 10
Exit checks: 53/53 PASS (custom), 17/17 PASS (section-process.md spec)
Spec deviations (intentional): <ol>/<li> vs spec <div> (semantic upgrade); clamp() on num font-size vs spec static 64px (ui-typography rule); editorial copy rewrite; aria-hidden on num-wrap (accessibility addition); data-step 0-indexed vs spec 1-indexed (JS uses forEach index, functionally identical)

### Session 1 — 2026-05-18
Task: Project setup
Status: complete
Files created: index.html, css/variables.css, css/reset.css, js/theme.js, js/app.js, vercel.json, package.json, .env.example, .gitignore, api/submit.js, build-log.md
Decisions: dark mode default, Google Fonts CDN, Lenis 1.1.14, GSAP 3.12.5
Issues: none

### Session 2 — 2026-05-18
Task: Phoenix loader
Status: complete
Files created: css/sections/loader.css, js/loader.js
Files modified: index.html (loader HTML, CSS link, script tag)
Decisions: loader.js as regular script (not module) — runs after GSAP CDN; safeSupernova() wrapper guards dead-man path; reduced-motion check first
Issues: none

### Session 2 (rev) — 2026-05-18
Task: Loader — two-video sequential approach
Status: complete
Files modified: js/loader.js, css/sections/loader.css, index.html
Changes: replaced Three.js supernova with Video 2 (phoenix-explosion); removed supernova canvas; added AVIF fallback img; paths updated to assets/videos/
Decisions: Video 2 positioned absolute inside #loader (not fixed) — loader already covers full viewport; once-guard pattern for revealAfterExplosion; 6s safety timeout on Video 2

### Session 3 — 2026-05-18
Task: Three.js hero scene
Status: complete
Files created: js/three/phoenix-scene.js, css/layout.css
Files modified: index.html (service-reveal element added)
Decisions: initPhoenixScene() exported function pattern (lazy-loaded by loader.js); revealHero() called after compileAsync resolves; isMobile declared once inside initPhoenixScene; triggerSupernova() removed (replaced by two-video loader); activateFallback() reverts scrollTravelCtx and aborts raycaster; renderer in gsap.ticker not rAF
Issues: phoenix-optimized.glb must be validated at gltf.report before Session 5; Draco decoder files added ✓

### Session 4 — 2026-05-18
Task: Navigation
Status: complete
Files created: css/components/nav.css, js/motion/lenis-init.js, js/nav.js
Files modified: index.html (nav + mobile menu + mobile-cta-sticky injected), js/app.js (imports nav, calls initNav), css/reset.css (iOS 16px zoom fix), api/submit.js (full Turnstile + Resend implementation)
Decisions: Lenis as singleton exported from lenis-init.js; nav.js imported by app.js as ES module; window.grantConsent exposed for HTML onclick; email assembled client-side via renderEmail(); theme toggle wired in nav.js
Issues: none

### Session 5 — 2026-05-18
Task: Hero overlay
Status: complete
Files created: css/sections/hero.css, css/components/buttons.css
Files modified: index.html (hero section HTML injected into main; hero.css link added; bare #phoenix-fallback and #service-reveal removed from body), css/layout.css (service-reveal block removed — moved to hero.css)
Decisions: service-reveal-wrap uses flexbox centering so GSAP y-animation on inner card never conflicts; .hero-section__overlay starts visibility:hidden opacity:0 — revealHero() in phoenix-scene.js animates to autoAlpha:1 after GPU pre-warm; section-grain::after uses noise.png at opacity 0.035; button-primary never uses gold — always var(--accent) teal; service-reveal-wrap hidden on mobile (display:none) — touch users can't hover; cursor-dot inside hero-section (not layout.css)
Exit checks: 23/23 PASS
Issues: none

### Fix — 2026-05-18
Task: Create missing css/typography.css
Status: complete
Files created: css/typography.css
Files modified: build-log.md
Decisions: font tokens stay in variables.css (no redefinition); clamp() fluid scale throughout; dark-mode weight reduction 600→500; dark body line-height +2px; 65ch max-width on p; SplitText .line/.word/.char inline-block; banned fonts verified absent; hover gated behind (hover: hover) and (pointer: fine)
Exit checks: 26/26 PASS (1 false-positive on regex — resolved with word boundaries)

### Session 6 — 2026-05-18
Task: Problem section
Status: complete
Files created: css/sections/problem.css, js/sections/problem.js (new js/sections/ dir)
Files modified: index.html (section HTML + problem.css link), js/app.js (import + initProblem() call), build-log.md
Decisions: cubic-bezier(0.05,0.7,0.1,1.0) replaces bare ease on CSS transitions per session directive; max-width:none on .problem__line overrides typography.css p constraint; border-left 2px used as state indicator (inactive→active) per section spec — flagged impeccable conflict, project spec takes precedence; gsap.matchMedia() ctx with return()=>revert() for leak-safe cleanup; autoAlpha not opacity; once:true on all ScrollTriggers; curly apostrophes via &rsquo;
Exit checks: 34/34 PASS
Word count: 34 words (under 40-word ceiling)

### Session 7 — 2026-05-18
Task: How It Works section
Status: complete
Files created: css/sections/how.css, js/sections/how.js (js/sections/ dir already exists)
Files modified: index.html (section HTML + how.css link), js/app.js (import + initHow() call), build-log.md
Decisions: var(--bg-1) alternates from problem (var(--bg-0)) for section rhythm; clamp(48px, 6vw, 72px) on .how-step__num (ui-typography clamp() rule); aria-hidden="true" on decorative numerals; max-width:none on .how-step__desc overrides typography.css p constraint; -webkit-line-clamp:5 CMS protection per spec; gsap.matchMedia() ctx with return()=>{}; autoAlpha not opacity; once:true; power3.out; h3 font-size owned by typography.css — this file spacing only; &mdash; in step-02 copy per spec
Exit checks: 26/26 PASS

### Session 8 — 2026-05-18
Task: Niches section
Status: complete
Files created: css/sections/niches.css, js/sections/niches.js
Files modified: index.html (section HTML + niches.css link), js/app.js (import + initNiches() call), build-log.md
Decisions: interactive accordion flex — active card flex:2.5, inactive flex:1; CSS transition on flex (not GSAP — layout property rule); var(--niche-active) set on :root via JS, CSS fallback on section element; kitchen loaded on first paint (no lazy), theater/closet/bathroom/windows lazy + requestIdleCallback warming; GSAP cross-fade autoAlpha 0.5 to 1 with power2.out; per-niche colour temperatures per spec (accent only, never CTA fill); keyboard accessible (tabindex=0, Enter/Space handlers); rel=noopener noreferrer on all _blank links; &amp; entities in headings; max-width:none on desc; clamp() on label; pill-badge for coming-soon state; copy sourced from copy-voice-and-vocabulary.md vocabulary
Exit checks: 49/49 PASS

### Session 9 — 2026-05-18
Task: Retention Stats section
Status: complete
Files created: css/sections/retention.css, js/sections/retention.js
Files modified: index.html (section HTML + retention.css link), js/app.js (import + initRetention() call), build-log.md
Decisions: rgba(3,7,18,0.92) background per spec — --bg-0 at 92% opacity for layered depth; centred layout (only section where this is permitted per spec rule); Cormorant Garamond numerals ARE the visual — no charts, no icons; counter pattern exact from signature-animation-moments.md — gsap.from({ val:0 }) with power1.out ease (decelerates toward target); tabular-nums on stat-number for clean counter alignment; writeValue() helper shared between reduced-motion immediate reveal and counter onUpdate; scroll entrance power3.out stagger on stat-blocks, counter trigger per individual stat-block at 'top 70%'; gsap.matchMedia() ctx with return()=>{}; autoAlpha not opacity; once:true; clamp(56px, 8vw, 80px) on stat-number; max-width:none overrides typography.css p constraint; 2.5x block data-decimals="1" confirmed
Exit checks: 40/40 PASS
