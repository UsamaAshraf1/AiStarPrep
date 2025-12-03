/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfPro: ["'SFProDisplay'", "sans-serif"], // Map to your custom font
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

