// webpack 是node写出来的 node写法
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css用link标签插入到html文件
const OptMizeCss = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js,不使用的话导致js不压缩
const webpack = require('webpack')

module.exports = {
    mode: 'development', // 模式
    // optimization: { // 压缩优化，自动压缩css，UglifyJsPlugin必须设置，否者js不压缩
    //     minimizer: [
    //         new OptMizeCss(),
    //         new UglifyJsPlugin({
    //             cache: true, // 使用缓存
    //             parallel: true, // 并行，同时压缩多个
    //             sourceMap: true, // 打包后es6映射为es5
    //         })
    //     ]
    // },
    devServer: { // 开发服务器配置
        port: 3000, // 更改端口号
        progress: true, // 显示进度
        contentBase: './build', // 运行指定文件夹（内存）
        open: false, // 自动打开浏览器
    },
    // mode: 'development', // 模式 默认production 另一种development
    entry: './src/index.js', // 打包入口文件
    output: {
        filename: 'bundle.[hash].js', // 打包后的文件名[hash:6]只显示6位hash名称
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径， 打包后的路径
    },
    plugins: [ // 放置所有webpack插件，无先后顺序
        new HtmlWebpackPlugin({
            template: './src/index.html', // 模板地址
            filename: 'index.html', // 打包后文件名称
            minify: { // 压缩html
                removeAttributeQuotes: false, // 删除html中的双引号,默认false
                collapseWhitespace: true, // 打包后html压缩为一行,默认false
            },
            hash: true, // 为js添加hash后缀（防止缓存问题）
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        // new webpack.ProvidePlugin({ // 在每个模块中注入"$"符号
        //     $: 'jquery'
        // })
    ],
    externals: { // 对于外部引入过的类库不再打包，例如：<srcipt src="./jquery.js">
        jquery: 'jQuery'
    },
    module: { // 模块
        rules: [ // 处理loadder，执行顺序从右向左,从下向上执行，可以是数组或对象写法
            {
                test: require.resolve('jquery'), // 方式二：全局配置jquery，通过window.$获取
                use: 'expose-loader?$!jquery'
            },
            // {
            //     test: /\.js$/,
            //     loader: 'eslint-loader',// 代码检测
            //     exclude: /node_modules/,
            //     enforce: 'pre', // 强制优先执行顺序，先于下方，post: 后置执行顺序
            // },
            {
                test: /\.js$/,
                use: [
                    { // 用babel-loader将es6转为es5
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env', // es6=>es5
                            ],
                            plugins: [
                                // ['@babel/plugin-proposal-class-properties'], // es7=>es5不能与下面两者同时使用
                                ["@babel/plugin-proposal-decorators", { "legacy": true }], // ES7装饰器转换为ES5，有顺序限制，上
                                ["@babel/plugin-proposal-class-properties", { "loose": true }], // ES7装饰器转换为ES5，有顺序限制，下
                                ["@babel/plugin-transform-runtime"], // 转换es7为es5，例如function * gen()
                            ]
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
            },
            {
                // css-loader: 解析@import './a.css'语法
                // style-loader: 将css插入到html生成style标签
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader, // 添加link标签，不可与style-loader同时使用
                    {
                        loader: 'style-loader',
                        options: {
                            // 控制自定义样式插入到打包样式下面，提高优先级
                            insert: function insertAtTop(element) {
                                var parent = document.querySelector('head');
                                var lastInsertedElement =
                                    window._lastElementInsertedByStyleLoader;

                                if (!lastInsertedElement) {
                                    parent.insertBefore(element, parent.firstChild);
                                } else if (lastInsertedElement.nextSibling) {
                                    parent.insertBefore(element, lastInsertedElement.nextSibling);
                                } else {
                                    parent.appendChild(element);
                                }

                                window._lastElementInsertedByStyleLoader = element;
                            },
                        }
                    },
                    'css-loader',
                    'postcss-loader', // 自动添加css3前缀 -webkit -moz等，先处理
                ]
            },
            {
                // 处理less
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insertAt: 'top', // 控制自定义样式插入到打包样式下面，提高优先级
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ]
            }
        ]
    }
}



// insertAt: 'top'不生效