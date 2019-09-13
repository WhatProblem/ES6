const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
let common = require('./webpack.common.js')

process.env.NODE_ENV = 'development'

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        clientLogLevel: 'warning', // 去除开发模式下的更新文件提示日志
        overlay: {
            warnings: false,
            errors: true
        },
        watchOptions: {
            poll: false,
        },
        port: 3000,
        progress: true,
        contentBase: './dist',
        historyApiFallback: true, // 支持H5的history模式
        open: false,
        hot: true,
        proxy: {
            '/api': {

            }
        }
    },
    devtool: 'source-map', // 设置日志的映射，方便定位
    plugins: [
        new webpack.DefinePlugin({ DEV: JSON.stringify('dev') }), // 暴露全局的开发字段DEV
        // new webpack.NamedChunksPlugin(), // 打印热更新的模块路径
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
    ]
})