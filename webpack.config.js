'use strict';

let webpack = require('webpack');

module.exports = {
  entry:  './src/index.js',
  output: {
    path: './dist',
    filename: 'fixed-navigation.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js/,
        loader: 'eslint-loader',
        include: __dirname + '/src'
      }
    ],
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: __dirname + '/src',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
