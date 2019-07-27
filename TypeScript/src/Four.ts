// 函数重载
function getInfo(name: string): any
function getInfo(age: number): any
function getInfo(str: any) {
    if (typeof str === 'string') {
        console.log(str)
        return str
    }
    if (typeof str === 'number') {
        console.log(str)
        return str
    }
}
let s = getInfo(123)

export default {
    reload: s
}