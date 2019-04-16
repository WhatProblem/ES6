// Proxy:在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
/* 
var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        // console.log(target);
        // console.log(key);
        // console.log(receiver);
        return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
        // console.log('设置：',target); // 设置： { count: 1 }
        // console.log(key); // count
        // console.log(value); // 1
        // console.log(receiver); // {count:1}
        return Reflect.set(target, key, value, receiver);
    }
})
obj.count = 1;
++obj.count;
 */


// var proxy = new Proxy(target, handler);
/* 
Proxy 对象的所有用法，都是上面这种形式，
不同的只是handler参数的写法。
其中，new Proxy()表示生成一个Proxy实例，
target参数表示所要拦截的目标对象，
handler参数也是一个对象，用来定制拦截行为
 */
/* 
var proxy = new Proxy({}, {
    get: function (target, property) {
        return 35;
    }
})
console.log(proxy.time);
console.log(proxy.name);
 */


// 如果handler没有设置任何拦截，那就等同于直接通向原对象
/* 
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
console.log(target.a); // 'b'
 */


// Proxy 实例也可以作为其他对象的原型对象。
/* 
var proxy = new Proxy({}, {
    get: function (target, property) {
        return 35;
    }
});

let obj = Object.create(proxy);
console.log(obj.time); // 35
 */


// 同一个拦截器函数，可以设置拦截多个操作
/* 
var handler = {
    get: function (target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },

    apply: function (target, thisBinding, args) {
        console.log(thisBinding)
        return args[0];
    },

    construct: function (target, args) {
        return { value: args[1] };
    }
};

var fproxy = new Proxy(function (x, y) {
    return x + y;
}, handler);

console.log(fproxy(1, 2)); // 1
new fproxy(1, 2) // {value: 2}
fproxy.prototype === Object.prototype // true
fproxy.foo === "Hello, foo" // true
 */



// Proxy 实例的方法

// #1 get()：拦截某个属性的读取操作，可以接受三个参数，
// 依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），
// 其中最后一个参数可选
/* 
var person = {
    name: "张三"
};
var proxy = new Proxy(person, {
    get: function (target, property, receiver) {
        if (property in target) {
            return target[property];
        } else {
            // throw new ReferenceError("Property \"" + property + "\" does not exist.");
            // console.log(receiver)
            // console.log(3424234)
            return 3;
        }
    }
});
console.log(proxy.name) // "张三"
console.log(proxy.age) // 抛出一个错误
 */


// get() 方法可以继承
/* 
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
 */




// 下面的例子使用get拦截，实现数组读取负数的索引
/* 
function createArray(...args) {
    let handler = {
        get(target, key, receiver) {
            let index = Number(key);
            if (index < 0) {
                key = String(target.length + index);
            }
            return Reflect.get(target, key, receiver);
        }
    }
    let target = [];
    target.push(...args);
    return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');
console.log(arr[-1]); // 'c'
 */

/* 
var pipe = (function () {
    return function (value) {
        var funcStack = [];
        var oproxy = new Proxy({}, {
            get: function (pipeObject, fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function (val, fn) {
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });

        return oproxy;
    }
}());

var double = n => n * 2;
var pow = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63
 */


// 利用get()拦截，生成DOM节点通用函数
/* 
const dom = new Proxy({}, {
    get(target, property) {
        return function (attrs = {}, ...children) {
            const el = document.createElement(property);
            for (let prop of Object.keys(attrs)) {
                el.setAttribute(prop, attrs[prop]);
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
});

const el = dom.div({},
    'Hello, my name is ',
    dom.a({ href: '//example.com' }, 'Mark'),
    '. I like:',
    dom.ul({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '…actually that\'s it')
    )
);

document.body.appendChild(el);
 */




// get方法的第三个参数，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例

const proxy = new Proxy({ name: 1 }, {
    get: function (target, property, receiver) {
        return receiver;
    }
})
console.log(proxy.getReceiver); // {name: 1}
console.log(proxy.getReceiver === proxy); // true


// proxy对象的getReceiver属性是由proxy对象提供的，
// 所以receiver指向proxy对象
/* 
const proxy = new Proxy({}, {
    get: function (target, property, receiver) {
        return receiver;
    }
});

const d = Object.create(proxy);
d.a === d // true
 */


