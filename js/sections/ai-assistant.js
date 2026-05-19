// js/sections/ai-assistant.js
// Session 13 — AI Assistant / Virtual Concierge section
//
// Signature moment: audio wave animation fires when section enters viewport.
// Embed widget loads ONLY on button click — never on page load.
// gsap.matchMedia() ctx owns all scroll entrances + SplitText cleanup.

export function initAiAssistant() {
  // ── Element refs ─────────────────────────────────────────────────────────
  const section     = document.getElementById('ai-assistant');
  const waveEl      = document.getElementById('ai-wave');
  const bars        = document.querySelectorAll('.ai-wave__bar');
  const activateBtn = document.getElementById('ai-activate-btn');
  const demoCard    = document.getElementById('ai-demo-card');
  const demoWrapper = document.getElementById('ai-demo-wrapper');

  // Guard — abort silently if section not in DOM
  if (!section || !waveEl || !bars.length || !activateBtn || !demoCard || !demoWrapper) return;

  // ── Audio wave ───────────────────────────────────────────────────────────
  // Each bar gets independent random values — organic, not mechanical.
  // sine.inOut is correct here: audio waveforms breathe, not snap.
  function initAudioWave() {
    bars.forEach((bar, i) => {
      gsap.to(bar, {
        scaleY:          gsap.utils.random(3, 8),
        duration:        gsap.utils.random(0.4, 0.8),
        ease:            'sine.inOut',
        repeat:          -1,
        yoyo:            true,
        delay:           i * 0.08,  // stagger start times for natural wave look
        transformOrigin: 'bottom center'
      });
    });
  }

  // ── Show demo ────────────────────────────────────────────────────────────
  // Called once on button click. Fades wave out, reveals card, lazy-loads embed.
  function showDemo() {
    // Stop all wave tweens cleanly before removing from view
    gsap.killTweensOf(bars);

    gsap.to(waveEl, {
      autoAlpha: 0,
      duration:  0.4,
      ease:      'power2.out',
      onComplete() {
        waveEl.style.display = 'none';
      }
    });

    // display:block first — GSAP autoAlpha handles visibility/opacity from there
    demoCard.style.display = 'block';

    gsap.fromTo(demoCard,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.15 }
    );

    // Lazy load embed — fires ONLY after user gesture, never on page load.
    // Founder supplies real chatbotId post-build.
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'YOUR_CHATBOT_ID');
    script.defer = true;
    document.head.appendChild(script);
  }

  // ── IntersectionObserver — wave guard ────────────────────────────────────
  // Wave only starts when section enters viewport.
  // prefersReduced path skips entirely — bars stay static via CSS.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    const waveObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initAudioWave();
          waveObserver.disconnect(); // init once only
        }
      });
    }, { threshold: 0.3 });

    waveObserver.observe(section);
  }

  // ── Button click ─────────────────────────────────────────────────────────
  activateBtn.addEventListener('click', showDemo, { once: true });

  // ── Scroll entrances + SplitText ─────────────────────────────────────────
  // gsap.matchMedia() ctx prevents memory leaks across breakpoint changes.
  const ctx = gsap.matchMedia();

  ctx.add({
    isDesktop:      '(min-width: 769px)',
    isMobile:       '(max-width: 768px)',
    prefersReduced: '(prefers-reduced-motion: reduce)'
  }, (context) => {
    const { isDesktop, isMobile, prefersReduced: reduced } = context.conditions;

    // Grab copy elements inside the callback (DOM is ready)
    const label       = section.querySelector('.label');
    const h2          = section.querySelector('h2');
    const copyP       = section.querySelector('.ai-assistant__copy p');
    const costCompare = section.querySelector('.ai-cost-compare');

    // ── Reduced motion path ──────────────────────────────────────────────
    // Set all elements immediately visible. Skip wave (handled above).
    if (reduced) {
      gsap.set(
        [label, h2, copyP, costCompare, waveEl, activateBtn, demoWrapper],
        { autoAlpha: 1, y: 0, clearProps: 'all' }
      );
      return () => {};
    }

    let split = null;

    // ── Desktop ──────────────────────────────────────────────────────────
    if (isDesktop) {
      // SplitText on h2 — chars stagger, consistent with sessions 11 + 12
      split = new SplitText(h2, { type: 'chars,words' });
      gsap.set(split.chars, { autoAlpha: 0, y: 24 });

      // Label entrance
      gsap.from(label, {
        scrollTrigger: { trigger: label, start: 'top 82%', once: true },
        y:         20,
        autoAlpha: 0,
        duration:  0.6,
        ease:      'power3.out'
      });

      // h2 — chars stagger in
      gsap.to(split.chars, {
        scrollTrigger: { trigger: h2, start: 'top 78%', once: true },
        y:         0,
        autoAlpha: 1,
        stagger:   0.018,
        duration:  0.6,
        ease:      'power3.out'
      });

      // Body copy + cost compare — stagger together
      gsap.from([copyP, costCompare], {
        scrollTrigger: { trigger: copyP, start: 'top 80%', once: true },
        y:         28,
        autoAlpha: 0,
        stagger:   0.1,
        duration:  0.7,
        ease:      'power3.out'
      });

      // Demo wrapper — enters from below
      gsap.from(demoWrapper, {
        scrollTrigger: { trigger: demoWrapper, start: 'top 75%', once: true },
        y:         40,
        autoAlpha: 0,
        duration:  0.8,
        ease:      'power3.out'
      });
    }

    // ── Mobile ───────────────────────────────────────────────────────────
    // Lighter: no SplitText, single stagger pass, shorter travel distance
    if (isMobile) {
      gsap.from([label, h2, copyP, costCompare, demoWrapper], {
        scrollTrigger: { trigger: label, start: 'top 85%', once: true },
        y:         24,
        autoAlpha: 0,
        stagger:   0.06,
        duration:  0.6,
        ease:      'power3.out'
      });
    }

    // Cleanup on breakpoint change — revert SplitText to prevent orphaned chars
    return () => {
      if (split) split.revert();
    };
  });
}
