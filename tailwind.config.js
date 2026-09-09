/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bubble: {
          pink: '#FF6B8B',
          yellow: '#FFD166',
          green: '#06D6A0',
          blue: '#118AB2',
          purple: '#8338EC',
          orange: '#FF9F1C'
        }
      },
      fontFamily: {
        comic: ['"Comic Sans MS"', '"Quicksand"', 'ui-rounded', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
