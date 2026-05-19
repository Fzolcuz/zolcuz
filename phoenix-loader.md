---
name: phoenix-loader
description: The loading screen. 1:1 square video, teal SVG progress border, tap prompt, dead-man switch, and supernova handoff. The first thing users see.
---
# Phoenix Loader

## What This Is
Full-screen black void. Centered 1:1 square. Phoenix video plays inside. Teal SVG border traces perimeter in sync with video. On end: Three.js supernova fires full screen. Fades to hero.

## HTML
```html
<div id="loader" class="loader">
  <div class="loader__square">
    <video id="phoenix-video" class="loader__video"
      playsinline muted preload="auto"
      poster="/assets/img/phoenix-poster.avif">
      <source src="/assets/video/phoenix-loader.webm" type="video/webm">
      <source src="/assets/video/phoenix-loader.mp4" type="video/mp4">
    </video>
    <svg class="loader__border" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect class="loader__border-path" x="1" y="1" width="98" height="98"
        fill="none" stroke="#0D9488" stroke-width="0.5"
        stroke-dasharray="392" stroke-dashoffset="392"/>
    </svg>
  </div>
  <div id="tap-prompt" class="loader__tap-prompt" style="display:none">
    <div class="loader__tap-inner">
      <img src="/assets/img/phoenix-poster.avif" alt="" class="loader__tap-bg">
      <button class="loader__tap-btn" id="tap-to-start">
        <span class="loader__tap-icon">▶</span>
        <span class="loader__tap-text">Tap to begin</span>
      </button>
    </div>
  </div>
  <canvas id="supernova-canvas" class="loader__supernova"></canvas>
</div>
```

## CSS
```css
.loader {
  position: fixed; inset: 0;
  background: #030712;
  display: flex; align-items: center; justify-content: center;
  z-index: var(--z-loader);
}
.loader__square {
  position: relative;
  width: min(90vw, 90vh);
  aspect-ratio: 1 / 1;
}
.loader__video { width: 100%; height: 100%; object-fit: cover; display: block; }
.loader__border {
  position: absolute; inset: -4px;
  width: calc(100% + 8px); height: calc(100% + 8px);
  pointer-events: none;
}
.loader__border-path {
  transition: none;
  filter: drop-shadow(0 0 6px rgba(13,148,136,0.8));
}
.loader__supernova {
  position: fixed; inset: 0; width: 100%; height: 100%;
  pointer-events: none; opacity: 0;
  z-index: var(--z-supernova);
}
.loader__tap-prompt { position: fixed; inset: 0; z-index: var(--z-tap-prompt); }
.loader__tap-inner {
  position: relative; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.loader__tap-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.3; }
.loader__tap-btn {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  background: none; border: 1px solid #0D9488; color: #F5F1E8;
  padding: 24px 40px; border-radius: 4px; cursor: pointer;
  font-family: var(--font-body);
}
.loader__tap-icon { font-size: 32px; color: #0D9488; }
.loader__tap-text { font-size: 14px; letter-spacing: 0.14em; text-transform: uppercase; }
```

## JavaScript — Border Sync + Dead-Man Switch
```javascript
const video = document.getElementById('phoenix-video');
const borderPath = document.querySelector('.loader__border-path');
const tapPrompt = document.getElementById('tap-prompt');
const tapBtn = document.getElementById('tap-to-start');
const totalLength = 392;

// REDUCED MOTION CHECK — must run BEFORE dead-man timer is set.
// If reduced motion is active we skip the video entirely and go straight
// to hero reveal. The dead-man timer must never fire in this path.
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.style.display = 'none';
  borderPath.style.strokeDashoffset = '0';
  setTimeout(() => {
    gsap.to('#loader', {
      autoAlpha: 0, duration: 0.5,
      onComplete: () => {
        document.getElementById('loader').remove();
        revealHero(); // defined in sys-threejs-phoenix.md
      }
    });
  }, 800);
} else {
  // Normal path — set dead-man AFTER confirming reduced motion is off
  // DEAD-MAN SWITCH — if video does not start within 2500ms, force a safe
  // CSS-only fallback. Uses safeSupernova() wrapper because Three.js may
  // not have loaded yet if the video failed at the very start.
  let deadManTimer = setTimeout(() => {
    console.warn('Loader: video timeout — forcing safe supernova');
    borderPath.style.strokeDashoffset = '0';
    safeSupernova();
  }, 2500);

  // Video started — clear dead-man timer
  video.addEventListener('timeupdate', () => {
    clearTimeout(deadManTimer);
    deadManTimer = null;
  }, { once: true });

  video.addEventListener('play', () => requestAnimationFrame(updateBorder));
  video.addEventListener('ended', () => {
    clearTimeout(deadManTimer);
    borderPath.style.strokeDashoffset = '0';
    safeSupernova();
  });

  video.play().catch(() => showTapPrompt());
}

function updateBorder() {
  const offset = totalLength - (totalLength * (video.currentTime / video.duration));
  borderPath.style.strokeDashoffset = offset;
  if (!video.ended) requestAnimationFrame(updateBorder);
}

function showTapPrompt() {
  tapPrompt.style.display = 'block';
  tapBtn.addEventListener('click', () => {
    tapPrompt.style.display = 'none';
    video.play();
  }, { once: true });
}

// Safe wrapper for supernova — checks if Three.js triggerSupernova is ready.
// If video fails before Three.js loads (dead-man fires at 2500ms, before the
// lazy Three.js import which happens on video.ended), triggerSupernova won't
// exist yet. We fall back to a plain CSS fade in that case.
function safeSupernova() {
  if (typeof triggerSupernova === 'function') {
    triggerSupernova();
  } else {
    // Three.js not ready — plain CSS fallback: fade loader, reveal hero directly
    gsap.to('#loader', {
      autoAlpha: 0, duration: 0.8,
      onComplete: () => {
        document.getElementById('loader').remove();
        // Reveal hero copy without Three.js
        gsap.to('.hero-section__overlay', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' });
        // Attempt to lazy-load Three.js after showing hero
        import('./js/three/phoenix-scene.js')
          .then(({ initPhoenixScene }) => initPhoenixScene())
          .catch(() => {
            // Three.js failed entirely — show AVIF fallback
            const canvas = document.getElementById('phoenix-canvas');
            if (canvas) canvas.style.display = 'none';
            const fallback = document.getElementById('phoenix-fallback');
            if (fallback) fallback.style.display = 'block';
          });
      }
    });
  }
}
```

## Video Specs
WebM (VP9): /assets/video/phoenix-loader.webm — primary (list first in HTML)
MP4 (H.264): /assets/video/phoenix-loader.mp4 — fallback
Target: under 3MB each | 1080x1080 | No audio (-an flag)
Poster: /assets/img/phoenix-poster.avif — last frame, AVIF q45

```bash
ffmpeg -i raw.mp4 -c:v libx264 -crf 23 -preset slow -vf scale=1080:1080 -an phoenix-loader.mp4
ffmpeg -i raw.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1080:1080 -an phoenix-loader.webm
```

## Rules
preload="auto" intentional — first thing users see, needs to be ready immediately
Reduced motion check runs BEFORE dead-man timer is set — non-negotiable order
safeSupernova() wrapper guards against Three.js not being loaded at dead-man fire time
Loader removed from DOM after hero reveal to free memory

## Exit Check
WebM listed before MP4? Reduced motion check runs BEFORE dead-man is set? Dead-man uses safeSupernova() not triggerSupernova() directly? Border reaches 100%? Loader removed from DOM after reveal?
