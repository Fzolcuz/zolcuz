// loader.js — Two-video sequential loader
// Video 1 (phoenix-loader): egg hatching in centred square with SVG border sync
// Video 2 (phoenix-explosion): fullscreen explosion immediately after Video 1 ends
// Video 2 ends → fade loader → lazy-load Three.js phoenix scene
//
// Runs after GSAP CDN script.

(function () {
  const video1      = document.getElementById('phoenix-video');
  const video2      = document.getElementById('phoenix-explosion');
  const borderPath  = document.querySelector('.loader__border-path');
  const square      = document.querySelector('.loader__square');
  const tapPrompt   = document.getElementById('tap-prompt');
  const tapBtn      = document.getElementById('tap-to-start');
  const totalLength = 392;

  // ─── REDUCED MOTION ───────────────────────────────────────────────────────
  // Skip both videos. Fade loader after 800ms, then launch Three.js.
  // Dead-man timer must NEVER be set in this path.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video1.style.display = 'none';
    borderPath.style.strokeDashoffset = '0';
    setTimeout(() => {
      gsap.to('#loader', {
        autoAlpha: 0, duration: 0.5,
        onComplete: () => {
          document.getElementById('loader').remove();
          launchThreeJS();
        }
      });
    }, 800);

  } else {
    // ─── NORMAL PATH ────────────────────────────────────────────────────────

    // Dead-man switch: if Video 1 doesn't start within 2500ms, skip to Video 2.
    // Set AFTER confirming reduced motion is off — non-negotiable order.
    let deadManTimer = setTimeout(() => {
      console.warn('Loader: video1 timeout — skipping to explosion');
      borderPath.style.strokeDashoffset = '0';
      playExplosion();
    }, 2500);

    // Video 1 started — clear dead-man
    video1.addEventListener('timeupdate', () => {
      clearTimeout(deadManTimer);
      deadManTimer = null;
    }, { once: true });

    // Border syncs with Video 1 playback
    video1.addEventListener('play', () => requestAnimationFrame(updateBorder));

    // Video 1 ended — immediately play Video 2
    video1.addEventListener('ended', () => {
      clearTimeout(deadManTimer);
      borderPath.style.strokeDashoffset = '0';
      playExplosion();
    });

    video1.play().catch(() => showTapPrompt());
  }

  // ─── BORDER SYNC ──────────────────────────────────────────────────────────
  function updateBorder() {
    const offset = totalLength - (totalLength * (video1.currentTime / video1.duration));
    borderPath.style.strokeDashoffset = offset;
    if (!video1.ended) requestAnimationFrame(updateBorder);
  }

  // ─── TAP PROMPT ───────────────────────────────────────────────────────────
  // Shown when Video 1 autoplay is blocked (mobile with strict autoplay policy).
  // Video 2 follows naturally after Video 1 ends so no separate tap needed.
  function showTapPrompt() {
    tapPrompt.style.display = 'block';
    tapBtn.addEventListener('click', () => {
      tapPrompt.style.display = 'none';
      video1.play();
    }, { once: true });
  }

  // ─── VIDEO 2: EXPLOSION ───────────────────────────────────────────────────
  // Takes over full screen. Square hides. Loader background stays (#030712)
  // so there is no flash between the two videos.
  function playExplosion() {
    square.style.display = 'none';
    video2.style.display = 'block';

    // Guard: run revealAfterExplosion once only
    let done = false;
    function onExplosionEnd() {
      if (done) return;
      done = true;
      revealAfterExplosion();
    }

    // Safety timeout: if Video 2 stalls or fails, proceed after 6 s
    const safetyTimer = setTimeout(onExplosionEnd, 6000);

    video2.addEventListener('ended', () => {
      clearTimeout(safetyTimer);
      onExplosionEnd();
    }, { once: true });

    video2.play().catch(() => {
      // Explosion blocked — skip straight to reveal
      clearTimeout(safetyTimer);
      onExplosionEnd();
    });
  }

  // ─── REVEAL ───────────────────────────────────────────────────────────────
  // Fade the loader out, remove from DOM, then start Three.js lazy load.
  function revealAfterExplosion() {
    gsap.to('#loader', {
      autoAlpha: 0, duration: 0.6,
      onComplete: () => {
        document.getElementById('loader').remove();
        launchThreeJS();
      }
    });
  }

  // ─── THREE.JS HANDOFF ─────────────────────────────────────────────────────
  // Dynamically import phoenix-scene.js ONLY after the loader is gone.
  // Keeps initial bundle under 220KB (Three.js r165 is ~600KB).
  function launchThreeJS() {
    import('/js/three/phoenix-scene.js')
      .then(({ initPhoenixScene }) => initPhoenixScene())
      .catch(() => {
        // WebGL / import failed — show AVIF poster fallback
        const canvas = document.getElementById('phoenix-canvas');
        if (canvas) canvas.style.display = 'none';
        const fallback = document.getElementById('phoenix-fallback');
        if (fallback) fallback.style.display = 'block';
      });
  }
})();
