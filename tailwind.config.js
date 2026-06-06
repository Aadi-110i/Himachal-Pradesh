/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F5',
          dark: '#F2EFE9',
        },
        maroon: {
          DEFAULT: '#6B4C4C',
          light: '#8B6B6B',
          dark: '#4A3333',
        },
        dusty: {
          pink: '#D4B8B8',
        },
        deep: {
          brown: '#2C1A1A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}