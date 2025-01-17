/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5757',
        secondary: '#1f2b5b'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}