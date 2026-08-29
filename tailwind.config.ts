import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: "#f0f9f5",
            100: "#dcf0e6",
            200: "#b9e1cd",
            300: "#8bcdab",
            400: "#55b283",
            500: "#1b7d5a",
            600: "#0f4c3a",
            700: "#0c3b2e",
            800: "#082d23",
            900: "#06221b",
            950: "#031410",
          },
          gold: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#d97706",
            600: "#b45309",
            700: "#92400e",
            800: "#78350f",
            900: "#451a03",
            950: "#290e02",
          },
          terracotta: {
            50: "#fdf8f6",
            100: "#f2e3dc",
            200: "#e6c7b8",
            300: "#d8a68f",
            400: "#ca8162",
            500: "#c25e00",
            600: "#9e4800",
            700: "#7c3700",
            800: "#602a00",
            900: "#451e00",
            950: "#2d1300",
          },
          sand: {
            50: "#fafaf7",
            100: "#f3f3eb",
            200: "#e5e5d6",
            300: "#d2d2bd",
            400: "#b7b79a",
            500: "#999978",
            600: "#7a7a5d",
            700: "#606049",
            800: "#4a4a40",
            900: "#262620",
            950: "#141410",
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;
