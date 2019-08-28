const babel = require('@babel/core')
// 安装loader-utils获取webpack的loader配置中的所有参数
const loaderUtils = require('loader-utils')

function loader(source) { // 提供this: loaderContext
    // console.log(Object.keys(this))
    console.log(this.resourcePath) // 当前要处理的文件的绝对路径, E:\singleData\ES6\defLoader\src\index.js
    let options = loaderUtils.getOptions(this)
    console.log(options) // { presets: [ '@babel/preset-env' ] }
    let cb = this.async() // 如果异步执行就执行该函数
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop(), // 给打包后的sourcemap文件配置对应的名称
    }, function (err, result) {
        cb(err, result.code, result.map) // 异步
    })
    return source
}
module.exports = loader