/*
    ./webpack.config.js
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('node-env-file');
const webpack = require('webpack');

env(path.resolve(__dirname, '/.env'));

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'News App',
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
          publicPath: '/dist',
        }),
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              query: {
                name: 'assets/[name].[ext]',
              },
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
              },
            },
          }],
      },

    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: 'errors-only',
    open: true,
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        KEY: JSON.stringify(process.env.KEY),
        ID: JSON.stringify(process.env.ID),
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
};
