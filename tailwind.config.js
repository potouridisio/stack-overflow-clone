import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/main.ts',
    './questions/index.html',
    './questions/questions.ts',
    './tags/index.html',
    './tags/tags.ts',
    './users/index.html',
    './users/users.ts',
    './utils.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
