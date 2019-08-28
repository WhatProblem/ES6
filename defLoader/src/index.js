// console.log('入口文件')

// // // 加'!'使用行内loader
// // let a = require('inline-loader!./a.js')

// // // 加'-!'不会让文件 再去通过pre + normal loader来处理
// // let a = require('-!inline-loader!./a.js')

// // // '!' 没有normal
// // let a = require('!inline-loader!./a.js')

// // '!!' 除了行内，什么都不要
// let a = require('!!inline-loader!./a.js')

// console.log(a)





// // 测试自定义loader
// class Test {
//     constructor(name) {
//         this.name = name
//     }
//     getName() {
//         return this.name
//     }
// }

// let t = new Test('ceshi')
// console.log(t.getName())






// 测试file-loader和url-loader
import logo from './logo.jpg'

let img = document.createElement('img')
img.src = logo
document.body.appendChild(img)