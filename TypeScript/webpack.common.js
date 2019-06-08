const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devNode = process.env.NODE_ENV !=='production';

module.exports = {
    entry: {
        app: './src/index.ts'
    },
    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '转换TS为JS输出',
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devNode?'[name].css':'[name].[hash].css',
            chunkFilename: devNode?'[id].css': '[id].[hash].css'
        }),
        // new OptimizeCssAssetsPlugin()
    ]
}