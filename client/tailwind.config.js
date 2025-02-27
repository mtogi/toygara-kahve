/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6F4E37",    // Coffee brown
        secondary: "#F5F5F5",  // Light gray
        accent: "#4169E1",     // Royal blue
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'coffee': '0 4px 14px 0 rgba(111, 78, 55, 0.39)',
      },
    },
  },
  plugins: [],
} 