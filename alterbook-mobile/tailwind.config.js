const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-1': '#1E2022',
        'accent-2': '#0E0E0E',
        'accent-3': '#E8EAED',
        'accent-4': '#27C52C',
      },
      fontFamily: {
        'inconsolata-regular': 'Inconsolata-Regular',
        'inconsolata-light': 'Inconsolata-Light',
        'inconsolata-medium': 'Inconsolata-Medium',
        'inconsolata-semibold': 'Inconsolata-SemiBold',
        'inconsolata-bold': 'Inconsolata-Bold',
        'inconsolata-black': 'Inconsolata-Black',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        'border-line-top': {
          borderTopWidth: 1,
          borderColor: '#2E3032',
        },
        'border-line-bottom': {
          borderBottomWidth: 1,
          borderColor: '#2E3032',
        },
        'text-regular': {
          fontFamily: 'Inconsolata-Regular',
          color: '#E8EAED',
        },
        'text-light': {
          fontFamily: 'Inconsolata-Light',
          color: '#E8EAED',
        },
        'text-medium': {
          fontFamily: 'Inconsolata-Medium',
          color: '#E8EAED',
        },
        'text-semibold': {
          fontFamily: 'Inconsolata-SemiBold',
          color: '#E8EAED',
        },
        'text-bold': {
          fontFamily: 'Inconsolata-Bold',
          color: '#E8EAED',
        },
        'text-black': {
          fontFamily: 'Inconsolata-Black',
          color: '#E8EAED',
        },
      });
    }),
  ],
};
