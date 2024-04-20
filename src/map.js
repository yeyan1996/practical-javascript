// 循环实现map
const selfMap = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    let mappedArr = Array()
    for (let i = 0; i < arr.length; i++) {
        // 判断稀疏数组的情况
        if (!arr.hasOwnProperty(i)) continue;
        mappedArr[i] = fn.call(context, arr[i], i, this)
    }
    return mappedArr
}


// reduce实现map
// 由于 reduce 会跳过空单元数组，所以这个 polyfill 无法处理空单元数组
const selfMap2 = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    return arr.reduce((pre, cur, index) => [...pre, fn.call(context, cur, index, this)], [])
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

let arr = ['z', 'h', ,'l']
console.log(arr.selfMap(item => item + "1"))
console.log(selfMap2.call({0:'a',1:'b',length:2}, item => item + "1")) // map 方法同样支持类数组
