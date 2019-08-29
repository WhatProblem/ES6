const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolveLoader: {
        // alias: { // loader设置别名
        // loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
        // }
        modules: ['node_modules', path.resolve(__dirname, 'loaders')] // 缩小查找范围，先从node_modules查找，找不到从loaders查找
    },
    // watch: true, // 监听文件变化后重新打包，对应在laoder.js(banner-loader)中添加代码：this.addDependency(options.filename)
    module: {
        rules: [
            { // 实现less-loader，css-loader，style-loader
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jpg$/,
                // // 根据图片生成一个md5 发射到dist目录下，file-loader还会返回当前的图片路径
                // use: 'file-loader'

                use: {
                    // url-loader可以进行一些配置选项， file-loader能够处理路径问题
                    loader: 'url-loader',
                    options: {
                        limit: 20 * 1024 // 文件小于200kb转换为base64
                    }
                }
            },
            // { // 自定义babel-loader
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }

            { // 自定义banner-loader
                test: /\.js$/,
                use: {
                    loader: 'banner-loader',
                    options: {
                        text: '测试添加banner版权',
                        filename: path.resolve(__dirname, 'banner.js')
                    }
                }
            }
        ]
    }
}