/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        // colores de ERU
        // #e6a06f #9e9c71 #5e8271 #33454e #242739
        background: "#242739",
        "background-50%": "#24273980",
        primary: "#e6a06f",
      },
    },
  },
};