module.exports = {
  moduleNameMapper: {
    '^react$': 'preact/compat',
    '^react-dom$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    'src/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['/.next/', '/node_modules/'],
  transform: { '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest' },
  transformIgnorePatterns: ['/node_modules/'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
