const Config = require('webpack-chain');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const config = new Config();

config
  .entry('index')
  .add('./src/index.ts')
  .end()
  .output.path(path.join(__dirname, 'dist'))
  .filename('[name].[fullhash].js');

// config.resolve.extensions
//     .add('.ts')
//     .add('.js');

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

module.exports = config.toConfig();
