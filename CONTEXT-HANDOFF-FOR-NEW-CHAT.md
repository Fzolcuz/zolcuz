# ZOLCUZ STUDIOS — V5 SKILLS CONTEXT HANDOFF
## This is V5. All 40 audit issues from V4 have been resolved.
## Do not reference V4 issues — they are fixed.

---

## WHO YOU ARE TALKING TO

**Name:** Farukh
**Role:** Non-technical creative director and solo founder
**Location:** India
**Background:** Digital marketing. Familiar with LinkedIn outreach tools including Sales Navigator and PhantomBuster. No coding knowledge whatsoever. You translate his plain English into production code. Never ask him to write code or explain technical things.
**Tools he owns:** Claude Pro, Gemini Pro, Leonardo AI, Kling AI Pro, Filmora 15

---

## THE BUSINESS — ZOLCUZ STUDIOS

**What it is:** A one-person premium animated web design agency operated from India, targeting US and UK luxury home improvement brands. Differentiator: scroll-driven assembly animations — spaces that literally build themselves as the user scrolls.

**Five locked niches:**
1. Custom Kitchen Design-Build Firms
2. Custom Home Theater and Media Room Installers
3. Custom Closet and Wardrobe Companies
4. Premium Bathroom Renovation Firms
5. Luxury Windows, Doors, and Conservatory Companies

**Pricing (locked):**
- Concept Sprint: $249 (48-hour visual concept, animation idea, conversion audit)
- Showroom Landing Page: $1,500
- Premium Showroom Site: $2,800
- Add-ons: Lead Automation $600–$1,200 setup + $200/mo | AI Virtual Concierge $750 setup + $150/mo
- Maintenance: $149–$199/month

**Sales approach:** BuiltWith to find targets → Loom 5-minute video audit → $249 Concept Sprint → full build. UK conservatory/windows market is #1 priority in 2026 (UK Warm Homes Plan driving £21B demand surge).

---

## LOCKED TECH STACK — NEVER DEVIATE

- Plain HTML, CSS, JavaScript only
- GSAP 3.12.5 (pinned) + ScrollTrigger + Flip + SplitText (all free, CDN)
- Lenis v1.1.14 (pinned)
- Three.js r165 (pinned)
- Sanity CMS
- Vercel + GitHub
- No React. No Vue. No Angular. No Tailwind. No WordPress. No page builders.
- No Splitting.js — GSAP SplitText handles all text splitting

---

## LOCKED DESIGN SYSTEM

**Colors:**
- Primary: teal-emerald #0D9488
- Secondary: deep gold #B45309
- Tertiary: crimson #9F1239
- Background void: #030712

**Typography:** Cormorant Garamond (headlines) / DM Sans (body)

**Key Z-index tokens (all defined in variables.css):**
- --z-canvas: 1 | --z-content: 10 | --z-reveal: 20
- --z-nav: 100 | --z-mobile-cta: 150 | --z-mobile-menu: 200
- --z-loader: 9999 | --z-supernova: 10000 | --z-tap-prompt: 10001
- --section-z: 2 (section overlap stacking)

---

## V5 KEY CHANGES FROM V4 (summary for continuity)

All 40 issues fixed. Most important architectural changes:

1. **app.js is now the boot file** — defines `initAnimations()`, unhides `.main-content`, registers GSAP plugins
2. **GSAP pinned to 3.12.5** — no more `gsap@3` unpinned CDN
3. **Splitting.js removed** — GSAP SplitText handles all character splitting
4. **`phoenixReady` declared at module scope** — `let phoenixReady = false;`
5. **`disposeLoaderResources()` removed from `triggerSupernova()`** — it was incorrectly disposing the live phoenix scene
6. **`safeSupernova()` wrapper in phoenix-loader** — guards dead-man against firing before Three.js loads
7. **Reduced motion check runs BEFORE dead-man timer** in phoenix-loader
8. **Service reveal uses wrapper div** for centering (not CSS transform) — GSAP `y` no longer conflicts
9. **All hover states wrapped in `@media (hover: hover) and (pointer: fine)`** — buttons, tabs, activate btn
10. **`isMobile` declared once** in sys-threejs-phoenix.md — removed duplicate from threejs-scene-setup.md
11. **gsap.context() wraps all scroll travel** — `scrollTravelCtx.revert()` called in activateFallback()
12. **`--z-content` is the canonical token** (not `--z-base`) — both sys-core-tokens.md and project-setup.md agree
13. **`--section-z: 2` and `--z-mobile-cta: 150` added to variables.css**
14. **All 6 phoenix poses fully wired** in sys-threejs-phoenix.md scroll travel (kitchen, bathroom, theater, closet, windows, footer)
15. **Math.PI / Math.PI/2 used everywhere** — no hardcoded 3.14159 or 1.5708
16. **`#work` nav anchor fixed to `#niches`**
17. **serviceArea.js and page.js schemas fully defined** in sanity-cms-schema.md
18. **section-problem.md and section-about.md now have full HTML/CSS/JS**
19. **Automation default niche via IntersectionObserver** — not on page load
20. **`autoAlpha` used consistently** — opacity removed from automation steps and niche cross-fade
21. **Footer form has JS** — validates email, submits to /api/submit, cold-start UX
22. **Nav uses `lenis.on('scroll')** — not window.scroll
23. **`package-card:last-child`** — not fragile `:last-of-type`
24. **Retention stats section now has eyebrow + H2 heading**
25. **srcset pattern documented** in performance-and-optimization.md
26. **GROQ-to-frontend wiring pattern** documented in sanity-cms-schema.md
27. **Consent banner HTML defined** in index.html template
28. **`<canvas id="phoenix-canvas">` placed** in index.html template
29. **`cursor-global` div placed** in index.html template with full CSS/JS in design-quality-and-taste.md
30. **`.env.example` template defined** in project-setup.md
31. **`/api/` directory in folder structure** in project-setup.md
32. **Copyright year via JS** `new Date().getFullYear()` in section-footer.md
33. **`<noscript>` fallback** in index.html template
34. **Theme flash prevention inline script** in index.html template (before CSS)

---

## WHAT THE NEW CHAT SHOULD DO

Step 1: Farukh has three discussion topics queued:
- SEO strategy and local SEO for client demo sites
- Workflow optimization tools
- 3D Phoenix Bird live interactive section improvements

These are separate strategic discussions — not builds. Have them in order when Farukh raises them.

Step 2: When Farukh is ready to build, the skill files are ready to use in Claude Code. Build order is in CLAUDE.md. One section per session. Pre-flight commit every session.

---

## TONE AND WORKING STYLE

- Farukh is a creative director, not a developer. Speak in plain English.
- He makes quick decisions. Don't over-explain unless asked.
- When he says "yes" or "go ahead," execute immediately.
- He uses voice-to-text — understand the intent, not the literal transcription.
- Never mention India, being solo, or being new in any client-facing copy.
- When he approves something he often just says "yes" — that means full approval.
- All pricing, tech stack, design system, and architecture decisions are locked.
