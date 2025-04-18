# Product Context: Personal Portfolio Website

## 1. Problem Solved

This website addresses the need for a modern, engaging, and high-performance online presence to showcase the owner's software development skills and projects effectively. It aims to replace or supplement traditional resumes and static portfolio sites with a dynamic and memorable experience.

## 2. Target Audience

*   Potential Employers (Recruiters, Hiring Managers)
*   Potential Clients (for freelance work)
*   Peers in the tech community
*   Anyone interested in the owner's work and skills

## 3. Core User Experience Goals

*   **Engagement:** Create a visually captivating and interactive experience (especially via the splash intro and ThreeJS elements) that encourages exploration.
*   **Clarity:** Present project information (descriptions, tech stack, links) clearly and concisely.
*   **Professionalism:** Convey technical competence, creativity, and attention to detail.
*   **Performance:** Ensure a fast, smooth, and frustration-free browsing experience, particularly on desktop.
*   **Discoverability:** Allow users to easily find relevant projects (via filtering on the Projects page) and contact information.

## 4. Key Features (from User Perspective)

*   **Splash Introduction / Navigation (Updated 2025-04-16):** An eye-catching, animated entry point (Hero section with 3D particle sphere). Interaction proceeds via clicking interactive bubble buttons embedded in the sphere. On click, the button triggers a burst animation overlay, while simultaneously the sphere and buttons fade out, before navigating to the target page (e.g., Projects).
*   **Sequential Section Reveal (Post-Hero):** After the initial Hero section, subsequent homepage sections (if any were planned beyond navigation) would use complex, animated transitions (spin-out/slide-bounce-in) triggered by other buttons.
*   **Interactive 3D Elements:** Subtle, performant ThreeJS animations (backgrounds, hover effects) enhancing the visual appeal.
*   **Project Showcase:** Detailed views of individual projects with visuals and technical details. (Note: Thumbnails currently missing on detail pages).
*   **Project Filtering:** Ability to sort/filter projects on the main Projects page.
*   **Responsive Design:** Adapts to different screen sizes (desktop-first focus).
*   **Clear Navigation:** Easy access to different sections (Home, Projects, About, Contact).
*   **Modal Overlay on Cards:** On the Projects page, clicking any project card opens a detailed modal overlay with project information (title, description, thumbnail, tech stack, links) using animated transitions (scale, rotate) and a burst effect.