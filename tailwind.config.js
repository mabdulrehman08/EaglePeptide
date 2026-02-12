/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      brand: {
        DEFAULT: "#1e40af",     
        dark:  "#1e3a8a",
      }
    },
  },
  plugins: [],
};
