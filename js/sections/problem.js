// Problem section — Session 6
// Owns: staggered scroll entrance + per-line border/colour activation
// Depends on: GSAP + ScrollTrigger (registered in app.js)

export function initProblem() {
  const lines          = document.querySelectorAll('.problem__line');
  const linesContainer = document.querySelector('.problem__lines');

  // Guard — section may not be present on all pages
  if (!lines.length || !linesContainer) return;

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
      // Skip entrance entirely. Reveal all lines at full opacity immediately.
      // Still apply .active so border/colour state is correct without transition.
      if (prefersReduced) {
        gsap.set(lines, { autoAlpha: 1, y: 0 });
        lines.forEach(line => line.classList.add('active'));
        return;
      }

      // ── 1. Staggered fade-in entrance ───────────────────────────────────
      // Single ScrollTrigger on the container fires the whole stagger sequence.
      // ease: power3.out — project entrance ease (sys-motion-engine.md)
      // autoAlpha handles both opacity AND visibility:hidden — never use opacity alone
      // once:true — fires exactly once; ScrollTrigger cleans itself up after
      gsap.from(lines, {
        scrollTrigger: {
          trigger:         linesContainer,
          start:           'top 80%',
          once:            true,
          fastScrollEnd:   true,
          preventOverlaps: true,
        },
        y:         24,
        autoAlpha: 0,
        stagger:   0.15,
        duration:  0.6,
        ease:      'power3.out',
      });

      // ── 2. Per-line border/colour activation ────────────────────────────
      // Each line gets its own ScrollTrigger so the border turns teal as that
      // specific line enters the viewport — independent of the stagger above.
      // CSS transition (cubic-bezier 0.05 0.7 0.1 1.0) handles the visual change.
      lines.forEach(line => {
        ScrollTrigger.create({
          trigger: line,
          start:   'top 75%',
          once:    true,
          onEnter: () => line.classList.add('active'),
        });
      });

      // ── Cleanup ─────────────────────────────────────────────────────────
      // ctx.revert() calls this when matchMedia conditions change (e.g. resize
      // crosses the 769px breakpoint). Remove .active so state is clean on re-init.
      return () => {
        lines.forEach(line => line.classList.remove('active'));
      };
    }
  );
}
