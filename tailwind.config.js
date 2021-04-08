module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './util/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			container: {
				center: true,
				padding: '20px',
			},
			borderColor: {
				secondary: 'var(--secondary)',
				blue: 'var(--blue)',
				'black-100': '#767676',
				primary: 'var(--primary)',
				pink: '#FAE9E2',
			},
			backgroundColor: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				pink: '#FAE9E2',
				blue: 'var(--blue)',
			},
			textColor: {
				blue: 'var(--blue)',
				primary: 'var(--primary)',
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
