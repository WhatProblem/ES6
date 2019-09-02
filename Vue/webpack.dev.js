const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
let common = require('./webpack.common.js')

process.env.NODE_ENV = 'development'

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        clientLogLevel: 'warning',
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
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({ DEV: JSON.stringify('dev') }),
        // new webpack.NamedChunksPlugin(), // 打印热更新的模块路径
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
    ]
})