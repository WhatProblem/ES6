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
        this.arch.hooks.tapAsync('react', (name, cb) => { // 上一个注册函数的返回值，是下一个函数的输入
            setTimeout(() => {
                console.log('1学习：', name)
                cb()
            }, 1000);
        })
        this.arch.hooks.tapAsync('node', function (name, cb) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('2学习：', name)
                    cb()
                }, 1000);
            })
        })
    }
    start() {
        this.arch.hooks.callAsync('webpack', (name) => {
            console.log('最后执行回调')
        })
    }
}
let l = new Lesson(['name'])
l.tap()
l.start()