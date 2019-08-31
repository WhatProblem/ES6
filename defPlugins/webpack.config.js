const path = require('path')
const DonePlugin = require('./plugins/DonePlugin.js')
const AsyncPlugin = require('./plugins/AsyncPlugin.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./plugins/FileListPlugin.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InlineSourcePlugin = require('./plugins/InlineSourcePlugin.js')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // new DonePlugin(),
        // new AsyncPlugin()
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new FileListPlugin({
            filename: 'list.md'
        }),
        new InlineSourcePlugin({
            match: /\.(js|css)/,
        })
    ]
}