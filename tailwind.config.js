/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F2854',
        secondary: '#1C4D8D',
        accent: '#4988C4',
        background: '#F4F4F4',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'title': '18px',
        'body': '16px',
        'helper': '14px',
      },
    },
  },
  plugins: [],
}