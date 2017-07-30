require('babel-register')({
  ignore: /\/(build|node_modules)\//
});


const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const rootDir = require('path').resolve(__dirname, '..');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-options'))
  .server(rootDir, () => {
    require('./frontend');
  });
