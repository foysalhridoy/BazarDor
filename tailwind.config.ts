import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      fontFamily: {
        bengali: [
          "'Google Sans'",
          "'Hind Siliguri'",
          "'Noto Sans Bengali'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazardor: {
          primary: "#15803d",
          "primary-content": "#ffffff",
          secondary: "#d97706",
          "secondary-content": "#ffffff",
          accent: "#0284c7",
          "accent-content": "#ffffff",
          neutral: "#1f2937",
          "neutral-content": "#f9fafb",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#0f172a",
          info: "#0284c7",
          success: "#16a34a",
          warning: "#eab308",
          error: "#dc2626",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "9999px",
        },
      },
    ],
    defaultTheme: "bazardor",
  },
};

export default config;
