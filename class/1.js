// ES5--类的实现
/* 
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    var res = '(' + this.x + ',' + this.y + ')';
    console.log(res);
}
var p = new Point(1, 2);
p.toString();
console.log(p.constructor === Point) // true
console.log(Point.prototype.constructor === Point) // true
 */




// ES6--类的创建: 类的所有方法都定义在类的prototype属性上面
/* 
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        let res = '(' + this.x + ',' + this.y + ')';
        console.log(res);
    }
}
let p = new Point(1, 2);
p.toString();
let c = Point.prototype.constructor;
console.log(c === Point); // true
 */





// 类的所有方法都定义在类的prototype属性上面
/* 
class Point {
    constructor() {
        // ...
    }

    toString() {
        // ...
    }

    toValue() {
        // ...
    }
}

// 等同于

Point.prototype = {
    constructor() { },
    toString() { },
    toValue() { },
};
 */



// 向类添加新方法
/* 
class Point {
    constructor() {
        // ...
    }
}

Object.assign(Point.prototype, {
    toString() { console.log('向类添加新方法') },
    toValue() { }
})
let p = new Point();
p.toString();
console.log(p.constructor === Point) // true
console.log(Point.prototype.constructor === Point) // true
 */




// 类内部所有方法都是不可枚举的
/* 
class Point {
    constructor() {
        //...
    }
    toString() {
        // ...
    }
}
let enumer = Object.keys(Point.prototype);
let properties = Object.getOwnPropertyNames(Point.prototype);
console.log(enumer)
console.log(properties);
 */




// ES5类内部所有方法都是可枚举的,不同于ES6
/* 
var Point = function (x, y) {
    // ...
}
Point.prototype.toString = function () {
    // ...
}
var enumer = Object.keys(Point.prototype);
console.log(enumer);
var properties = Object.getOwnPropertyNames(Point.prototype);
console.log(properties);
 */




// constructor方法是类的默认方法
/* 
class Point {
}

// 等同于
class Point {
    constructor() { }
}
 */




// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象
/* 
class Foo {
    constructor() {
        // return Object.create(null); // false
        // return Object.create(this); // true
        return; // true
    }
}
let fn = new Foo();
console.log(fn instanceof Foo);
 */




// 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class/prototype上）
/* 
class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        let res = '(' + this.x + ', ' + this.y + ')';
        console.log(res)
        return res;
    }

}

let point = new Point(2, 3);
point.toString() // (2, 3)
console.log(point.hasOwnProperty('x')) // true
console.log(point.hasOwnProperty('y')) // true
console.log(point.hasOwnProperty('toString')) // false
console.log(point.__proto__.hasOwnProperty('toString')) // true

// 与 ES5 一样，类的所有实例共享一个原型对象
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
// 原型对象：Point.prototype
console.log(p1.__proto__ === p2.__proto__) // true

// Object.getPrototypeOf 方法来获取实例对象的原型
console.log(Object.getPrototypeOf(p1)) // Point{}
 */





// 类的内部有取值函数（getter）和存值函数（setter）拦截该属性的存取行为
/* 
class MyClass {
    constructor(x) {
        this.x = x;
    }
    get prop() {
        console.log('先执行')
        return this.x;
    }
    set prop(value) {
        console.log('后执行')
        this.x = value;
    }
}
let inst = new MyClass(1);
console.log(inst.prop); // 1
inst.prop = 123;
console.log(inst.prop);// 123
 */




// 类的属性名可以使用表达式
/* 
let methodName = 'getArea';
class Square {
    constructor() { }
    [methodName]() { }
}
console.log(Object.getOwnPropertyNames(Square.prototype)) // [ 'constructor', 'getArea' ]
 */




// 立即执行的 Class--person是一个立即执行的类的实例
/* 
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('张三');
console.log(person.sayName()); // "张三"
 */




