class AsyncParallelHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tapPromise(name, task) {
        this.tasks.push(task)
    }

    promise(...args) {
        let tasks = this.tasks.map(task => task(...args))
        return Promise.all(tasks)
    }
}

module.exports = AsyncParallelHook