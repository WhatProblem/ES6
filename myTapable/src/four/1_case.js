class SyncLoopHook { // 同步钩子
    constructor() {
        this.tasks = []
    }

    tap(name, task) {
        this.tasks.push(task)
    }

    call(...args) {
        let ret
        this.tasks.forEach(task => {
            do {
                ret = task(...args)
            } while (ret !== undefined)
        })
    }
}

module.exports = SyncLoopHook