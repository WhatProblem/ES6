// const { AsyncParallelHook } = require('tapable') // 多次执行钩子
// 异步钩子分为串行，并行，需要等到所有的并发异步事件执行完成后再执行回调
// 同时发送多个请求

const AsyncParallelHook = require('./1_case') // 自定义钩子

class Lesson {
    constructor() {
        this.index = 0
        this.arch = {
            hooks: new AsyncParallelHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tapAsync('react', (name, cb) => { // 上一个注册函数的返回值，是下一个函数的输入
            setTimeout(() => {
                console.log('学习：', name)
                cb()
            }, 1000);
        })
        this.arch.hooks.tapAsync('node', function (name, cb) {
            setTimeout(() => {
                console.log('学习：', name)
                cb()
            }, 1000);
        })
    }
    start() {
        this.arch.hooks.callAsync('webpack',(name)=>{
            console.log('最后执行回调')
        })
    }
}
let l = new Lesson(['name'])
l.tap()
l.start()