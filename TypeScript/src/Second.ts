/* interface：接口，行为和结构的抽象
    1.实现接口内部的对应内容
    2.定义接口时，之定义声明即可，不用定义具体内容
*/

/* 1.对类的约束：约束类内部的方法有哪些，以及方法的参数及返回值 */
// 接口定义
interface Iprint {
    printing(msg: string): string
}

interface Imessage {
    getMsg(): string
}

// 实现接口,根据接口内部提供方法，进行对应实现
class ColorPrinter implements Iprint, Imessage {
    printing(msg: string): string {
        return msg
    }
    getMsg(): string {
        return '这是打印机信息'
    }
}

let colorPrint = new ColorPrinter()
let c1 = colorPrint.printing('打印')
let c2 = colorPrint.getMsg()

/* 2.对函数的约束：约束函数参数及返回值 */
interface Imyfunc {
    (a: string, b: number): boolean
}
let func1: Imyfunc = function (x: string, y: number): boolean {
    return false
}

/* 3。对数组约束：约束数组索引以及元素类型,索引必须是string或number类型 */
interface Iarr {
    [index: number]: string
}
let arr: Iarr = ['1', '2']
arr[2] = '3'

/* 4.json约束：对json/object类型键值进行约束 */
interface Ijson {
    name: string
    age: number
    email?: string // 可选属性
    readonly pwd: string // 只读属性
}
function showJson(param: Ijson): void {
    // param.pwd = '123' // 报错
    console.log(param)
}

/* 5.接口继承 */
interface Print {
    getMsg(): any
}
interface ColorPrint extends Print {
    print(): any
}
class HPPrint implements ColorPrint {
    getMsg() {
        console.log('惠普打印机信息')
    }
    print() {

    }
}
let hp = new HPPrint().getMsg()

export default {
    c1, c2, func1, arr, showJson, hp
}