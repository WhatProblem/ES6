import './index.css'
import './index.less'
// import './xhr'
import './a.js'

// import 'bootstrap/dist/css/bootstrap.css' // 正常引入
import 'bootstrap/dist/css/bootstrap' // 通过extension扩展名引入
// import 'bootstrap' // 利用别名后直接引入bootstrap

import '@babel/polyfill' // 转换es6,es7 =>e s5

// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery'
import logo from './logo.png'
console.log('测试webpack')
// console.log($)
// console.log(window.$)

let fn = () => {
    console.log(213)
}
fn()

@log
class A {
    a = 1
}

let a = new A()
console.log(a.a)

function log(target) {
    console.log(target)
}

console.log('123'.includes('1'))

let image = new Image()
image.src = logo
document.body.appendChild(image)
console.log('测试实时打包111111111111')

// DEV：通过webpack暴露出的全局变量，方便控制url
let url = ''
if (DEV === 'dev') {
    url = 'http://localhost:3000'
} else {
    url = 'http://127.0.0.1:8080'
}
console.log(url)