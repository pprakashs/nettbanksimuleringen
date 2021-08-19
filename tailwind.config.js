module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './util/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        lg: '1190px',
      },
      container: {
        center: true,
        padding: '20px',
      },
      borderColor: {
        secondary: '#767676',
        blue: 'var(--blue)',
        'black-100': '#767676',
        primary: 'var(--primary)',
        pink: '#FAE9E2',
        'gray-1100': '#767676',
        'red-1100': '#A80037',
      },
      backgroundColor: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        pink: '#FFF3EC',
        blue: 'var(--blue)',
        'blue-50': '#E5E8F5',
        'red-1100': '#A80037',
      },
      textColor: {
        blue: 'var(--blue)',
        primary: 'var(--primary)',
        'red-1100': '#A80037',
      },
      fontFamily: {
        avenir: ['"Avenir LT W01_45 Book1475508"'],
        anenirMedium: ['"Avenir LT W01_65 Medium1475532"'],
        anenirHeavy: ['"Avenir LT W01_85 Heavy1475544"'],
      },
      fontSize: {
        '2rem': '2rem',
      },
      height: {
        13: '3.25rem',
      },
      transitionProperty: {
        'max-width': 'max-width',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
