// 串行执行，第一个执行完再执行第二个，类似express的next()
// const { AsyncSeriesHook } = require('tapable')

const AsyncSeriesHook = require('./1_case.js') // 自定义钩子

class Lesson {
    constructor() {
        this.index = 0
        this.arch = {
            hooks: new AsyncSeriesHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tapPromise('react', (name) => { // 控制函数依次执行
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('1学习：', name)
                    resolve()
                }, 1000);
            })
        })
        this.arch.hooks.tapPromise('node', function (name) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('2学习：', name)
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