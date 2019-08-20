// const { SyncBailHook } = require('tapable') // 系统内部钩子
const SyncBailHook = require('./1_case') // 自定义钩子

class Lesson {
    constructor() {
        this.arch = {
            hooks: new SyncBailHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tap('react', function (name) {
            console.log('学习：', name)
            return '返回不是undefined,后面的将停止执行'
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