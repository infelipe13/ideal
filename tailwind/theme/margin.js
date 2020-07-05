const path = require('path');

const spacing = require(path.join(__dirname, 'spacing'));

const negativeMargins = Object.keys(spacing).reduce((acc, key) => {
  if (key === 'x0') {
    return acc;
  }

  return { ...acc, [`-${key}`]: `-${spacing[key]}` };
}, {});

module.exports = { ...negativeMargins, ...spacing };
