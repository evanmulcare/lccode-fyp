module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "max-md": { max: "1800px" },
      },
      fontFamily: {
        geistsans: ["Geist Sans", "monospace"],
        mono: ["Geist Mono", "monospace"],
      },
      colors: {
        primary: {
          green: "#12a588",
          "green-light": "#13bd95",
        },
        secondary: {
          "dark-darkest": "#333333",
          "dark-mid": "#4f4f4f",
          "dark-light": "#a3a4a4",
        },
        background: {
          DEFAULT: "#eff0f1",
        },
      },
    },
  },
  plugins: [],
};
