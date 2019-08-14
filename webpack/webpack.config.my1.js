// webpack 是node写出来的 node写法

/* 多页应用配置 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', // 模式 默认production 另一种development
    entry: { // 多页应用多个入口
        index1: './src/index1.js',
        other1: './src/other1.js'
    }, // 打包入口文件
    output: {
        filename: '[name].js', // 打包后的文件名index1.js, other1.js
        path: path.resolve(__dirname, 'multiPage'), // 路径必须是一个绝对路径， 打包后的路径
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index1.html', // html模板来源
            filename: 'index1.html', // 输出后的html模板名称
            chunks: ['index1'], // 对应入口的js输出后的文件名，对应的输出到html模板
        }),
        new HtmlWebpackPlugin({
            template: './src/index1.html',
            filename: 'other1.html',
            chunks: ['index1', 'other1']
        })
    ]
}