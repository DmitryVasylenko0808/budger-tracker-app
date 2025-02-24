import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000",
        gray: {
          50: "#f5f5f5",
          100: "#808080",
          200: "#333333b3",
        },
        primary: {
          100: "#007aff",
          200: "#0274ee",
        },
      },
      width: {
        auth: "390px",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
} satisfies Config;
