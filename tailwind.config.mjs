/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#111118', // Deep charcoal/navy base
        // Define text colors directly
        primary: '#EAEAEA',    // Primary text (off-white/light gray)
        secondary: '#A0A0A0', // Secondary text (medium gray)
        accent: {
          blue: '#00FFFF', // Electric Blue
          magenta: '#FF00FF', // Magenta
          green: '#00FF7F', // Bright Green
          yellow: '#FFD700', // Golden Yellow
        },
      },
      fontFamily: {
        // User needs to ensure these fonts are imported (e.g., Google Fonts, local)
        sans: ['Inter', 'sans-serif'], // Example body font
        heading: ['Poppins', 'sans-serif'], // Example heading font
      },
    },
  },
  plugins: [],
}