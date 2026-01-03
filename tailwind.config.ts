import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
          tertiary: "#f1f5f9",
        },
        foreground: {
          DEFAULT: "#1e293b",
          muted: "#475569",
          subtle: "#64748b",
        },
        primary: {
          DEFAULT: "#08F2F5",
          dark: "#06d4d7",
          light: "#3af5f7",
          50: "#e6fffe",
          100: "#b3fffe",
          500: "#08F2F5",
          600: "#06d4d7",
          700: "#05b6b9",
        },
        accent: {
          orange: "#F96827",
          pink: "#FA1665",
          "orange-light": "#ff8a5c",
          "pink-light": "#ff4d8a",
        },
        success: "#10b981",
        warning: "#F96827",
        danger: "#FA1665",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
export default config;

