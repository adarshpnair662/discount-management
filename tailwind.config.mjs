/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          lato: ['var(--font-lato)', 'sans-serif'],
        },
        colors: {
          primary: '#30bbd9',
          secondary:  '#EDF6FB',
        },
      },
    },
    plugins: [],
  };