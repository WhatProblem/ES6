const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                                ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                                ['@babel/plugin-transform-runtime'],
                                ['@babel/plugin-syntax-dynamic-import']
                            ]
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                // exclude: /node_modules/,
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.(css|less)$/,
                use: [
                    process.env.NODE_ENV === 'production' ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../' }
                    } : ('style-loader', 'vue-style-loader'),
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50 * 1024,
                        outputPath: 'img/'
                    }
                }
            }
        ]
    },
    resolve: {
        // modules: [path.resolve('node_modules')],
        extensions: ['.vue', '.js', '.css', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: true
            }
        })
    ]
}
