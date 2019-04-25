// Promise.finally():finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的
/* 
new Promise((resolve, reject) => {
    console.log(123)
    resolve(456)
}).then(res => {
    console.log(res)
}).finally(() => {
    console.log('最后执行')
})
 */



// Promise.all([p1,p2]) 所有promise都执行结束后才会最终触发
// 如果p2没有catch，将会调用Promise.all()的catch捕获
/* 
const p1 = new Promise((resolve, reject) => {
    resolve('hello')
}).then(res => {
    // console.log(console.log(res))
    return res
})
const p2 = new Promise((resolve, reject) => {
    throw new Error('p2报错')
    // resolve('world')
}).then(res => {
    // console.log(res)
    return res
})
// .catch(err => {
// // console.log(err)
// return err
// })
Promise.all([p1, p2])
    .then(res => console.log(res))
    .catch(e => console.log(e)) // 都没有catch会调用这个catch
 */


// demo
/* 
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['hello'])
    }, 1000);
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['world'])
    }, 3000);
})

Promise.all([p1, p2]).then(res => console.log(res))
 */





// Promise.race() 将多个 Promise 实例，包装成一个新的 Promise 实例
// const p = Promise.race([p1, p2, p3]);
// 率先改变的 Promise 实例的返回值，就传递给p的回调函数
/* 
let p1 = new Promise((resolve, reject) => {
    // setTimeout(() => {
    // resolve(['hello'])
    // }, 1000);
    setTimeout(() => {
        throw new Error('p1报错')
    }, 1000);
})
    .catch(err => err)
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(['world'])
    }, 3000);
})

Promise.race([p1, p2])
    .then(res => console.log(res))
// .catch(err => console.log(err))
 */




// Promise.resolve()方法返回一个新的promise对象，状态为resolve的thenable对象
// Promise.resolve(123).then(res => console.log(res))




// Promise.resolve()方法返回一个新的promise对象，状态为reject的thenable对象
// Promise.reject(456).then(null, res => console.log(res))



// Promise.try() 就是模拟try代码块，就像promise.catch模拟的是catch代码块