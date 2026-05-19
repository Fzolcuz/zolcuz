---
name: typography-and-fonts
description: Use for font scale, line-height, measure, tracking, dark-mode correction, and font loading. Font token variables are defined in sys-core-tokens.md. Read before writing any CSS that involves text.
---
# Typography and Fonts

## Font tokens
--font-display and --font-body are defined in sys-core-tokens.md.
Do NOT redefine them here. Reference them as var(--font-display) and var(--font-body). Do not import or duplicate tokens — sys-core-tokens.md is the single source.

## Font loading tag (in head, before any CSS)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
```

Note: Google Fonts automatically applies font-display: swap. No additional instruction needed.

## Desktop scale (≥1024px)
Hero H1: 88px / 0.95lh / weight 600 / tracking -0.02em
Section H1: 56px / 1.10lh / weight 600 / tracking -0.02em
H2: 40px / 1.15lh / weight 600 / tracking -0.015em
H3: 28px / 1.30lh / weight 600 / tracking -0.01em
Body: 18px / 1.75lh / weight 400 / max-width 65ch
Label/eyebrow: 12px / UPPERCASE / tracking 0.14em / weight 600
Caption: 14px / 1.50lh / weight 400
Button: 16px / 1.25lh / weight 600 / tracking 0.02em

## Mobile scale (≤430px)
Hero H1: 48px
H2: 32px
H3: 22px
Body: 16px minimum

## CSS implementation
```css
h1, h2, h3, h4 { font-family: var(--font-display); }
body, p, a, button, input, label { font-family: var(--font-body); }

.hero-h1 {
  font-size: clamp(48px, 8vw, 88px);
  line-height: 0.95;
  font-weight: 600;
  letter-spacing: -0.02em;
}
h2 {
  font-size: clamp(32px, 4vw, 40px);
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.015em;
}
h3 {
  font-size: clamp(22px, 2.5vw, 28px);
  line-height: 1.30;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

## Dark mode correction
Reduce headline weight from 600 to 500 OR add +0.01em tracking on headlines
Body line-height: add 2px above desktop value
Never use pure white (#FFFFFF) for text — use var(--text-0) which is #F5F1E8

## Banned fonts
Inter, Roboto, Arial, Open Sans, Poppins, Montserrat, Lato, Times New Roman, Helvetica, Space Grotesk, Nunito
These fonts signal generic template work. Never use them.
