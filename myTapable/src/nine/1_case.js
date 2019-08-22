class AsyncSeriesWaterfallHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tapAsync(name, task) {
        this.tasks.push(task)
    }

    callAsync(...args) {
        let finalCb = args.pop(), index = 0,
            next = (err, data) => {
                let task = this.tasks[index]
                if (!task) return finalCb()
                if (index === 0) {
                    task(...args, next)
                } else {
                    task(data, next)
                }
                index++
            }
        next()
    }
}

module.exports = AsyncSeriesWaterfallHook