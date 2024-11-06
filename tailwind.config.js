// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '350px': '350px',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // This applies to all Tailwind `font-sans` classes
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
      },
    },
  },
  plugins: [],
};
