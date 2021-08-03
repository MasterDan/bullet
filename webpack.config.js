/* eslint-disable @typescript-eslint/no-var-requires */
const Config = require('webpack-chain');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const confBuilder = new Config();

confBuilder
  .entry('index')
  .add('./src/index.ts')
  .end()
  .output.path(path.join(__dirname, 'dist', 'js'))
  .filename('[name].[fullhash].js');
confBuilder.resolve.alias.set('@', './src');

confBuilder.devServer
  .contentBase(path.join(__dirname, 'dist'))
  .compress(true)
  .port(9000);

confBuilder.devtool('source-map');

confBuilder.module
  .rule('javascript')
  .test(/\.jsx?$/)
  .exclude.add('/node_modules/')
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: ['@babel/preset-env']
  });

confBuilder.module
  .rule('typescript')
  .test(/\.tsx?$/)
  .exclude.add('/node_modules/')
  .end()
  .use('typescript')
  .loader('ts-loader');

confBuilder.plugin('clean').use(CleanWebpackPlugin);
confBuilder.plugin('html').use(HtmlWebpackPlugin, [
  {
    template: 'public/index.html',
    filename: '../index.html'
  }
]);

module.exports = confBuilder.toConfig();
