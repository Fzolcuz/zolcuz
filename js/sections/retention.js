// Retention Stats Section — Session 9
// Owns: scroll entrance stagger, counter animation
// Counter pattern: signature-animation-moments.md initCounters()
// Depends on: GSAP + ScrollTrigger (registered in app.js)

export function initRetention() {
  const section    = document.querySelector('.retention');
  const grid       = document.querySelector('.retention__grid');
  const statBlocks = document.querySelectorAll('.stat-block');
  const statNums   = document.querySelectorAll('.stat-number');

  // Guard — section may not be present on all pages
  if (!section || !grid || !statBlocks.length || !statNums.length) return;

  // ── Helper — write final value to a .stat-number element ─────────────────
  // Used by both the reduced-motion path (immediate) and the counter onUpdate.
  // Reads data-prefix, data-suffix, data-decimals from the element.
  function writeValue(el, val) {
    const decimals = parseInt(el.dataset.decimals || '0');
    const suffix   = el.dataset.suffix  || '';
    const prefix   = el.dataset.prefix  || '';
    el.textContent = prefix + parseFloat(val).toFixed(decimals) + suffix;
  }

  // ── gsap.matchMedia() ctx — both entrance + counters ─────────────────────
  // REQUIRED for leak-free cleanup on breakpoint change.
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
      // No entrance animation. No counter sweep.
      // Jump every stat-number directly to its final value.
      if (prefersReduced) {
        statNums.forEach(el => {
          const target = parseFloat(el.dataset.value);
          writeValue(el, target);
          gsap.set(el.closest('.stat-block'), { autoAlpha: 1, y: 0 });
        });
        return;
      }

      // ── Staggered scroll entrance — stat-blocks ─────────────────────────
      // Single ScrollTrigger on the grid fires the stagger sequence.
      // autoAlpha — handles opacity + visibility:hidden in one property.
      // once:true — fires exactly once; ScrollTrigger self-cleans after.
      // ease: power3.out — project GSAP entrance ease (sys-motion-engine.md)
      gsap.from(statBlocks, {
        scrollTrigger: {
          trigger:         grid,
          start:           'top 80%',
          once:            true,
          fastScrollEnd:   true,
          preventOverlaps: true,
        },
        y:         40,
        autoAlpha: 0,
        stagger:   0.12,
        duration:  0.7,
        ease:      'power3.out',
      });

      // ── Counter animations — one per .stat-number ───────────────────────
      // Pattern from signature-animation-moments.md — exact implementation.
      // Triggered individually per stat block so off-screen stats don't count.
      // ease: power1.out — decelerates toward target (correct for counters).
      // snap: rounds to integer (decimals=0) or 1dp (decimals=1).
      // once: true — fires exactly once per element.
      statNums.forEach(el => {
        const target   = parseFloat(el.dataset.value);
        const decimals = parseInt(el.dataset.decimals || '0');

        gsap.from(
          { val: 0 },
          {
            val:      target,
            duration: 2,
            ease:     'power1.out',
            snap:     { val: decimals === 0 ? 1 : 0.1 },
            onUpdate: function () {
              writeValue(el, this.targets()[0].val);
            },
            scrollTrigger: {
              trigger: el.closest('.stat-block'),
              start:   'top 70%',
              once:    true,
            },
          }
        );
      });

      // ── Cleanup ──────────────────────────────────────────────────────────
      // ctx.revert() calls this on breakpoint change.
      // GSAP manages inline style state — no CSS classes to toggle.
      return () => {};
    }
  );
}
