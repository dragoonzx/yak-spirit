// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (prod = false) => {
  return {
    resolve: {
      alias: {
        '~': resolve(__dirname, '../../src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallback: {
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        http: require.resolve('stream-http'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      },
    },
    context: resolve(__dirname, '../../src'),
    module: {
      rules: [
        {
          test: [/\.jsx?$/, /\.tsx?$/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                envName: !prod ? 'development' : 'production',
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|svg|mp4)$/i,
          use: [
            'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
            'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ filename: './index.html', template: '../public/index.html' }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    performance: {
      hints: false,
    },
  };
};
