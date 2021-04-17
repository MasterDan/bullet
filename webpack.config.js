/* eslint-disable @typescript-eslint/no-var-requires */
const Config = require('webpack-chain');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const config = new Config();

config
  .entry('index')
  .add('./src/index.ts')
  .end()
  .output.path(path.join(__dirname, 'dist','js'))
  .filename('[name].[fullhash].js');
config.resolve.alias.set('@','./src')

config.devServer
  .contentBase(path.join(__dirname, 'dist'))
  .compress(true)
  .port(9000);
  
config.devtool('source-map');

config.module
  .rule('javascript')
  .test(/\.jsx?$/)
  .exclude.add('/node_modules/')
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: ['@babel/preset-env']
  });

config.module
  .rule('typescript')
  .test(/\.tsx?$/)
  .exclude.add('/node_modules/')
  .end()
  .use('typescript')
  .loader('ts-loader');

config.plugin('clean').use(CleanWebpackPlugin);
config.plugin('html').use(HtmlWebpackPlugin,[{
  template: 'public/index.html',
  filename: '../index.html'
}]);

module.exports = config.toConfig();
