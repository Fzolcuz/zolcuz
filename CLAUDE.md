# ZOLCUZ Studios — Claude Code Master Instructions

## WHO YOU ARE BUILDING FOR
ZOLCUZ Studios is a premium animated web design agency targeting luxury home improvement brands in the US and UK. Five niches: custom kitchen design-build firms, custom home theater/media room installers, custom closet and wardrobe companies, premium bathroom renovation firms, luxury windows/doors/conservatory companies. Target clients spend $50,000–$500,000 on a single project. The website must match that price point.

The founder is a non-technical creative director. Your job is to translate plain English creative direction into strict production-ready GSAP and Three.js code. Never ask them to write code. They describe what they want — you build it. State your assumptions after building, not before.

---

## PRE-FLIGHT COMMIT — MANDATORY BEFORE ANY CODE CHANGES
Before writing ANY new code in any session, commit the current state first:
```bash
git add -A && git commit -m "pre-flight: $(date +%Y%m%d-%H%M)"
```
This guarantees the founder can always say "Revert" if something breaks. Non-negotiable. Even if the last commit was recent. Do it every session.

---

## LOCKED TECH STACK
- Plain HTML, CSS, JavaScript only
- GSAP 3.12.5 + ScrollTrigger + Flip + SplitText (all free, CDN — pinned to 3.12.5)
- Lenis v1.1.14 (pinned)
- Three.js r165 (pinned)
- Sanity CMS
- Vercel + GitHub
- No React. No Vue. No Angular. No Tailwind. No WordPress. No page builders.

---

## LOCKED DESIGN SYSTEM

### Colors
Primary: teal-emerald #0D9488 | Secondary: deep gold #B45309 | Tertiary: crimson #9F1239
Background void: #030712 | Full token system in sys-core-tokens.md

### Typography
Headlines: Cormorant Garamond | Body: DM Sans
Hero H1: 88px desktop / 48px mobile

### Animation defaults
GSAP scrub: 0.6 | Entrance: power3.out | Assembly: expo.out | Lenis duration: 1.2

### Images
AVIF q45 primary | WebP q75 fallback | Always include width + height attributes

---

## SKILLS SYSTEM — LOAD ONLY WHAT IS NEEDED
The skill files are in the project root. Load ONLY the skills for the current task.
Loading all files at once wastes context and causes drift.

```
Session start           → CLAUDE.md + workflow-and-qa.md
Colors/tokens/theme     → sys-core-tokens.md
GSAP/scroll/Lenis       → sys-motion-engine.md
Three.js/WebGL          → sys-threejs-phoenix.md + threejs-scene-setup.md
Section-specific        → section-[name].md
Design quality          → design-quality-and-taste.md
Performance             → performance-and-optimization.md
Accessibility/SEO       → accessibility-and-seo.md
Copy/text               → copy-voice-and-vocabulary.md
Forms/CTAs              → conversion-and-forms.md
```

---

## CURRENT BUILD STATE — SESSIONS 1–12 COMPLETE

### Completed and merged to main:
- Session 1:  Project scaffold — index.html, CSS tokens, reset, theme.js, app.js, vercel.json
- Session 2:  Phoenix loader — two-video sequential (phoenix-loader → phoenix-explosion)
- Session 3:  Three.js phoenix scene — bones, raycasting, 6 scroll poses, gsap.context
- Session 4:  Navigation — floating pill, mobile menu, Lenis singleton, GDPR, email obfuscation
- Session 5:  Hero overlay — hero.css, buttons.css, hero HTML
- Session 6:  Problem section — 3 pain lines, stagger entrance, border-left state indicator
- Session 7:  How It Works — 3-col grid, decorative numerals, stagger entrance
- Session 8:  Niches — accordion flex, 5 niche cards, cross-fade, --niche-active CSS var
- Session 9:  Retention Stats — 5 stat blocks, Cormorant numerals, counter animation
- Session 10: Process — section complete
- Session 11: Packages/Pricing — section complete
- Session 12: Automation — section complete (89/89 exit checks PASS)

### Remaining sessions:
- Session 13: AI Assistant ← NEXT (section-ai-assistant.md)
- Session 14: About (section-about.md)
- Session 15: Footer (section-footer.md)

### Branch: claude/hardcore-moser-988dfb
### Phoenix GLB: assets/models/phoenix.glb — 2.08MB, Avian rig
### Key bones: tripo::Head_0, bone_7 (left wing), bone_21 (right wing), tripo::Spine_0
### Phoenix color: iridescent grey-teal — LOCKED, DO NOT CHANGE

---

## FILE STRUCTURE
```
index.html
build-log.md
vercel.json
/assets
  /video          phoenix-loader.mp4/.webm, phoenix-explosion.mp4/.webm
  /img            AVIF images, noise.png, phoenix-poster.avif
  /models         phoenix.glb
  /draco          Draco decoder files
/css
  variables.css, reset.css, typography.css, layout.css
  /components     buttons.css, nav.css
  /sections       loader.css, hero.css, problem.css, how.css, niches.css,
                  retention.css, process.css, packages.css, automation.css
/js
  app.js, theme.js
  /motion         lenis-init.js
  /three          phoenix-scene.js
  /sections       problem.js, how.js, niches.js, retention.js, process.js,
                  packages.js, automation.js
/api
  submit.js
/sanity
```

---

## POST-BUILD PLAN (after all 15 sessions — DO NOT START BEFORE)
1. Add website-copy.md to project — real approved copy
2. Copy pass replacing ALL placeholder text
3. Integrate GHL + Make.com + Retell AI automation
Sanity CMS handles all future content updates without code changes.
Chat/voice bot = Day 28 task. Not before site is complete.

---

## CRITICAL RULES — NEVER VIOLATE
- Never use #000000 or #FFFFFF directly — use CSS tokens
- Never use Inter, Roboto, Arial, Poppins, or Montserrat
- Never centered SaaS hero layout
- Never carousel gallery
- Never 3-column equal grid for services or packages
- Never say "chatbot" — always "Virtual Concierge"
- Never mention India, solo operation, or being new
- Never load Three.js on page load — dynamic import after video ends
- Never let Three.js canvas block scroll — pointer-events: none during scroll
- Never use gold as primary CTA color — always teal
- Transform + opacity only — never animate layout properties
- One primary CTA per viewport — never two
- scrub controls timing — never add duration to a scrubbed animation
- Never guess UI copy — only use approved text from copy-voice-and-vocabulary.md
- Never raw mailto: links — obfuscate via JavaScript
- All hover states inside @media (hover: hover) and (pointer: fine)
- All input and select elements must be exactly font-size: 16px (iOS Safari zoom fix)
- GDPR: analytics and non-essential scripts cannot load without user consent
- Forms must POST to /api/submit — never directly to third parties

---

## SESSION PROTOCOL
```
1. Pre-flight commit (MANDATORY)
2. Read build-log.md
3. Read this CLAUDE.md
4. Load only skill files for today's section
5. Present plan — NO CODE until founder approves
6. Build after approval — no truncation
7. QA: serve → screenshot → analyze → fix → re-screenshot → pass
8. Update build-log.md
9. Run finishing-a-development-branch and create PR
```

---

## TRANSLATION PROTOCOL
Founder gives plain English. You translate to production code.
- "More alive" → increase idle animation amplitude
- "Feels slow" → reduce scrub or adjust ease
- "Gold too orange" → shift --gold-600 toward #A07828
- "Cards feel cheap" → apply double-bezel from design-quality-and-taste.md
State assumptions after building, never before.
