/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        expand: 'expand 500ms',
      },
      keyframes: {
        expand: {
          '0%': {transform: 'scale(0.8)'},
          '100%': {transform: 'scale(1)'}
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
