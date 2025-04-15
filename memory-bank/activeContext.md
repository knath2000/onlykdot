# Active Context: Personal Portfolio Website (as of 2025-04-15 ~9:01 AM PST)

## 1. Current Focus

* **Critical Build Stability Fix (Completed):**
    * Resolved persistent Astro WASM compiler panic (`originalIM was set twice`) that blocked all builds.
    * **Root Cause:** Incompatible or legacy `@astrojs/compiler` package was present in `package.json` and `node_modules` with Astro 3.x, causing version conflicts and parser panics.
    * **Resolution Steps:**
        * Uninstalled `@astrojs/compiler` (Astro 3.x+ manages its own compiler internally).
        * Deleted and reinstalled all dependencies (`node_modules`, `package-lock.json`).
        * Renamed `src/pages/projects.astro` to `projects.astro.bak` to isolate possible file corruption or parser bug.
        * Commented out `<script>` and `<style>` blocks in `index.astro` for isolation (not the root cause).
        * After these steps, the build now completes successfully.
    * **Note:** The panic alternated between `index.astro` and `projects.astro`, indicating a deep parser/compiler issue triggered by a combination of legacy dependencies and possibly file content.

* **Performance Optimization (Homepage - Deployed):** (See previous context for details.)

## 2. Recent Changes

* **Dependency Cleanup:**
    * Removed all traces of `@astrojs/compiler` from dependencies.
    * Ensured Astro is at the latest stable 3.x version.
    * Cleaned and reinstalled all dependencies.

* **File Isolation:**
    * Renamed `src/pages/projects.astro` to `projects.astro.bak` to prevent build panics.
    * Build now succeeds with this file disabled.

## 3. Next Steps

* Carefully review and refactor `projects.astro.bak` before restoring it to production.
* Restore and test `<script>` and `<style>` blocks in `index.astro` incrementally to confirm they do not trigger panics.
* Resume performance optimization and feature development as outlined in the optimization plan.
* Monitor for any further build instability and document any new patterns or issues in the Memory Bank.

## 4. Lessons Learned

* **Astro 3.x+ does NOT require or support a separate `@astrojs/compiler` dependency.**
* **WASM panics with "originalIM was set twice" are almost always caused by version conflicts or corrupted files.**
* **Isolate problematic files and dependencies incrementally to restore build stability.**