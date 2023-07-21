/** @type {import('tailwindcss').Config} */

import theme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: '0.75rem',
        center: true,
      },
      colors: {
        primary: colors.teal,
        secondary: colors.yellow,
        accent: colors.lime,
        heading: '#27272D',
      },
      borderRadius: {
        primary: theme.borderRadius['2xl'],
      },
      fontFamily: {
        head: ['Monsterrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

