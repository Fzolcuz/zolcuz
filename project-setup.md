---
name: project-setup
description: Use ONLY during Session 1 — project setup. Owns the initial file structure, CSS reset, variables.css content, index.html starter template, and script loading order. Read this before creating any file on a new project.
---
# Project Setup

## Step 1 — Create folder structure
```
zolcuz-agency/
  index.html
  build-log.md
  .env                  ← copy from .env.example, fill in real values
  .env.example          ← committed to repo, no real secrets
  package.json
  vercel.json
  /api
    submit.js           ← Vercel serverless function — all forms POST here
  /assets
    /video
    /img
    /models
    /draco
  /css
    reset.css
    variables.css
    typography.css
    layout.css
    /components
      buttons.css
      cards.css
      forms.css
      nav.css
    /sections
      (one file per section added as built)
  /js
    app.js
    theme.js
    /motion
      gsap-init.js
      lenis-init.js
    /three
      phoenix-scene.js
    /forms
      lead-form.js
  /skills
    (all skill .md files)
  /sanity
    (Sanity CMS schemas)
```

## Step 2 — .env.example
Create this file. Commit it to the repo (no real secrets inside).
The real .env must be in .gitignore and filled with actual values before building.
```
# ZOLCUZ Environment Variables
# Copy this file to .env and fill in the real values
# NEVER commit .env to git

SANITY_PROJECT_ID=your_sanity_project_id_here
SANITY_DATASET=production
RESEND_API_KEY=re_your_resend_api_key_here
TURNSTILE_SECRET=your_cloudflare_turnstile_secret_here
CONTACT_EMAIL=hello@zolcuz.com
```
Add `.env` to `.gitignore`:
```
.env
node_modules/
screenshots/
```

## Step 3 — package.json
Vercel requires a build script to exist, even for plain HTML projects.
```json
{
  "name": "zolcuz-agency",
  "version": "1.0.0",
  "scripts": {
    "build": "exit 0",
    "serve": "node serve.mjs"
  }
}
```

## Step 4 — reset.css
```css
/* ZOLCUZ Reset — opinionated minimal reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: auto; /* Lenis handles smooth scroll */
  -webkit-text-size-adjust: 100%;
  overscroll-behavior: none;
  touch-action: pan-y;
}

body {
  min-height: 100vh;
  min-height: 100dvh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  overscroll-behavior: none;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

/* Reduced motion — kill everything by default, GSAP adds back selectively */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Boot failsafe — hide content until JS runs */
/* app.js removes this class immediately after DOMContentLoaded */
.main-content { visibility: hidden; opacity: 0; }

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: var(--accent);
  color: #030712;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  z-index: 99999;
}
.skip-link:focus {
  top: 16px;
}
```

