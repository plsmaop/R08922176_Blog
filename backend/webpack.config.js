var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: "production",
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname),
    ],
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
  target: 'node',
};
