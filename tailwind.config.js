// tailwind.config.js
const plugin = require("tailwindcss/plugin");

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
        custombg: "#f1f1f1",
        customGold: "#FFD700",
      },
      animation: {
        underlineShrink: "underlineShrink 0.4s ease-in-out forwards",
        gradientAnimation: "gradientAnimation 31s ease infinite",
        move: "move 1s linear infinite", // Keep this for any global use if needed
        fadeInUp: "fadeInUp 0.5s forwards",
        "slide-enter": "slide-enter 0.5s ease forwards",
        "slide-exit": "slide-exit 0.5s ease forwards",
        "fade-in": "fadeIn 1s ease-in forwards",
        "fade-in2": "fadeIn2 2s ease-in forwards",
      },
      keyframes: {
        underlineShrink: {
          "0%": { width: "100%" },
          "25%": { width: "75%" },
          "50%": { width: "50%" },
          "75%": { width: "25%" },
          "100%": { width: "0" },
        },
        "slide-enter": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-exit": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        move: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },

        gradientBackground: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn2: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".underline-shrink": {
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: "''",
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "1px",
            backgroundColor: "#72b626",
            transition: "width 0.4s ease-in-out",
          },
          "&:hover::after": {
            width: "0",
          },
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".gradient-background": {
          background: "linear-gradient(60deg, #72B626, #C0DCA1)",
          backgroundSize: "400% 400%",
          animation: "gradientBackground 15s ease infinite",
        },
        ".clip-octa": {
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        },
        ".rotate-360": {
          transition: "transform 0.7s ease-in-out",
        },
        ".rotate-360:hover": {
          transform: "rotate(360deg)",
        },
        ".filter-green": {
          filter: "sepia(1) saturate(5) hue-rotate(90deg) opacity(0.5)", // Apply green tint filter
        },
      });
    }),
  ],
};
