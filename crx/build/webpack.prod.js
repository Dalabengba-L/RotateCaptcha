const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const CopyPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const prodConfig = {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }]
    }),

    new ZipPlugin({
      filename: 'dist.zip',
      // path: path.join(__dirname, '../../../portal/public/extension')
      path: path.join(__dirname, '../')
    })
  ],
  optimization: {
    runtimeChunk: false,
    minimize: true, // 默认最优配置：生产环境，压缩 true。开发环境，不压缩 false
    minimizer: [
      '...'
    ]
    // runtimeChunk: { name: 'runtime' } // 运行时代码
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

module.exports = merge(baseConfig, prodConfig)
