// ES5循环实现reduce
const selfReduce = function (fn, initialValue) {
    let arr = Array.prototype.slice.call(this)
    if (initialValue) arr.unshift(initialValue)
    let res = arr[0]
    for (let i = 0; i < arr.length - 1; i++) {
        if(!arr.hasOwnProperty(i+1)) continue;
        // 当初始值不存在时，下标从 1 开始计算
        // 当初始值存在时，下标从 0 开始计算
        res = fn.call(null, res, arr[i + 1], initialValue === undefined ? i+1 : i, arr)
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


