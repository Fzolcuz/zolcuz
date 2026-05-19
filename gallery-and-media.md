---
name: gallery-and-media
description: Use for galleries, image/video treatment, media loading, and media coexistence with Three.js canvas. Owns gallery and media decisions.
---
# Gallery and Media

## Gallery layout
Bento grid. 3-4 projects initially. Never carousel.

## Cards
Aspect ratio: 4:5 editorial / 16:9 feature
border-radius: 2rem
Hover: scale 1.02 over 350ms
Overlay: opacity 0 to 0.40 over 250ms
Hover preview: static to assembly animation crossfade over 400ms

## Full view — shared element transition
GSAP Flip plugin for shared-element transition. No page reload.
```javascript
const state = Flip.getState('.gallery-card__img');
// move image to full-view container
Flip.from(state, { duration: 0.6, ease: 'expo.out', absolute: true });
```

## Image treatment
Grain overlay: 2% opacity (3% on AI-generated images)
Grading: `filter: contrast(1.05) saturate(0.9)`
Dark mode: `filter: brightness(0.8) contrast(1.2)`

## Video
```html
<video autoplay muted playsinline loop preload="metadata"
  poster="image.avif">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
</video>
```
Mobile: replace video with AVIF image
Hero video: under 2MB

## Three.js canvas coexistence
When gallery elements appear in the same viewport as the Three.js canvas:
Gallery items must have explicit pointer-events: auto to ensure they receive interactions.
The Three.js canvas has pointer-events: none globally and pointer-events: auto only when raycasting is active.
Never place gallery items inside the Three.js canvas z-index stack.
Z-index hierarchy: Three.js canvas z-1 · DOM content z-10 · Service reveal z-20 · Nav z-100 · Loader z-9999

## Lightbox
Use PhotoSwipe for full-screen project galleries.
Load via CDN (compatible with plain HTML/JS — no bundler needed):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.css">
<script src="https://cdn.jsdelivr.net/npm/photoswipe@5/dist/umd/photoswipe.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/photoswipe@5/dist/umd/photoswipe-lightbox.umd.min.js"></script>
```
```javascript
const lightbox = new PhotoSwipeLightbox({
  gallery: '.gallery-grid',
  children: 'a',
  pswpModule: PhotoSwipe
});
lightbox.init();
```
Each gallery image must be wrapped in an anchor with data-pswp-width and data-pswp-height:
```html
<a href="/assets/img/project-full.avif" data-pswp-width="1200" data-pswp-height="800">
  <img src="/assets/img/project-thumb.avif" alt="Kitchen project by [Client]" width="600" height="400">
</a>
```

## Exit check
Images optimized as AVIF q45? Videos have WebM + MP4 fallback? Gallery pointer events correct when Three.js is present? Mobile videos replaced with images?
