import './index.css'
import './index.less'
import './a.js'
import '@babel/polyfill' // 转换es6,es7 =>e s5
// import $ from 'expose-loader?$!jquery'
// import $ from 'jquery'
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