// 如果一个属性不可配置（configurable）且不可写（writable），
// 则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错
/* 
const target = Object.defineProperties({}, {
    foo: {
        value: 123,
        writable: false,
        configurable: false
    },
});

const handler = {
    get(target, propKey) {
        return 'abc';
    }
};

const proxy = new Proxy(target, handler);

proxy.foo // TypeError: Invariant check failed
 */





// set():拦截某个属性的赋值操作,可以接受四个参数，
// 依次为目标对象、属性名、属性值和 Proxy 实例本身，
// 其中最后一个参数可选
/* 
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        // 对于满足条件的 age 属性以及其他属性，直接保存
        obj[prop] = value;
    }
};
let person = new Proxy({}, validator);
person.age = 100;
console.log(person.age); // 100
// person.age = 'young' // 报错
// person.age = 300 // 报错
 */


// 在对象上设置内部属性，结合get和set方法，防止这些内部属性被外部读写
/* 
const handler = {
    get(target, key) {
        invariant(key, 'get');
        return target[key];
    },
    set(target, key, value) {
        invariant(key, 'set');
        target[key] = value;
        return true;
    }
};
function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy.a = 123;
console.log(proxy.a)
// proxy._prop // Error: Invalid attempt to get private "_prop" property
// proxy._prop = 'c' // Error: Invalid attempt to set private "_prop" property
 */


// set方法第四个参数
/* 
const handler = {
    set: function (obj, prop, value, receiver) {
        console.log(receiver); // {}
        obj[prop] = receiver;
    }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
console.log(proxy.foo); // proxy
console.log(proxy.foo === proxy); // true
 */




// 指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身
/* 
const handler = {
    set: function (obj, prop, value, receiver) {
        obj[prop] = receiver;
    }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
 */


// 如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用
/* 
const obj = {};
Object.defineProperty(obj, 'foo', {
    value: 'bar',
    writable: false,
});

const handler = {
    set: function (obj, prop, value, receiver) {
        obj[prop] = 'baz';
    }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
console.log(proxy.foo); // "bar"
 */

// 严格模式下，set代理如果没有返回true，就会报错
/* 
'use strict';
const handler = {
    set: function (obj, prop, value, receiver) {
        obj[prop] = receiver;
        // 无论有没有下面这一行，都会报错
        return true;
    }
};
const proxy = new Proxy({}, handler);
console.log(proxy.foo = 'bar'); // TypeError: 'set' on proxy: trap returned falsish for property 'foo'
 */





// apply方法拦截函数,接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组
/* 
// 变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串
var target = function () { return 'I am the target'; };
var handler = {
    apply: function () {
        return 'I am the proxy';
    }
};
var p = new Proxy(target, handler);
console.log(p()); // "I am the proxy"
 */


// 每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截
// 另外，直接调用Reflect.apply方法，也会被拦截
/* 
var twice = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
    }
};
function sum(left, right) {
    return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
Reflect.apply(proxy, null, [9, 10]) // 38
 */


// has方法用来拦截HasProperty操作，
// 即判断对象是否具有某个属性时，这个方法会生效。
// 典型的操作就是in运算符
/* 
var handler = {
    has(target, key) {
        // if (key[0] === '_') {
        // return false;
        // }
        // return key in target;
        console.log(key)
        console.log(target)
        if (Object.keys(target).includes(key)) {
            console.log(123)
            return true
        }
    }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log('_prop' in proxy); // false
 */





// 如果原对象不可配置或者禁止扩展，这时has拦截会报错
/* 
var obj = { a: 10 };
Object.preventExtensions(obj);
var p = new Proxy(obj, {
    has: function (target, prop) {
        return false;
    }
});
'a' in p // TypeError is thrown
 */

// has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性
// has拦截对for...in循环不生效





// construct方法用于拦截new命令

// construct方法可以接受两个参数。
// target：目标对象
// args：构造函数的参数对象
// newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
// construct方法返回的必须是一个对象，否则会报错
/* 
var handler = {
    construct(target, args, newTarget) {
        return new target(...args);
    }
};
 */

