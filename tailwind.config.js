module.exports = {
  content: [
    "./_includes/**/*.html",
    "./_layouts/*.html",
    "./posts/*.{md,html}",
    "./javascript/**/*.js",
    "./posts/**/*.{md,html}",
    "./*.{md,html}",
  ],
  theme: {
    extend: {
      zIndex: {
        1000: "1000",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
