// phoenix-scene.js — Three.js Phoenix Scene
// Lazy-loaded by loader.js after Video 2 ends.
// Implements: model load, bloom, raycasting, idle animation, scroll travel,
//             ember cursor, resize handler, fallback, reduced motion.
//
// Import order: sys-threejs-phoenix.md (scene) + threejs-scene-setup.md (renderer)
// isMobile declared ONCE here — do NOT redeclare elsewhere in this file.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';
import { GLTFLoader }      from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader }     from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/DRACOLoader.js';
import { EffectComposer }  from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }      from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js';

// ─── WEBGL DETECTION ──────────────────────────────────────────────────────────
function detectWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) { return false; }
}

// ─── DEBUG MODE ───────────────────────────────────────────────────────────────
const isDebug = new URLSearchParams(window.location.search).has('debug') ||
                window.location.hash === '#debug';

if (isDebug) {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/stats.js@0.17.0/build/stats.min.js';
  s.onload = () => {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    window.__stats = stats; // referenced in gsap.ticker below
  };
  document.head.appendChild(s);
}

// ─── EXPORTED INIT ────────────────────────────────────────────────────────────
export function initPhoenixScene() {
  if (!detectWebGL()) {
    activateFallback();
    return;
  }

  // isMobile declared ONCE at module scope (threejs-scene-setup.md note)
  const isMobile    = /Android|iPhone|iPad/i.test(navigator.userAgent);
  let   useComposer = !isMobile;

  // ─── CANVAS ─────────────────────────────────────────────────────────────
  const canvas = document.getElementById('phoenix-canvas');

  // ─── RENDERER ───────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace  = THREE.SRGBColorSpace;

  // ─── SCENE + CAMERA ─────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // ─── LIGHTING ───────────────────────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x0D9488, 0.3));
  const keyLight = new THREE.DirectionalLight(0xF5F1E8, 1.2);
  keyLight.position.set(2, 3, 4);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x0D9488, 0.8);
  rimLight.position.set(-3, 1, -2);
  scene.add(rimLight);

  // ─── BLOOM — RESTRAINED LUXURY ─────────────────────────────────────────
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4,   // strength — subtle luxury, not nightclub
    0.6,   // radius
    0.85   // threshold — emissive surfaces only
  ));

  // ─── STATE ──────────────────────────────────────────────────────────────
  let phoenixMesh       = null;
  let featherShaders    = [];
  let morphTargetMeshes = []; // CACHED on load — never traverse in render loop
  let phoenixReady = false; // guards scroll travel — set after compileAsync

  // ─── MODEL LOADING ──────────────────────────────────────────────────────
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/assets/draco/');

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load('/assets/models/phoenix-optimized.glb', (gltf) => {
    phoenixMesh = gltf.scene;
    phoenixMesh.scale.setScalar(1.0);
    phoenixMesh.position.set(0, -0.5, 0);

    // SRGB on ALL textures — visual consistency with source assets
    phoenixMesh.traverse(child => {
      if (child.isMesh) {
        if (child.material.map)         child.material.map.colorSpace         = THREE.SRGBColorSpace;
        if (child.material.emissiveMap) child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;

        // Cache morph target meshes ONCE — prevents O(n) traverse per frame
        if (child.morphTargetInfluences) {
          morphTargetMeshes.push(child);
        }
      }
    });

    scene.add(phoenixMesh);

    // GPU pre-warm — scroll travel and raycasting must not fire before this
    renderer.compileAsync(scene, camera).then(() => {
      setupRaycasting(phoenixMesh);
      setupIdleAnimation(phoenixMesh);
      setupScrollTravel();
      phoenixReady = true;
      revealHero();
    });
  });

  // ─── MORPH TARGET — WING SPREAD ─────────────────────────────────────────
  // wingMorph always maps to morphTargetInfluences[0]
  function setWingMorph(value) {
    morphTargetMeshes.forEach(mesh => {
      mesh.morphTargetInfluences[0] = Math.max(0, Math.min(1, value));
    });
  }

  // ─── RAYCASTING + ABORTCONTROLLER ───────────────────────────────────────
  const raycaster      = new THREE.Raycaster();
  const mouse          = new THREE.Vector2();
  let   hoveredZone    = null;
  let   raycasterAbort = new AbortController();

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
    if (n.includes('wing_l') || n.includes('wing_left'))  return 'wings_left';
    if (n.includes('wing_r') || n.includes('wing_right')) return 'wings_right';
    if (n.includes('eye'))                                 return 'eyes';
    if (n.includes('chest') || n.includes('ember') || n.includes('torso')) return 'chest';
    if (n.includes('talon') || n.includes('claw')  || n.includes('foot'))  return 'talons';
    if (n.includes('crown') || n.includes('crest') || n.includes('plume')) return 'crown';
    return null;
  }

  function setupRaycasting(phoenix) {
    canvas.addEventListener('mousemove', (e) => {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
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

  // ─── SERVICE REVEAL ─────────────────────────────────────────────────────
  function showServiceReveal(data) {
    const el = document.getElementById('service-reveal');
    if (!el) return;
    el.querySelector('.reveal__title').textContent = data.title;
    el.querySelector('.reveal__body').textContent  = data.body;
    gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  }
  function hideServiceReveal() {
    const el = document.getElementById('service-reveal');
    if (!el) return;
    gsap.to(el, { autoAlpha: 0, y: 8, duration: 0.2 });
  }

  // ─── EMBER CURSOR ───────────────────────────────────────────────────────
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

  // ─── IDLE ANIMATION — FEATHER BREATHING ─────────────────────────────────
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

  // ─── SCROLL TRAVEL ───────────────────────────────────────────────────────
  // Wrapped in gsap.context for clean revert in activateFallback().
  // All 6 poses wired. wingMorph → morphTargetInfluences[0].
  // Uses Math.PI and Math.PI/2 — never magic number literals.
  let scrollTravelCtx = null;

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

    window.applyPhoenixState = applyState; // exposed for sys-motion-engine integration

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
      // Theater — fully back-facing
      gsap.to(state, {
        rotY: Math.PI, rotX: -0.1, rotZ: 0, posX: 0, posY: -0.3, wingMorph: 0.5,
        scrollTrigger: { trigger: '#section-theater', start: 'top center', end: 'bottom center', scrub: 0.6 },
        onUpdate: applyState
      });
      // Closet — profile
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

  // ─── THERMAL THROTTLE — PAUSE RENDER OFF SCREEN ──────────────────────────
  let isPhoenixVisible = false;
  const visibilityObserver = new IntersectionObserver(
    (entries) => { isPhoenixVisible = entries[0].isIntersecting; },
    { threshold: 0.01 }
  );
  visibilityObserver.observe(canvas);

  // ─── RENDER LOOP — INSIDE gsap.ticker FOR 120Hz SYNC ─────────────────────
  const clock = new THREE.Clock();

  gsap.ticker.add(() => {
    if (!isPhoenixVisible) return; // thermal throttle
    const elapsed = clock.getElapsedTime();
    featherShaders.forEach(s => { s.uniforms.uTime.value = elapsed; });
    if (useComposer) composer.render();
    else             renderer.render(scene, camera);
    if (window.__stats) window.__stats.update(); // debug mode only
  });

  // ─── RESIZE — DEBOUNCED 200ms ─────────────────────────────────────────────
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

  // ─── REDUCED MOTION — THREE.JS ───────────────────────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    clock.stop();
    featherShaders.length = 0; // stop idle animation
    ScrollTrigger.getAll()
      .filter(st => st.vars.trigger?.toString().includes('section-'))
      .forEach(st => st.kill()); // kill scroll travel only — raycasting stays
  }

  // ─── HERO REVEAL ─────────────────────────────────────────────────────────
  // Called after GPU pre-warm completes (inside compileAsync.then()).
  // Hero overlay built in section-hero-phoenix.md — guarded with ?. check.
  function revealHero() {
    const overlay = document.querySelector('.hero-section__overlay');
    if (overlay) gsap.to(overlay, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' });
  }

  // ─── FALLBACK + CLEANUP ───────────────────────────────────────────────────
  function activateFallback() {
    raycasterAbort.abort();
    raycasterAbort = new AbortController();

    if (scrollTravelCtx) scrollTravelCtx.revert();
    isPhoenixVisible = false;
    visibilityObserver.disconnect();

    if (phoenixMesh) disposeObject(phoenixMesh);
    renderer.dispose();

    canvas.style.display = 'none';
    const fallback = document.getElementById('phoenix-fallback');
    if (fallback) fallback.style.display = 'block';
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
}
