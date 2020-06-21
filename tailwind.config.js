const defaultTheme = require('tailwindcss/defaultTheme');

const { colors, fontSize, margin, spacing } = require('./src/tailwind/theme');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [require('@tailwindcss/ui')({ layout: 'sidebar' })],
  purge: {
    content: ['./src/**/*.tsx'],
    enabled: IS_PRODUCTION,
  },
  theme: {
    extend: {
      colors,
      fontFamily: { sans: ['Inter var', ...defaultTheme.fontFamily.sans] },
      fontSize,
      margin,
      spacing,
    },
  },
};
