module.exports = {
  content: [
    './src/*.html',
    './components/*.tsx',
    './src/*.html.ejs',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.js',
    './node_modules/@yak-spirit/yak-swap-ui/**/*.js',
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
      140: '35rem',
      160: '40rem',
      200: '50rem',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2.5rem',
        lg: 0,
      },
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
    function ({ addComponents }) {
      // sm
      // => @media (min-width: 640px) { ... }
      // md
      // => @media (min-width: 768px) { ... }
      // lg
      // => @media (min-width: 1024px) { ... }
      // xl
      // => @media (min-width: 1280px) { ... }
      // 2xl
      // => @media (min-width: 1536px) { ... }
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '100%',
          },
          '@screen md': {
            maxWidth: '100%',
          },
          '@screen lg': {
            maxWidth: '980px',
          },
          '@screen xl': {
            maxWidth: '1240px',
          },
          '@screen 2xl': {
            maxWidth: '1300px',
          },
        },
        '.container-wide': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '100%',
          },
          '@screen md': {
            maxWidth: '100%',
          },
          '@screen lg': {
            maxWidth: '1060px',
          },
          '@screen xl': {
            maxWidth: '1320px',
          },
          '@screen 2xl': {
            maxWidth: '1380px',
          },
        },
      });
    },
  ],
  daisyui: {
    themes: [
      {
        forest: {
          ...require('daisyui/src/colors/themes')['[data-theme=forest]'],
          primary: '#3CE17D',
          'base-content': 'hsl(0 4% 100%)',
        },
      },
      // 'dark',
      // 'light',
      // 'bumblebee',
      // 'emerald',
      // 'synthwave',
      // 'valentine',
      // 'lofi',
      // 'pastel',
      // 'wireframe',
      // 'luxury',
      // 'dracula',
    ],
  },
};
