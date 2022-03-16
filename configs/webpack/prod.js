// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./common');

module.exports = (env) => {
  return merge(commonConfig(env.production), {
    mode: 'production',
    entry: './main.tsx',
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: 4,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin({
          parallel: 4,
        }),
      ],
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        // Duplicate packaging problem
        cacheGroups: {
          vendors: {
            // node_ Code in modules
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            // Name: 'vendors', do not define a fixed name
            priority: 10, // priority
            enforce: true,
          },
        },
      },
      runtimeChunk: true,
      moduleIds: 'deterministic',
    },
    output: {
      filename: 'js/bundle.[contenthash].min.js',
      path: resolve(__dirname, '../../dist'),
      publicPath: '/',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[hash].[name].css',
      }),
    ],
    devtool: 'source-map',
    // plugins: [new BundleAnalyzerPlugin()],
  });
};
