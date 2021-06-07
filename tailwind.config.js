module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        appColor: {
          dark: '#1c1f2e',
          light: '#eeeeee',
          selectd: '#242736',
          iconColor: '#008793',
          caption: '#62646f',
          appLight: '#242736',
          appExtraLight: "#282c3a",
          newCard: "#ff742e",
          newCardDark: "#ef6c00",
          newCardLight: "#ff884d",
          otherCard: '#0e78f9',
          otherCardDark: '#0e78f9',
          otherCardLight: '#318cf9',
          scrollBar: "#333543",
          backdropBlurDark: '#282c3a98',
          backdropBlur: '#D1D5DB98',
          purple: "#8e44ad"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar'),],
}
