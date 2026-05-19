// footer.js — Session 15

export function initFooter() {
  // ── 1. Static DOM setup — runs immediately, no animation dependency ──────
  const footer    = document.getElementById('contact');
  const linkedin  = document.getElementById('footer-linkedin');
  const copyright = document.querySelector('.footer__copyright');
  const form      = document.getElementById('footer-form');
  const input     = document.getElementById('footer-email');
  const btn       = form?.querySelector('button[type="submit"]');

  // LinkedIn obfuscation — prevents scraper harvesting
  if (linkedin) {
    linkedin.href = 'https://linkedin.com/company/' + 'zolcuz' + '-studios';
  }

  // Copyright year — always current, never hardcoded
  if (copyright) {
    copyright.textContent =
      `© ${new Date().getFullYear()} ZOLCUZ Studios. All rights reserved.`;
  }

  // ── 2. Form submit handler ────────────────────────────────────────────────
  if (form && input && btn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = input.value.trim();

      // Client-side validation — highlight and focus on fail
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.style.borderColor = 'var(--accent-crimson)';
        input.focus();
        return;
      }
      input.style.borderColor = '';

      btn.textContent = 'Requesting…';
      btn.disabled    = true;

      // Cold-start UX — Vercel serverless functions can take up to 2s to warm
      const coldStart = setTimeout(() => {
        btn.textContent = 'Waking secure server…';
      }, 2000);

      try {
        const turnstileToken = window.turnstile?.getResponse() ?? '';

        const res = await fetch('/api/submit', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            email,
            source:                  'footer',
            'cf-turnstile-response': turnstileToken
          })
        });

        clearTimeout(coldStart);

        if (res.ok) {
          btn.textContent = 'Sent — we’ll be in touch within 24 hours';
          form.reset();
        } else {
          btn.textContent = 'Something went wrong — try again';
          btn.disabled    = false;
        }
      } catch {
        clearTimeout(coldStart);
        btn.textContent = 'Connection error — try again';
        btn.disabled    = false;
      }
    });
  }

  // ── 3. GSAP scroll entrance + SplitText ──────────────────────────────────
  if (!footer) return;

  const headline = footer.querySelector('.footer__headline');
  const formEl   = footer.querySelector('.footer__form');
  const micro    = footer.querySelector('.footer__micro');
  const badges   = footer.querySelector('.footer__badges');
  const meta     = footer.querySelector('.footer__meta');

  const ctx = gsap.matchMedia();

  ctx.add(
    {
      isDesktop:      '(min-width: 769px)',
      isMobile:       '(max-width: 768px)',
      prefersReduced: '(prefers-reduced-motion: reduce)'
    },
    (context) => {
      const { isDesktop, isMobile, prefersReduced } = context.conditions;

      // Reduced motion — reveal everything immediately, skip all ScrollTriggers
      if (prefersReduced) {
        gsap.set(
          [headline, formEl, micro, badges, meta].filter(Boolean),
          { autoAlpha: 1, y: 0, clearProps: 'all' }
        );
        return;
      }

      if (isDesktop) {
        // Signature moment — SplitText chars reveal on headline (one per section)
        let split = null;
        if (headline) {
          split = new SplitText(headline, { type: 'chars' });
          gsap.from(split.chars, {
            scrollTrigger: {
              trigger: footer,
              start:   'top 75%',
              once:    true
            },
            y:         40,
            autoAlpha: 0,
            stagger:   0.018,
            duration:  0.7,
            ease:      'power3.out'
          });
        }

        // Form entrance — delayed slightly after headline starts
        if (formEl) {
          gsap.from(formEl, {
            scrollTrigger: {
              trigger: footer,
              start:   'top 75%',
              once:    true
            },
            y:         30,
            autoAlpha: 0,
            duration:  0.7,
            delay:     0.18,
            ease:      'power3.out'
          });
        }

        // Micro copy
        if (micro) {
          gsap.from(micro, {
            scrollTrigger: {
              trigger: micro,
              start:   'top 90%',
              once:    true
            },
            y:         16,
            autoAlpha: 0,
            duration:  0.6,
            ease:      'power3.out'
          });
        }

        // Badges — stagger each pill
        if (badges) {
          const badgeEls = badges.querySelectorAll('.footer__badge');
          if (badgeEls.length) {
            gsap.from(badgeEls, {
              scrollTrigger: {
                trigger: badges,
                start:   'top 90%',
                once:    true
              },
              y:         20,
              autoAlpha: 0,
              stagger:   0.06,
              duration:  0.6,
              ease:      'power3.out'
            });
          }
        }

        // Meta bar — quiet fade, no y movement (feels settled)
        if (meta) {
          gsap.from(meta, {
            scrollTrigger: {
              trigger: meta,
              start:   'top 95%',
              once:    true
            },
            autoAlpha: 0,
            duration:  0.6,
            ease:      'power3.out'
          });
        }

        // Cleanup SplitText on breakpoint change or revert
        return () => { split?.revert(); };
      }

      if (isMobile) {
        // Mobile — lighter: no SplitText, halved y values, tighter stagger
        const blockItems = [headline, formEl, micro].filter(Boolean);
        if (blockItems.length) {
          gsap.from(blockItems, {
            scrollTrigger: {
              trigger: footer,
              start:   'top 85%',
              once:    true
            },
            y:         20,
            autoAlpha: 0,
            stagger:   0.06,
            duration:  0.6,
            ease:      'power3.out'
          });
        }

        if (badges) {
          const badgeEls = badges.querySelectorAll('.footer__badge');
          if (badgeEls.length) {
            gsap.from(badgeEls, {
              scrollTrigger: {
                trigger: badges,
                start:   'top 90%',
                once:    true
              },
              y:         12,
              autoAlpha: 0,
              stagger:   0.04,
              duration:  0.5,
              ease:      'power3.out'
            });
          }
        }

        if (meta) {
          gsap.from(meta, {
            scrollTrigger: {
              trigger: meta,
              start:   'top 95%',
              once:    true
            },
            autoAlpha: 0,
            duration:  0.5,
            ease:      'power3.out'
          });
        }
      }
    }
  );
}
