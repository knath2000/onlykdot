# Active Context: Personal Portfolio Website (as of 2025-04-14 ~12:10 PM PST)

## 1. Current Focus

*   **Performance Optimization (Homepage - Deployed):** Addressing issues identified in Lighthouse report (Score: 83).
    *   **(DONE):** Address render-blocking resources (Self-hosted fonts).
    *   **(DONE):** Optimize LCP image (`code-brackets-icon.png`) by adding `fetchpriority="high"`.
    *   **(DONE):** Optimize texture images (`particle.png`, `mail.png`, `user.png`, `code-brackets-icon.png`) by moving to `src/assets` for Astro optimization.
    *   **(DONE):** Fix Vercel build failure by uninstalling unused `react-spring`.
    *   **(Low Priority):** Reduce unused JS (Lighthouse suggestion).
    *   **(Low Priority):** Optimize `/textures/particle.png` further (Lighthouse suggestion).
    *   **(Low Priority):** Properly size `/textures/mail.png` (Lighthouse suggestion).
*   **Performance Optimization (`/projects` page):**
    *   **(DONE):** Fix React hydration error (#418).
    *   **(DONE):** Optimize LCP image (`flutter-planner.png`) by removing `loading="lazy"`.
    *   **(DONE):** Optimize project thumbnail images (Refactored to Astro Assets).
    *   **(DONE):** Further mitigate CLS (Added explicit width/height).
*   (Next) Implement the client-side project filtering logic (`ProjectFilters.jsx`).
*   (Next) Create shared Header and Footer components.

## 2. Recent Changes

*   **Lighthouse Analysis (Homepage - Deployed):**
    *   Performed Lighthouse analysis (Mobile) on `https://onlykdot.vercel.app/`.
    *   Overall Scores: Performance 83, Accessibility 100, Best Practices 100, SEO 100.
    *   Identified key performance issues: FCP (3.1s), LCP (3.8s - render delay), Render-blocking CSS (fonts), Unused JS, Image optimization (`particle.png`, `mail.png`).
*   **Vercel Build Fix:**
    *   Identified and resolved `react-spring` vs React 19 peer dependency conflict by uninstalling the unused `react-spring` package.
*   **Performance Optimization (`/projects` page):**
    *   Refactored project thumbnails to use Astro Assets (`src/assets/project-thumbnails/`).
    *   Updated content schema (`config.ts`) and project markdown files.
    *   Updated `ProjectCardReact.jsx` to use image metadata object.
    *   Fixed React hydration error (#418) by simplifying props passed to `ProjectFilters.jsx`.
    *   Fixed LCP lazy-loading issue on `/projects`.
    *   Fixed CLS issue on `/projects` by adding explicit image dimensions.
*   **Added Project Content:**
    *   Created `src/content/projects/dynamic-sports-tracker.md`.
    *   Created `src/content/projects/quran-adventures.md`.
*   **Enhanced Documentation:**
    *   Updated `docs/PROJECT_CARD_ANALYSIS.md` with game-like structure.
    *   Created `.clinerules` file and documented content creation/preview workflows.
*   **Build Process Confirmation:**
    *   Confirmed `npm run build` is required for `npm run preview` to show new Content Collection items.
*   **(Previous) Performance Optimization & Fixes (Homepage & Projects Page):**
    *   Optimized homepage LCP, lazy-loaded components, fixed CLS/headings on `/projects`.
*   **(Previous) Re-integrated Sphere Buttons:**
    *   Fixed visibility and interaction issues.
*   **(Previous) Populated First Project:**
    *   Created `src/content/projects/flutter-task-manager.md`.
*   **(Previous) Refined Project Card (`ProjectCard.astro`):**
    *   Implemented hover effects, layout changes.
*   **(Previous) Implemented Multiple Sphere Buttons:**
    *   Refactored component, rendered multiple instances.
*   **(Previous) Implemented Interactive Bubble Button Hover Effect (Initial):**
    *   Added gradient hover.
*   **(Previous) Refined ThreeJS Effects:**
    *   Refactored backgrounds, implemented interactions.
*   **(Previous) Implemented Interactive Bubble Button (Initial Setup):**
    *   Installed dependencies, created component.
*   **(Previous) Code Cleanup & Fixes:**
    *   Removed old code, added type definitions.
*   **(Previous) Implemented Complex Sequential Splash Reveal:** Generalized homepage logic.
*   **(Previous) Enhanced Hero Animations:** Added entry animations.
*   **(Previous) Dependency Resolution & Config:** Resolved earlier issues.

## 3. Next Steps (Potential)

*   **Implement Homepage Performance Fixes:** Address unused JS and remaining image optimizations identified by Lighthouse.
*   Implement the client-side project filtering logic in `ProjectFilters.jsx`.
*   Create shared Header and Footer components and integrate into `BaseLayout.astro`.
*   Populate remaining content (About text, skills list).
*   Refine visual styling across all components.
*   Conduct further performance testing (Lighthouse, profiling) and optimization after fixes.
*   Conduct thorough accessibility testing (keyboard nav, screen readers, contrast).
*   Address any remaining known issues (e.g., monitor `@mojs/core` compatibility).