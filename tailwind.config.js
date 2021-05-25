module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        appColor: {
          dark: '#1c1f2e',
          light: '#f5f5f5',
          selectd: '#242736',
          iconColor: '#008793',
          caption: '#62646f',
          appLight: '#242736',
          newCard: "#ff742e",
          newCardLight: "#ff884d",
          otherCard: '#0e78f9',
          otherCardLight: '#318cf9',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
