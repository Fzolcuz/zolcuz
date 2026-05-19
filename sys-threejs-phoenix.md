---
name: sys-threejs-phoenix
description: The complete Three.js phoenix scene. Owns model loading, raycasting, idle animation, scroll travel, ember cursor, supernova transition, thermal throttle, and all GPU controls. Read threejs-scene-setup.md first for renderer init.
---
# Three.js Phoenix Scene

## Service Reveal Zones
```
Wings:  "Premium Web Design"   | Eyes:   "Brand Strategy"
Chest:  "Cinematic Animation"  | Talons: "Technical Development"
Crown:  "Premium Clients Only"
```

## Scene Setup
```javascript
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/DRACOLoader.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js';

// isMobile is defined ONCE here — threejs-scene-setup.md also uses this module-level value.
// Do NOT redeclare isMobile in threejs-scene-setup.md when both files are combined.
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
let useComposer = !isMobile;

const canvas = document.getElementById('phoenix-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

scene.add(new THREE.AmbientLight(0x0D9488, 0.3));
const keyLight = new THREE.DirectionalLight(0xF5F1E8, 1.2);
keyLight.position.set(2, 3, 4);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x0D9488, 0.8);
rimLight.position.set(-3, 1, -2);
scene.add(rimLight);
```

## Bloom — Restrained Luxury Values
```javascript
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.4,  // strength — subtle luxury not nightclub
  0.6,  // radius
  0.85  // threshold — emissive surfaces only
));
```

## Model Loading — Cache Morph Targets on Load
```javascript
let phoenixMesh = null;
let featherShaders = [];
let morphTargetMeshes = []; // CACHE — never traverse in render loop or onUpdate

// phoenixReady guards supernova and scroll travel from firing before the
// model is compiled on GPU. Always declare at module scope.
let phoenixReady = false;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/assets/draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/assets/models/phoenix-optimized.glb', (gltf) => {
  phoenixMesh = gltf.scene;
  phoenixMesh.scale.setScalar(1.0);
  phoenixMesh.position.set(0, -0.5, 0);

  // CRITICAL: Set SRGB on ALL textures — ensures visual consistency with Leonardo AI assets
  phoenixMesh.traverse(child => {
    if (child.isMesh) {
      if (child.material.map) child.material.map.colorSpace = THREE.SRGBColorSpace;
      if (child.material.emissiveMap) child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;

      // Cache morph target meshes ONCE — prevents O(n) traverse in every onUpdate
      if (child.morphTargetInfluences) {
        morphTargetMeshes.push(child);
      }
    }
  });

  scene.add(phoenixMesh);

  // GPU pre-warm — transitions cannot fire until this completes
  renderer.compileAsync(scene, camera).then(() => {
    setupRaycasting(phoenixMesh);
    setupIdleAnimation(phoenixMesh);
    setupScrollTravel();
    phoenixReady = true;
  });
});
```

## Morph Target Update — Uses Cache (Fast)
```javascript
// wingMorph maps to morphTargetInfluences[0]
// See niche-pages-and-phoenix-poses.md for all pose values
function setWingMorph(value) {
  morphTargetMeshes.forEach(mesh => {
    mesh.morphTargetInfluences[0] = Math.max(0, Math.min(1, value));
  });
}
```

## Raycasting + AbortController for Cleanup
```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredZone = null;
let raycasterAbort = new AbortController();

const serviceZones = {
  wings_left:  { title: 'Premium Web Design',   body: 'Scroll-driven cinematic websites for luxury home improvement brands' },
  wings_right: { title: 'Premium Web Design',   body: 'Scroll-driven cinematic websites for luxury home improvement brands' },
  eyes:        { title: 'Brand Strategy',        body: 'Positioning and visual identity for $50K–$500K renovation companies' },
  chest:       { title: 'Cinematic Animation',   body: 'Scroll-driven assembly animations that showcase craftsmanship' },
  talons:      { title: 'Technical Development', body: 'Plain HTML/CSS/JS on Vercel. Fast, maintainable, yours.' },
  crown:       { title: 'Premium Clients Only',  body: 'Five niches. Limited builds per quarter. Serious brands only.' }
};

function getZoneName(name) {
  const n = name.toLowerCase();
  if (n.includes('wing_l') || n.includes('wing_left')) return 'wings_left';
  if (n.includes('wing_r') || n.includes('wing_right')) return 'wings_right';
  if (n.includes('eye')) return 'eyes';
  if (n.includes('chest') || n.includes('ember') || n.includes('torso')) return 'chest';
  if (n.includes('talon') || n.includes('claw') || n.includes('foot')) return 'talons';
  if (n.includes('crown') || n.includes('crest') || n.includes('plume')) return 'crown';
  return null;
}

function setupRaycasting(phoenix) {
  canvas.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(phoenix.children, true);
    if (hits.length > 0) {
      const zone = getZoneName(hits[0].object.name);
      if (zone && zone !== hoveredZone) {
        hoveredZone = zone;
        showServiceReveal(serviceZones[zone]);
      }
    } else if (hoveredZone) {
      hoveredZone = null;
      hideServiceReveal();
    }
  }, { signal: raycasterAbort.signal }); // AbortController for cleanup
}
```

