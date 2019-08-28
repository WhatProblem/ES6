const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils') // 验证配置是否正确
const fs = require('fs')

function loader(source) {
    this.cacheable && this.cacheable()
    // this.cacheable(false) // false:不使用缓存，默认使用缓存
    let options = loaderUtils.getOptions(this) // 获取配置
    let cb = this.async() // 获取异步执行函数
    let schema = { // 
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    }
    validateOptions(schema, options, 'banner-loader') // 具体验证指定文件 (banner-loader) 配置正确性
    if (options.filename) {
        this.addDependency(options.filename) // 将监听文件添加到对象，文件变化实时打包，自动添加文件依赖
        fs.readFile(options.filename, 'utf8', function (err, data) {
            cb(err, `/**${data}**/${source}`)
        })
    } else {
        cb(null, `/**${options.text}**/${source}`)
    }
    return source
}
module.exports = loader