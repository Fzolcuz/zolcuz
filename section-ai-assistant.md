---
name: section-ai-assistant
description: Use only when building the AI Assistant section.
---
# AI Assistant Section

## Selectors
.ai-assistant, .ai-assistant__grid, .ai-demo-card, .ai-wave, .ai-wave__bar

## Dependencies
sys-core-tokens, typography-and-fonts, layout-and-spacing, conversion-and-forms

## HTML structure
```html
<section class="ai-assistant section-grain" id="ai-assistant">
  <div class="ai-assistant__inner">
    <div class="ai-assistant__grid">
      <div class="ai-assistant__copy">
        <span class="label">Intelligent Infrastructure</span>
        <h2>Your Website Qualifies Leads<br>While You Sleep</h2>
        <p>The AI Virtual Concierge handles after-hours inquiries, qualifies budget and timeline, and routes serious leads directly to you — automatically.</p>
        <div class="ai-cost-compare">
          <div class="ai-cost-item">
            <span class="ai-cost-label">Human admin</span>
            <span class="ai-cost-value ai-cost-value--crossed">$3,000/mo</span>
          </div>
          <div class="ai-cost-item">
            <span class="ai-cost-label">AI Virtual Concierge</span>
            <span class="ai-cost-value ai-cost-value--accent">$150/mo</span>
          </div>
        </div>
      </div>
      <div class="ai-assistant__demo-wrapper" id="ai-demo-wrapper">
        <div class="ai-wave" id="ai-wave" aria-hidden="true">
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
          <span class="ai-wave__bar"></span>
        </div>
        <div class="ai-demo-card" id="ai-demo-card" style="display:none">
          <!-- Chatbase or Voiceflow embed goes here -->
        </div>
        <button class="ai-activate-btn" id="ai-activate-btn">
          <span>Experience the Concierge</span>
        </button>
      </div>
    </div>
  </div>
</section>
```

## CSS
```css
.ai-assistant__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-14) var(--space-3);
}
.ai-assistant__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
@media (max-width: 768px) {
  .ai-assistant__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.ai-wave {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 60px;
}
.ai-wave__bar {
  display: block;
  width: 3px;
  height: 8px;
  background: var(--accent);
  border-radius: 2px;
  opacity: 0.6;
}
.ai-cost-compare {
  display: flex;
  gap: 32px;
  margin-top: 24px;
}
.ai-cost-label {
  display: block;
  font-size: 12px;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}
.ai-cost-value {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
}
.ai-cost-value--crossed {
  color: var(--text-2);
  text-decoration: line-through;
}
.ai-cost-value--accent {
  color: var(--accent);
}
.ai-activate-btn {
  background: none;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 14px;
  letter-spacing: 0.08em;
  margin-top: 20px;
  transition: background 200ms, color 200ms;
}
/* REQUIRED: hover inside media query — prevents sticky hover on touch */
@media (hover: hover) and (pointer: fine) {
  .ai-activate-btn:hover {
    background: var(--accent);
    color: #030712;
  }
}
```

## GSAP audio wave animation
```javascript
function initAudioWave() {
  const bars = document.querySelectorAll('.ai-wave__bar');

  bars.forEach((bar, i) => {
    gsap.to(bar, {
      scaleY: gsap.utils.random(3, 8),
      duration: gsap.utils.random(0.4, 0.8),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.08, // stagger start times for natural wave look
      transformOrigin: 'bottom center'
    });
  });
}
```

## Widget loads behind user gesture — IntersectionObserver + button
```javascript
const activateBtn = document.getElementById('ai-activate-btn');
const demoCard = document.getElementById('ai-demo-card');
const demoWrapper = document.getElementById('ai-demo-wrapper');

// Start wave animation when section enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initAudioWave();
      observer.disconnect(); // only init once
    }
  });
}, { threshold: 0.3 });
observer.observe(document.getElementById('ai-assistant'));

// Load widget ONLY on button click — never on page load
activateBtn.addEventListener('click', () => {
  activateBtn.style.display = 'none';
  demoCard.style.display = 'block';

  // Lazy load Chatbase or Voiceflow embed script here
  const script = document.createElement('script');
  script.src = 'https://www.chatbase.co/embed.min.js';
  script.setAttribute('chatbotId', 'YOUR_CHATBOT_ID');
  script.defer = true;
  document.head.appendChild(script);
}, { once: true });
```

## Copy framing
Never "chatbot." Always "Virtual Concierge."
Frame as infrastructure not a feature: "While you sleep, your website qualifies leads."

## Performance
Wave animation only starts when section is in viewport.
Widget script only loads on button click — never on page load.
This protects initial page load from chatbot script weight.

## Exit check
Wave animation starts when section enters viewport? Widget never loads until button clicked? Cost comparison is clearly legible? AI feels like infrastructure not a gimmick?
