/*require('babel-register')({
  presets: [ 'es2015', 'react', 'stage-2' ],
  ignore: /\/(build|node_modules)\//
});*/

require('babel-register')({
  ignore: /\/(build|node_modules)\//
});

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const rootDir = require('path').resolve(__dirname, '..');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-options'))
  .server(rootDir, () => {
    require('./frontend');
  })
