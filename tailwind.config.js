import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      boxShadow: {
        'green-glow': '0 0 15px rgba(0, 255, 0, 0.5)',
        'gray-glow': '0 0 15px rgba(255, 255, 255, 0.5)',
        'red-glow': '0 0 15px rgba(255, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    typography,
    forms,
    aspectRatio,
    require('flowbite/plugin')
  ],
}