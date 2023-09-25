/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ["light","black","dark"],
	darkTheme: "black",

  },
  darkMode: 'class',
  plugins: [require('daisyui'), require('@tailwindcss/container-queries')]
};
