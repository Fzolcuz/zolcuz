export function initPackages() {
  const section = document.querySelector('#packages');
  if (!section) return;

  const ctx = gsap.matchMedia();

  ctx.add(
    {
      isDesktop:      '(min-width: 769px)',
      isMobile:       '(max-width: 768px)',
      prefersReduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const { isDesktop, isMobile, prefersReduced } = context.conditions;

      if (prefersReduced) {
        gsap.set(['.packages h2', '.package-card', '.packages__maintenance'], {
          clearProps: 'all',
        });
        return;
      }

      let split;

      if (isDesktop) {
        split = new SplitText('.packages h2', { type: 'chars,words' });

        gsap.from(split.chars, {
          scrollTrigger: { trigger: '.packages__header', start: 'top 80%', once: true },
          y: 60,
          autoAlpha: 0,
          stagger: 0.018,
          duration: 0.75,
          ease: 'power3.out',
        });

        gsap.from('.package-card', {
          scrollTrigger: { trigger: '.packages__stack', start: 'top 75%', once: true },
          y: 50,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
        });

        gsap.from('.packages__maintenance', {
          scrollTrigger: { trigger: '.packages__maintenance', start: 'top 85%', once: true },
          y: 30,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (isMobile) {
        gsap.from('.package-card', {
          scrollTrigger: { trigger: '.packages__stack', start: 'top 80%', once: true },
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
        });

        gsap.from('.packages__maintenance', {
          scrollTrigger: { trigger: '.packages__maintenance', start: 'top 85%', once: true },
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      }

      return () => {
        if (split) split.revert();
      };
    }
  );
}
