---
name: niche-pages-and-phoenix-poses
description: Use when planning niche representation on main site, building dedicated niche pages, or implementing phoenix scroll travel. Owns pose values per section.
---
# Niche Pages and Phoenix Poses

## Main agency site — niche preview only
The main site previews all five niches via cards. It does NOT contain five full experiences.

## Phoenix scroll travel — standardized property names
All three files (this, sys-threejs-phoenix.md, sys-motion-engine.md) use these exact property names. Do not deviate.

State object shape:
```javascript
const phoenixState = {
  rotY: 0,       // rotation around Y axis (radians)
  rotX: 0,       // rotation around X axis (radians)
  rotZ: 0,       // rotation around Z axis (radians)
  posX: 0,       // position X
  posY: -0.5,    // position Y (negative = down)
  wingMorph: 0   // morphTargetInfluences[0] — 0=resting, 1=fully spread
};
```

## Pose values per section

### Kitchen section — wings spread wide, front-facing
```javascript
{ rotY: 0, rotX: 0, rotZ: 0, posX: 0, posY: -0.3, wingMorph: 1.0 }
```
Color temperature: #8B3B2C warm

### Bathroom section — tilts and leans toward content
```javascript
{ rotY: 0.26, rotX: 0, rotZ: -0.26, posX: 0.5, posY: -0.5, wingMorph: 0.3 }
```
Color temperature: #2F6F6D clean

### Home Theater section — fully back-facing
```javascript
{ rotY: Math.PI, rotX: -0.1, rotZ: 0, posX: 0, posY: -0.3, wingMorph: 0.5 }
```
Use Math.PI not a hardcoded value in code. Color temperature: #1E2B44 deep

### Closet section — profile, right wing extended
For the right wing extension (wingMorph affects both wings equally).
Profile pose achieved by 90-degree rotation.
```javascript
{ rotY: Math.PI / 2, rotX: 0, rotZ: 0, posX: -0.8, posY: -0.4, wingMorph: 0.7 }
```
Use Math.PI/2 not hardcoded value. Color temperature: #9AA3A9 neutral

### Windows and Doors section — seen from above
Camera elevated effect achieved by rotating model on X axis.
```javascript
{ rotY: 0, rotX: 0.4, rotZ: 0, posX: 0, posY: 0.5, wingMorph: 1.0 }
```
Color temperature: #244836 earthy

### Footer — folds and rests
```javascript
{ rotY: 0, rotX: 0.1, rotZ: 0, posX: 0, posY: -1.2, wingMorph: 0 }
```

## Loading strategy
Load ONLY default niche (kitchen) on first paint.
Warm others on idle using requestIdleCallback. See section-niches.md.

## Dedicated niche demo pages (after agency site)
zolcuz-kitchen.vercel.app
zolcuz-theater.vercel.app
zolcuz-closet.vercel.app
zolcuz-bathroom.vercel.app
zolcuz-windows.vercel.app

## Rules
Phoenix pose transitions: scrub 0.6 always
Never hardcode Math.PI values — use Math.PI, Math.PI/2 etc
wingMorph always maps to morphTargetInfluences[0] on cached mesh references
