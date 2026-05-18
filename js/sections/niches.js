// Niches section — Session 8
// Owns: scroll entrance, card click cross-fade, --niche-active variable, media warming
// Depends on: GSAP + ScrollTrigger (registered in app.js)

export function initNiches() {
  const section = document.querySelector('.niches');
  const grid    = document.querySelector('.niches__grid');
  const cards   = document.querySelectorAll('.niche-card');

  // Guard — section may not be present on all pages
  if (!section || !grid || !cards.length) return;

  // ── Niche accent colours ──────────────────────────────────────────────────
  // Section-only accents — never used as CTA fill colours (spec rule)
  const nicheColors = {
    kitchen:  '#8B3B2C',
    theater:  '#1E2B44',
    closet:   '#9AA3A9',
    bathroom: '#2F6F6D',
    windows:  '#244836',
  };

  // Initialise --niche-active to kitchen (default active card)
  document.documentElement.style.setProperty('--niche-active', nicheColors.kitchen);

  // ── Card activation — cross-fade + accent colour swap ────────────────────
  // ease: power2.out — project hover/interaction ease (sys-motion-engine.md)
  // autoAlpha — handles both opacity AND visibility:hidden; never raw opacity
  function activateCard(card) {
    const currentActive = document.querySelector('.niche-card.active');
    if (!currentActive || card === currentActive) return;

    const niche = card.dataset.niche;

    // Dim current active, swap class, reveal incoming card
    gsap.to(currentActive, {
      autoAlpha: 0.5,
      duration:  0.2,
      ease:      'power2.out',
      onComplete: () => {
        currentActive.classList.remove('active');
        card.classList.add('active');
        gsap.to(card, {
          autoAlpha: 1,
          duration:  0.3,
          ease:      'power2.out',
        });
      },
    });

    // Swap section accent colour on :root
    if (nicheColors[niche]) {
      document.documentElement.style.setProperty('--niche-active', nicheColors[niche]);
    }
  }

  // Attach click and keyboard handlers to every card
  cards.forEach(card => {
    // Click
    card.addEventListener('click', () => activateCard(card));

    // Keyboard — Enter or Space triggers activation (accessibility)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateCard(card);
      }
    });
  });

  // ── Media warming — idle-load non-default niche images ───────────────────
  // Kitchen (default active) is loaded on first paint — no lazy loading.
  // Remaining four warm during browser idle time to avoid contention with
  // above-the-fold paint. requestIdleCallback with setTimeout(2000) fallback.
  const warmImages = [
    '/assets/img/niche-theater.avif',
    '/assets/img/niche-closet.avif',
    '/assets/img/niche-bathroom.avif',
    '/assets/img/niche-windows.avif',
  ];

  function warmNicheMedia() {
    warmImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(warmNicheMedia, { timeout: 3000 });
  } else {
    setTimeout(warmNicheMedia, 2000);
  }

  // ── gsap.matchMedia() ctx — scroll entrance ───────────────────────────────
  // REQUIRED for leak-free cleanup on breakpoint change.
  // Assigning to ctx and returning cleanup prevents orphaned ScrollTriggers.
  const ctx = gsap.matchMedia();

  ctx.add(
    {
      isDesktop:      '(min-width: 769px)',
      isMobile:       '(max-width: 768px)',
      prefersReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { prefersReduced } = context.conditions;

      // ── Reduced motion path ───────────────────────────────────────────────
      // Skip entrance entirely. All cards immediately at full opacity.
      if (prefersReduced) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      // ── Staggered scroll entrance ─────────────────────────────────────────
      // Single ScrollTrigger on the grid fires the stagger sequence.
      // autoAlpha — handles opacity + visibility:hidden in one property.
      // once:true — fires exactly once; ScrollTrigger self-cleans after.
      // ease: power3.out — project GSAP entrance ease (sys-motion-engine.md)
      gsap.from(cards, {
        scrollTrigger: {
          trigger:         grid,
          start:           'top 80%',
          once:            true,
          fastScrollEnd:   true,
          preventOverlaps: true,
        },
        y:         40,
        autoAlpha: 0,
        stagger:   0.1,
        duration:  0.7,
        ease:      'power3.out',
      });

      // ── Cleanup ───────────────────────────────────────────────────────────
      // ctx.revert() calls this on breakpoint change.
      // No CSS classes toggled here — GSAP manages its own inline style state.
      return () => {};
    }
  );
}
