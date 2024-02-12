/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#030637",
        "second":"#3C0753",
        "tertiary":"#720455",
        "quat":"#910A67"
      }
    },
  },
  plugins: [],
}