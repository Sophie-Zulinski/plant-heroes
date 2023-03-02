/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../public/images/pic07.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    function ({ addBase, theme, addComponents }) {
      addBase({
        h1: { fontSize: theme('fontSize.3xl') },
        h2: { fontSize: theme('fontSize.xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl'),
        },
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
          primary: '#94849B',
          secondary: '#7E9181',
          accent: '#37cdbe',
          neutral: 'black',
          'base-100': 'white',
        },
      },
    ],
  },
};
