process.env.NODE_ENV = 'production'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css用link标签插入到html文件
const OptMizeCss = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js,不使用的话导致js不压缩
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除打包文件夹插件
const merge = require('webpack-merge')
let common = require('./webpack.common.js')

process.env.NODE_ENV = 'production'

module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    optimization: {
        minimizer: [
            new OptMizeCss(),
            new UglifyJsPlugin({
                uglifyOptions: { // 删除打包日志
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({ DEV: JSON.stringify('prod') }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new CleanWebpackPlugin()
    ]
})