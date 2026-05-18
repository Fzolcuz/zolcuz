# ZOLCUZ Agency Site — Build Log

## Project State
Started: 2026-05-18
Current section: retention-stats
Last completed: retention-stats

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

## Session Log

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