## Step 5 — variables.css
This file contains ALL design tokens. Import it first in every HTML file.
Content comes from sys-core-tokens.md — copy exactly from there.
```css
/* ZOLCUZ Design Tokens — single source of truth */
/* Full content: see sys-core-tokens.md */

:root {
  color-scheme: light dark;

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  --teal-500: #0D9488;
  --teal-700: #0F766E;
  --teal-900: #134E4A;
  --teal-glow: rgba(13, 148, 136, 0.35);

  --gold-400: #D6B46B;
  --gold-600: #B45309;
  --gold-800: #92400E;

  --crimson-600: #9F1239;
  --crimson-800: #7F1D1D;

  --niche-kitchen: #8B3B2C;
  --niche-theater: #1E2B44;
  --niche-closet: #9AA3A9;
  --niche-bathroom: #2F6F6D;
  --niche-windows: #244836;

  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;
  --space-14: 112px;

  --z-canvas:      1;
  --z-content:     10;
  --z-reveal:      20;
  --z-nav:         100;
  --z-mobile-cta:  150;
  --z-mobile-menu: 200;
  --z-loader:      9999;
  --z-supernova:   10000;
  --z-tap-prompt:  10001;
  --z-cursor:      99999;

  --section-z: 2;
}

:root[data-theme="dark"] {
  --bg-0: #030712;
  --bg-1: #0B0B0C;
  --surface-0: #111113;
  --surface-1: #151518;
  --border-subtle: #1B1B20;
  --border-strong: #24242A;
  --text-0: #F5F1E8;
  --text-1: #CFC8BB;
  --text-2: #A7A195;
  --accent: #0D9488;
  --accent-hover: #0F766E;
  --accent-glow: rgba(13, 148, 136, 0.35);
  --accent-gold: #D6B46B;
  --accent-crimson: #9F1239;
}

:root[data-theme="light"] {
  --bg-0: #F5F0E6;
  --bg-1: #EBE3D5;
  --surface-0: #FEFCF9;
  --surface-1: #F7F3EB;
  --border-subtle: #D6CBBA;
  --border-strong: #C4B7A3;
  --text-0: #1A1A1B;
  --text-1: #3A3A3D;
  --text-2: #636366;
  --accent: #0D9488;
  --accent-hover: #0F766E;
  --accent-glow: rgba(13, 148, 136, 0.25);
  --accent-gold: #B45309;
  --accent-crimson: #7F1D1D;
}
```

## Step 6 — index.html starter template
```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">

  <title>ZOLCUZ Studios — Premium Animated Web Design for Luxury Home Improvement Brands</title>
  <meta name="description" content="Scroll-driven cinematic websites for luxury kitchen, home theater, closet, bathroom, and windows companies in the US and UK.">

  <!-- Canonical -->
  <link rel="canonical" href="https://zolcuz.com/">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://zolcuz.com/">
  <meta property="og:title" content="ZOLCUZ Studios — Premium Animated Web Design">
  <meta property="og:description" content="Scroll-driven cinematic websites for luxury home improvement brands.">
  <meta property="og:image" content="/assets/img/og-image.avif">

  <!-- Theme flash prevention — MUST be first script, inline, before any CSS -->
  <script>
    (function(){const t=localStorage.getItem('zolcuz-theme');document.documentElement.setAttribute('data-theme',t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')||'dark');})();
  </script>

  <!-- Preload critical assets -->
  <link rel="preload" as="image" href="/assets/img/phoenix-poster.avif" type="image/avif">

  <!-- Google Fonts — must be before CSS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">

  <!-- Critical CSS -->
  <link rel="stylesheet" href="/css/variables.css">
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/typography.css">
  <link rel="stylesheet" href="/css/layout.css">
  <link rel="stylesheet" href="/css/components/buttons.css">
  <link rel="stylesheet" href="/css/components/nav.css">

  <!-- Cloudflare Turnstile (forms — necessary category, no consent required) -->
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

  <!-- Schema markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "ZOLCUZ Studios",
    "description": "Premium animated web design agency for luxury home improvement brands",
    "url": "https://zolcuz.com",
    "serviceType": "Web Design",
    "areaServed": ["US", "GB"]
  }
  </script>
</head>
<body>
  <!-- Skip link — accessibility -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- Loader (first thing user sees — removed from DOM after hero reveal) -->
  <!-- Full HTML from phoenix-loader.md goes here -->

  <!-- Phoenix canvas — Three.js mounts here after loader ends -->
  <canvas id="phoenix-canvas" aria-label="Interactive 3D phoenix — hover to explore ZOLCUZ services" role="img"></canvas>

  <!-- Global cursor (desktop only, outside Three.js canvas) -->
  <div class="cursor-global" aria-hidden="true"></div>

  <!-- GDPR consent banner — shown only if no consent recorded yet -->
  <div id="consent-banner" class="consent-banner" style="display:none;" role="dialog" aria-label="Cookie consent">
    <p class="consent-banner__text">We use analytics to improve this site. No tracking without your consent.</p>
    <div class="consent-banner__actions">
      <button class="consent-banner__accept button-primary" onclick="window.grantConsent(['analytics']); this.closest('#consent-banner').style.display='none';">Accept</button>
      <button class="consent-banner__decline" onclick="this.closest('#consent-banner').style.display='none';">Decline</button>
    </div>
  </div>

  <!-- Navigation -->
  <!-- Full HTML from ui-chrome-compliance.md goes here -->

  <main id="main-content" class="main-content">
    <!-- Hero section — each section added as built, in build order from CLAUDE.md -->
  </main>

  <!-- No JavaScript fallback -->
  <noscript>
    <div style="position:fixed;inset:0;background:#030712;color:#F5F1E8;display:flex;align-items:center;justify-content:center;padding:40px;font-family:Georgia,serif;text-align:center;z-index:99999;">
      <div>
        <h1 style="font-size:32px;margin-bottom:16px;">ZOLCUZ Studios</h1>
        <p style="font-size:16px;line-height:1.6;color:#CFC8BB;max-width:480px;">Premium animated web design for luxury home improvement brands.<br><br>
        This site requires JavaScript for the full experience.<br>
        To speak with us directly:<br><br>
        <strong style="color:#0D9488;">hello [at] zolcuz [dot] com</strong>
        </p>
      </div>
    </div>
  </noscript>

  <!-- Section CSS files (loaded as sections are built) -->
  <!-- <link rel="stylesheet" href="/css/sections/hero.css"> -->

  <!-- Animation libraries — end of body, this exact order -->
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js"></script>

  <!-- App entry point -->
  <script type="module" src="/js/app.js"></script>
</body>
</html>
```

