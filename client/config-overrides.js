const webpack = require("webpack");

function webpackOverride(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    fs: require.resolve("browserify-fs"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
}

function jestOverride(config) {
  config.transformIgnorePatterns = ["node_modules/(?!(axios)/)"];
  return config;
}

module.exports = {
  webpack: webpackOverride,
  jest: jestOverride,
};