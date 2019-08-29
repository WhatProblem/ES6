// 实现原理：将css中body {background: url('./logo.jpg')} 进行拆分成三段装进数组

function loader(source) {
    let reg = /url\((.+?)\)/g // 任意字符
    let pos = 0
    let current
    let arr = ['let list=[]']
    while (current = reg.exec(source)) { // [matchUrl,g]
        let [matchUrl, g] = current
        // console.log(matchUrl, g)
        let last = reg.lastIndex - matchUrl.length
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`)
        pos = reg.lastIndex
        arr.push(`list.push('url('+require(${g})+')')`) // 将g(./logo.png)替换成url(require('xxx'))
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
    arr.push(`module.exports=list.join('')`)
    return arr.join('\r\n')
}
module.exports = loader