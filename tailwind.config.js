/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obliv: {  // Changé de 'oblivion' à 'obliv' pour correspondre à votre jeu
          dark: '#0a0e23',
          purple: '#6d28d9',
          neon: '#00f7ff',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}