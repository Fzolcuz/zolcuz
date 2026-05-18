# ZOLCUZ Agency Site — Build Log

## Project State
Started: 2026-05-18
Current section: typography-fix
Last completed: typography-fix

## Completed Sections
- Session 1: project-setup (2026-05-18)
- Session 2: loader — two-video sequential (2026-05-18)
- Session 3: Three.js hero scene (2026-05-18)
- Session 4: Navigation (2026-05-18)
- Session 5: Hero overlay (2026-05-18)

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
