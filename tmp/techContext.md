# Technical Context: Dynamic Sports Match Tracker

**Version:** 1.0 (Initial)
**Date:** 2025-04-12 (Updated after forcing HTML renderer)

## 1. Core Technology
*   **Framework:** Flutter (Locally: 3.29.2+, Vercel Build: 3.22.0 via build.sh)
*   **Language:** Dart (Locally: 3.7.2+, Vercel Build: 3.4.0 via build.sh)

## 2. Target Platforms & Build Environments
*   **Web:** Flutter Web (Targeting modern browsers).
    *   **Renderer Strategy:** Vercel release builds force the **HTML renderer** using Flutter 3.22.0 and the `--web-renderer html` flag specified in `build.sh`. This avoids CanvasKit downloads and improves initial load performance compared to the default CanvasKit renderer in later Flutter versions.
    *   **Initial Load:** Dark background added to `index.html` to improve perceived load time. Bundle size (HTML renderer) previously measured around ~2.2-2.4MB.
*   **macOS:** Flutter Desktop (Targeting recent macOS versions)
*   **iOS:** Flutter Mobile (Targeting recent iOS versions)
*   **Build Tools:** Flutter SDK (Locally: 3.29.2+, Vercel Build: 3.22.0), Xcode (for iOS/macOS), Android Studio/SDK (if Android support added later)

## 3. Key Dependencies (Selected)
*   `flutter_sdk`: Core Flutter framework
*   `cupertino_icons`: Default iOS-style icons
*   `flutter_riverpod`: State Management
*   `json_annotation`: JSON helper
*   `dio`: HTTP Client
*   `intl`: Date formatting
*   `hive`: Local Persistence (Key-Value & Object Storage)
*   `hive_flutter`: Flutter helpers for Hive
*   `path_provider`: Finding file system paths for Hive
*   `skeletonizer`: Skeleton loading animations
*   `cached_network_image`: Network image loading with caching/placeholders
*   `# shared_preferences`: (Removed - Migrated to Hive)

## 4. Dependencies to be Determined/Researched
*   **Animation Library:** (e.g., `rive`, `lottie` - Step 3 research)
*   **Real-time Communication:** football-data.org (free tier) likely does NOT support WebSockets/SSE. Real-time updates would require frequent polling of REST endpoints (respecting rate limits: 10/min). (Step 11)
*   **JSON Serialization:** (e.g., `json_serializable` - Step 7)

## 5. Data Source
*   **Type:** External Sports API (Soccer focus for Phase 1)
*   **API Candidates (from initial research):**
    *   football-data.org (Free tier for top competitions)
    *   API-Football (api-football.com) (Comprehensive, 1100+ competitions)
    *   Sportmonks (sportmonks.com) (Comprehensive, 2500+ leagues, reliable)
    *   SoccersAPI (soccersapi.com) (JSON API + Widgets)
    *   Soccerdata API (soccerdataapi.com) (Live scores, stats, AI previews)
    *   All Sports API (allsportsapi.com) (JSON API, claims speed)
*   **Selected API:** football-data.org (Using free tier for Phase 1)
*   **API Key Management:** Vercel Environment Variable (`FOOTBALL_DATA_TOKEN`) for deployment; Local `.env` file for development.

## 6. Performance Considerations
*   See `projectbrief.md` for specific goals (Lighthouse, FPS).
*   Emphasis on minimizing widget rebuilds, efficient data handling, platform optimization.
*   Web initial load optimized for perception (dark splash); bundle size ~2.4MB (HTML renderer).

## 7. Development Setup Notes
*   Local development using `flutter run` or `vercel dev` requires a `.env` file in the project root containing `FOOTBALL_DATA_TOKEN=YOUR_API_TOKEN_HERE` for the API proxy to function correctly.
*   Ensure `.env` is added to `.gitignore`.

## 8. Deployment (Vercel - Web)
*   **Framework Preset:** Other (Set in Vercel UI)
*   **Build Command:** `sh build.sh` (Set in Vercel UI)
*   **Output Directory:** `build/web` (Set in Vercel UI)
*   **Install Command:** Default/Empty
*   **`build.sh`:** Downloads Flutter SDK (3.22.0), adds to PATH, runs `flutter build web --release --web-renderer html`. Output remains in `build/web`.
*   **`vercel.json`:** Contains rewrite rule `{"source": "/(.*)", "destination": "/index.html"}` for Flutter routing.
*   **Vercel Serverless Function:** Used as proxy (`api/footballDataProxy.ts`) to handle API calls and CORS for the web build. API Key (`FOOTBALL_DATA_TOKEN`) is loaded via Vercel Environment Variables (`process.env.FOOTBALL_DATA_TOKEN`).

*(This file tracks the specific technologies, libraries, APIs, and technical constraints of the project. It will be updated as dependencies are added and technical decisions are made, particularly in Steps 2, 3, 4, 6, 10, 11).*