import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#090908",
        champagne: "#f7ecd0",
        gold: "#d7a84c",
        rose: "#e7b7a0",
        ink: "#161310"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 44px rgba(215,168,76,.24)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(135deg, #f7ecd0, #d7a84c 48%, #8f6424)"
      }
    }
  },
  plugins: []
};

export default config;
