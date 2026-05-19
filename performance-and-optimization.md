---
name: performance-and-optimization
description: CWV targets, image pipeline, Three.js budgets, lazy loading, caching, Vercel config with security headers. Owns all speed guardrails.
---
# Performance and Optimization

## Targets
Lighthouse: 90+ performance, 95+ a11y/bp/seo
LCP ≤2.5s | CLS ≤0.1 | INP ≤200ms | Page <3.5MB | Hero video <3MB

## Critical Preloads — Head Before CSS
```html
<!-- Phoenix poster — shown while video loads -->
<link rel="preload" as="image" href="/assets/img/phoenix-poster.avif" type="image/avif">

<!-- Google Fonts preconnect — reduces font DNS lookup time -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## Font Strategy — Google Fonts CDN (Default)
Google Fonts CDN is used for Cormorant Garamond and DM Sans.
Google Fonts automatically applies font-display: swap — no extra instruction needed.
FOUT fix via CSS size-adjust is in sys-core-tokens.md.

DO NOT add preload links for /assets/fonts/ — these files do not exist unless you self-host.

## Optional: Self-Hosted Fonts (Better Performance)
If you want self-hosted fonts for maximum performance:
1. Download woff2 files: https://gwfh.mranftl.com/fonts
2. Place in /assets/fonts/
3. Replace Google Fonts link with @font-face in typography.css
4. Then and only then add preload:
```html
<link rel="preload" as="font" href="/assets/fonts/cormorant-garamond-600.woff2" crossorigin type="font/woff2">
<link rel="preload" as="font" href="/assets/fonts/dm-sans-400.woff2" crossorigin type="font/woff2">
```

## Images
AVIF q45 primary | WebP q75 fallback | width + height always
Above fold: never lazy | Below fold: loading="lazy"
srcset: 640w / 1024w / 1440w
Process via Squoosh before every commit
All media wrappers need explicit aspect-ratio to prevent CLS

### srcset pattern — required for all responsive images
```html
<!-- Always include width + height to prevent CLS -->
<!-- Above fold: no loading attribute (eager by default) -->
<picture>
  <source
    srcset="/assets/img/niche-hero-640.avif 640w,
            /assets/img/niche-hero-1024.avif 1024w,
            /assets/img/niche-hero-1440.avif 1440w"
    sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
    type="image/avif">
  <source
    srcset="/assets/img/niche-hero-640.webp 640w,
            /assets/img/niche-hero-1024.webp 1024w,
            /assets/img/niche-hero-1440.webp 1440w"
    sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
    type="image/webp">
  <img src="/assets/img/niche-hero-1024.avif"
    alt="Custom kitchen design by [Client Name]"
    width="1440" height="960">
</picture>

<!-- Below fold: add loading="lazy" -->
<img src="/assets/img/detail.avif" alt="..." width="600" height="750" loading="lazy">
```


## CSS Rules
Grain overlay: position:absolute only — never fixed on pseudo-elements (causes scroll glitch)
Animate transform + opacity only
No backdrop-filter on scroll containers
No transition-all

## Video
preload="metadata" default | Below fold: preload="none" | Mobile: AVIF still
Phoenix loader: preload="auto" — intentional, first content user sees

## vercel.json — Full Config With Security Headers
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

Also needs in package.json:
```json
{ "scripts": { "build": "exit 0" } }
```

## Three.js Budgets (Non-Negotiable)
GLB after Draco: max 2.5MB | KTX2 textures: max 2MB
Draw calls: target <50, hard limit 100 | Post-processing: max 2 passes
Pixel ratio: Math.min(devicePixelRatio, 2) always | FPS: 60 desktop, 30 mobile

## Three.js Rules
Lazy load via dynamic import — never on page load
Canvas pointer-events: none during scroll
Pre-compile shaders before supernova: renderer.compileAsync(scene, camera)
Render in gsap.ticker not rAF (120Hz sync)
Only render when visible: wrap in IntersectionObserver (thermal throttle)
Dispose geometry, materials, textures when removing scene from DOM

## FFmpeg
```bash
ffmpeg -i raw.mp4 -c:v libx264 -crf 23 -preset slow -vf scale=1080:1080 -an phoenix-loader.mp4
ffmpeg -i raw.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1080:1080 -an phoenix-loader.webm
```

## JS Budget
Initial JS (no Three.js): max 220KB gzipped
Three.js: dynamic import only, after loader video ends

## Exit Check
Poster preloaded? No local font preloads unless self-hosted? Vercel config has cleanUrls + security headers? package.json has build script? Three.js lazy loaded? GLB under budget? Pixel ratio capped?
