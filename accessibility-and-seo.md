---
name: accessibility-and-seo
description: WCAG 2.2 AA, focus states, ARIA, schema markup, heading hierarchy, GDPR compliance. Read before finalizing any section.
---
# Accessibility and SEO

## WCAG 2.2 AA Targets
Normal text: 4.5:1 | Large text 18px+: 3:1 | UI components: 3:1
Check every color pair: https://webaim.org/resources/contrastchecker

## Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 4px;
}
```

## Touch Targets
Minimum 44×44px. Minimum 8px gap between targets.
Skip link required every page:
```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

## Reduced Motion
See sys-motion-engine.md for GSAP matchMedia implementation.
See sys-threejs-phoenix.md for Three.js reduced motion handling.
Both JS and CSS fallbacks required.

## ARIA
Assembly containers: `aria-label="[assembled space description]" role="img"`
Service reveal: `aria-live="polite"` so screen readers announce hover content
Phoenix canvas: `aria-label="Interactive 3D phoenix — hover to explore ZOLCUZ services" role="img"`
Automation tabs: `role="tablist"` on container, `role="tab"` on buttons, `aria-selected` state

## Heading Hierarchy
One H1 per page. Never skip levels. H2 for sections. H3 for subsections.

## GDPR Compliance — Script Loading Rules
Scripts fall into two categories with different consent requirements:

NECESSARY (no consent required — legitimate interest under GDPR):
- Cloudflare Turnstile — form spam protection
- Core CSS and JavaScript
- Sanity CMS API calls
- Session-only local storage for theme preference

ANALYTICS (requires explicit consent before loading):
- Plausible Analytics
- Vercel Speed Insights
- Any tracking pixels

DO NOT block Turnstile behind consent. It is a security/accessibility feature (legitimate interest), not tracking. Blocking it prevents users from submitting the contact form.
See ui-chrome-compliance.md for the consent banner implementation.

## Schema — Agency Site
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ZOLCUZ Studios",
  "description": "Premium animated web design agency for luxury home improvement brands",
  "url": "https://zolcuz.com",
  "serviceType": "Web Design",
  "areaServed": ["US", "GB"],
  "knowsAbout": ["scroll animation", "luxury web design", "home improvement websites"]
}
</script>
```

## Schema — Niche Demo Sites
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Client Name]",
  "url": "[URL]",
  "@id": "[URL]",
  "telephone": "[phone]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[city]",
    "addressRegion": "[state/county]",
    "addressCountry": "[US or GB]"
  },
  "priceRange": "$$$"
}
</script>
```
Validate schema: https://search.google.com/test/rich-results

## SEO Rules
Meta description: exactly 150-160 characters on every page
Canonical tag on every page
One H1 per page
All images: descriptive alt text stored in Sanity
Image naming: `[niche]-[descriptor]-[year].avif` e.g. `kitchen-marble-island-2024.avif`

## Accessibility Testing Tools
WAVE: https://wave.webaim.org — audit before every delivery
axe DevTools: Chrome extension — real-time a11y checking
Keyboard test: navigate entire site with Tab only — must work fully

## Exit Check
Skip link present? Focus states visible on all interactive elements? All images have alt text? Schema validated? Meta description 150-160 chars? Canonical on every page? Turnstile NOT blocked by consent banner?
