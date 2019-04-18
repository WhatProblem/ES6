// Generator 函数的异步应用

// 协程：传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。
// 其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务
/* 
function* asyncJob() {
    // ...其他代码
    var f = yield readFile(fileA);
    // ...其他代码
}

// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，
// 就是代码的写法非常像同步操作
 */





// Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。
/* 
function* gen(x) {
    try {
        var y = yield x + 2;
    } catch (e) {
        console.log(e);
    }
    return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
// 出错了
 */






// 异步任务的封装:使用 Generator 函数，执行一个真实的异步任务
/* 
var fetch = require('node-fetch')
function* gen() {
    var url = 'https://api.github.com/users/github'
    var result = yield fetch(url)
    console.log(result.bio)
}
var g = gen()
var result = g.next()
result.value.then(function (data) {
    return data.json()
}).then(function (data) {
    g.next(data)
})
 */






// Thunk 函数是自动执行 Generator 函数的一种方法
// Thunk函数的含义：编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，
// 再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数
/* 
function f(m) {
    return m * 2;
}
f(x + 5);
// 等同于
var thunk = function () {
    return x + 5;
};
function f(thunk) {
    return thunk() * 2;
}
// 传名调用
// 函数 f 的参数x + 5被一个函数替换了。凡是用到原参数的地方，对Thunk函数求值即可
 */






// JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。
// 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
// 将其替换成一个只接受回调函数作为参数的单参数函数
/* 
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);
// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback);
    };
};
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
 */





// Thunkify 模块:生产环境的转换器，建议使用 Thunkify 模块
/* 
var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function (err, str) {
    // ...
});
 */





// Generator 函数的流程管理:Thunk 函数现在可以用于 Generator 函数的自动流程管理
// Generator函数自动执行,但不适合异步操作
/* 
function* gen() {
    // ...
}
var g = gen();
var res = g.next();
while (!res.done) {
    console.log(res.value);
    res = g.next();
}
 */


// Generator函数封装两个异步操作案例：
/* 
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);
var gen = function* () {
    var r1 = yield readFileThunk('./test.txt');
    console.log(r1.toString());
    var r2 = yield readFileThunk('./1.js');
    console.log(r2.toString());
};

var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if (err) throw err;
        g.next(data);
    });
});
 */






// Thunk 函数的自动流程管理:可以自动执行 Generator 函数
/* 
function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}
function* g() {
    // ...
}
run(g);
 */





// co 模块:用于 Generator 函数的自动执行
// co函数返回一个Promise对象，因此可以用then方法添加回调函数
/* 
var gen = function* () {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
var co = require('co');
co(gen).then(function () {
    console.log('Generator 函数执行完成');
});
 */





// 基于 Promise 对象的自动执行
/* 
var fs = require('fs');
var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};
var gen = function* () {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};

// 手动执行
// var g = gen();
// g.next().value.then(function (data) {
// g.next(data).value.then(function (data) {
// g.next(data);
// });
// });

// 自动执行
function run(gen) {
    var g = gen();
    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data);
        });
    }
    next();
}
run(gen);
 */