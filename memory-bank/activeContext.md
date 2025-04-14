# Active Context: Personal Portfolio Website (as of 2025-04-14 ~11:25 AM PST)

## 1. Current Focus

*   **Performance Optimization (`/projects` page):** Addressing issues identified in Lighthouse report (Score: 85).
    *   **(High Priority):** Investigate and fix React hydration error (#418).
    *   **(High Priority):** Optimize LCP image (`flutter-planner.png`) by removing `loading="lazy"`.
    *   **(High Priority):** Optimize all project thumbnail images (resize, compress, convert to WebP/AVIF).
    *   **(Medium Priority):** Further mitigate CLS (ensure image dimensions/aspect ratio, monitor `min-h`).
    *   **(Medium Priority):** Address render-blocking resources (font loading strategy).
*   (Next) Implement the client-side project filtering logic (`ProjectFilters.jsx`).
*   (Next) Create shared Header and Footer components.

## 2. Recent Changes

*   **Lighthouse Analysis (`/projects` page):**
    *   Performed Lighthouse analysis (Mobile) on `http://localhost:4321/projects`.
    *   Overall Scores: Performance 85, Accessibility 100, Best Practices 96, SEO 100.
    *   Identified key performance issues: LCP (3.4s - lazy-loaded image, large image files), CLS (0.16 - client-side grid render), Render-blocking CSS (fonts), React hydration error (#418).
    *   Prioritized fixes: Hydration error, LCP optimization (lazy-loading, image optimization), CLS mitigation, Render-blocking resources.
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

*   **Implement High-Priority Performance Fixes:** Address hydration error, LCP lazy-loading, and image optimization for `/projects` page.
*   Implement the client-side project filtering logic in `ProjectFilters.jsx`.
*   Create shared Header and Footer components and integrate into `BaseLayout.astro`.
*   Populate remaining content (About text, skills list).
*   Refine visual styling across all components.
*   Conduct further performance testing (Lighthouse, profiling) and optimization after fixes.
*   Conduct thorough accessibility testing (keyboard nav, screen readers, contrast).
*   Address any remaining known issues (e.g., monitor `react-spring` compatibility).