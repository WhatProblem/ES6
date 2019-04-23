// 对象的新增方法

// #1.Object.is():比较两个值是否相等,只要两个值是一样的，它们就应该相等
// ES5: == / ===: 前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0
/*
console.log(+0 === -0) // true
console.log(NaN === NaN) // false
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
*/



// #2. Object.assign(target, source1, source2):方法用于对象的合并，
// 将源对象（source）的所有可枚举属性，复制到目标对象（target)
// 如果只有一个参数，Object.assign会直接返回该参数
// 如果该参数不是对象，则会先转成对象，然后返回
// undefined和null无法转成对象，它们作为第一个参数，就会报错，除了第一个位置不报错
/* 
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
console.log(target) // {a:1, b:2, c:3}
console.log(Object.assign({ a: 1 })) // { a: 1 }
console.log(Object.assign(2)) // [Number: 2]
let obj = { a: 1 };
console.log(Object.assign(obj, undefined) === obj) // true
console.log(Object.assign(obj, null) === obj) // true
 */




// 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。
// 但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果
// 只有字符串的包装对象，会产生可枚举属性
// 属性名为 Symbol 值的属性，也会被Object.assign拷贝
/* 
const v1 = 'abc';
const v2 = true;
const v3 = 10;
const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' })
// { a: 'b', Symbol(c): 'd' }
 */





// Object.assign方法实行的是浅拷贝
// bject.assign拷贝得到的是这个对象的引用
/*
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b // 2
*/


// 一旦遇到同名属性，Object.assign的处理方法是替换
/*
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
*/


// Object.assign可以用来处理数组，但是会把数组视为对象
// Object.assign([1, 2, 3], [4, 5]) // [4, 5, 3]



// Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制
/* 
const source = {
    get foo() { return 1 }
};
const target = {};
console.log(Object.assign(target, source)) // // { foo: 1 }
 */



/******用途****** */
// 为对象添加属性
/* 
class Ponit {
    constructor(x, y) {
        Object.assign(this, { x, y })
    }
}
// 将x属性和y属性添加到Point类的对象实例
 */






// 为对象添加方法
/* 
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) { },
    anotherMethod() { }
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) { };
SomeClass.prototype.anotherMethod = function () { };
 */


// 克隆对象
/* 
// 普通克隆无法得到继承的值
function clone(origin) {
    return Object.assign({}, origin);
}
// 克隆保持继承链
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}
 */


// 合并多个对象
/* 
// 将多个对象合并到某个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
// 合并后返回一个新对象
const merge = (...sources) => Object.assign({}, ...sources);
 */


// 为属性指定默认值
/* 
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent(options) {
    options = Object.assign({}, DEFAULTS, options);
    console.log(options);
}
 */






// ES6:Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象
// ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象
/* 
const obj = {
    foo: 123,
    get bar() { return 'abc' }
}
// console.log(Object.getOwnPropertyDescriptors(obj))
// { foo:
// { value: 123,
// writable: true,
// enumerable: true,
// configurable: true },
// bar:
// { get: [Function: get bar],
// set: undefined,
// enumerable: true,
// configurable: true } }
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'))
// { value: 123,
// writable: true,
// enumerable: true,
// configurable: true }
 */



// 
/* 
function getOwnPropertyDescriptors(obj) {
    const result = {};
    for (let key of Reflect.ownKeys(obj)) {
        result[key] = Object.getOwnPropertyDescriptor(obj, key);
    }
    return result;
}
 */



// Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法
// Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝
/* 
const source = {
    set foo(value) {
        console.log(value);
    }
};
const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
// set: [Function: set foo],
// enumerable: true,
// configurable: true }
 */





// __proto__属性，Object.setPrototypeOf()（写操作），Object.getPrototypeOf()(读操作),Object.create()（生成操作）

// Object.setPrototypeOf()设置一个对象的prototype对象
/* 
Object.setPrototypeOf(object, prototype)
// 等同于
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
 */

/* 
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
proto.y = 20;
proto.z = 40;
obj.x // 10
obj.y // 20
obj.z // 40
 */



// 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果
// 如果第一个参数是undefined或null，就会报错
/* 
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
 */






// Object.getPrototypeOf() 读取一个对象的原型对象
/* 
console.log(Object.getPrototypeOf({})) // {}
function Rectangle() {
    // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
 */






// Object.keys()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
// 配合使用：Object.values()，Object.entries()






// Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象《提案阶段》
/* 
Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
])
// { foo: "bar", baz: 42 }

// 配合URLSearchParams对象，将查询字符串转为对象
let res = Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
console.log(res)
// { foo: "bar", baz: "qux" }
 */