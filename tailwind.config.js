/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0056D2', // Coursera primary blue
          600: '#004bbf',
          700: '#003d99',
          800: '#002f73',
          900: '#00204d',
        },
        secondary: {
          500: '#113B92', // Coursera dark blue
        },
        accent: {
          500: '#0C8BD0', // Coursera teal
        },
        success: {
          500: '#00897B',
        },
        warning: {
          500: '#FFC107',
        },
        error: {
          500: '#D32F2F',
        },
        neutral: {
          50: '#f7f9fa',
          100: '#e9ebed',
          200: '#d5dade',
          300: '#b7c0c6',
          400: '#8c9aa3',
          500: '#6e7a83',
          600: '#586167',
          700: '#454c50',
          800: '#2f3438',
          900: '#1c1f21',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 2px 5px 0 rgba(0, 0, 0, 0.08)',
        'card-hover': '0 6px 12px 0 rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
};