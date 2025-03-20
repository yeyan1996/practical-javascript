const isFunction = func => Object.prototype.toString.call(func) === '[object Function]'

function selfAll(iterator) {
  // all 的参数必须是一个可迭代的数据结构
  // all's argument must be an iterable data structure
  if (!iterator[Symbol.iterator])
    throw new Error('argument is not iterable')
  return new Promise((resolve, reject) => {
    // 如果参数长度为0，则直接同步返回一个 resolved 状态的 promise
    // If the argument length is 0, directly return a resolved state promise synchronously
    if (!iterator.length) {
      resolve()
      return
    }
    const resolvedValues = []

    const onResolve = (res) => {
      resolvedValues.push(res)
      if (resolvedValues.length === iterator.length)
        resolve(resolvedValues)
    }

    iterator.map(item => Promise.resolve(item)).forEach((promise) => {
      promise.then(onResolve, reject)
    })
  })
}

function selfRace(iterator) {
  if (!iterator[Symbol.iterator])
    throw new Error('argument is not iterable')
  return new Promise((resolve, reject) => { // 如果参数长度为0，则返回一个永远 pending 状态的 promise
    // If the argument length is 0, return a forever pending state promise
    if (!iterator.length)
      return

    iterator.map(item => Promise.resolve(item)).forEach((promise) => {
      promise.then(resolve, reject)
    })
  })
}

// finally 满足:
// finally meets:
// finally 的 callback 不会接受任何参数
// callback of finally does not receive any arguments
// finally 的回调如果返回一个 promise，那 finally 会等待回调中的 promise 决议完成再决议自身
// If callback of finally returns a promise, then finally will wait for the callback's promise to resolve before resolving itself
// finally 返回一个 promise，并且 promise 的值是 finally 之前第一个非 finally 返回的 promise 解析后的值
// finally returns a promise, and the promise's value is the first non-finally returned promise's resolved value before finally

// 打印 1
// print 1
// e.g: Promise.resolve(1).finally(()=>{}).then(res=>console.log(res))

const selfFinally = function (callback) {
  if (!isFunction(callback))
    callback = () => {}
  // 通过 then 实现等待前面的 promise 执行完毕再执行 callback 的操作
  // Implement through then to wait until the previous promise has completed before executing the callback
  // 同时 finally 也返回一个 promise 支持继续链式调用
  // Also, finally returns a promise supporting continued chaining
  return this.then(
    // 通过 Promise.resolve 实现若 callback 是一个 promise 则等待 promise 决议后决议 finally 这个 promise
    // Use Promise.resolve to ensure if the callback is a promise, wait for it to resolve before resolving the finally promise
    // 通过 then 返回 res 实现存储上一个非 finally 的 promise 决议的值
    // Use then to return res to store the resolved value of the previous non-finally promise
    res => Promise.resolve(callback()).then(() => res),
    err => Promise.resolve(callback()).then(() => {
      throw err
    }),
  )
}

Promise.selfAll || (Object.defineProperty(Promise, 'selfAll', {
  value: selfAll,
  enumerable: false,
  configurable: true,
  writable: true,
}))

Promise.selfRace || (Object.defineProperty(Promise, 'selfRace', {
  value: selfRace,
  enumerable: false,
  configurable: true,
  writable: true,
}))

Promise.prototype.selfFinally || (Object.defineProperty(Promise.prototype, 'selfFinally', {
  value: selfFinally,
  enumerable: false,
  configurable: true,
  writable: true,
}))

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})

const promise3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

const promise4 = new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error('err'))
  }, 1500)
})

Promise.selfAll([promise1, promise2, promise3, promise4])
  .then(res => console.log(res))
  .catch(err => console.log(`promise all:${err}`))

Promise.selfRace([promise1, promise2, promise3, promise4])
  .then(res => console.log(`promise race:${res}`))

Promise.resolve('promise finally:ok')
  .selfFinally()
  .selfFinally(() => {})
  .then(res => console.log(res)) // 1

Promise.resolve('promise finally:ok')
  .finally()
  .finally(() => {})
  .then(res => console.log(res)) // 1
