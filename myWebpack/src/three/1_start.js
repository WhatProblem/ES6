// const { SyncWaterfallHook } = require('tapable') // 瀑布钩子
const SyncWaterfallHook = require('./1_case') // 自定义钩子

class Lesson {
    constructor() {
        this.arch = {
            hooks: new SyncWaterfallHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tap('react', function (name) { // 上一个注册函数的返回值，是下一个函数的输入
            console.log('学习：', name)
            return '改返回值是下一个函数的输入'
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