class AsyncParallelHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tapAsync(name, task) {
        this.tasks.push(task)
    }

    callAsync(...args) {
        let finalCb = args.pop(),
            index = 0
        let done = () => {
            index++
            if (index === this.tasks.length) {
                finalCb()
            }
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}

module.exports = AsyncParallelHook