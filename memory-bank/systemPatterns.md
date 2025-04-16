# System Patterns: Personal Portfolio Website

## 1. Overall Architecture

*   **Static Site Generation (SSG) Focus:** Primarily leverages Astro's SSG capabilities for optimal performance. Dynamic routes (`[slug].astro`) are used for project detail pages, generated at build time using Content Collections.
*   **Component-Based:** Built using reusable Astro components (`.astro`) for UI elements and sections.
*   **Island Architecture:** Client-side interactivity is isolated using Astro Islands. React is the chosen framework. Standard directives (`client:load`, `client:visible`, etc.) are used for most effects. The `client:only="react"` directive is used for components with dependencies incompatible with SSR (like the `SphereNavButton.jsx` using `mo.js`).

## 2. Key Design Patterns & Approaches

*   **Layout Component:** A central `BaseLayout.astro` provides consistent page structure, meta tags, global styles, and View Transitions integration.
*   **Content Collections:** Project data is managed via Astro Content Collections (`src/content/projects/`), providing type safety and Markdown/MDX processing. Data is fetched using `getCollection('projects')` on relevant pages.
*   **Initial Navigation (Homepage - Updated 2025-04-16):**
    *   The transition from the Hero section is initiated by interactive sphere buttons (`SphereNavButton.jsx` instances rendered via `<Html>` in `ThreeCanvas.jsx`).
    *   **Centralized Control:** The entire transition sequence (overlays, sphere fade, navigation) is orchestrated by the top-level React island `OverlayManager.jsx`.
    *   **State Management:** `OverlayManager.jsx` uses state variables (`showMojs`, `showTransition`, `isTransitioning`) to control the visibility and phase of the transition.
    *   **Trigger:** Clicking a `SphereNavButton` calls a handler prop (`onTransition`) passed down from `OverlayManager.jsx`.
    *   **Sequence:**
        1.  `handlePageTransition` in `OverlayManager.jsx` sets `isTransitioning`, `showMojs`, and `showTransition` to `true`.
        2.  The `MojsBurstOverlay.jsx` and `TransitionOverlay.jsx` components are rendered.
        3.  The `isTransitioning` prop (true) is passed down to `ThreeCanvas.jsx` -> `SceneContent`.
        4.  In `SceneContent`, `useFrame` animates the sphere's `<PointMaterial>` opacity to 0.
        5.  The `isTransitioning` prop is passed to `SphereNavButton` instances, which apply a `.hiding` CSS class to fade out the button visuals.
        6.  After a `setTimeout` (1300ms), `OverlayManager.jsx` resets all state variables and performs `window.location.href` navigation.
    *   **Button Hover Effect:** An animated gradient background is applied to the button element on hover, masked by the specific icon image for that button using CSS `mask-image` and a CSS variable (`--icon-url`). The original icon image and bubble visual are hidden via `opacity: 0` during hover.
*   **Project Card (`ProjectCard.astro`):**
    *   Displays project title, thumbnail, tech tags, and links.
    *   Thumbnail shows short description in an overlay on hover.
    *   Layout order: Title, Thumbnail, Tags/Links.
    *   Includes subtle "lift" hover effect on the card.
    *   Links styled as ghost buttons.
    
    *   **Modal Overlay (Projects Page):**
        *   Clicking a project card in `ProjectCardReact.jsx` or `SampleAnimatedProjectCard.jsx` triggers `onOpenModal(e, project)`, passing the `project` data and the click `originRect`.
        *   Renders `ProjectDetailModal.jsx` as a React island via `client:load`, using `createPortal` to mount to `document.body`.
        *   Animates overlay fade-in/out and content scale+rotate using `Framer Motion` (`AnimatePresence` and `motion.div`), with `transformOrigin` calculated from click position via `useLayoutEffect`.
        *   Applies a mo.js Burst effect on modal mount, dynamically imported to avoid SSR issues.
        *   Locks body scroll and listens for Escape key to close the modal.
        *   **NEW (2025-04-16):** Modal popups are now fully scrollable, with all content visually confined within the animated border. The scrollable area uses dynamic padding based on the border's strokeWidth, and FocusTrap is used for accessibility and keyboard navigation.
*   **Sequential Reveal (Post-Hero):** If other sections exist on the homepage after the Hero, a custom JavaScript implementation (`index.astro`) orchestrates complex CSS keyframe animations (`spin-out`, `slide-bounce-in`) to transition between them upon other button clicks.
*   **Progressive Enhancement:** Core content is accessible without JavaScript. ThreeJS effects and complex animations enhance the experience but are not critical for functionality.
*   **Utility-First CSS:** Tailwind CSS is used for styling, promoting consistency and rapid development. Custom theme values are defined in `tailwind.config.mjs`.
*   **Modular ThreeJS:** ThreeJS effects are implemented in separate, isolated React components (`.jsx`) loaded via Astro islands. Examples include the main scene controller (`ThreeCanvas.jsx`), specific effects (`ProjectCardHoverEffect.jsx`, `SkillsEffect.jsx`), and the 3D-integrated UI element (`SphereNavButton.jsx`). Drei helpers (`<Points>`, `<Html>`, etc.) are used extensively. `ThreeCanvas` now receives transition state (`isTransitioning`) via props.

## 3. Data Flow

*   **Project Data:** Markdown files in `src/content/projects/` -> Astro Content Collections API (`getCollection`) -> Rendered in `projects.astro` and `projects/[slug].astro`.
*   **Page Content:** Primarily static content within `.astro` components and pages.
*   **Client-Side State (Updated 2025-04-16):** Minimal client-side state.
    *   **Transition State:** Managed in `OverlayManager.jsx` (`showMojs`, `showTransition`, `isTransitioning`).
    *   **Component State:** Managed within individual React components used as Astro Islands (e.g., hover state in `ProjectCardHoverEffect.jsx`, drag state `isDragging` in `ThreeCanvas.jsx`). Filtering state will likely be managed within the `ProjectFilters.jsx` island.