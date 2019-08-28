const loaderUtils = require('loader-utils')


function loader(source) {
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', { content: source }) // 返回图片文件的引用路径
    console.log(source)
    this.emitFile(filename, source) // 发射文件
    return `module.exports="${filename}"`
}
loader.raw = true // 将文件转换为二进制
module.exports = loader