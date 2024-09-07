const path = require('path');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
    util: require.resolve("util/"),
  };

  return config;
};
