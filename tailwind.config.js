/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'gray-white': '#C5C3C3',
        'gray-light': '#C7D0D8',
        'gray-mid-dark': '#8F8D8D',
        'gray-mid': '#414042',
        'gray-dark': '#282829',

        'green-light': '#FFF952',
        'green-mid': '#ECF655',

        'red-line': '#FF0000',
        'red-border': '#FF3636',
        'grey-price-on-cross': '#B3B3B3',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
}
