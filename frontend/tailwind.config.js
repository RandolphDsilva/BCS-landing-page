/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: "#F9EEF0",
          100: "#F2E9EB",
          600: "#7A1F2B",
          700: "#5C1720",
        },
        gold: {
          50: "#F8F3E6",
          100: "#F5EBD1",
          300: "#E8D9B4",
          500: "#B8860B",
          600: "#997009",
        },
        ivory: {
          50: "#FDFBF7",
          100: "#F5EFE6",
        },
        ink: {
          900: "#2D2A26",
          700: "#5C5A56",
          500: "#8A8782",
        },
        line: {
          DEFAULT: "#E8E2D9",
        },
      },
      fontFamily: {
        heading: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(45,42,38,0.04)",
        "card-hover": "0 12px 28px -12px rgba(122,31,43,0.18), 0 4px 10px -4px rgba(45,42,38,0.08)",
      },
    },
  },
  plugins: [],
};
