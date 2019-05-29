// ES5循环实现reduce
const selfReduce = function (fn, initialValue) {
    let arr = Array.prototype.slice.call(this)
    if (initialValue) arr.unshift(initialValue)
    let res = arr[0]
    for (let i = 0; i < arr.length - 1; i++) {
        res = fn.call(null, res, arr[i + 1], i, arr)
    }
    return res
}

Array.prototype.selfReduce || (Object.defineProperty(Array.prototype, 'selfReduce', {
    value: selfReduce,
    enumerable: false,
    configurable: true,
    writable: true
}))


let arr = [1, 2, 3, 4, 5]
console.log(arr.selfReduce((acc, cur) => acc + cur))


