/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans TC', 'sans-serif']
      },
      colors: {
        primary: '#38470B',
        secondary: '#949C7C'
      },
    },
    plugins: [],
  },
  important: true,
}