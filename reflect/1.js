// Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API

// console.log(Reflect.has(Object, 'assign'));
/* 
Proxy(target, {
    set: function (target, name, value, receiver) {
        var success = Reflect.set(target, name, value, receiver);
        if (success) {
            console.log('property ' + name + ' on ' + target + ' set to ' + value);
        }
        return success;
    }
});
 */




// Reflect.get(target, name, receiver):方法查找并返回target对象的name属性，如果没有该属性，则返回undefined
// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver
// 如果第一个参数不是对象，Reflect.get方法会报错
/* 
var myObject = {
    foo: 4,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
}

console.log(Reflect.get(myObject, 'foo')) // 4
console.log(Reflect.get(myObject, 'bar')) // 2
console.log(Reflect.get(myObject, 'baz')) // 6
console.log(Reflect.get(myObject, 'test')) // undefined
 */


/* 
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar; // this 指向receiver
    },
};

var myReceiverObject = {
    foo: 4,
    bar: 4,
};

console.log(Reflect.get(myObject, 'baz', myReceiverObject)) // 8
 */






// Reflect.set(target, name, value, receiver):设置target对象的name属性等于value
// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver
/* 
var myObject = {
    foo: 1,
    set bar(value) {
        return this.foo = value;
    },
}

console.log(myObject.foo) // 1

Reflect.set(myObject, 'foo', 2);
console.log(myObject.foo) // 2

Reflect.set(myObject, 'bar', 3)
console.log(myObject.foo) // 3

Reflect.set(myObject, 'test', 123)
console.log(myObject.test) // 123
console.log(myObject) // { foo: 3, bar: [Setter], test: 123 }
 */


/* 
var myObject = {
    foo: 4,
    set bar(value) {
        this.test = 123; // this指向receiver
        return this.foo = value;
    },
};

var myReceiverObject = {
    foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
console.log(myObject.foo) // 4
console.log(myReceiverObject.foo) // 1
console.log(myReceiverObject.test) // 123
 */





// Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，
// 而且传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截
// 如果第一个参数不是对象，Reflect.set会报错
/* 
let p = {
    a: 'a'
};

let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty

// 上面代码中，Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，
// 导致触发Proxy.defineProperty拦截。这是因为Proxy.set的receiver参数总是指向当前的 Proxy实例（即上例的obj），
// 而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），
// 导致触发defineProperty拦截。如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截
 */


/* 
let p = {
    a: 'a'
};

let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
 */

/* 
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错
*/





// Reflect.has(obj, name):对应name in obj里面的in运算符
// 如果第一个参数不是对象，Reflect.has和in运算符都会报错
/* 
var myObject = {
    foo: 1,
};
// 旧写法
console.log('foo' in myObject) // true
// 新写法
console.log(Reflect.has(myObject, 'foo')) // true
 */





// Reflect.deleteProperty(obj, name):等同于delete obj[name]，用于删除对象的属性
// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；
// 删除失败， 被删除的属性依然存在，返回false
/* 
const myObj = { foo: 'bar' };
// 旧写法
// delete myObj.foo;
// console.log(myObj.foo) // undefined
// 新写法
// Reflect.deleteProperty(myObj, 'foo');
// console.log(myObj.foo) // undefined
 */





// Reflect.construct(target, args)：等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法
/* 
function Greeting(name) {
    this.name = name;
}
// new 的写法
let instance1 = new Greeting('张三');
console.log(instance1.name) // 张三
// Reflect.construct 的写法
let instance2 = Reflect.construct(Greeting, ['张三']);
console.log(instance2.name) // 张三
 */




// Reflect.getPrototypeOf(obj):方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)
// 区别：如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错
/* 
function FancyThing() { }
const myObj = new FancyThing();
// 旧写法
console.log(Object.getPrototypeOf(myObj) === FancyThing.prototype); // true
// 新写法
console.log(Reflect.getPrototypeOf(myObj) === FancyThing.prototype); // true
 */

/* 
console.log(Object.getPrototypeOf(1)) // [Number: 0] {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1) // 报错
*/





// Reflect.setPrototypeOf(obj, newProto):设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法
// 它返回一个布尔值，表示是否设置成功
/* 
const myObj = {};
// 旧写法
console.log(Object.setPrototypeOf(myObj, Array.prototype)); // Array {}
// 新写法
console.log(Reflect.setPrototypeOf(myObj, Array.prototype)); // true
console.log(myObj.length) // 0
 */


// 如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf方法返回false
/* 
Reflect.setPrototypeOf({}, null)// true
Reflect.setPrototypeOf(Object.freeze({}), null)// false
*/


// 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflect.setPrototypeOf会报错
/* 
Object.setPrototypeOf(1, {})
// 1
Reflect.setPrototypeOf(1, {})
// TypeError: Reflect.setPrototypeOf called on non-object
 */



// 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错
/* 
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Reflect.setPrototypeOf(null, {})
// TypeError: Reflect.setPrototypeOf called on non-object
*/




// Reflect.apply(func, thisArg, args)：等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数
// 如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，
// 采用Reflect对象可以简化这种操作
/* 
const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
 */





// Reflect.defineProperty(target, propertyKey, attributes)
// 基本等同于Object.defineProperty，但是Object.defineProperty未来逐渐被废除
// 如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误
/* 
function MyDate() { }
// 旧写法
// Object.defineProperty(MyDate, 'now', {
// value: () => Date.now()
// });
// console.log(MyDate.now) // [Function: value]
// 新写法
// Reflect.defineProperty(MyDate, 'now', {
// value: () => Date.now()
// });
// console.log(MyDate.now) // [Function: value]
 */
/* 
const p = new Proxy({}, {
    defineProperty(target, prop, descriptor) {
        console.log(descriptor);
        return Reflect.defineProperty(target, prop, descriptor);
    }
});

p.foo = 'bar';
// {value: "bar", writable: true, enumerable: true, configurable: true}

p.foo // "bar"
 */





// Reflect.getOwnPropertyDescriptor(target, propertyKey) 
// 基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者
// Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，后者报错
/* 
var myObject = {};
Object.defineProperty(myObject, 'hidden', {
    value: true,
    enumerable: false,
});

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
console.log(theDescriptor)
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');
console.log(theDescriptor)
 */




// Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展
// 如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错
/* 
const myObject = {};
// 旧写法
Object.isExtensible(myObject) // true
// 新写法
Reflect.isExtensible(myObject) // true
*/





// Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功
// 如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错
/* 
var myObject = {};
// 旧写法
// Object.preventExtensions(myObject) // Object {}
// console.log(Object.isExtensible(myObject)) // false
// // 新写法
// Reflect.preventExtensions(myObject) // true
// console.log(Reflect.isExtensible(myObject)) // false
*/





// Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
/* 
var myObject = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4,
};
// 旧写法
console.log(Object.getOwnPropertyNames(myObject)) // ['foo', 'bar']
console.log(Object.getOwnPropertySymbols(myObject)) //[Symbol(baz), Symbol(bing)]
// 新写法
console.log(Reflect.ownKeys(myObject)) // ['foo', 'bar', Symbol(baz), Symbol(bing)]
 */





// 实例：使用 Proxy 实现观察者模式:
// 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行
/* 
const queeuObservers = new Set()
const observe = fn => queeuObservers.add(fn)
const observable = obj => new Proxy(obj, { set })

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    queeuObservers.forEach(observer => observer())
    return result
}

const person = observable({ name: '张三', age: 20 })
function print() {
    console.log(`${person.name},${person.age}`)
}

observe(print)
person.name = '李四'

// 上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。

// 下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
 */





