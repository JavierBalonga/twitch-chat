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
        backdrop: "#242739E6",
        primary: "#e6a06f",
        // #536c8d #003e4f #3b5274
        "button-primary": "#003e4f",
        "button-primary-hover": "#536c8d",
      },
    },
  },
};
