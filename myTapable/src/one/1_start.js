// const { SyncHook } = require('tapable') // tapable内置插件
const SyncHook = require('./1_case') // 自定义同步周期钩子

class Lesson {
    constructor() {
        this.arch = {
            hooks: new SyncHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tap('react', function (name) {
            console.log('学习：', name)
        })
        this.arch.hooks.tap('node', function (name) {
            console.log('学习：', name)
        })
    }
    start() {
        this.arch.hooks.call('webpack')
    }
}
let l = new Lesson(['name'])
l.tap()
l.start()