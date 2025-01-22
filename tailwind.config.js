/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeOrange: "#ff8216",
        text: "#201b18",
        background: "#1b1002",
        primary: "#f7c877",
        secondary: "#0aa893",
        accent: "#3487f3",
        bottomPlayer: "#16171f"
      }
    },
  },
  plugins: [],
}
