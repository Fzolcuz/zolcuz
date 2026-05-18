// Process Section — Session 10
// Owns: scroll illumination state machine (past/active/future opacity)
// Pattern: onEnter + onEnterBack per step — NOT once:true (must re-fire on scroll back)
// CSS transitions own the opacity animation; GSAP assigns classes only
// Depends on: GSAP + ScrollTrigger (registered in app.js)

export function initProcess() {
  const section = document.querySelector('.process');
  const steps   = document.querySelectorAll('.process-step');

  // Guard — section may not be present on all pages
  if (!section || !steps.length) return;

  // ── Helper — set one step active, mark past as done, future as dim ────────
  // Called by both onEnter and onEnterBack so scroll-up re-illuminates correctly.
  // CSS transition handles the opacity animation — this only toggles classes.
  function setActiveStep(index) {
    steps.forEach((step, i) => {
      step.classList.remove('active', 'done');
      if (i < index)  step.classList.add('done');
      if (i === index) step.classList.add('active');
    });
  }

  // ── Activate first step immediately — visible before scroll ───────────────
  // First step starts active on load so the section doesn't render all-dim.
  steps[0].classList.add('active');

  // ── gsap.matchMedia() ctx — state machine ScrollTriggers ─────────────────
  // REQUIRED for leak-free cleanup on breakpoint change.
  // NOTE: these ScrollTriggers intentionally omit once:true —
  //       illumination must re-fire when the user scrolls back up.
  const ctx = gsap.matchMedia();

  ctx.add(
    {
      isDesktop:      '(min-width: 769px)',
      isMobile:       '(max-width: 768px)',
      prefersReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { prefersReduced } = context.conditions;

      // ── Reduced motion path ─────────────────────────────────────────────
      // Skip the state machine — show all steps at full opacity immediately.
      if (prefersReduced) {
        steps.forEach(step => {
          step.classList.remove('active', 'done');
          step.style.opacity = '1';
        });
        // Restore first step's active class for semantic clarity
        steps[0].classList.add('active');
        return;
      }

      // ── Scroll illumination state machine — one ScrollTrigger per step ──
      // trigger: the step itself.
      // start: 'top center' — step illuminates when its top hits viewport center.
      // end: 'bottom center' — used only for positioning, not toggle logic.
      // onEnter: fires when scrolling down past the trigger start.
      // onEnterBack: fires when scrolling back up past the trigger start.
      // Both call setActiveStep(index) — single source of truth for state.
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start:   'top center',
          end:     'bottom center',
          onEnter:     () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });

      // ── Cleanup ──────────────────────────────────────────────────────────
      // ctx.revert() calls this on breakpoint change.
      // Reset class state so CSS opacity returns to default (0.35 dim).
      return () => {
        steps.forEach(step => step.classList.remove('active', 'done'));
        steps[0].classList.add('active');
      };
    }
  );
}
