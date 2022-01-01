// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = require('./common');

module.exports = (env) => {
  return merge(commonConfig(env.production), {
    mode: 'production',
    entry: './main.tsx',
    output: {
      filename: 'js/bundle.[contenthash].min.js',
      path: resolve(__dirname, '../../dist'),
      publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [],
  });
};
