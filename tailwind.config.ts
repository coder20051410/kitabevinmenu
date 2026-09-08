import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F5EFE3",
          light: "#FAF6EF",
          dark: "#EBE3D4",
        },
        coffee: {
          DEFAULT: "#3B2A1E",
          light: "#5C4A3A",
          muted: "#8B7355",
        },
        accent: {
          DEFAULT: "#8B5E3C",
          light: "#A67B5B",
          terracotta: "#9B4D3A",
        },
        card: {
          DEFAULT: "#FFFCF7",
          border: "#E8DFD0",
        },
        "dark-bg": "#181310",
        "dark-paper": "#1F1915",
        "dark-card": "#2A231D",
        "dark-border": "#3D342B",
        "dark-text": "#F0E9DD",
        "dark-text-muted": "#B3A691",
        gold: {
          DEFAULT: "#D4A857",
          light: "#E3C384",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(59, 42, 30, 0.06)",
        "card-hover": "0 4px 20px rgba(59, 42, 30, 0.1)",
        "card-dark": "0 2px 16px rgba(0, 0, 0, 0.35)",
        "card-dark-hover": "0 6px 24px rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
