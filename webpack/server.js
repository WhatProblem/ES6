let express = require('express')
let app = express()
let webpack = require('webpack')
let middle = require('webpack-dev-middleware') // 中间件
let config = require('./webpack.config.js') // 配置文件

let compiler = webpack(config) // 编译配置文件
app.use(middle(compiler)) // 使用中间件创建服务

app.get('/user',(req,res)=>{
    res.json({data: 'webpack跨域代理成功'})
})

app.listen(4000, ()=>{
    console.log('服务创建成功')
})