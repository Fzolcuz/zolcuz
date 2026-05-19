---
name: section-automation
description: Use only when building the Automation section.
---
# Automation Section

## Selectors
.automation, .automation__tabs, .automation__tab, .automation__timeline, .automation-step

## Dependencies
sys-core-tokens, typography-and-fonts, layout-and-spacing, sys-motion-engine, conversion-and-forms

## HTML structure
```html
<section class="automation section-grain" id="automation">
  <div class="automation__inner">
    <span class="label">Automated Revenue Systems</span>
    <h2>Every Lead. Followed Up. Automatically.</h2>

    <!-- Niche tab filter -->
    <div class="automation__tabs" role="tablist">
      <button class="automation__tab active" data-niche="kitchen" role="tab" aria-selected="true">Kitchen</button>
      <button class="automation__tab" data-niche="theater" role="tab" aria-selected="false">Theater</button>
      <button class="automation__tab" data-niche="closet" role="tab" aria-selected="false">Closet</button>
      <button class="automation__tab" data-niche="bathroom" role="tab" aria-selected="false">Bathroom</button>
      <button class="automation__tab" data-niche="windows" role="tab" aria-selected="false">Windows</button>
    </div>

    <!-- Timeline for each niche — show/hide via JS -->
    <div class="automation__content" id="automation-content">
      <div class="automation__timeline" data-niche="kitchen">
        <div class="automation-step">
          <span class="automation-step__num">01</span>
          <div class="automation-step__body">
            <p class="automation-step__experience">Homeowner submits cabinetry inquiry</p>
            <p class="automation-step__outcome">→ Instant email to owner with budget and scope summary</p>
          </div>
        </div>
        <div class="automation-step">
          <span class="automation-step__num">02</span>
          <div class="automation-step__body">
            <p class="automation-step__experience">Lead is qualified for investment range</p>
            <p class="automation-step__outcome">→ Confirmation sent to lead with gallery PDF attachment</p>
          </div>
        </div>
        <div class="automation-step">
          <span class="automation-step__num">03</span>
          <div class="automation-step__body">
            <p class="automation-step__experience">Booking link delivered automatically</p>
            <p class="automation-step__outcome">→ Consultation booked without a single phone call</p>
          </div>
        </div>
      </div>
      <!-- Repeat for theater, closet, bathroom, windows — hidden by default -->
    </div>
  </div>
</section>
```

## CSS
```css
.automation__tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 32px 0 48px;
}
.automation__tab {
  background: none;
  border: 1px solid var(--border-subtle);
  color: var(--text-2);
  padding: 8px 20px;
  border-radius: 100px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 14px;
  transition: border-color 200ms, color 200ms, background 200ms;
}
/* REQUIRED: hover inside media query — prevents sticky hover on touch */
@media (hover: hover) and (pointer: fine) {
  .automation__tab:hover {
    color: var(--text-0);
    border-color: var(--border-strong);
  }
}
.automation__tab.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #030712;
}
.automation__timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.automation__timeline[data-niche]:not(.visible) {
  display: none;
}
.automation__timeline.visible {
  display: flex;
}
.automation-step {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 24px;
  align-items: start;
  /* Steps start hidden — GSAP autoAlpha reveals them on tab switch */
  visibility: hidden;
  opacity: 0;
  transform: translateY(20px);
}
.automation-step__num {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 600;
  color: var(--accent);
  opacity: 0.3;
  line-height: 1;
}
.automation-step__experience {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text-0);
  margin: 0 0 8px;
}
.automation-step__outcome {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--accent);
  margin: 0;
}
```

## Tab switching JavaScript
```javascript
const tabs = document.querySelectorAll('.automation__tab');
const timelines = document.querySelectorAll('.automation__timeline');

function showNiche(niche) {
  // Update tab states
  tabs.forEach(tab => {
    const isActive = tab.dataset.niche === niche;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  // Show correct timeline, hide others
  timelines.forEach(timeline => {
    timeline.classList.remove('visible');
  });

  const target = document.querySelector(`.automation__timeline[data-niche="${niche}"]`);
  if (target) {
    target.classList.add('visible');
    const steps = target.querySelectorAll('.automation-step');
    // Use autoAlpha (not opacity) — consistent with system standard
    gsap.fromTo(steps,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
    );
  }
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => showNiche(tab.dataset.niche));
});

// Show kitchen by default ONLY after section enters viewport
// Prevents the entrance animation from firing off-screen on page load
const automationSection = document.getElementById('automation');
const automationObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    showNiche('kitchen');
    automationObserver.disconnect(); // run once only
  }
}, { threshold: 0.2 });
automationObserver.observe(automationSection);
```

## Per-niche workflows

### Kitchen
inquiry → qualify budget and scope → team summary email → confirmation → gallery PDF

### Home Theater
inquiry → room dimensions + budget + timeline → lead tagging → SMS to hot leads → portfolio PDF

### Closet
post-consultation → proposal recap → testimonial request → 5-day nurture sequence

### Bathroom
inquiry → qualify type and budget → route to designer → process guide → auto-schedule

### Windows and Doors
quote request → property details + count + style → brochure send → estimator notification → 14-day follow-up

## Vocabulary
"Virtual Concierge" never "chatbot"
Use niche-specific jargon per workflow (see copy-voice-and-vocabulary.md)

## Exit check
Tab switching smooth with GSAP stagger? All 5 niche timelines present? Steps use autoAlpha not opacity? Hover state inside @media (hover: hover)? Default niche revealed via IntersectionObserver (not on page load)? Clear dual-layer (customer experience vs owner outcome)?
