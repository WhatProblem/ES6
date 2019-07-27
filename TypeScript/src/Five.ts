/* 泛型函数，泛型类，泛型接口 */

// 1.泛型函数：调用时确定传递的元素的类型
function printArr<T>(arr: T[]): void {
    for (let item of arr) {
        console.log(item)
    }
}
// 调用时确定（告诉）参数类型
// let one = printArr<number>([1, 2, 3])
let one = printArr<string>(['1', 'ceshi'])

// 2.泛型类：实例化时通知元素类型
class MyClass<T> {
    public name: T
    public list: T[] = []
    add(val: T): void {
        this.list.push(val)
    }
}
let myClass = new MyClass<number>()
myClass.add(1)
// myClass.add('2234') // 指定number后报错
console.log(myClass.list)

// 3.泛型接口：调用时通知接口定义的类型
interface MyInterface<T> {
    (x: T, y: T): T
}
let myFn: MyInterface<number> = function (x, y) {
    return x + y
}

let three = myFn(1, 2)

export default {
    one, three
}