module.exports = {
  content: [
    './src/*.html',
    './components/*.tsx',
    './src/*.html.ejs',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.js',
  ],
  theme: {
    minWidth: {
      20: '2.5rem',
      30: '5rem',
      40: '10rem',
      60: '15rem',
      80: '20rem',
      100: '25rem',
    },
    maxWidth: {
      120: '30rem',
      160: '40rem',
      200: '50rem',
    },
  },
  variants: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'forest',
      'dark',
      'light',
      'bumblebee',
      'emerald',
      'synthwave',
      'retro',
      'valentine',
      'lofi',
      'pastel',
      'wireframe',
      'luxury',
      'dracula',
    ],
  },
};
