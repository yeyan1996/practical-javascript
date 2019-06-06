const isFunction = func => Object.prototype.toString.call(func) === '[object Function]'

const selfAll = iterator => {
    // all 的参数必须是一个可迭代的数据结构
    if (!iterator[Symbol.iterator]) throw new Error('argument is not iterable')
    return new Promise((resolve, reject) => {
        // 如果参数长度为0，则直接同步返回一个 resolved 状态的 promise
        if (!iterator.length) {
            resolve()
            return
        }
        let resolvedValues = []

        let onResolve = res => {
            resolvedValues.push(res)
            if (resolvedValues.length === iterator.length) {
                resolve(resolvedValues)
            }
        }

        iterator.map(item => Promise.resolve(item)).forEach(promise => {
            promise.then(onResolve, reject)
        })

    })
}

const selfRace = iterator => {
    if (!iterator[Symbol.iterator]) throw new Error('argument is not iterable')
    return new Promise((resolve, reject) => { // 如果参数长度为0，则返回一个永远 pending 状态的 promise
        if (!iterator.length) {
            return
        }
        iterator.map(item => Promise.resolve(item)).forEach(promise => {
            promise.then(resolve, reject)
        })
    })
}

// finally 满足:
// finally 的 callback 不会接受任何参数
// finally 的回调如果返回一个 promise，那 finally 会等待回调中的 promise 决议完成再决议自身
// finally 返回一个 promise，并且 promise 的值是 finally 之前第一个非 finally 返回的 promise 解析后的值
// Promise.resolve(1).finally(()=>{}).then(res=>console.log(res)) // 1
const selfFinally = function (callback) {
    if (!isFunction(callback)) callback = () => {}
    return this.then(
        res => Promise.resolve(callback()).then(() => res),
        err => Promise.resolve(callback()).then(() => {
            throw err
        })
    )
}


Promise.selfAll || (Object.defineProperty(Promise, 'selfAll', {
    value: selfAll,
    enumerable: false,
    configurable: true,
    writable: true
}))

Promise.selfRace || (Object.defineProperty(Promise, 'selfRace', {
    value: selfRace,
    enumerable: false,
    configurable: true,
    writable: true
}))

Promise.prototype.selfFinally || (Object.defineProperty(Promise.prototype, 'selfFinally', {
    value: selfFinally,
    enumerable: false,
    configurable: true,
    writable: true
}))


let promise1 = new Promise(resolve => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})

let promise2 = new Promise(resolve => {
    setTimeout(() => {
        resolve(2)
    }, 2000)
})

let promise3 = new Promise(resolve => {
    setTimeout(() => {
        resolve(3)
    }, 3000)
})

let promise4 = new Promise((_, reject) => {
    setTimeout(() => {
        reject('err')
    }, 1500)
})


Promise.selfAll([promise1, promise2, promise3, promise4])
    .then(res => console.log(res))
    .catch(err => console.log('promise all:' + err))

Promise.selfRace([promise1, promise2, promise3, promise4])
    .then(res => console.log('promise race:' + res))

Promise.resolve('promise finally:ok')
    .selfFinally()
    .selfFinally(() => {})
    .then(res => console.log(res)) //1

Promise.resolve('promise finally:ok')
    .finally()
    .finally(() => {})
    .then(res => console.log(res)) //1
