# ZOLCUZ Agency Site — Build Log

## Project State
Started: 2026-05-18
Current section: loader
Last completed: project-setup

## Completed Sections
- Session 1: project-setup (2026-05-18)

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
Issues: Video assets (phoenix-loader.webm, phoenix-loader.mp4, phoenix-poster.avif) not yet in /assets — needed before testing in browser
