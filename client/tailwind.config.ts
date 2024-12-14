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
        primary: "#3577FA",
        secondary: "#FFC007",
        text: "#437FFB",
        bg2: "#EEF3F7",
        greyish: "#6C6C6D",
        light: "#FFFFFF",
        dark: "#222222",
        bg: "#051d4d",
      },
      fontSize: {
        main: "2.5rem",
        sec: "2.25rem",
        link: "0.875rem",
        sub: "1.1875rem",
        title: "2rem",
        subtitle: "1.125rem",
        small: "0.8125rem",
        rating: "0.75rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
