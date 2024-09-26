/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(67 56 202)',
				secondary: '#E1E1E6',
			},
			backgroundColor: {
				primary: 'rgb(67 56 202)',
			},
			fontFamily: {
				bold: 'Inter_700Bold',
				medium: 'Inter_500Medium',
				regular: 'Inter_400Regular',
			},
		},
	},
	plugins: [],
}
