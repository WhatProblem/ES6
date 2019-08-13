// webpack 是node写出来的 node写法
const path = require('path')

module.exports = {
    mode: 'development', // 模式 默认production 另一种development
    entry: './src/index.js', // 打包入口文件
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径， 打包后的路径
    }
}