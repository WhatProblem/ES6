const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devServer: { // 开发服务器配置
        port: 3000, // 更改端口号
        progress: true, // 显示进度
        contentBase: './build', // 运行指定文件夹（内存）
        open: false, // 自动打开浏览器

        // 1.使用webpack代理方式
        // proxy: { // 重写方式，把请求代理到express服务器
        //     '/proxy': {
        //         target: 'http://localhost:4000',
        //         pathRewrite: { '/proxy': '' }
        //     }
        // },

        // 2.使用webpack提供的before钩子模拟假数据
        // before(app) {
        //     app.get('/proxy/user', (req, res) => {
        //         res.json({ data: '通过webpack钩子模拟假数据成功' })
        //     })
        // },

        // 3.使用webpack和webpack提供的webpack-dev-middleware中间件创建一个服务，将前端嵌套在服务端中运行
        // 即：通过服务端创建一个3000端口，然后同时也供前端使用，同域中运行，不会跨域
        // 使用第三种方法的时候需要注释当前devServer
    },
    devtool: 'source-map', // 源码映射，快速定位源码日期错误位置
    plugins: [
        new webpack.DefinePlugin({ DEV: JSON.stringify('dev') }), // 暴露webpack执行时的运行环境，dev/prod，方便配置api的url
    ]
})