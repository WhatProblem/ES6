class AsyncSeriesHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tapPromise(name, task) {
        this.tasks.push(task)
    }

    promise(...args) {
        let [first, ...others] = this.tasks
        return others.reduce((prev, next) => {
            return prev.then(() => next(...args))
        }, first(...args))
    }
}

module.exports = AsyncSeriesHook