# Progress Tracker: Dynamic Sports Match Tracker

**Version:** 1.0 (Initial)
**Date:** 2025-04-12 (Updated after forcing HTML renderer)

## 1. Current Status (Post-Phase 1 Refinements & Optimization)
*   Initial implementation of gradient background theme complete.
*   Match details now shown in a modal popup with background blur.
*   Skeleton loading screens (`skeletonizer`) implemented for main loading states.
*   Local dev environment (`vercel dev`) issues resolved (requires `.env` file).
*   Application builds and runs on Web, macOS, iOS with basic functionality.
*   Web renderer investigation completed and HTML renderer successfully forced on Vercel.
*   Web initial load perception improved (dark background instead of white flash).
*   Deferred loading applied to modal/selection screen (minimal size impact).
*   Dependencies cleaned (`shared_preferences` removed).
*   Vercel build process modified (`build.sh`, `pubspec.yaml`) to use Flutter 3.22.0 and force HTML renderer.

## 2. What Works
*   Displaying Upcoming/Previous Matches via Tabs (with gradient background).
*   Fetching data from football-data.org via Vercel Proxy (`vercel dev` locally requires `.env`).
*   Displaying match details in a modal popup with background blur.
*   Adding/Removing favorite teams using Hive persistence (via star button).
*   Drag-and-drop favoriting (MatchListItem -> Drop Target on MatchListScreen).
*   Filtering match list by favorites (using toggle button).
*   Basic caching of fetched match details and lists using Hive.
*   Cross-platform builds (Web, macOS, iOS).
*   Mandatory initial league selection screen (with visual selector).
*   Ability to change league selection from main screen (via edit button).
*   Skeleton loading states using `skeletonizer` for lists and modal.
*   Displaying Team Crests & League Emblems (via Vercel proxy for CORS).
*   Centered Match List with constrained width.
*   Dark background shown immediately on web load (improved perception).
*   Vercel web build successfully uses HTML renderer (CanvasKit not downloaded).

## 3. What's Next (High Level)
*   UI/UX Polish (Refine gradient theme, custom components, glossy effects?).
*   Implement complex animations using Rive.
*   Implement robust filtering for match lists.
*   Improve error handling.
*   Conduct runtime performance profiling and optimization.
*   Code Refinement (Address TODOs).
*   Update core Memory Bank docs (`projectbrief.md`, `productContext.md`) to match current gradient theme direction.

## 4. Known Issues / Blockers
*   Polling for live updates is basic and subject to rate limits/API update frequency.
*   UI lacks final polish (custom components, glossy effects, refined animations).
*   Filtering logic is basic (only home/away team ID via toggle).
*   Drag-and-drop target area is the whole list view, could be refined.
*   Skeleton loading appearance might need tweaking.
*   Web initial JS payload (HTML renderer) is ~2.4MB; further reduction requires advanced techniques or deferring larger features.
*   Web build now depends on Flutter 3.22.0 due to `build.sh` script.

## 5. Key Milestones Reached (Phase 1 & Initial Optimizations)
*   Project Plan Finalized (2025-04-11)
*   Memory Bank Initialized (2025-04-11)
*   Phase 1 Core Functionality Implemented (Basic) (2025-04-11)
*   Cross-Platform Builds Successful (2025-04-11)
*   Web App Deployed & Working via Vercel (using Serverless Function Proxy) (2025-04-11)
*   Integrated Hive for Favorites & Match Caching (2025-04-11)
*   Implemented Mandatory League Selection & Change Flow (2025-04-11)
*   Fixed Previous Match Score Display Logic (Corrected JSON keys) (2025-04-11)
*   Refactored UI Alignment (Centered AppBar Title & List Item Text) (2025-04-11)
*   Implemented Gradient Background Theme (2025-04-11)
*   Implemented Modal Match Details w/ Blur (2025-04-11)
*   Implemented Drag-and-Drop Favoriting (Basic) (2025-04-11)
*   Implemented Skeleton Loading (`skeletonizer`) (2025-04-11)
*   Fixed `vercel dev` Build Script (2025-04-11)
*   Pushed Gradient/Modal/Skeleton Changes to GitHub (2025-04-11)
*   Improved Web Load Perception (Dark Splash) (2025-04-12)
*   Implemented Deferred Loading (Modal/Selection) (2025-04-12)
*   Cleaned Dependencies (Removed shared_preferences) (2025-04-12)
*   Fixed Local Dev API Auth (Added .env requirement) (2025-04-12)
*   Pushed Optimization Changes to GitHub (2025-04-12)
*   Modified `build.sh` to use Flutter 3.22.0 & HTML renderer (2025-04-12)
*   Fixed `pubspec.yaml` SDK constraint & dependencies for Flutter 3.22.0 (2025-04-12)
*   Pushed build script & pubspec fixes to GitHub (2025-04-12)
*   Confirmed Vercel deployment successful with HTML renderer (2025-04-12)

## 6. Performance Notes (Initial - Post Lighthouse)
*   Release builds completed successfully for all platforms.
*   Initial Lighthouse (CanvasKit renderer) showed poor performance (Score ~86, ~59MB payload).
*   Switched web renderer to **HTML** in `web/index.html`.
*   Re-run Lighthouse (HTML renderer) showed **significant improvement**:
    *   Payload reduced to ~2.2MB.
    *   Speed Index improved from ~126s to ~1.5s.
    *   JS Execution Time reduced from ~5.1s to ~1.7s.
    *   Accessibility score improved to 92.
    *   SEO score improved to 100.
    *   LCP/TBT errors persist, likely due to HTML renderer measurement difficulties - monitor as app complexity increases.
*   No major performance issues noted during basic functional testing on native platforms.
*   Detailed profiling (DevTools, Lighthouse) still required as per Step 12 / Post Phase 1.

## 7. Performance Notes (HTML Renderer - 2025-04-12)
*   **Build Strategy:** Vercel builds now use Flutter 3.22.0 with the `--web-renderer html` flag forced via `build.sh`.
*   **Outcome:** Successfully avoids CanvasKit download, resulting in smaller initial payload (~2.2-2.4MB based on previous measurements) and faster perceived load compared to CanvasKit default in later Flutter versions.
*   **Initial Load Perception:** Dark background in `index.html` mitigates white screen flash during engine load.

*(This file provides a high-level overview of the project's progress...)*