## Thermal Throttling — Pause Render When Off Screen
```javascript
let isPhoenixVisible = false;

const visibilityObserver = new IntersectionObserver((entries) => {
  isPhoenixVisible = entries[0].isIntersecting;
}, { threshold: 0.01 });
visibilityObserver.observe(canvas);
```

## Render Loop — Inside gsap.ticker for 120Hz Sync
```javascript
const clock = new THREE.Clock();

// Render inside gsap.ticker — NOT requestAnimationFrame — for 120Hz ProMotion sync
gsap.ticker.add(() => {
  if (!isPhoenixVisible) return; // thermal throttle — skip if off screen
  const elapsed = clock.getElapsedTime();
  featherShaders.forEach(s => { s.uniforms.uTime.value = elapsed; });
  if (useComposer) composer.render();
  else renderer.render(scene, camera);
});
```

## Service Reveal
```javascript
function showServiceReveal(data) {
  const el = document.getElementById('service-reveal');
  el.querySelector('.reveal__title').textContent = data.title;
  el.querySelector('.reveal__body').textContent = data.body;
  gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
}
function hideServiceReveal() {
  gsap.to(document.getElementById('service-reveal'), { autoAlpha: 0, y: 8, duration: 0.2 });
}
```

## Ember Cursor — Bounds Refreshed on Resize
```javascript
let canvasBounds = canvas.getBoundingClientRect();
window.addEventListener('resize', () => { canvasBounds = canvas.getBoundingClientRect(); });

canvas.addEventListener('mousemove', (e) => {
  const inside = e.clientX >= canvasBounds.left && e.clientX <= canvasBounds.right &&
                 e.clientY >= canvasBounds.top  && e.clientY <= canvasBounds.bottom;
  document.body.classList.toggle('cursor--ember', inside);
  if (inside) {
    const dot = document.querySelector('.cursor-dot');
    if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px'; }
  }
});
```

## Idle Animation — Feather Breathing
```javascript
function setupIdleAnimation(phoenix) {
  phoenix.traverse(child => {
    if (child.isMesh && child.name.toLowerCase().includes('feather')) {
      child.material.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = { value: 0 };
        shader.vertexShader = `uniform float uTime;\n` + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
           transformed.y += sin(position.x * 3.0 + uTime * 0.3) * 0.02;`
        );
        featherShaders.push(shader);
      };
      child.material.needsUpdate = true;
    }
  });
}
```

## Scroll Travel — Wrapped in gsap.context for Clean Revert
State object uses exact names from niche-pages-and-phoenix-poses.md.
wingMorph always maps to morphTargetInfluences[0].
All six poses must be wired (kitchen, bathroom, theater, closet, windows, footer).
```javascript
let scrollTravelCtx = null; // store context handle for reversion in activateFallback()

