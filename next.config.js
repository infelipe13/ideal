const withPrefresh = require('@prefresh/next');

const config = {
  env: {
    MAGIC_PUBLISHABLE_KEY: process.env.MAGIC_PUBLISHABLE_KEY,
    MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
  webpack(config, { dev, isServer }) {
    const { splitChunks } = config.optimization;

    if (splitChunks) {
      const { cacheGroups } = splitChunks;
      const preactModules = /[\\/]node_modules[\\/](preact|preact-context-provider|preact-render-to-string)[\\/]/;

      if (cacheGroups.framework) {
        cacheGroups.commons.name = 'framework';
        cacheGroups.preact = { ...cacheGroups.framework, test: preactModules };
      } else {
        cacheGroups.preact = {
          chunks: 'all',
          name: 'commons',
          test: preactModules,
        };
      }
    }

    const aliases = config.resolve.alias || (config.resolve.alias = {});
    aliases.react = aliases['react-dom'] = 'preact/compat';

    if (dev && !isServer) {
      const entry = config.entry;

      config.entry = () =>
        entry().then((entries) => {
          entries['main.js'] = ['preact/debug'].concat(
            entries['main.js'] || []
          );

          return entries;
        });
    }

    return config;
  },
};

module.exports = withPrefresh(config);
