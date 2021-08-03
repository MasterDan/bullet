/* eslint-disable @typescript-eslint/no-var-requires */
const Config = require('webpack-chain');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = new Config();

webpack
  .entry('index')
  .add('./src/index.ts')
  .end()
  .output.path(path.join(__dirname, 'dist', 'js'))
  .filename('[name].[fullhash].js');
webpack.resolve.alias.set('@', './src').end().extensions.add('.js').add('.ts');

webpack.devServer
  .contentBase(path.join(__dirname, 'dist'))
  .compress(true)
  .port(9000);

webpack.devtool('source-map');

webpack.module
  .rule('javascript')
  .test(/\.jsx?$/)
  .exclude.add('/node_modules/')
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: ['@babel/preset-env']
  });

webpack.module
  .rule('typescript')
  .test(/\.tsx?$/)
  .exclude.add('/node_modules/')
  .end()
  .use('typescript')
  .loader('ts-loader');

webpack.plugin('clean').use(CleanWebpackPlugin);
webpack.plugin('html').use(HtmlWebpackPlugin, [
  {
    template: 'public/index.html',
    filename: '../index.html'
  }
]);

module.exports = webpack.toConfig();
