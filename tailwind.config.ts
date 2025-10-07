
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef6ff",
          100: "#d9ebff",
          200: "#b3d6ff",
          300: "#85bfff",
          400: "#57a8ff",
          500: "#2a90ff",
          600: "#1175e6",
          700: "#0a5bb4",
          800: "#08448a",
          900: "#07366d"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