function setupScrollTravel() {
  if (!phoenixMesh) return;

  const state = { rotY: 0, rotX: 0, rotZ: 0, posX: 0, posY: -0.5, wingMorph: 0 };

  function applyState() {
    if (!phoenixMesh) return;
    phoenixMesh.rotation.y = state.rotY;
    phoenixMesh.rotation.x = state.rotX;
    phoenixMesh.rotation.z = state.rotZ;
    phoenixMesh.position.x = state.posX;
    phoenixMesh.position.y = state.posY;
    setWingMorph(state.wingMorph);
  }

  // Expose for sys-motion-engine.md integration
  window.applyPhoenixState = applyState;

  // Wrap all scroll travel ScrollTriggers in gsap.context so they can be
  // cleanly reverted in activateFallback() without ghost triggers remaining.
  scrollTravelCtx = gsap.context(() => {
    // Kitchen — wings spread, front-facing
    gsap.to(state, {
      rotY: 0, rotX: 0, rotZ: 0, posX: 0, posY: -0.3, wingMorph: 1.0,
      scrollTrigger: { trigger: '#section-kitchen', start: 'top center', end: 'bottom center', scrub: 0.6 },
      onUpdate: applyState
    });
    // Bathroom — tilts toward content
    gsap.to(state, {
      rotY: 0.26, rotX: 0, rotZ: -0.26, posX: 0.5, posY: -0.5, wingMorph: 0.3,
      scrollTrigger: { trigger: '#section-bathroom', start: 'top center', end: 'bottom center', scrub: 0.6 },
      onUpdate: applyState
    });
    // Theater — fully back-facing (Math.PI, not 3.14159)
    gsap.to(state, {
      rotY: Math.PI, rotX: -0.1, rotZ: 0, posX: 0, posY: -0.3, wingMorph: 0.5,
      scrollTrigger: { trigger: '#section-theater', start: 'top center', end: 'bottom center', scrub: 0.6 },
      onUpdate: applyState
    });
    // Closet — profile (Math.PI/2, not 1.5708)
    gsap.to(state, {
      rotY: Math.PI / 2, rotX: 0, rotZ: 0, posX: -0.8, posY: -0.4, wingMorph: 0.7,
      scrollTrigger: { trigger: '#section-closet', start: 'top center', end: 'bottom center', scrub: 0.6 },
      onUpdate: applyState
    });
    // Windows — seen from above
    gsap.to(state, {
      rotY: 0, rotX: 0.4, rotZ: 0, posX: 0, posY: 0.5, wingMorph: 1.0,
      scrollTrigger: { trigger: '#section-windows', start: 'top center', end: 'bottom center', scrub: 0.6 },
      onUpdate: applyState
    });
    // Footer — folds and rests
    gsap.to(state, {
      rotY: 0, rotX: 0.1, rotZ: 0, posX: 0, posY: -1.2, wingMorph: 0,
      scrollTrigger: { trigger: '#footer', start: 'top center', end: 'bottom center', scrub: 0.6 },
      onUpdate: applyState
    });
  });
}
```

## Resize Handler
```javascript
// Debounce resize — prevents excessive GPU reconfiguration
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (useComposer) composer.setSize(window.innerWidth, window.innerHeight);
    canvasBounds = canvas.getBoundingClientRect();
  }, 200);
});
```

## Supernova Transition
```javascript
function triggerSupernova() {
  // GPU must be pre-warmed before this fires (done in gltfLoader.load callback)
  document.getElementById('supernova-canvas').style.opacity = '1';
  gsap.to('#loader', {
    autoAlpha: 0, duration: 0.5, delay: 1.8,
    onComplete: () => {
      document.getElementById('loader').remove();
      // NOTE: disposeLoaderResources() is intentionally NOT called here.
      // The phoenix mesh IS the scene — disposing the scene after the loader
      // clears would destroy the live phoenix. Supernova canvas (2D context)
      // is a separate element and is already removed with the loader DOM node.
      revealHero();
    }
  });
}

function revealHero() {
  // Reveal hero copy
  gsap.to('.hero-section__overlay', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' });
}
```

## Fallback + Cleanup — AbortController Kills Raycaster
```javascript
function activateFallback() {
  // Stop raycaster
  raycasterAbort.abort();
  raycasterAbort = new AbortController(); // reset for potential re-init

  // Revert scroll travel ScrollTriggers cleanly
  if (scrollTravelCtx) scrollTravelCtx.revert();

  // Stop render loop
  isPhoenixVisible = false;
  visibilityObserver.disconnect();

  // Dispose GPU resources (phoenix mesh only — not the whole scene naively)
  if (phoenixMesh) disposeObject(phoenixMesh);
  renderer.dispose();

  // Show AVIF fallback
  document.getElementById('phoenix-canvas').style.display = 'none';
  document.getElementById('phoenix-fallback').style.display = 'block';
}

function disposeObject(obj) {
  obj.traverse(child => {
    if (child.isMesh) {
      child.geometry.dispose();
      (Array.isArray(child.material) ? child.material : [child.material])
        .forEach(m => m.dispose());
    }
  });
}
```

## Reduced Motion
```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  clock.stop();
  featherShaders.length = 0; // stop idle animation
  ScrollTrigger.getAll()
    .filter(st => st.vars.trigger?.toString().includes('section-'))
    .forEach(st => st.kill()); // kill scroll travel only
  // Raycasting hover zones stay — interaction is not motion
}
```

## Model Requirements
```
Path:         /assets/models/phoenix-optimized.glb
Max size:     2.5MB after Draco compression
Mesh names:   wing_left, wing_right, eye, chest, talon, crown
Morph 0:      wing spread (0=resting, 1=fully spread)
Textures:     KTX2/Basis, max 2MB total
Optimize:     npx @gltf-transform/cli optimize phoenix.glb out.glb --compress draco --texture-compress ktx2
Validate:     https://gltf.report
```

## Exit Check
phoenixReady declared with `let phoenixReady = false` at module scope? isMobile declared once (not in threejs-scene-setup.md when combined)? Renderer in gsap.ticker not rAF? Thermal throttle via IntersectionObserver? SRGB on all textures? morphTargetMeshes cached on load? AbortController on raycaster? Resize debounced 200ms? wingMorph maps to influences[0]? Poses use Math.PI/Math.PI/2 (not 3.14159/1.5708)? All 6 poses wired? setupScrollTravel wrapped in gsap.context? scrollTravelCtx.revert() called in activateFallback? disposeLoaderResources removed from triggerSupernova?
