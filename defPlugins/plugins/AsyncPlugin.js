class AsyncPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
            setTimeout(() => {
                console.log('文件发射，等3s')
                cb()
            }, 3000);
        })

        compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('文件发射，再等3s')
                    resolve()
                }, 3000);
            })
        })
    }
}

module.exports = AsyncPlugin