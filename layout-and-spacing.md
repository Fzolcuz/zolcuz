---
name: layout-and-spacing
description: Use for grid, section spacing, widths, card padding, overlap decisions, and structural composition. Single source of truth for all layout values.
---
# Layout and Spacing — 8px Grid

## Core values
Section padding: 112px desktop / 80px tablet / 56px mobile
Card padding: 32px desktop / 20px mobile
Button: 14px vertical × 32px horizontal, min-height 48px
Gutters: 24px desktop / 16px mobile
Max width: 1200px for copy / 1320px for galleries
Touch gap: 8px minimum between interactive elements

## Premium spacing rule
Margin around a module should always be greater than padding inside it.
White space is not wasted space. It is what makes the content feel expensive.

## Layout patterns
Asymmetric split: 60/40 left-led (text left, visual right)
Left-led hero: headline anchored left, visual extends to right edge
Bento grid: for galleries only, never for content sections
Section overlap: -48px margin-top with incrementing z-index

## Banned patterns
Centered SaaS hero with logo + H1 + two buttons
Equal-column card grids (3 equal columns for services)
Carousel gallery
Navigation flush to top with no margin
Full-width colored button bars

## Mobile rules
Single column below 768px
Text always above visual on mobile
No section overlaps on mobile
`min-height: 100dvh` for full-screen sections
Sticky CTA bar at bottom of viewport on mobile
All CTAs in thumb zone (bottom 40% of screen)
