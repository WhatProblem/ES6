/* webpack自带的打包优化设置 */
// import 在生产环境下会自动进行tree-sharking删除没有用到的代码
// es6模块会把结果放到default上
// require语法没有tree-sharking效果

// scope hosting // webpack中自动省略可以简化的代码，例如let a=1;let b=2;let c=a+b;

// 多页应用时抽离公共代码
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // mode: 'development',
    optimization: {
        splitChunks: {// 分割公共代码块
            cacheGroups: { // 缓存组，想要缓存的一些要抽离的代码
                common: { // 公共的模块
                    chunks: 'initial', // 从代码入口处开始抽离
                    minSize: 0, // 抽离的代码的最小大小
                    minChunks: 2, // 抽离的代码的最小引用次数
                },
                vendor: {
                    priority: 1, // 提高权重，优先打包以来，防止common中有引入直接打包到了common,不在运行该步骤，这样有效充分分离公共代码
                    test: /node_modules/, // 把从node_modules中引入的依赖包抽离出来
                    chunks: 'initial', // 从代码入口处开始抽离
                    minSize: 0, // 抽离的代码的最小大小
                    minChunks: 2, // 抽离的代码的最小引用次数
                }
            }
        }
    },
    entry: {
        index: './src1/index.js',
        other: './src1/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: 'dist'
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
                                '@babel/preset-react'
                            ],
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 打包的时候忽略moment库的locale依赖，提升打包速度，减少打包体积
        new HtmlWebpackPlugin({
            template: './src1/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin()
    ]
}