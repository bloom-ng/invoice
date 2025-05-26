/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      width: {
        '1/15': '6.666667%',
        '2/15': '13.333333%',
        '3/15': '20%',
        '4/15': '26.666667%',
        '5/15': '33.333333%',
        '6/15': '40%',
        '7/15': '46.666667%',
        '8/15': '53.333333%',
        '9/15': '60%',
        '10/15': '66.666667%',
        '11/15': '73.333333%',
        '12/15': '80%',
        '13/15': '86.666667%',
        '14/15': '93.333333%',
        '15/15': '100%',
      },
      colors: {
        customRed: '#C63028',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
}
