---
name: workflow-and-qa
description: Session protocol, pre-flight commit, QA loops, Three.js checklists, loader checklist, build log, git format. Read at every session start.
---
# Workflow and QA

## Pre-Flight Commit — First Thing Every Session
```bash
git add -A && git commit -m "pre-flight: $(date +%Y%m%d-%H%M)"
```
Do this before touching any code. Non-negotiable.

## Session Start Protocol
1. Pre-flight commit
2. Read build-log.md
3. Read CLAUDE.md
4. Load only the skills for today's section
5. Build
6. QA
7. Update build-log.md
8. Commit

## Change Classification
```
Local section change       → section skill only
Shared visual/behavior     → core skill first, then section skill
Speed issue                → performance-and-optimization.md
A11y issue                 → accessibility-and-seo.md
Three.js issue             → threejs-scene-setup.md + sys-threejs-phoenix.md
GSAP/scroll issue          → sys-motion-engine.md
Form/CTA issue             → conversion-and-forms.md
Legal/GDPR issue           → ui-chrome-compliance.md
```

## QA Loop — DOM Sections (Minimum 2 Rounds)
```
1. node serve.mjs (or npm run serve — both work, package.json has the script)
2. node screenshot.mjs — captures 1440x900 and 390x844
3. Analyze screenshots against design spec
4. Report exact mismatches with line-level detail
5. Fix
6. Re-screenshot
7. Mark complete only after screenshot confirms pass
```

## QA Checklist — Three.js Scene
Run every time Three.js code changes:
- [ ] Frame rate: ?debug URL param → stats.js overlay → confirm 60fps desktop
- [ ] GLB size: under 2.5MB confirmed
- [ ] Renderer: in gsap.ticker not requestAnimationFrame
- [ ] Thermal throttle: IntersectionObserver pauses render off-screen
- [ ] Hover zones: all 5 raycasting zones work (wings, eyes, chest, talons, crown)
- [ ] Service reveal: text appears on hover, hides on mouse leave
- [ ] Ember cursor: transforms at canvas boundary, updates correctly after resize
- [ ] Idle animation: feathers breathe subtly
- [ ] uTime: increments in render loop (feathers move)
- [ ] Bloom: glow on emissive surfaces only, not entire scene
- [ ] Scroll travel: phoenix moves smoothly between niche sections
- [ ] wingMorph: matches pose values from niche-pages-and-phoenix-poses.md
- [ ] WebGL fallback: DevTools → disable WebGL → AVIF fallback appears
- [ ] Reduced motion: feathers static, scroll travel disabled, hover zones active
- [ ] Mobile: real device test, fallback or acceptable 30fps
- [ ] Memory: Chrome DevTools Memory tab → no leaks after 2 minutes
- [ ] Canvas pointer-events: page scroll never blocked by canvas
- [ ] SRGB: all loaded textures have colorSpace = THREE.SRGBColorSpace

## QA Checklist — Loader
- [ ] Video plays automatically on page load
- [ ] Dead-man timer fires at 2500ms if video stalls
- [ ] SVG border syncs with video currentTime
- [ ] Border reaches 100% as video ends (not before, not after)
- [ ] Supernova fires immediately on video end with no gap
- [ ] Tap prompt appears when autoplay blocked
- [ ] Reduced motion: video skipped, poster shown, fades to hero in 800ms
- [ ] Mobile: muted + playsinline allows autoplay
- [ ] Loader removed from DOM after hero reveal

## QA Checklist — Forms
- [ ] All inputs are exactly font-size: 16px (iOS zoom test on real iPhone)
- [ ] Turnstile loads without consent banner
- [ ] JustValidate shows inline errors on invalid submit
- [ ] Form POSTs to /api/submit not directly to Resend/third party
- [ ] Cold-start UX: "Requesting..." then "Waking secure server..." after 2s
- [ ] Success state shows after successful submission
- [ ] Email never appears as raw mailto: in HTML source

## QA Checklist — Sanity CMS Data
- [ ] Every CMS data access uses optional chaining (?.) and nullish coalescing (??)
- [ ] Missing image shows labeled SVG placeholder not broken icon
- [ ] Long text fields are clamped with -webkit-line-clamp
- [ ] If field missing, layout does not break

## QA Checklist — Legal
- [ ] Analytics scripts blocked until consent granted
- [ ] Turnstile loads without consent (it's necessary)
- [ ] Meta description is 150-160 characters
- [ ] Canonical tag on every page
- [ ] Schema validates at rich-results-test
- [ ] No raw mailto: links in HTML source

## Build Log Format
```markdown
Section: [section-id]
Status: in-progress | qa-pass | complete
Theme tested: dark | light | both
Screenshot refs: [filenames]
Decisions: [key choices]
Issues: [known issues or deferred items]
```

## Git Commit Format
```
pre-flight: YYYYMMDD-HHMM          (before every session)
complete: [section] — [description] (after QA pass)
fix: [what] — [why]                 (bug fixes)
```

## Rules
Never patch the same rule in multiple skill files
Never edit shared selectors from inside a section skill
Never commit without passing screenshot QA
Never start next section before current passes QA
For Three.js: run full Three.js checklist before committing
