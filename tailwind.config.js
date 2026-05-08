/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        darkBg: '#0f172a',
        cardBg: '#1e293b',
        primary: '#3b82f6',
        secondary: '#38bdf8'
      }
    }
  },
  plugins:[],
}