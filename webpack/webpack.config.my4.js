/* 页面懒加载 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src2/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
        open: false,
        contentBase: 'dist',
        hot: true, // 开启热更新
    },
    module: {
        noParse: /jquery/, // 不去解析jquery中的依赖库，因为我们已知jquery是独立的库，不会依赖其他项目，减少解析jquery时间
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('src1'),
                use: [
                    {
                        loader: 'babel-loader', options: {
                            presets: [
                                '@babel/preset-env', // es6=>es5
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ['@babel/plugin-syntax-dynamic-import'], // 实现懒加载配置插件（动态import()导入语法）
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 打包的时候忽略moment库的locale依赖，提升打包速度，减少打包体积
        new HtmlWebpackPlugin({
            template: './src2/index.html',
            filename: 'index.html'
        }),
        new webpack.NamedChunksPlugin(), // 打印热更新的模块路径
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        // new CleanWebpackPlugin()
    ]
}