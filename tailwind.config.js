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
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: 'orange',
          secondary: 'yellow',
          accent: '#37cdbe',
          neutral: 'black',
          'base-100': 'white',
        },
      },
      'dark',
      'cupcake',
    ],
  },
};
