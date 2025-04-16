# Active Context: Personal Portfolio Website (as of 2025-04-16 @ 8:01 AM)

## 1. Current Focus

- **Project Detail Page Thumbnails:** Investigating and fixing the issue where project thumbnails are not displaying on the individual project detail pages (`/projects/[slug]`).
- **Font Loading:** Addressing the 404 errors for self-hosted fonts.

## 2. Recent Changes

- **Synchronized Transition Fade Implemented:**
    - Centralized transition logic in `OverlayManager.jsx`, adding `isTransitioning` state.
    - Passed `isTransitioning` prop down through `ThreeCanvas` -> `SceneContent` -> `ProjectTransitionButton`/`LazySphereNavButton`.
    - Implemented sphere fade-out in `SceneContent` using `useFrame` to animate `<PointMaterial>` opacity based on `isTransitioning`.
    - Implemented button fade-out in `SphereNavButton` by conditionally applying the `.hiding` CSS class based on `isTransitioning`.
    - Removed redundant transition state and logic from `ThreeCanvas.jsx`.
- **Transition Animation Fixed:**
    - Refactored `TransitionOverlay.jsx` to use DOM elements and CSS keyframe animations instead of vanilla Three.js. This resolved the "R3F: Div is not part of the THREE namespace!" and "WebGL Context Lost" errors.
    - Refactored `ProjectTransitionButton.jsx` to remove local state and direct rendering of `MojsBurstOverlay`. It now only renders `SphereNavButton` and calls the `onTransition` prop.
    - Confirmed `OverlayManager.jsx` correctly renders both `MojsBurstOverlay` and the refactored `TransitionOverlay` as siblings to `<ThreeCanvas />`.
- **Sphere Interactivity Fixed:** Resolved issues preventing sphere drag/hold and bubble button hover/click interactions through adjustments to `z-index` and `pointer-events` on the canvas wrapper, hero section, and Drei `<Html>` components.
- **Astro/React Integration Refactor:** Removed `ThreeScene.astro`, using `OverlayManager.jsx` to render `ThreeCanvas.jsx` directly.
- **Duplicate Sphere Fixed:** Removed redundant `<ThreeScene />` include from `Hero.astro`.

## 3. Next Steps

- **Fix Project Detail Thumbnails:** Identify why the `thumbnail` image is not rendering on `src/pages/projects/[slug].astro` and implement a fix.
- **Address Font 404s:** Investigate and fix the 404 errors for the self-hosted font files (`inter` and `poppins`). Verify paths in `global.css` and file locations.
- **Code Cleanup:** Remove any remaining console logs or commented-out code related to debugging.
- **Testing:** Perform thorough testing of all interactions and transitions across different scenarios, including project detail pages.

## 4. Known Issues

- **Missing Thumbnails on Project Detail Pages:** Thumbnails defined in project frontmatter are not appearing on the dynamic project detail pages.
- **404 errors for missing font files.**
- Preload warnings for fonts not used within a few seconds (likely related to 404s).