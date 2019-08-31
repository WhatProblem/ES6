// 将外链标签(link, script)转换为内联标签
const HtmlWebpackPlugin = require('html-webpack-plugin')

class InlineSourcePlugin {
    constructor({match}) {
        this.reg = match
    }

    processTags(data, compilation) { // 处理引入标签的数据
        let headTags = [], bodyTags = []
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation))
        });
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation))
        });
        return { ...data, headTags, bodyTags }
    }

    processTag(tag, compilation) {
        // console.log(tag)
        let newTag, url
        if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: 'style',
                attributes: { type: 'text/css' }
            }
            url = tag.attributes.href
        }
        if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: 'script',
                attributes: { type: 'application/javascript' }
            }
            url = tag.attributes.src
        }
        if (url) {
            // console.log(compilation.assets['main.css'].source()) // 获取(css/js)文件内容
            newTag.innerHTML = compilation.assets[url].source() // 通过compilation.assets获取资源
            // console.log(111111111111111111)
            // console.log(compilation.assets[url]) // 删除原有生成单独文件资源的url链接
            // console.log(2222222222222222)
            delete compilation.assets[url] // 删除原有生成单独文件资源的url链接
            return newTag
        }
        return tag
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
                // console.log(data)
                data = this.processTags(data, compilation) // 资源存放：compilation.assets
                cb(null, data)
            })
        })
    }
}

module.exports = InlineSourcePlugin