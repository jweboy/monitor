/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": false}] */
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const http = require('http');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
const app = express();
const server = http.Server(app);

app.use(webpackDevMiddleware(compiler, {
  reload: true,
}));

app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
}));

server.listen(8887, () => {
  console.log('Server is running on 8887.');
});
