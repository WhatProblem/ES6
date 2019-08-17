/* 通过webpack自带的dllplugin抽取出react,react-dom，只打包变化的部分 */
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 打包文件赋值给这个变量名
        // libraryTarget: 'var', // 采用var的方式，例如其他：commonjs,utd等
    },
    plugins: [
        // new webpack.DllReferencePlugin({ // 通过清单列表引入，打包先找清单，如果存在就不打包react，存在就直接引用
        //     manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        // }),
        new webpack.DllPlugin({ // name === library，和上述文件名称相等
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'manifest.json'), // 将各个列表清单打包到dist文件夹
        })
    ]
}