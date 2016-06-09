'use strict';

let webpack = require('webpack');

module.exports = {
  entry:  './src/fixed-navigation.js',
  output: {
    path: './dist',
    filename: 'fixed-navigation.js'
  },
  module: {
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
