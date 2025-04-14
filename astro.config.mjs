// @ts-check
import { defineConfig } from 'astro/config';

// Import Astro integrations
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Remove manual Vite plugin setup for Tailwind

  integrations: [
    tailwind(), // Add the official Astro Tailwind integration
    react()
  ],
  // Define the base URL for the site (required for canonical URLs, sitemaps, etc.)
  // Replace with your actual domain before deployment!
  site: 'http://localhost:4321',
});