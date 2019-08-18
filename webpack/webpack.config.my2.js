/* webpack使用Happypack打包优化设置 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Happypack = require('happypack') // 实现多线程打包（js,css）

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
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
                include: path.resolve('src'),
                // use: [
                //     {
                //         loader: 'babel-loader', options: {
                //             presets: [
                //                 '@babel/preset-env', // es6=>es5
                //                 '@babel/preset-react'
                //             ],
                //         }
                //     }
                // ]

                use: 'Happypack/loader?id=js', // 多线程打包js
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css', // 多线程打包css
            }
        ]
    },
    plugins: [
        new Happypack({ // 配置多线程打包css
            id: 'css',
            use: ['style-loader', 'css-loader']
        }),
        new Happypack({ // 配置多线程打包js
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', // es6=>es5
                            '@babel/preset-react'
                        ],
                    }
                }
            ]
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 打包的时候忽略moment库的locale依赖，提升打包速度，减少打包体积
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}