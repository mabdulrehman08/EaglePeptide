/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',     // keep this
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {            // ← important: nest under colors
        brand: {
          DEFAULT: "#1e40af",
          dark:    "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
}