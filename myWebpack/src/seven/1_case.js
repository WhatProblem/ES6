class AsyncSeriesHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tapAsync(name, task) {
        this.tasks.push(task)
    }

    callAsync(...args) {
        let index = 0, finalCb = args.pop()
        let next = () => {
            if (this.tasks.length === index) return finalCb()
            let task = this.tasks[index++]
            task(...args, next)
        }
        next()
    }
}

module.exports = AsyncSeriesHook