const withPrefresh = require('@prefresh/next');

const config = {
  webpack: (config, { dev, isServer }) => {
    const { splitChunks } = config.optimization;

    if (splitChunks) {
      const { cacheGroups } = splitChunks;
      const test = /[\\/]node_modules[\\/](preact|preact-context-provider|preact-render-to-string)[\\/]/;

      if (cacheGroups.framework) {
        cacheGroups.commons.name = 'framework';
        cacheGroups.preact = { ...cacheGroups.framework, test };
      } else cacheGroups.preact = { chunks: 'all', name: 'commons', test };
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
