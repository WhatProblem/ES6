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

// 3.泛型接口：调用时通知接口定义的类型,定义方式1
interface MyInterface<T> {
    (x: T, y: T): T
}
let myFn: MyInterface<number> = function (x, y) {
    return x + y
}

let three = myFn(1, 2)

// 定义方式2：泛型函数接口
interface ConfigFn {
    <T>(value: T): T
}

let tFn: ConfigFn = function <T>(value: T) {
    return value
}
tFn<string>('测试')

export default {
    one, three
}


// 泛型类，类作为接口进行约束
class ClassInterface {
    title: string | undefined;
    name: string | undefined;
    status?: string | undefined;
    constructor(param: {
        title: string | undefined;
        name: string | undefined;
        status?: string | undefined;
    }) {
        this.title = param.title
        this.name = param.name
        this.status = param.status
    }
}

class UseClassInterface<T>{
    add(value: T): boolean {
        return true
    }
}

let cInterface = new ClassInterface({ title: '测试泛型类', name: '123' })
cInterface.status = '200'
let use = new UseClassInterface<ClassInterface>()
use.add(cInterface)




// 4.泛型接口，泛型类综合使用

interface TUser<T> {
    add(value: T): any[];
    update(id: number): void;
}

class TClass<T> implements TUser<T>{
    add(value: T): Array<any> {
        return []
    }
    update(id: number) {

    }
}

class Param {
    id: number | undefined;
    name: string | undefined;
    constructor(param: {
        id: number | undefined;
        name: string | undefined;
    }) {
        this.id = param.id
        this.name = param.name
    }
}

let p = new Param({id: 123, name: '测试'})

let tc = new TClass<Param>()
tc.add(p)