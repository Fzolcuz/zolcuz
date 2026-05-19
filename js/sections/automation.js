// automation.js — Automation section
// Owns: tab switching, GSAP step reveals, SplitText h2, scroll entrance,
//       IntersectionObserver initial trigger, matchMedia cleanup

export function initAutomation() {
  const section  = document.getElementById('automation');
  if (!section) return;

  const tabs      = section.querySelectorAll('.automation__tab');
  const timelines = section.querySelectorAll('.automation__timeline');

  // -------------------------------------------------------------------------
  // showNiche — hides all timelines, reveals target, staggers steps in
  // -------------------------------------------------------------------------
  function showNiche(niche) {
    // Update tab aria state and active class
    tabs.forEach(tab => {
      const isActive = tab.dataset.niche === niche;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    // Hide all timelines
    timelines.forEach(tl => tl.classList.remove('visible'));

    // Reveal target
    const target = section.querySelector(`.automation__timeline[data-niche="${niche}"]`);
    if (!target) return;

    target.classList.add('visible');

    const steps = target.querySelectorAll('.automation-step');

    // Use autoAlpha (not opacity) — handles visibility:hidden correctly
    gsap.fromTo(
      steps,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      }
    );
  }

  // -------------------------------------------------------------------------
  // Tab click listeners
  // -------------------------------------------------------------------------
  tabs.forEach(tab => {
    tab.addEventListener('click', () => showNiche(tab.dataset.niche));
  });

  // -------------------------------------------------------------------------
  // matchMedia — responsive animations + SplitText
  // -------------------------------------------------------------------------
  let split = null;
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
        // Immediately reveal all steps, skip scroll animations and observer
        timelines.forEach(tl => {
          const steps = tl.querySelectorAll('.automation-step');
          gsap.set(steps, { autoAlpha: 1, y: 0 });
        });
        showNiche('kitchen');
        return;
      }

      // Scroll entrance on inner children (label, h2, tabs strip)
      const entranceEls = section.querySelectorAll(
        '.automation .label, .automation h2, .automation__tabs'
      );

      gsap.from(entranceEls, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
        y: 40,
        autoAlpha: 0,
        stagger: isDesktop ? 0.1 : 0.06,
        duration: 0.7,
        ease: 'power3.out',
      });

      if (isDesktop) {
        // SplitText on h2 — chars stagger, desktop only
        const h2 = section.querySelector('h2');
        if (h2) {
          split = new SplitText(h2, { type: 'chars,words' });
          gsap.from(split.chars, {
            scrollTrigger: {
              trigger: h2,
              start: 'top 85%',
              once: true,
            },
            y: 60,
            autoAlpha: 0,
            stagger: 0.018,
            duration: 0.7,
            ease: 'power3.out',
          });
        }
      }

      // Cleanup — revert SplitText on breakpoint change
      return () => {
        if (split) {
          split.revert();
          split = null;
        }
      };
    }
  );

  // -------------------------------------------------------------------------
  // IntersectionObserver — reveal kitchen ONLY after section enters viewport
  // Prevents entrance animation firing off-screen on page load
  // -------------------------------------------------------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        showNiche('kitchen');
        observer.disconnect(); // once only
      }
    },
    { threshold: 0.2 }
  );
  observer.observe(section);
}
