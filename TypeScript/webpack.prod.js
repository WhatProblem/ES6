const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map', // 方便定位到问题点测试调试
    optimization: { // 提取公共模块
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
})