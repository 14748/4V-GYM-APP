/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-ring': '#D15B5B',
        'custom-strong-grey': '#D9D9D9',
      },
    },
  },
  plugins: [],
}

