import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    extend: {
      backgroundImage: {
        "home-hero": "url('/images/hero/bgg.png')",
        "footer-bg": "url('/images/footer/footer-bg.png')",
        "footer-top": "url('/images/footer/footer-top-shape.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: {
          red: "#DB3750",
          purple: "#E0AFD0",
          blue: " #23227B",
        },
        secondary: {
          purple: "#5465AC",
        },
      },
    },
  },
};
export default config;
