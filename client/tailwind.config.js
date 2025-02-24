// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorPrimary: '#008080',   
        colorAccent: '#F5F5DC',    
        colorBackground: '#E0F7FA', 
        colorDarkGray: '#2C3E50',   
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
