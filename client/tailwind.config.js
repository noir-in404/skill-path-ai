/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf6f2',
          100: '#faeae1',
          200: '#f4d2c1',
          300: '#ecb197',
          400: '#df8967',
          500: '#c85a32', // terracotta primary
          600: '#b84924',
          700: '#99391d',
          800: '#7c311c',
          900: '#662b1a',
        },
        slateaccent: {
          50: '#f2f6fa',
          100: '#e1ecf5',
          200: '#c7dceb',
          300: '#9fc2dc',
          400: '#6fa1c8',
          500: '#4881b2',
          600: '#346797',
          700: '#2c537b',
          800: '#274667',
          900: '#233c56', // deep slate blue
        },
        olive: {
          50: '#f4f6f3',
          100: '#e5ece2',
          200: '#cedbc8',
          300: '#abc2a3',
          400: '#83a37a',
          500: '#5f8255',
          600: '#4a6742',
          700: '#3a5135',
          800: '#30422c',
          900: '#293726',
        },
        surface: {
          DEFAULT: '#fbf9f6',
          secondary: '#f4f1eb',
          tertiary: '#eae6de',
        },
        charcoal: {
          DEFAULT: '#1c1f23',
          heading: '#14171a',
          muted: '#636b74',
          border: '#e4e1db',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 2px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
