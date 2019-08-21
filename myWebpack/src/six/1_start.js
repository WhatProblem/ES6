// const { AsyncParallelHook } = require('tapable') // 多次执行钩子
// 异步钩子分为串行，并行，需要等到所有的并发异步事件执行完成后再执行回调
// 同时发送多个请求
// tapable库中有三种注册方法 tap同步注册 tapAsync(cb) tapPromise(注册是promise)
// 调用方法对应call callAsync promise

const AsyncParallelHook = require('./1_case') // 自定义钩子

class Lesson {
    constructor() {
        this.index = 0
        this.arch = {
            hooks: new AsyncParallelHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tapPromise('react', (name) => { // 上一个注册函数的返回值，是下一个函数的输入
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('学习：', name)
                    resolve()
                }, 1000);
            })
        })
        this.arch.hooks.tapPromise('node', function (name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('学习：', name)
                    resolve()
                }, 1000);
            })
        })
    }
    start() {
        this.arch.hooks.promise('webpack').then((name) => {
            console.log('最后执行回调')
        })
    }
}
let l = new Lesson(['name'])
l.tap()
l.start()