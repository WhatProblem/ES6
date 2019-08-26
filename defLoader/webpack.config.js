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
            // {
            //     test: /\.js$/,
            //     use: ['loader3', 'loader2', 'loader1'] // 从后向前执行
            // }

            // 1.通过enforce改变执行顺序 pre > normal(默认) > post
            // 2.另外一种行内loader执行 pre > normal > inline > post
            { // 从下向上执行
                test: /\.js$/,
                use: 'loader1',
                // enforce: 'pre'
            },
            {
                test: /\.js$/,
                use: 'loader2'
            },
            {
                test: /\.js$/,
                use: 'loader3',
                // enforce: 'post'
            },
        ]
    }
}