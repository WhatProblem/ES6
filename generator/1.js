// Generator 函数:一种异步编程解决方案
// 有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）
/* 
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
for (let i = 0; i < 3; i++) {
    console.log(hw.next())
}
// { value: 'hello', done: false }
// { value: 'world', done: false }
// { value: 'ending', done: true }
 */


// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数
/* 
function* f() {
    console.log('执行了！')
}
var generator = f();
setTimeout(function () {
    generator.next()
}, 2000);
 */



// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
/* 
function* demo() {
    // console.log('Hello' + yield); // SyntaxError
    // console.log('Hello' + yield 123); // SyntaxError

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}
var de = demo()
de.next()
de.next()
 */



// yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
/* 
function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
}
 */





// 与 Iterator 接口的关系
// 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数
// 调用该函数会返回该对象的一个遍历器对象
/* 
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
 */


// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
/* 
function* gen() {
    // some code
}
var g = gen();
console.log(g[Symbol.iterator]() === g)
// true
 */



// next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
/* 
function* f() {
    for (var i = 0; true; i++) {
        console.log(i)
        var reset = yield i;
        console.log(reset)
        console.log(i)
        if (reset) { i = -1; console.log(i) }
    }
}
var g = f();
console.log(g.next()) // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next() // { value: 0, done: false }
g.next(true)
g.next()
g.next()
 */





/* 
function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
 */


/* 
function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}
let genObj = dataConsumer();
genObj.next(); // Started
genObj.next('a') // 1. a
genObj.next('b') // 2. b
console.log(genObj.next())
 */

// 如果想要第一次调用next方法时，就能够输入值，可以在 Generator 函数外面再包一层
/* 
function wrapper(generatorFunction) {
    return function (...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    };
}
const wrapped = wrapper(function* () {
    console.log(`First input: ${yield}`);
    return 'DONE';
});
wrapped().next('hello!')
// First input: hello!
 */





// for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法
/* 
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (let v of foo()) {
    console.log(v);
}
// 1 2 3 4 5
 */



// 通过 Generator 函数为传统对象加上遍历接口
/* 
function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}
let jane = { first: 'Jane', last: 'Doe' };
for (let [key, value] of objectEntries(jane)) {
    console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
 */


/* 
function* objectEntries() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}
let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;
for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
}
 */



/* 
// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数
function* numbers() {
    yield 1
    yield 2
    return 3
    yield 4
}
// 扩展运算符
[...numbers()] // [1, 2]
// Array.from 方法
Array.from(numbers()) // [1, 2]
// 解构赋值
let [x, y] = numbers();
x // 1
y // 2
// for...of 循环
for (let n of numbers()) {
    console.log(n)
}
// 1
// 2
 */







// Generator.prototype.return()：可以返回给定的值，并且终结遍历 Generator 函数
/* 
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
g.next() // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next() // { value: undefined, done: true }
 */


// 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行
/* 
function* numbers() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
 */