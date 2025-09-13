/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        eudo: [
          "eudoxsussans-medium",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        "eudo-bold": [
          "eudoxsussans-bold",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        author: [
          "author-medium",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        "author-bold": [
          "author-bold",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        indigo_dark: "var(--indigo-dark)",
        secondary: "var(--secondary-color)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".font-smooth": {
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          "text-rendering": "optimizeLegibility",
        },
        ".font-crisp": {
          "-webkit-font-smoothing": "subpixel-antialiased",
          "-moz-osx-font-smoothing": "auto",
          "text-rendering": "optimizeSpeed",
        },
        ".font-sharp": {
          "-webkit-font-smoothing": "none",
          "-moz-osx-font-smoothing": "unset",
          "text-rendering": "geometricPrecision",
        },
      };
      addUtilities(newUtilities);
    },
    animate,
  ],
};
