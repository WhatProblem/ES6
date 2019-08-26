const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        // alias: { // loader设置别名
        //     loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
        // }
        modules: ['node_modules', path.resolve(__dirname, 'loaders')] // 缩小查找范围，先从node_modules查找，找不到从loaders查找
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'loader1'
            }
        ]
    }
}