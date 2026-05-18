// How It Works section — Session 7
// Owns: staggered scroll entrance on .how-step elements
// Depends on: GSAP + ScrollTrigger (registered in app.js)

export function initHow() {
  const steps = document.querySelectorAll('.how-step');
  const grid  = document.querySelector('.how__grid');

  // Guard — section may not be present on all pages
  if (!steps.length || !grid) return;

  // gsap.matchMedia() ctx — REQUIRED for leak-free cleanup on breakpoint change.
  // Assigning to a variable and returning ctx.revert() prevents orphaned ScrollTriggers.
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
      // Skip entrance entirely. Reveal all steps at full opacity immediately.
      if (prefersReduced) {
        gsap.set(steps, { autoAlpha: 1, y: 0 });
        return;
      }

      // ── Staggered scroll entrance ────────────────────────────────────────
      // Single ScrollTrigger on the grid container fires the whole stagger.
      // autoAlpha handles both opacity AND visibility:hidden — never use opacity alone.
      // once:true — fires exactly once; ScrollTrigger self-cleans after.
      // ease: power3.out — project GSAP entrance ease (sys-motion-engine.md)
      gsap.from(steps, {
        scrollTrigger: {
          trigger:         grid,
          start:           'top 80%',
          once:            true,
          fastScrollEnd:   true,
          preventOverlaps: true,
        },
        y:         40,
        autoAlpha: 0,
        stagger:   0.15,
        duration:  0.7,
        ease:      'power3.out',
      });

      // ── Cleanup ─────────────────────────────────────────────────────────
      // ctx.revert() calls this when matchMedia conditions change (e.g. resize
      // crosses the 769px breakpoint). No CSS classes to remove here —
      // GSAP manages its own inline style cleanup on revert.
      return () => {};
    }
  );
}
