const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const path = require('path')

function getEntry(globPath) {
  const files = glob.sync(globPath)
  const entries = {}
  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop()
    entries[entryName] = [entry]
  })
  return entries
}
function getHtmlWebpackPlugin(globPath) {
  const files = glob.sync(globPath)
  const htmlArr = []
  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop()
    htmlArr.push(new HtmlWebpackPlugin(
      {
        template: entry,
        filename: entryName + '.html',
        chunks: [entryName, 'common'], // common和vendor是splitChunks抽取的公共文件 manifest是运行时代码
        minify: {
          removeComments: false,
          collapseWhitespace: false,
          removeAttributeQuotes: false,
          // 压缩html中的js
          minifyJS: false,
          // 压缩html中的css
          minifyCSS: false
        }
      }
    ))
  })
  return htmlArr
}

module.exports = {
  getEntry,
  getHtmlWebpackPlugin
}
