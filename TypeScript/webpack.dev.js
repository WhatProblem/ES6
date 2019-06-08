const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map', // 开发环境
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 9000
    },
});