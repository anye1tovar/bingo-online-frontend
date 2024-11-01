/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        blue: "#309eb7",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
