module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // Set to 'class' instead of 'media'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          focus: "var(--color-primary-focus)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
        },
        background: {
          DEFAULT: "var(--color-bg)",
          secondary: "var(--color-bg-secondary)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
        },
      },
    },
  },
  plugins: [],
};
