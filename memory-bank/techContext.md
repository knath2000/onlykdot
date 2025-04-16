# Tech Context: Personal Portfolio Website

## 1. Core Framework & Build Tools

*   **Framework:** Astro (v5.6.1 at time of writing)
*   **Build Tool:** Vite (managed by Astro)
*   **Package Manager:** npm

## 2. Frontend Technologies

*   **UI Language:** HTML, CSS, JavaScript (via Astro components and islands)
*   **Styling:** Tailwind CSS (v3.x - downgraded for compatibility with `@astrojs/tailwind`)
    *   Configuration: `tailwind.config.mjs`
    *   Integration: `@astrojs/tailwind`
*   **Component Framework (for Islands):** React (v19.1.0 at time of writing)
    *   Integration: `@astrojs/react`
*   **3D Graphics:** ThreeJS (`three` library)
    *   Integration Helper: `@react-three/fiber` (R3F)
    *   Utilities/Abstractions: `@react-three/drei`
*   **Animation (Client-Side JS):**
    *   `react-spring` (**Uninstalled** - Caused peer dependency conflict with React 19 and was unused).
    *   Intersection Observer API (via custom `ScrollObserver.astro` component)
    *   Astro View Transitions API (via `<ViewTransitions />` component)
    *   CSS Animations/Transitions (via Tailwind utilities and custom CSS keyframes in `.astro` files or `global.css`)
    *   JavaScript Event Listeners (`animationend`, `click`) for orchestrating complex sequential animations (homepage sections after Hero).
    *   `@mojs/core`: Used for the interactive button burst animation on the Hero section. Installed via `--legacy-peer-deps` due to React 19 conflict with `react-spring`.
    *   `framer-motion`: Used in `ProjectDetailModal.jsx` to animate modal overlay transitions.

## 3. Content Management

*   **Astro Content Collections:** Used for managing project data (Markdown files in `src/content/projects/`).
*   **Schema Definition:** Zod (via `astro:content`) in `src/content/config.ts`.

## 4. Development Environment

*   **Code Editor:** VS Code (implied)
*   **Node.js:** (Version not specified, but compatible with installed packages)
*   **Version Control:** Git (implied by `.gitignore`)

## 5. Key Dependencies (Summary)

*   `astro`
*   `@astrojs/tailwind`
*   `tailwindcss` (v3.x)
*   `@astrojs/react`
*   `react`, `react-dom` (v19.x)
*   `three`, `@types/three`
*   `@react-three/fiber`
*   `@react-three/drei`
*   `react-spring` (**Uninstalled**)
*   `@mojs/core`