// name属性
/* 
class Point { }
let p = Point.name
console.log(p) // "Point"
let p1 = new Point();
console.log(p1.name) // undefined
 */





// Generator 方法:方法之前加上星号（*）
// #Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
/* 
class Foo {
    constructor(...args) {
        this.args = args;
    }
    *[Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}

for (let x of new Foo('hello', 'world')) {
    console.log(x);
}
 */




// this指向--解决this指向问题
/* 
class Logger {
    constructor() {
        // 解决方法一
        this.printName = this.printName.bind(this)
    }
    printName(name = 'there') {
        this.print(`Hello ${name}`);
    }

    print(text) {
        console.log(text);
    }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
 */

/* class Obj {
    constructor() {
        // 解决方法二
        this.getThis = () => this;
    }
}
const myObj = new Obj();
console.log(myObj.getThis() === myObj); // true
 */
/* 
function selfish(target) {
    const cache = new WeakMap();
    const handler = {
        get(target, key) {
            const value = Reflect.get(target, key);
            if (typeof value !== 'function') {
                return value;
            }
            if (!cache.has(value)) {
                cache.set(value, value.bind(target));
            }
            return cache.get(value);
        }
    };

    // 解决方法三
    const proxy = new Proxy(target, handler);
    return proxy;
}
const logger = selfish(new Logger());
 */




// 静态方法：不会被实例继承，类自身调用
// 如果静态方法包含this关键字，这个this指的是类，而不是实例
// 静态方法可以与非静态方法重名
/* 
class Foo {
    static classMethod() {
        return 'hello';
    }
}
console.log(Foo.classMethod()); // hello
let foo = new Foo();
// console.log(foo.classMethod()); // // TypeError: foo.classMethod is not a function
 */

/* 
class Foo {
    static bar() {
        this.baz();
        // this.baa(); // 直接调用报错，不存在
    }
    static baz() {
        console.log('hello');
    }
    baz() {
        console.log('world');
        this.bar();
    }
    baa() {
        console.log('baa');
    }
}

console.log(Foo.bar()); // hello
// let foo = new Foo();
// foo.baz();// 报错，bar()不存在
 */








// 父类的静态方法，可以被子类继承
/* 
class Foo {
    static classMethod() {
        return 'hello';
    }
}

class Bar extends Foo {
}

console.log(Bar.classMethod()); // 'hello'
 */

// 静态方法也是可以从super对象上调用的
/* 
class Foo {
    static classMethod() {
        return 'hello';
    }
}

class Bar extends Foo {
    static classMethod() {
        return super.classMethod() + ', too';
    }
}

console.log(Bar.classMethod()); // "hello, too"
 */



// new.target属性：new.target指向当前正在执行的函数



/**************************提案阶段***************************** */

// 实例属性的新写法
/* 
class IncreasingCounter {
    constructor() {
        this._count = 0;
    }
    get value() {
        console.log('Getting the current value!');
        return this._count;
    }
    increment() {
        this._count++;
    }
}
let ins = new IncreasingCounter();
console.log(ins.value)
console.log(ins._count)

// 实例属性--新写法，需要安装babel转码
class Increase {
    count = 0;
    increment() {
        // this.count++;
    }
}
let ins1 = new Increase();
console.log(ins1.count);
ins1.increment();
console.log(ins1.count);
 */



// 静态属性：目前ES6为支持，提案阶段
/* 
class MyClass {
    static myStaticProps = 42;
    constructor() {
        console.log(MyClass.myStaticProps)
    }
}
 */



// 私有属性提案阶段--只能在类的内部使用
/* 
class Increase {
    #count = 0;
    get value() {
        console.log('Getting the current value!');
        return this.#count;
    }
    increment() {
        this.#count++;
    }
}
 */

// 私有方法--提案阶段
/* 
class Counter {
    #xValue = 0;

    constructor() {
        super();
        // ...
    }

    get #x() { return #xValue; }
    set #x(value) {
        this.#xValue = value;
    }
}
 */
