/**
 * @author charlie
 * @Description:
 * webpack打包环境基础构建
 */
'use strict'
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const config = require('./config.js')
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const devConfig = {
  stats: 'errors-only', // 不展示打包信息
  cache: {
    type: 'filesystem'
  },
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devServer: {
    hot: false,
    client: {
      logging: 'none',
      progress: true
    },
    liveReload: true,
    open: false,
    port: 1002,
    compress: true
  }
}
module.exports = new Promise((reslove, reject) => {
  portfinder.basePort = config.dev.port
  portfinder.getPort((err, port) => {
    reslove(devConfig)
  })
})
module.exports = merge(baseConfig, devConfig)
