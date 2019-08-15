// webpack 是node写出来的 node写法

/* 单页应用基础配置 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css用link标签插入到html文件
const OptMizeCss = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js,不使用的话导致js不压缩
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除打包文件夹插件
const CopyWebpackPlugin = require('copy-webpack-plugin')


// 1.CleanWebpackPlugin: 清空之前的打包build文件夹
// 2.CopyWebpackPlugin: 
// 3.BannerPlugin: 内置插件，添加版权信息
module.exports = {
    // mode: 'production', // 模式

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

    // devServer: { // 开发服务器配置
    //     port: 3000, // 更改端口号
    //     progress: true, // 显示进度
    //     contentBase: './build', // 运行指定文件夹（内存）
    //     open: false, // 自动打开浏览器
        
    //     // 1.使用webpack代理方式
    //     // proxy: { // 重写方式，把请求代理到express服务器
    //     //     '/proxy': {
    //     //         target: 'http://localhost:4000',
    //     //         pathRewrite: { '/proxy': '' }
    //     //     }
    //     // },

    //     // 2.使用webpack提供的before钩子模拟假数据
    //     // before(app) {
    //     //     app.get('/proxy/user', (req, res) => {
    //     //         res.json({ data: '通过webpack钩子模拟假数据成功' })
    //     //     })
    //     // },

    //     // 3.使用webpack和webpack提供的webpack-dev-middleware中间件创建一个服务，将前端嵌套在服务端中运行
    //     // 即：通过服务端创建一个3000端口，然后同时也供前端使用，同域中运行，不会跨域
    //     // 使用第三种方法的时候需要注释当前devServer
    // },

    // mode: 'development', // 模式 默认production 另一种development
    entry: './src/index.js', // 打包入口文件
    output: {
        filename: 'bundle.[hash].js', // 打包后的文件名[hash:6]只显示6位hash名称
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径， 打包后的路径
        // publicPath: 'http:www.whatproblem.top', // 添加（图片，js,css等静态资源）公共路径
    },
    devtool: 'source-map', // 源码映射，快速定位源码日期错误位置
    // source-map：产生source-map文件报错当前行和列
    // eval-source-map：不会产生单独文件，但是可以显示行和列
    // cheap-module-source-map: 不会产生列，但是是一个单独文件，产生后可以保留，进行生产调试使用
    // cheap-module-eval-source-map: 不会产生文件，集成在打包后的文件中，不会产生列

    // watch: true, // 监控有文件变化实时打包
    // watchOptions: {
    //     poll: 1000, // 每秒 问我1000次
    //     aggregateTimeout: 500, // 防抖节流 防止一直打包
    //     ignored: /node_modules/, // 不需要要监控这个文件
    // },

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
            filename: 'css/main.css', // 修改css到指定位置
        }),
        // new webpack.ProvidePlugin({ // 在每个模块中注入"$"符号
        //     $: 'jquery'
        // })
        new webpack.BannerPlugin('通过 BannerPlugin 插件添加版权声明'),
        new CopyWebpackPlugin([{ from: 'doc', to: './webapck' }]), // 打包时拷贝文件到指定文件夹
        new CleanWebpackPlugin(), // 打包前先清除之前的文件
    ],
    externals: { // 对于外部引入过的类库不再打包，例如：<srcipt src="./jquery.js">
        jquery: 'jQuery'
    },
    module: { // 模块
        rules: [ // 处理loadder，执行顺序从右向左,从下向上执行，可以是数组或对象写法
            {
                test: /\.html$/,
                use: 'html-withimg-loader', // 解析html中的img的src图片
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        outputPath: 'img/', // 图片打包后的路径
                        // publicPath: 'http://www.whatproblem.top', // 单独给img资源添加路径
                    }
                }, // 解析图片:file-loader,直接打包出原图片，url-loader：可限制转换图片大小，一定大小内直接转换为base64
            },
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../' }
                    }, // 添加link标签，不可与style-loader同时使用
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         // 控制自定义样式插入到打包样式下面，提高优先级
                    //         insert: function insertAtTop(element) {
                    //             var parent = document.querySelector('head');
                    //             var lastInsertedElement =
                    //                 window._lastElementInsertedByStyleLoader;

                    //             if (!lastInsertedElement) {
                    //                 parent.insertBefore(element, parent.firstChild);
                    //             } else if (lastInsertedElement.nextSibling) {
                    //                 parent.insertBefore(element, lastInsertedElement.nextSibling);
                    //             } else {
                    //                 parent.appendChild(element);
                    //             }

                    //             window._lastElementInsertedByStyleLoader = element;
                    //         },
                    //     }
                    // },
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