class SyncHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tap(name, task) {
        this.tasks.push(task)
    }

    call(...args) {
        this.tasks.forEach(task => task(...args))
    }
}

module.exports = SyncHook