const path = require('path');

const { colors, fontFamily, fontSize, margin, spacing } = require(path.join(
  __dirname,
  'tailwind/theme'
));

module.exports = {
  plugins: [require('@tailwindcss/ui')],
  purge: {
    content: ['src/**/*.tsx'],
    enabled: process.env.NODE_ENV === 'production',
  },
  theme: { extend: { colors, fontFamily, fontSize, margin, spacing } },
};
