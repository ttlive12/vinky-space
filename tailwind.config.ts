import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        custom: ["MedulaOne", "Simonetta"],
      },
      keyframes: {
        scroll1: {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(-100%)" },
          "50.01%": { transform: "translateY(100%)" },
          "60%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(0)" },
        },
        scroll2: {
          "0%": { transform: "translateY(0)" },
          "10%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(-100%)" },
          "60%": { transform: "translateY(-200%)" },
          "99.99%": { transform: "translateY(-200%)" },
          "100%": { transform: "translateY(0)" },
        },
        scaleOut: {
          "0": { transform: "scale(0)" },
          "100%": { transform: "scale(100%)" },
        },
        rotate360: {
          "0": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeDownIn: {
          "0": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        scroll1: "scroll1 6s ease infinite",
        scroll2: "scroll2 6s ease infinite",
        scaleOut: "scaleOut 1s ease",
        rotate360: "rotate360 0.6s ease",
        fadeDownIn: "fadeDownIn 0.6s ease",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
