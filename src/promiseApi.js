const isFunction = func => Object.prototype.toString.call(func) === '[object Function]'

function selfAll(iterator) {
  // all 的参数必须是一个可迭代的数据结构
  if (!iterator[Symbol.iterator])
    throw new Error('argument is not iterable')
  return new Promise((resolve, reject) => {
    // 如果参数长度为0，则直接同步返回一个 resolved 状态的 promise
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
    if (!iterator.length)
      return

    iterator.map(item => Promise.resolve(item)).forEach((promise) => {
      promise.then(resolve, reject)
    })
  })
}

// const selfAllSettled = iterator => {
//     if (!iterator[Symbol.iterator]) throw new Error('argument is not iterable')
//     return new Promise((resolve,reject) => {
//
//     })
// }

// finally 满足:
// finally 的 callback 不会接受任何参数
// finally 的回调如果返回一个 promise，那 finally 会等待回调中的 promise 决议完成再决议自身
// finally 返回一个 promise，并且 promise 的值是 finally 之前第一个非 finally 返回的 promise 解析后的值
// e.g: Promise.resolve(1).finally(()=>{}).then(res=>console.log(res)) // 打印 1

const selfFinally = function (callback) {
  if (!isFunction(callback))
    callback = () => {}
  // 通过 then 实现等待前面的 promise 执行完毕再执行 callback 的操作
  // 同时 finally 也返回一个 promise 支持继续链式调用
  return this.then(
    // 通过 Promise.resolve 实现若 callback 是一个 promise 则等待 promise 决议后决议 finally 这个 promise
    // 通过 then 返回 res 实现存储上一个非 finally 的 promise 决议的值
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

// Promise.selfAllSettled || (Object.defineProperty(Promise, 'selfAllSettled', {
//     value: selfAllSettled,
//     enumerable: false,
//     configurable: true,
//     writable: true
// }))

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
    reject('err')
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
