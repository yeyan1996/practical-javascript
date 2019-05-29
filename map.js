// ES5循环实现map
const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = []
    for (let i = 0; i < arr.length; i++) {
        mappedArr.push(fn.call(context, arr[i], i, this))
    }
    return mappedArr
}


// reduce实现map
const selfMap2 = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, cur, index) => {
        return [...pre, fn.call(context, cur, index, this)]
    }, [])
}


Array.prototype.selfMap || (Object.defineProperty(Array.prototype, 'selfMap', {
    value: selfMap,
    enumerable: false,
    configurable: true,
    writable: true
}))
Array.prototype.selfMap2 || (Object.defineProperty(Array.prototype, 'selfMap2', {
    value: selfMap2,
    enumerable: false,
    configurable: true,
    writable: true
}))

let arr = ['z', 'h', 'l']
console.log(arr.selfMap(item => item + "1"))
console.log(selfMap2.call({}, item => item + "1"))
