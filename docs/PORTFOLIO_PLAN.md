# Portfolio Website Plan

This document outlines the 12-step plan for developing the personal portfolio website using Astro and ThreeJS.

## Project Plan Summary:

1.  **Project Setup & Structure:** Initialize an empty Astro project (`my-portfolio`). Define core directories: `src/components`, `src/layouts`, `src/pages`, `src/styles`, `src/lib` (for utilities), `src/assets` (with subdirs for images, fonts), and `src/content` (for project data).
2.  **Design System (Tailwind CSS):** Configure `tailwind.config.mjs` to implement the dark theme (Base: `#111118`, Text: `#EAEAEA`, Secondary: `#A0A0A0`), vibrant accent colors (`#00FFFF`, `#FF00FF`, `#00FF7F`, `#FFD700`), and select modern sans-serif fonts (one for headings, one for body). Setup global styles import if needed.
3.  **Core Layouts:** Create a primary `src/layouts/BaseLayout.astro` component containing the common HTML structure (`<head>`, `<body>`), header, footer, main content `<slot />`, essential meta tags, and applying base Tailwind classes (background, text color, font).
4.  **Homepage (`src/pages/index.astro`):** Structure the page using `BaseLayout`. Plan components: `Hero.astro` (containing headline, tagline, and a placeholder/container for the ThreeJS element), `FeaturedProjects.astro` (using `ProjectCard.astro`), `AboutSummary.astro`, `SkillsList.astro`, `CallToAction.astro`.
5.  **Projects Page (`src/pages/projects.astro`):** Structure using `BaseLayout`. Implement a responsive grid layout (Tailwind). Refine the `ProjectCard.astro` component (props: title, thumbnail, shortDesc, techTags[], links{repo?, live?}). Plan an interactive `ProjectFilters.jsx` component (using Preact/Solid/React within an Astro Island `client:visible`) for client-side filtering logic.
6.  **Project Detail Page (`src/pages/projects/[slug].astro`):** Utilize Astro's dynamic routing and Content Collections. Store project data as Markdown files in `src/content/projects/`. Define the content schema (frontmatter) in `src/content/config.ts` (including title, description, problem/solution, tech stack, images/video, links, etc.). The page will fetch data via `getStaticPaths` and render the Markdown content using `<Content />`.
7.  **About & Contact Pages:**
    *   `src/pages/about.astro`: Structure with sections for detailed background, philosophy, experience, and an optional resume download link.
    *   `src/pages/contact.astro`: Structure to **display direct contact information** (Email, LinkedIn, GitHub links) rather than implementing a form.
8.  **General Animations Strategy:**
    *   **Page Transitions:** Use Astro View Transitions API for smooth, sophisticated transitions (potentially element morphing, ensuring speed).
    *   **Scroll Animations:** Employ the Intersection Observer API for subtle reveal/fade-in effects on sections, minimizing CLS impact.
    *   **Micro-interactions:** Use Tailwind utilities and CSS transitions for hover/focus states on interactive elements, incorporating accent colors.
    *   **Loading Animation:** Implement a simple, custom SVG or CSS loading animation for transitions/initial load.
9.  **ThreeJS Integration Strategy:**
    *   **Structure:** Create `src/components/ThreeScene.astro` as a container, embedding an Astro Island (`client:visible` or `client:idle`) like `src/components/ThreeCanvas.jsx` (using Preact/Solid/React) to manage the ThreeJS logic.
    *   **Loading:** Lazy-load the ThreeJS library and the island component itself (dynamic imports).
    *   **Placement/Style:** Initially target the Hero section background with an abstract style (e.g., interactive particles, generative geometry).
    *   **Interactivity:** Implement subtle reactions to mouse movement or scroll.
    *   **Optimization:** Focus on geometry reuse (instancing), texture optimization, draw call reduction, `requestAnimationFrame` management, and object disposal.
10. **Performance Optimization Strategy:**
    *   Prioritize Astro Islands and SSG.
    *   Optimize images (AVIF/WebP), SVGs, and subset fonts.
    *   Lazy load images, components (especially ThreeJS).
    *   Minimize client-side JavaScript outside islands.
    *   Ensure Tailwind CSS purging is active for production.
    *   Apply specific ThreeJS optimizations.
    *   Monitor performance (DevTools, Lighthouse) throughout development.
11. **Accessibility (A11y) & SEO Strategy:**
    *   **A11y:** Use semantic HTML, ARIA where needed, ensure keyboard navigation, check color contrast, provide alt text, test with screen readers.
    *   **SEO:** Implement descriptive titles, meta descriptions, logical heading structures, and Open Graph tags in the base layout.
12. **Summary & Deliverables:** Consolidate this plan and prepare to address the requested deliverables (file structure, code snippets, setup outlines, technique lists, potential challenges) during the implementation phase.

## Plan Visualization:

```mermaid
graph TD
    A[1. Setup Project] --> B(2. Define Design System - Tailwind);
    B --> C(3. Plan Core Layouts);
    C --> D(4. Plan Homepage);
    C --> E(5. Plan Projects Page);
    C --> F(6. Plan Project Detail Page);
    C --> G(7. Plan About & Contact Pages);
    subgraph Pages & Structure
        direction LR
        D; E; F; G;
    end
    D --> H(8. Plan General Animations);
    E --> H;
    F --> H;
    G --> H;
    H --> I(9. Plan ThreeJS Integration);
    subgraph Interactivity & Features
        direction LR
        H; I;
    end
    I --> J(10. Plan Performance Strategy);
    J --> K(11. Plan A11y & SEO);
     subgraph Quality & Optimization
        direction LR
        J; K;
    end
    K --> L(12. Summarize & Outline Deliverables);