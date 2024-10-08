/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'gray-900': '#131515',
        'gray-800': '#1f1f28',
        'gray-700': '#2c2c34',
        'gray-300': '#dcd7ba',
        'indigo-400': '#7e9cd8',
        'indigo-600': '#957fb8',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}
