const SentryPlugin = require('@sentry/webpack-plugin');
const withPrefresh = require('@prefresh/next');
const withSourceMaps = require('@zeit/next-source-maps')();

const {
  NEXT_PUBLIC_SENTRY_DSN,
  SENTRY_AUTH_TOKEN,
  SENTRY_ORG,
  SENTRY_PROJECT,
} = process.env;

process.env.SENTRY_DSN = NEXT_PUBLIC_SENTRY_DSN;

const config = {
  webpack: (config, { buildId, dev, isServer }) => {
    const { splitChunks } = config.optimization;

    if (splitChunks) {
      const { cacheGroups } = splitChunks;
      const test = /[\\/]node_modules[\\/](preact|preact-context-provider|preact-render-to-string)[\\/]/;

      if (cacheGroups.framework) {
        cacheGroups.commons.name = 'framework';
        cacheGroups.preact = { ...cacheGroups.framework, test };
      } else {
        cacheGroups.preact = { chunks: 'all', name: 'commons', test };
      }
    }

    const aliases = config.resolve.alias || (config.resolve.alias = {});
    aliases.react = aliases['react-dom'] = 'preact/compat';

    if (dev && !isServer) {
      const entry = config.entry;

      config.entry = () => {
        entry().then((entries) => {
          entries['main.js'] = ['preact/debug'].concat(
            entries['main.js'] || []
          );

          return entries;
        });
      };
    }

    // if (!isServer) {
    //   config.resolve.alias['@sentry/node'] = '@sentry/browser';
    // }

    if (
      // // Upload sourcemap during production build.
      !dev &&
      NEXT_PUBLIC_SENTRY_DSN &&
      SENTRY_AUTH_TOKEN &&
      SENTRY_ORG &&
      SENTRY_PROJECT
    ) {
      config.plugins.push(
        new SentryPlugin({
          include: '.next',
          release: buildId,
          urlPrefix: '~/_next',
        })
      );
    }

    return config;
  },
};

module.exports = withSourceMaps(withPrefresh(config));
