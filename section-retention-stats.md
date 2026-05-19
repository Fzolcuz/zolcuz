---
name: section-retention-stats
description: Use only when building the Retention Stats section.
---
# Retention Stats Section

## Selectors
.retention, .retention__grid, .stat-block, .stat-number

## Dependencies
sys-core-tokens, typography-and-fonts, layout-and-spacing, signature-animation-moments

## HTML structure with required data attributes
```html
<section class="retention" id="retention">
  <div class="retention__inner">
    <div class="retention__header">
      <span class="label">The Evidence</span>
      <h2>Numbers That Close Deals</h2>
    </div>
    <div class="retention__grid">

      <div class="stat-block">
        <p class="stat-number" data-value="88" data-suffix="%" data-decimals="0">0</p>
        <p class="stat-label">Average dwell time improvement</p>
      </div>

      <div class="stat-block">
        <p class="stat-number" data-value="2" data-suffix="x" data-decimals="0" data-prefix="">0</p>
        <p class="stat-label">Form completion rate</p>
      </div>

      <div class="stat-block">
        <p class="stat-number" data-value="400" data-suffix="%" data-decimals="0">0</p>
        <p class="stat-label">Speed-to-lead improvement</p>
      </div>

      <div class="stat-block">
        <p class="stat-number" data-value="2.5" data-suffix="x" data-decimals="1">0</p>
        <p class="stat-label">Engagement vs static sites</p>
      </div>

      <div class="stat-block">
        <p class="stat-number" data-value="75" data-suffix="%" data-decimals="0">0</p>
        <p class="stat-label">Of buyers judge credibility by website quality</p>
      </div>

    </div>
  </div>
</section>
```

## CSS
```css
.retention {
  background: var(--bg-0);
  background: rgba(3,7,18,0.92); /* --bg-0 with slight opacity for depth */
  padding: 112px 24px;
  text-align: center;
}
.retention__inner {
  max-width: 1200px;
  margin: 0 auto;
}
.retention__header {
  margin-bottom: 64px;
  text-align: center;
}
.retention__header h2 {
  margin-top: 12px;
}
.retention__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 64px 80px;
}
.stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.stat-number {
  font-family: var(--font-display);
  font-size: clamp(56px, 8vw, 80px);
  font-weight: 600;
  color: var(--accent);
  line-height: 1;
  margin: 0;
}
.stat-label {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-2);
  max-width: 160px;
  line-height: 1.5;
  margin: 0;
}
```

## Counter animation
Use the counter function from signature-animation-moments.md.
The data attributes are: data-value (target number), data-suffix (e.g. %), data-decimals (decimal places), data-prefix (optional).
Trigger on viewport entry. Once only (once: true).

## Visual treatment
The Cormorant Garamond numerals ARE the visual. Never use charts, graphs, or icons.

## Layout note
This is the only section where centered layout is acceptable.
Centered because the numbers are the hero and symmetry serves the data.

## Strategic placement
Place the "2x form completions" stat nearest to the portfolio/gallery section to frame the work as a strategic business asset.

## Exit check
All stat-number elements have correct data attributes? Counter animations trigger once on viewport entry? High contrast against dark background? Numerals feel authoritative?
