const express = require('express');
const app = express();

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compiler = webpack(require('../webpack.config'));

app.use(webpackDevMiddleware(compiler, {
  headers: {'Access-Control-Allow-Origin': '*'},
  noInfo: true,
  publicPath: 'http://localhost:3500/assets/static/'
}));

app.use(webpackHotMiddleware(compiler));

app.listen(3500, () => {
  console.log('Hot server started at port %d', 3500);
});
