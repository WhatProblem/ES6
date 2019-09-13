const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './src/main.js', // 入口文件
    output: {
        filename: 'js/main.[hash].js', // 保存文件名
        path: path.resolve(__dirname, 'dist') // 保存后文件地址
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader' // 解析vue单文件组件，安装vue-loader
            },
            {
                test: /\.js$/, // 解析js文件
                use: [
                    {
                        loader: 'babel-loader', // babel系列，解析ES6,ES7 最新语法，api
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
                include: path.resolve(__dirname, 'src'), // 缩小解析范围
                // exclude: /node_modules/,
                // 官网：为了确保 JS 的转译应用到 node_modules 的 Vue 单文件组件，你需要通过使用一个排除函数将它们加入白名单，https://vue-loader.vuejs.org/zh/guide/pre-processors.html#babel
                exclude: file => ( 
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.(css|less)$/, // 解析 less 预编译语言
                use: [
                    // 开发环境配置<style>标签，生产环境配置<link>标签
                    process.env.NODE_ENV === 'production' ? { 
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: '../' }
                    } : ('style-loader', 'vue-style-loader'),
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            { // 解析图片文件
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50 * 1024, // 自定义小于50kb情况使用base64，否则打包为单独文件
                        outputPath: 'img/'
                    }
                }
            }
        ]
    },
    resolve: {
        // modules: [path.resolve('node_modules')],
        extensions: ['.vue', '.js', '.css', '.json'], // 解析文件扩展名称 import('home') <=> import('home.vue')
        alias: { // 对src路径使用别名 src 路径下： import('../view/home') <=> import('@/view/home.vue')
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
    plugins: [
        new VueLoaderPlugin(), // vue 官方提供插件，解析.vue文件
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
