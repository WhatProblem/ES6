class SyncWaterfallHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tap(name, task) {
        this.tasks.push(task)
    }

    call(...args) {
        let [first, ...others] = this.tasks,
            ret = first(...args)
        others.reduce((prev, next) => {
            return next(prev)
        }, ret)
    }
}

module.exports = SyncWaterfallHook