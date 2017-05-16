const webpack = require('webpack');
const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const theWebpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./src/webpack-isomorphic-tools-options'));

const APP_BASE = path.normalize(path.join(__dirname, '..'));
const BUILD_DIR = path.join(APP_BASE, 'build');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    ['judo-heroes']: [
      'webpack-hot-middleware/client?path=http://localhost:3500/__webpack_hmr',
      './app-client.js'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://localhost:3500/assets/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2', 'react-hmre']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    theWebpackIsomorphicToolsPlugin.development()
  ]
};
