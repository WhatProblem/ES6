import First from './First'
import Second from './Second'
import Three from './Three'
import Four from './Four'
import Five from './Five'
import Seven from './Seven'

import './style.scss';
function component(): any {
    let element = document.createElement('div'),
        btn = document.createElement('button');
    btn.innerHTML = '点击按钮';
    btn.onclick = function () {
        console.log('成功转换');
    }
    element.appendChild(btn);
    return element;
}
document.body.appendChild(component());

// console.log(First)
// console.log(Second)
// console.log(Three)
// console.log(Four)
// console.log(Five)
Seven.a