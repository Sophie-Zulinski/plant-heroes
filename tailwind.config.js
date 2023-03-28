/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    backgroundImage: {
      hero: "url('../public/images/pic07.jpg')",
    },
    extend: {
      fontFamily: {
        marcellus: ['"Marcellus"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('daisyui'),

    function ({ addBase, theme, addComponents }) {
      addBase({
        h1: { fontSize: theme('fontSize.3xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
      addComponents({
        button: {
          backgroundColor: theme('colors.primary'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.3'),
          boxShadow: theme('boxShadow.xl'),
        },
        input: {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.3'),
          boxShadow: theme('boxShadow.xl'),
        },
        select: {
          backgroundColor: theme('colors.white'),
          borderColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.5.5'),

          boxShadow: theme('boxShadow.xl'),
        },
        textarea: {
          backgroundColor: theme('colors.white'),
          borderColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.3'),
          boxShadow: theme('boxShadow.xl'),
        },
      });
    },
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#b5ba9e',
          secondary: '#de967d',
          accent: '#37cdbe',
          neutral: '#f6f4ec',
          'base-100': 'white',
        },
      },
    ],
  },
};
