## webpack安装
- 安装本地webpack
- webpack webpack-cli -D

## webpack可以进行0配置
- 打包工具 -> 输出后的结果（js模块）
- 打包（支持我们的js的模块化）
- 打包命令：npx webpack --config webpack.config.my.js / npm run build -- --config webpack.config.my.js

## 解决autoprefixer无法自动添加css3前缀：package添加如下代码
```json
"browserslist": [
    "defaults",
    "not ie < 11",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```

```javascript
  process.env.NODE_ENV = 'production' // 设置当前运行环境 
  clientLogLevel: 'warning' // 去除更新修改代码时客户端产生的日志
  "@babel/plugin-transform-runtime": 转换原生es6,es7的api为es5, 例如function* gen()迭代器函数
  "@babel/polyfill": 转换es7 api 为es5, 例如 includes()
  "@babel/runtime":避免自行引入polyfill转换es6,es7时产生全局函数或变量污染全局
  "expose-loader": 内联loader，将第三方插件暴露给window
    方式一（单个文件引入，内联方式，window.$）： import $ from 'expose-loader?$!jquery'
    方式二：{
                test: require.resolve('jquery'), // 方式二：全局配置jquery，通过window.$获取
                use: 'expose-loader?'
            },
    方法三： new webpack.ProvidePlugin({ // 在每个模块中注入"$"符号，但不能通过window.$获取
                $: 'jquery'
            })

    new UglifyJsPlugin({
        uglifyOptions: { // 删除打包日志
            warnings: false,
            compress: {
                drop_debugger: true,
                drop_console: true,
            },
        },
        cache: true,
        parallel: true,
        sourceMap: true
    })
```

