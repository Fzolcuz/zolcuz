---
name: threejs-scene-setup
description: Three.js renderer initialization, performance budgets, WebGL detection, mobile fallback, debug tools. Read before any Three.js code. The phoenix scene logic lives in sys-threejs-phoenix.md.
---
# Three.js Scene Setup

## Core Imports — Pinned Version r165
```javascript
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/DRACOLoader.js';
// KTX2Loader import removed — not used in current scene (no KTX2 runtime needed for Draco-only GLBs)
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js';
```

## Renderer — Locked Settings
```javascript
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('phoenix-canvas'),
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // NEVER above 2
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;
```

## Performance Budgets (Non-Negotiable)
```
GLB after Draco:       max 2.5MB
KTX2 textures total:   max 2MB
Draw calls per frame:  target <50, hard limit 100
Post-processing:       max 2 passes (RenderPass + one effect)
Pixel ratio:           Math.min(devicePixelRatio, 2) always
FPS targets:           60fps desktop, 30fps mobile acceptable
```

## WebGL Detection
```javascript
function detectWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) { return false; }
}

if (!detectWebGL()) activateFallback(); // defined in sys-threejs-phoenix.md
```

## Mobile Detection
IMPORTANT: `isMobile` and `useComposer` are declared in sys-threejs-phoenix.md at module scope.
Do NOT redeclare them here when building phoenix-scene.js — this causes a duplicate declaration SyntaxError.
Reference the values from sys-threejs-phoenix.md directly.

## Canvas CSS — Must Not Block Scroll
```css
#phoenix-canvas {
  position: fixed;      /* MUST be fixed — allows phoenix to travel through scroll */
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none; /* CRITICAL — canvas never blocks page scroll */
  z-index: var(--z-canvas); /* = 1 */
}
#phoenix-canvas.interactive {
  pointer-events: auto; /* Enable only when raycasting is needed */
}
```

## Asset Pipeline
```bash
# Optimize GLB before any commit
npx @gltf-transform/cli optimize phoenix.glb phoenix-optimized.glb \
  --compress draco \
  --texture-compress ktx2

# Validate output
# Open https://gltf.report and drag in phoenix-optimized.glb
# Check: file size, draw calls, material count, validation errors
```

## Lazy Loading — Three.js Must NOT Load at Page Start
```javascript
// Only import Three.js after loader video ends
// This keeps initial JS bundle under 220KB
video.addEventListener('ended', async () => {
  const { initPhoenixScene } = await import('./js/three/phoenix-scene.js');
  initPhoenixScene();
});
```

## Debug Mode — URL Parameter (Works Without Vite)
```javascript
// Access at: yoursite.com?debug or yoursite.com#debug
const isDebug = new URLSearchParams(window.location.search).has('debug') ||
                window.location.hash === '#debug';

if (isDebug) {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/stats.js@0.17.0/build/stats.min.js';
  s.onload = () => {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    // stats.update() must be called in the gsap.ticker callback
  };
  document.head.appendChild(s);
}
```

## Debugging Tools
```
Spector.js:  https://spector.babylonjs.com — WebGL frame capture
stats.js:    https://cdn.jsdelivr.net/npm/stats.js — FPS/memory monitor
Tweakpane:   https://cocopon.github.io/tweakpane — real-time shader tuning
Theatre.js:  https://www.theatrejs.com — visual phoenix scroll timeline editor
glTF Report: https://gltf.report — model validation and stats
```

## Reduced Motion — Three.js
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Stop idle animation clock
  // Disable scroll travel ScrollTriggers
  // Keep raycasting — interaction not motion
  // See sys-threejs-phoenix.md for implementation
}
```

## Exit Check
Renderer in gsap.ticker not rAF? Pixel ratio capped at 2? SRGB on all textures? Canvas position:fixed? pointer-events:none during scroll? Three.js lazy loaded after video? GLB validated at gltf.report?
