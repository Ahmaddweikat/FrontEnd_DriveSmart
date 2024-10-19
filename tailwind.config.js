/** @type {import('tailwindcss').Config} */
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`),
    ],
  },
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
      colors: {
        customRed: "#d10801",
        customGreen: "#72b626",
        customGray: "#232423",
        customGrayOption: "#5a5a5a",
        customGrayBG: "#e4e4e4",
        customGrayop: "#f3f3f3",
      },
      animation: {
        move: "move 1s linear infinite", // Keep this for any global use if needed
      },
      keyframes: {
        move: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"], // Enable animation on hover
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
