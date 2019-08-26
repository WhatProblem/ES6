const path = require('path')
const fs = require('fs')
const babylon = require('babylon')
const types = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const ejs = require('ejs')
const { SyncHook } = require('tapable')

// babylon 把源码转换成 ast
// @babel/traverse // 遍历节点
// @babel/types // 替换节点
// @babel/generator // 生成处理后的代码文件

class Compiler {
    constructor(config) {
        // 配置文件，配置项目
        this.config = config
        // 保存主入口文件路径
        this.entryId; // 例如: './src/index.js'
        // 保存所有的模块依赖
        this.modules = {}
        this.entry = config.entry // 入口路径
        // 工作路径
        this.root = process.cwd() // 运行文件的路径
        // 生命周期钩子配置
        this.hooks = {
            entryOption: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
        // 如果有plugins参数
        let plugins = this.config.plugins
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this)
            })
        }
        this.hooks.afterPlugins.call()
    }
    run() {
        this.hooks.run.call()
        // 执行 并且创建模块的依赖关系 构建模块
        this.hooks.compile.call()
        this.buildModule(path.resolve(this.root, this.entry), true)
        this.hooks.afterCompile.call()
        // 发射一个文件 打包后的文件
        this.hooks.emit.call()
        this.emitFile()
        this.hooks.done.call()
    }
    getSource(modulePath) {
        let rules = this.config.module.rules
        let content = fs.readFileSync(modulePath, 'utf8')
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i],
                { test, use } = rule,
                len = use.length - 1
            if (test.test(modulePath)) { // 当前模块以.less结尾需要通过less-loader转换
                // loader获取对应的loader函数
                // 先通过less-loader将less文件转为css内容，再通过css-loader将css内容插入到html中
                function normalLoader() {
                    let loader = require(use[len--])
                    // 递归调用loader 实现转化功能
                    content = loader(content)
                    if (len >= 0) {
                        normalLoader()
                    }
                }
                normalLoader()
            }
        }
        return content
    }
    parse(source, parentPath) { // AST解析语法树
        let ast = babylon.parse(source)
        let dependencies = [] // 依赖数组
        traverse(ast, {
            CallExpression(p) { // a() require()
                let node = p.node // 对应的节点
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value // 取到的就是模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName) ? '' : '.js')
                    moduleName = './' + path.join(parentPath, moduleName) // 'src/a.js'
                    dependencies.push(moduleName)
                    node.arguments = [types.stringLiteral(moduleName)]
                }
            }
        })

        let sourceCode = generator(ast).code
        return { sourceCode, dependencies }
    }
    buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath) // 根据路径读取文件内容
        // 模块id(模块的相对路径) modulePath = modulePath - this.root src/index.js
        let moduleName = './' + path.relative(this.root, modulePath)

        if (isEntry) {
            this.entryId = moduleName // 保存入口的名字
        }

        // 解析把source源码进行改造，返回一个依赖列表，（将require替换为__webpack__require__,./a.js替换为./src/a.js）
        // path.dirname(modulePath) 将./src/index.js输出为./src
        let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
        // 把相对路径和模块中的内容 对应起来
        this.modules[moduleName] = sourceCode

        dependencies.forEach(dep => { // 附模块的加载 递归加载 例如a.js中引入了b.js
            this.buildModule(path.join(this.root, dep), false)
        })
    }

    emitFile() { // 发射文件
        // 用数据渲染
        // 拿到输出到哪个目录
        let main = path.join(this.config.output.path, this.config.output.filename) // 输出目录
        let templateStr = this.getSource(path.join(__dirname, './main.ejs')) // 代码模板
        let code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules }) // 打包后的代码
        this.assets = {}
        // 资源中 路径对应的代码
        this.assets[main] = code // 储存代码段
        console.log(main)
        fs.writeFileSync(main, this.assets[main])
    }
}


module.exports = Compiler