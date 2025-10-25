/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Цветовая схема как в примере lain-loft.ru
        primary: '#1a365d',    // Темно-синий
        accent: '#e53e3e',     // Красный/оранжевый для акцентов
        light: '#f7fafc',      // Светло-серый фон
        dark: '#2d3748',       // Темный текст
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}