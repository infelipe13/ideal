const path = require('path');

module.exports = {
  colors: require(path.join(__dirname, 'colors')),
  fontFamily: require(path.join(__dirname, 'fontFamily')),
  fontSize: require(path.join(__dirname, 'fontSize')),
  margin: require(path.join(__dirname, 'margin')),
  spacing: require(path.join(__dirname, 'spacing')),
};
