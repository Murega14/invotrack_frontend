/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          winky: ['var(--font-winky)'],
        },
        animation: {
          typing: 'typing 2s steps(9) infinite, blink 0.75s step-end infinite'
        },
        keyframes: {
          typing: {
            '0%': { width: '0%' },
            '100%': { width: '100%' }
          },
          blink: {
            '0%, 100%': { 'border-color': 'transparent' },
            '50%': { 'border-color': 'white' }
          }
        }
      }
    },
    plugins: [],
  }