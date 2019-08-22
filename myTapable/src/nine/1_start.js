// 串行执行，第一个执行完再执行第二个，类似express的next()
// const { AsyncSeriesWaterfallHook } = require('tapable')

const AsyncSeriesWaterfallHook = require('./1_case.js') // 自定义钩子

class Lesson {
    constructor() {
        this.index = 0
        this.arch = {
            hooks: new AsyncSeriesWaterfallHook(['nameTipsFlag']) // 控制call()方法的参数出入生效
        }
    }
    tap() {
        this.arch.hooks.tapAsync('react', (name, cb) => { // 控制函数依次执行
            setTimeout(() => {
                console.log('1学习：', name)
                cb(null, 'result1') // 如果第一个参数为null，将毁掉第二个参数返回给下一个匿名函数的参数，否则相当于当前函数报错，直接进行下一个函数
                // cb(null) // 只有一个参数打印默认name参数值
                // cb('null', 'result1') // 调过当前函数，直接进行下一步
            }, 1000);
        })
        this.arch.hooks.tapAsync('node', function (name, cb) {
            setTimeout(() => {
                console.log('2学习：', name)
                cb(null, 'result2')
            }, 1000);
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