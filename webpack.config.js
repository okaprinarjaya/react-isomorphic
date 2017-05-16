const webpack = require('webpack');
const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const theWebpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./src/webpack-isomorphic-tools-options'));

module.exports = {
  entry: path.join(__dirname, 'src', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    theWebpackIsomorphicToolsPlugin.development()
  ]
};
