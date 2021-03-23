module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			container: {
				center: true,
				padding: '20px',
			},
			borderColor: {
				secondary: 'var(--secondary)',
			},
			backgroundColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
			},
			fontFamily: {
				DEFAULT: ['"Avenir LT W01_45 Book1475508"'],
				anenirMedium: ['"Avenir LT W01_65 Medium1475532"'],
				anenirHeavy: ['"Avenir LT W01_85 Heavy1475544"'],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
