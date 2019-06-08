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