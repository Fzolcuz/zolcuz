// loader.js — Phoenix loader: border sync, dead-man switch, tap prompt, supernova handoff
// Runs after GSAP CDN script. Requires: gsap global, #phoenix-video, .loader__border-path

(function () {
  const video      = document.getElementById('phoenix-video');
  const borderPath = document.querySelector('.loader__border-path');
  const tapPrompt  = document.getElementById('tap-prompt');
  const tapBtn     = document.getElementById('tap-to-start');
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
          if (typeof revealHero === 'function') revealHero();
        }
      });
    }, 800);

  } else {
    // Normal path — set dead-man AFTER confirming reduced motion is off.
    // DEAD-MAN SWITCH — if video does not start within 2500ms, force a safe
    // CSS-only fallback. Uses safeSupernova() because Three.js may not have
    // loaded yet if the video failed at the very start.
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
})();
