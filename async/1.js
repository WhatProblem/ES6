// ES2017 标准引入了 async 函数，使得异步操作变得更加方便
// 它是 Generator 函数的语法糖
/* 
class Sleep {
    constructor(timeout) {
        this.timeout = timeout;
    }
    then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(
            () => resolve(Date.now() - startTime),
            this.timeout
        );
    }
}

(async () => {
    const actualTime = await new Sleep(1000);
    console.log(actualTime);
})();
 */




// 错误捕捉
// await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行
// retrun 语句也会使async函数中断
/* 
async function f() {
    // return 123;
    await Promise.reject('出错了');
}
f().then(v => console.log(v))
    .catch(e => console.log(e))
// 出错了
 */

/* 
async function f() {
    await Promise.reject('出错了');
    await Promise.resolve('hello world'); // 不会执行
}

f().then(v => console.log(v)) // 出错了
    .catch(e => console.log(e))
 */


// #1. 我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
// 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行
/* 
async function f() {
    try {
        await Promise.reject('出错了');
    } catch (e) {
    }
    return await Promise.resolve('hello world');
}

f().then(v => console.log(v))
// hello world
 */


// #2. 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误
/* 
async function f() {
    await Promise.reject('出错了')
        .catch(e => console.log(e));
    return await Promise.resolve('hello world');
}
f().then(v => console.log(v))
// 出错了
// hello world
 */





// 下面的例子使用try...catch结构，实现多次重复尝试
/* 
const superagent = require('superagent');
const NUM_RETRIES = 3;
async function test() {
    let i;
    for (i = 0; i < NUM_RETRIES; ++i) {
        try {
            await superagent.get('http://google.com/this-throws-an-error');
            break;
        } catch (err) { }
    }
    console.log(i); // 3
}
test();
 */






// 使用注意点
// 第一点：所以最好把await命令放在try...catch代码块中
/* 
async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}

// 另一种写法

async function myFunction() {
    await somethingThatReturnsAPromise()
        .catch(function (err) {
            console.log(err);
        });
}
 */


// 第二点：如果不存在继发关系，最好让它们同时触发
/* 
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
 */


// await命令只能用在async函数之中，如果用在普通函数，就会报错







// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里
/* 
async function fn(args) {
    // ...
}

// 等同于
function fn(args) {
    return spawn(function* () {
        // ...
    });
}
 */





// 按顺序完成异步操作
// 继发请求:依次执行，效率很低
/* 
async function logInOrder(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
    }
}
 */


// 并发请求：同时执行，提高效率
/* 
async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });

    // 按次序输出结果
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}
 */





// 异步遍历器的最大的语法特点，就是调用遍历器的next方法，返回的是一个 Promise 对象
/* 
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

asyncIterator.next()
    .then(iterResult1 => {
        console.log(iterResult1); // { value: 'a', done: false }
        return asyncIterator.next();
    })
    .then(iterResult2 => {
        console.log(iterResult2); // { value: 'b', done: false }
        return asyncIterator.next();
    })
    .then(iterResult3 => {
        console.log(iterResult3); // { value: undefined, done: true }
    });
 */


// 由于异步遍历器的next方法，返回的是一个 Promise 对象。因此，可以把它放在await命令后面
/* 
async function f() {
    const asyncIterable = createAsyncIterable(['a', 'b']);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    console.log(await asyncIterator.next());
    // { value: 'a', done: false }
    console.log(await asyncIterator.next());
    // { value: 'b', done: false }
    console.log(await asyncIterator.next());
    // { value: undefined, done: true }
}
 */


// 异步遍历器的next方法是可以连续调用的，不必等到上一步产生的 Promise 对象resolve以后再调用。这种情况下，next方法会累积起来，自动按照每一步的顺序运行下去
/* 
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
const [{ value: v1 }, { value: v2 }] = await Promise.all([
    asyncIterator.next(), asyncIterator.next()
]);

console.log(v1, v2); // a b
 */


// 另一种用法是一次性调用所有的next方法，然后await最后一步操作
/* 
async function runner() {
    const writer = openFile('someFile.txt');
    writer.next('hello');
    writer.next('world');
    await writer.return();
}
runner();
 */






// for await ...of :用于遍历异步的 Iterator 接口
/* 
async function f() {
    for await (const x of createAsyncIterable(['a', 'b'])) {
        console.log(x);
    }
}
// a
// b
 */


// for await...of循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环
/* 
let body = '';
async function f() {
    for await (const data of req) body += data;
    const parsed = JSON.parse(body);
    console.log('got', parsed);
}
 */





// yield*语句也可以跟一个异步遍历器
/* 
async function* gen1() {
    yield 'a';
    yield 'b';
    return 2;
}
async function* gen2() {
    // result 最终会等于 2
    const result = yield* gen1();
}

(async function () {
    for await (const x of gen2()) {
        console.log(x);
    }
})();
// a
// b
 */





// 异步 Generator 函数: async函数与 Generator 函数的结合
/* 
async function* gen() {
    yield 'hello';
}
const genObj = gen();
genObj.next().then(x => console.log(x));
// { value: 'hello', done: false }
 */