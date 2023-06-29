/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        colors: {
          'French-Puce': '#0E6E97',
          'Crayola': '#F6C76C',
          'gray-light': '#CCCCCC',
          'gray-dark': '#808080'
        },
    },
  },
  plugins: [],
}
