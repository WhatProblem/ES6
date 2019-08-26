const path = require('path')

// 自定义插件plugin
class P {
    apply(complier) {
        complier.hooks.emit.tap('emit', function () {
            console.log('插件定义emit')
        })
    }
}

class AP {
    apply(complier) {
        complier.hooks.afterPlugins.tap('emit', function () {
            console.log('插件定义afterPlugins')
        })
    }
}

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, 'loader', 'style-loader'),
                    path.resolve(__dirname, 'loader', 'less-loader'),
                ]
            }
        ]
    },
    plugins: [
        new P(),
        new AP(),
    ]
}