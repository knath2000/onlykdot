# Active Context: Personal Portfolio Website (as of 2025-04-15)

## 1. Current Focus

- **Animated Project Card System:** The projects splash page now features a highly animated, interactive project card for the "Flutter macOS Task Manager" (planner app), using Astro Content Collections and React islands.
- **Multiple Animated Cards:** The system now supports multiple animated project cards. Any project with `isAnimated: true` in its frontmatter will render as an animated card.
- **Astro Image Pipeline Integration:** The card's thumbnail is now handled via Astro's image() helper, using a relative path (../../assets/project-thumbnails/flutter-planner.png) and rendered as an Astro image object in React.
- **Dynamic Card Content:** All card content (title, shortDesc, techStack, summary, links, thumbnail, isAnimated) is dynamically loaded from the markdown file.
- **Card Layout Update:** The card layout is now:
  - Title
  - Short description
  - Thumbnail (rounded rectangle, below shortDesc, above tech stack)
  - Tech stack badges
  - Live/Repo links
  - "See Animation" button
- **Summary Overlay:** On hover, the summary overlays the thumbnail with a semi-transparent, rounded rectangle.
- **No Duplicates:** The original non-animated planner card was removed to prevent duplicates.
- **Error Handling:** All previous issues with missing images, fallback SVGs, and Astro image pipeline errors have been resolved.
- **Schema Update:** The Astro content schema now includes `isAnimated` as a boolean field, enabling robust support for animated cards.

## 2. Recent Changes

- Refactored SampleAnimatedProjectCard.jsx and ProjectCardReact.jsx to support Astro image objects and dynamic content.
- Updated sample-animated-card.md and animated-card-copy.md to use the correct relative path for the thumbnail and include `isAnimated: true`.
- Removed flutter-task-manager.md, quran-adventures.md, and dynamic-sports-tracker.md to eliminate duplicate and test cards.
- Improved summary overlay styling and card layout per user feedback.
- Added debug logging to ProjectCardReact.jsx to verify project data and ensure correct field mapping.
- Updated Astro content schema (`src/content/config.ts`) to include `isAnimated` as a boolean field.

## 3. Next Steps

- Ensure all new project cards follow this dynamic, animated, and Astro-compatible pattern.
- Update .clinerules and documentation to reflect these new standards.
- Continue to monitor for any edge cases with image handling or field mapping as new cards are added.