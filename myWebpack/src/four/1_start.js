// const { SyncLoopHook } = require('tapable') // 多次执行钩子
// 同步遇到某个不反悔undefined的监听函数会多次执行

const SyncLoopHook = require('./1_case') // 自定义钩子

class Lesson {
    constructor() {
        this.index = 0
        this.arch = {
            hooks: new SyncLoopHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tap('react', (name) => { // 上一个注册函数的返回值，是下一个函数的输入
            console.log('学习：', name)
            return ++this.index === 3 ? undefined : '继续执行loop循环，知道返回undefined进行下一步函数'
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