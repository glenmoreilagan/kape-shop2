/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FAFAFA',
          blue: '#1d4ed8',
          darkblue: '#1e3a8a',
          gray: '#334155',
          darkgray: '#1e293b',
          brown: '#977669',
          darkbrown: '#846358',
          yellow: '#FFEDBC',
        },
      },
    },
  },
  plugins: [],
}
