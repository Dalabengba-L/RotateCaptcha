const path = require('path')
const { getEntry, getHtmlWebpackPlugin } = require('./util')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  entry: getEntry('./src/pages/**/app.js'), // js入口
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中公共代码
        common: {
          name: 'common',
          chunks: 'initial',
          test: /[\\/]src[\\/](common|styles)/, // 控制哪些模块被缓存
          minSize: 1, // 压缩前最小模块大小
          priority: 0, // 缓存组打包的先后优先级
          minChunks: 1 // 被引用次数
        }
      }
    },
    runtimeChunk: { name: 'manifest' }
  },
  plugins: [
    ...getHtmlWebpackPlugin('./src/pages/**/*.html'),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ // 单独提取css文件
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css' // splitChunks提取公共css时的命名规则
    }),
    // 进度条
    new ProgressBarPlugin()
    // eslint
    // new ESLintPlugin({
    //   fix: false, /* 自动帮助修复 */
    //   extensions: ['js', 'json', 'coffee', 'vue'],
    //   exclude: 'node_modules'
    // })
  ]
}
