import './index.css'
import './index.less'
import './a.js'
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