class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename
    }
    apply(compiler) {
        // 1.准备文件
        // 2.发射
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            console.log(compilation.assets)
            let assets = compilation.assets,
                content = `## 文件名称      资源大小\n\r`

            Object.entries(assets).forEach(([filename, statObj]) => {
                content += `- ${filename}       ${statObj.size()}\n\r`
            })

            assets[this.filename] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
        })
    }
}

module.exports = FileListPlugin