/* 
var p = new Proxy(function () { }, {
    construct: function (target, args) {
        console.log('called: ' + args.join(', '));
        return { value: args[0] * 10 };
    }
});

console.log((new p(1)).value);
// "called: 1"
// 10
 */

/* 
var p = new Proxy(function () { }, {
    construct: function (target, argumentsList) {
        return 1;
    }
});
new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
 */






// deleteProperty：方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除
// 目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错
/* 
var handler = {
    deleteProperty(target, key) {
        // invariant(key, 'delete');
        // delete target[key]; // 关键在这一步拦截删除
        return true;
        // return false;
    }
};
function invariant(key, action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
console.log(proxy._prop)
delete proxy._prop
console.log(proxy._prop)
// Error: Invalid attempt to delete private "_prop" property
 */





// defineProperty方法拦截了Object.defineProperty操作
// 目标对象不可扩展，或者目标对象的某个属性不可写(writable)或不可配置(configurable),
// defineProperty方法不能改变这两个属性
/* 
var handler = {
    defineProperty(target, key, descriptor) {
        // console.log(descriptor); // { value: 'bar', writable: true, enumerable: true, configurable: true }
        target[key] = descriptor['value'] + '12312312'; // 关键步骤
        return true;
    }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar'
console.log(proxy.foo); //bar12312312
 */





// getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，
// 返回一个属性描述对象或者undefined
/* 
var handler = {
    getOwnPropertyDescriptor(target, key) {
        if (key[0] === '_') {
            return;
        }
        return Object.getOwnPropertyDescriptor(target, key);
    }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
console.log(Object.getOwnPropertyDescriptor(proxy, 'wat'))
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy, '_foo'))
// undefined
console.log(Object.getOwnPropertyDescriptor(proxy, 'baz'))
// { value: 'tar', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(target, 'baz'))
// { value: 'tar', writable: true, enumerable: true, configurable: true }
 */





// getPrototypeOf方法主要用来拦截获取对象原型
// 拦截下面这些操作:
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof

/* 
var proto = {};
var p = new Proxy({}, {
    getPrototypeOf(target) {
        return proto;
    }
});
console.log(Object.getPrototypeOf(p) === proto); // true
 */




// isExtensible方法拦截Object.isExtensible操作
// 该方法只能返回布尔值，否则返回值会被自动转为布尔值
// 它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误
// Object.isExtensible(proxy) === Object.isExtensible(target)
/* 
var p = new Proxy({}, {
    isExtensible: function (target) {
        // return true;
        return false; // // Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')
    }
});

Object.isExtensible(p)
 */





// ownKeys方法用来拦截对象自身属性的读取操作
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// for...in循环
/* 
let target = { a: 1, b: 2, c: 3 };
let handler = {
    ownKeys(target) {
        return ['a'];
    }
};
let proxy = new Proxy(target, handler);
console.log(proxy);// {a:1}
console.log(Object.keys(proxy));// ['a']
 */


// 拦截第一个字符是下划线的属性名
// 有三类属性会被ownKeys方法自动过滤，不会返回
// 目标对象上不存在的属性
// 属性名为 Symbol 值
// 不可遍历（enumerable）的属性
/* 
let target = { _bar: 'foo', _prop: 'bar', prop: 'baz' };
let handler = {
    ownKeys(target) {
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
};
let proxy = new Proxy(target, handler);
console.log(proxy); // { prop: 'baz' }
for (let key of Object.keys(proxy)) {
    console.log(target[key]);
}
// "baz"
 */

/* 
let target = { a: 1, b: 2, c: 3, [Symbol.for('secret')]: '4', };
Object.defineProperty(target, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static'
});
let handler = {
    ownKeys(target) {
        return ['a', 'd', Symbol.for('secret'), 'key'];
    }
};
let proxy = new Proxy(target, handler);
console.log(proxy) // { a: 1, [Symbol(secret)]: '4' }
console.log(Object.keys(proxy)) // ['a']
 */






// 实例：Web 服务的客户端
/* 
function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return () => httpGet(baseUrl + '/' + propKey);
        }
    });
}
 */




// Proxy支持的拦截操作
// get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。