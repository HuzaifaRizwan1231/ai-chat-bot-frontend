/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primaryColorLight: "#fff",
        secondaryColorLight: "#f4f4f4",
        primaryColorDark: "#212121",
        secondaryColorDark: "#2f2f2f",
      },
    },
  },
  plugins: [],
};
