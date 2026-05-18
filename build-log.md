# ZOLCUZ Agency Site — Build Log

## Project State
Started: 2026-05-18
Current section: three-js-hero
Last completed: loader

## Completed Sections
- Session 1: project-setup (2026-05-18)
- Session 2: loader — two-video sequential (2026-05-18)
- Session 3: Three.js hero scene (2026-05-18)

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
Issues: phoenix-optimized.glb must be validated at gltf.report before Session 4; Draco decoder files needed in /assets/draco/
