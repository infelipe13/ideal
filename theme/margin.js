const spacing = require('./spacing');

const negativeMargins = Object.keys(spacing).reduce((acc, key) => {
  if (key === 'x0') {
    return acc;
  }

  return {
    ...acc,
    [`-${key}`]: `-${spacing[key]}`,
  };
}, {});

module.exports = {
  ...negativeMargins,
  ...spacing,
  auto: 'auto',
};