## Step 7 — vercel.json (complete — includes security headers)
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, immutable, max-age=31536000" }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        { "key": "Cache-Control", "value": "max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

## Step 8 — app.js entry point (boot sequence)
```javascript
// app.js — entry point
// Runs after all CDN scripts have loaded (end of body)

// 1. Unhide main content immediately — boot failsafe removal
// (reset.css hides .main-content to prevent FOUC; we reveal it here)
document.querySelector('.main-content').style.visibility = 'visible';
document.querySelector('.main-content').style.opacity = '1';

// 2. Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

// 3. All animation init functions called here after fonts ready
function initAnimations() {
  // Import and call each section's animation init in build order:
  // initHeroAnimations();      // section-hero-phoenix.md
  // initHowItWorksAnimations(); // section-how-it-works.md
  // initNichesAnimations();    // section-niches.md
  // initCounters();            // section-retention-stats.md + signature-animation-moments.md
  // initAutomation();          // section-automation.md
  // initProcessTimeline();     // section-process.md
  // Add each as you build sections
}

// 4. Wait for fonts, then init
Promise.race([
  document.fonts.ready,
  new Promise(r => setTimeout(r, 2500))
]).then(() => {
  initAnimations();
});
```

## Step 9 — build-log.md
Create this immediately, update after every session:
```markdown
# ZOLCUZ Agency Site — Build Log

## Project State
Started: [today's date]
Current section: project-setup
Last completed: none

## Completed Sections
(none yet)

## Session Log

### Session 1 — [date]
Task: Project setup
Status: complete
Files created: index.html, variables.css, reset.css, typography.css, vercel.json, .env.example, package.json, app.js
Decisions: dark mode default, Google Fonts CDN, Lenis 1.1.14, GSAP 3.12.5
Issues: none
```

## Exit check
Folder structure includes /api/submit.js? .env.example committed, .env in .gitignore? variables.css has ALL tokens from sys-core-tokens.md including --z-content, --section-z, --z-mobile-cta? index.html has inline theme script BEFORE all CSS? noscript fallback present? canvas#phoenix-canvas present? cursor-global div present? consent-banner div present? All GSAP scripts pinned to 3.12.5? app.js defines initAnimations() and unhides .main-content? vercel.json has cleanUrls + security headers?
