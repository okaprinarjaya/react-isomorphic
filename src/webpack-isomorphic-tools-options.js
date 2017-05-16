const webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const path = require('path')

const APP_BASE = path.normalize(path.join(__dirname, '..'));
const BUILD_DIR = path.join(APP_BASE, 'build');

module.exports = {
  assets: {
    images: {
      extensions: ['gif', 'jpg', 'png', 'ico'],
      parser: webpackIsomorphicToolsPlugin.url_loader_parser
    }
  },
  webpack_assets_file_path: `${BUILD_DIR}/webpack-assets.json`
}
