/* 
装饰器：分为4种
1.类/函数装饰器
2.类-属性装饰器
3.类-函数装饰器
4.类-函数参数装饰器
*/

// 1.类装饰器，不传参数
/* 
function classLog(target: any) {
    console.log(target) // 打印 Dog 类
    target.prototype.url = '测试'
}

@classLog
class Dog {
    constructor() {

    }
    eat() {

    }
}

let a: any = new Dog()
console.log('测试装饰器1：',a.url) // 测试
 */

// 带有参数的类装饰器
/* 
function classLog(param: string) {
    return function(target: any) {
        console.log(param) // 这是我通过装饰器传递给新方法的信息
        console.log(target) // 类
        target.prototype.work = function() {
            console.log(param)
        }
    }
}

@classLog('这是我通过装饰器传递给新方法的信息')
class Dog {
    constructor() {

    }
    eat() {

    }
}

let a: any = new Dog()
console.log('测试装饰器2：', a) // 测试
a.work() // 这是我通过装饰器传递给新方法的信息
 */

// 2.属性装饰器
/* 
function propLog(param: any) {
    return function(target: any, attr: any) {
        console.log(param)  // 这是属性装饰器
        console.log(target) // 打印Dog类的原型对象
        console.log(attr) // name 属性key名
        target[attr] = param
        target.eat = function() {
            console.log('重写eat方法')
        }
    }
}

class Dog {
    @propLog('这是属性装饰器')
    name: string;
    constructor() {

    }
    eat() {
        console.log('吃狗粮')
    }
    work() {
        console.log(this.name)
    }
}

let a: any = new Dog()
a.work()
a.eat()
 */


// 3.函数装饰器
/* 
function methodLog(param: any) {
    return function(target: any, methodName: any, desc: any) {
        console.log(param)  // 这是函数装饰器
        console.log(target) // 打印Dog类的原型对象
        console.log(methodName) // eat 函数key名
        console.log(desc)   // 堆属性的描述信息
        target.name = '装饰器内复制的name属性'
    }
}

class Dog {
    name: string;
    constructor() {

    }
    @methodLog('这是函数装饰器')
    eat() {
        console.log('吃狗粮')
    }
    work() {
        console.log(this.name)
    }
}

let a: any = new Dog()
a.eat()
a.work()
 */


// 4.函数参数装饰器
function paramLog(param: any) {
    return function(target: any, paramsMethod: any, paramIndex: any) {
        console.log(param)  // 这是函数参数装饰器
        console.log(target) // 打印Dog类的原型对象
        console.log(paramsMethod) // eat 装饰器所在函数的函数名称
        console.log(paramIndex) // 0 参数下标
    }
}

class Dog {
    name: string;
    constructor() {

    }

    eat(@paramLog('这是函数参数装饰器') id: number) {
        console.log('吃狗粮', id)
    }
    work() {
        console.log(this.name)
    }
}

let a: any = new Dog()
a.eat(123)
// a.work()

export default { a }