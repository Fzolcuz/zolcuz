export function initAbout() {
  const section = document.getElementById('about');
  if (!section) return;

  let split = null;
  const ctx = gsap.matchMedia();

  ctx.add(
    {
      isDesktop:      '(min-width: 769px)',
      isMobile:       '(max-width: 768px)',
      prefersReduced: '(prefers-reduced-motion: reduce)'
    },
    (context) => {
      const { isDesktop, isMobile, prefersReduced } = context.conditions;

      // ── Reduced motion: reveal immediately, no ScrollTriggers ────────────
      if (prefersReduced) {
        gsap.set(
          [
            '.about__statement-col .label',
            '.about__h2',
            '.about__body',
            '.about__details',
            '.about__detail-item',
            '.about__meta p'
          ],
          { autoAlpha: 1, y: 0, clearProps: 'all' }
        );
        return;
      }

      // ── Desktop ───────────────────────────────────────────────────────────
      if (isDesktop) {
        // SplitText on h2 — the section's one signature moment
        split = new SplitText('.about__h2', { type: 'chars' });

        // Label — slides up ahead of the h2
        gsap.from('.about__statement-col .label', {
          scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 80%',
            once: true
          },
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out'
        });

        // H2 char stagger — premium entrance
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 80%',
            once: true
          },
          y: 40,
          autoAlpha: 0,
          stagger: 0.018,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.1
        });

        // Body paragraphs — trail the h2
        gsap.from('.about__body', {
          scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 80%',
            once: true
          },
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.35
        });

        // Details panel — enters from right column with slight delay
        gsap.from('.about__details', {
          scrollTrigger: {
            trigger: '.about__grid',
            start: 'top 80%',
            once: true
          },
          y: 40,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.15
        });

        // Niche items — stagger within details panel
        gsap.from('.about__detail-item', {
          scrollTrigger: {
            trigger: '.about__details',
            start: 'top 80%',
            once: true
          },
          y: 20,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2
        });

        // Meta strip items — last to arrive
        gsap.from('.about__meta p', {
          scrollTrigger: {
            trigger: '.about__details',
            start: 'top 80%',
            once: true
          },
          y: 16,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.55,
          ease: 'power3.out',
          delay: 0.45
        });
      }

      // ── Mobile: lighter, no SplitText ─────────────────────────────────────
      if (isMobile) {
        // Statement col as a group
        gsap.from(
          [
            '.about__statement-col .label',
            '.about__h2',
            '.about__body'
          ],
          {
            scrollTrigger: {
              trigger: '.about__grid',
              start: 'top 85%',
              once: true
            },
            y: 24,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.6,
            ease: 'power3.out'
          }
        );

        // Details panel
        gsap.from('.about__details', {
          scrollTrigger: {
            trigger: '.about__details',
            start: 'top 85%',
            once: true
          },
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out'
        });

        // Niche items
        gsap.from('.about__detail-item', {
          scrollTrigger: {
            trigger: '.about__details',
            start: 'top 85%',
            once: true
          },
          y: 16,
          autoAlpha: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.15
        });

        // Meta strip
        gsap.from('.about__meta p', {
          scrollTrigger: {
            trigger: '.about__details',
            start: 'top 85%',
            once: true
          },
          y: 12,
          autoAlpha: 0,
          stagger: 0.04,
          duration: 0.45,
          ease: 'power3.out',
          delay: 0.35
        });
      }

      // Cleanup on breakpoint change
      return () => {
        split?.revert();
      };
    }
  );
}
