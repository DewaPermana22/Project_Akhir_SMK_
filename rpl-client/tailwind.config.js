/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        custom: ['"YourCustomFont"', 'sans-serif'],
      },
      colors: {
        indigo_dark: 'var(--indigo-dark)',
        secondary: 'var(--secondary-color)',
      },
    },
  },
  plugins: [animate],
}
