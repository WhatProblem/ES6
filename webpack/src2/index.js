import str from './hot.js'
import './a.css';
let button = document.createElement('button')
button.innerHTML = '点击懒加载'
button.onclick = function () {
    import('./a.js').then(data => {
        console.log(data.default)
    })
    this.innerHTML = '已加载'
}
document.body.appendChild(button)

// if (module.hot) { // 测试热更新
//     module.hot.accept('./hot',()=>{
//         let str = require('./hot.js')
//         console.log(str)
//     })
// }

console.log(str)