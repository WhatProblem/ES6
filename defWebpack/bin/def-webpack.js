#! /usr/bin/env node

// 1.需要找到当前执行文件路径，拿到webpack.config.js
// 2.获取配置文件

const path = require('path')
const config = require(path.resolve('webpack.config.js'))
const Compiler = require('../lib/Compiler')
const compiler = new Compiler(config)
compiler.hooks.entryOption.call() // 生命周期钩子插件验证
compiler.run() // 标识运行编译