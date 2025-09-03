/** @type {import('tailwindcss').Config} */

module.exports = {
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
  plugins: [],
}
