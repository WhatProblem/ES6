const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const OptMizeCss = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js,不使用的话导致js不压缩
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production', // 模式
    devtool: 'cheap-module-source-map',
    optimization: { // 压缩优化，自动压缩css，UglifyJsPlugin必须设置，否者js不压缩
        minimizer: [
            new OptMizeCss(),
            new UglifyJsPlugin({
                cache: true, // 使用缓存
                parallel: true, // 并行，同时压缩多个
                sourceMap: true, // 打包后es6映射为es5
            })
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'doc', to: './webapck' }]), // 打包时拷贝文件到指定文件夹
        new webpack.DefinePlugin({ DEV: JSON.stringify('prod') }), // 暴露webpack执行时的运行环境，dev/prod，方便配置api的url
    ]
})