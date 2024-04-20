// ES5循环实现 some 方法
const selfSome = function (fn, context) {
    let arr = Array.prototype.slice.call(this)
    // 空数组直接返回 false，数组的 every 方法则相反返回 true
    if(!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
        if(!arr.hasOwnProperty(i)) continue;
        let res = fn.call(context,arr[i],i,this)
        if(res)return true
    }
    return false
}

Array.prototype.selfSome ||(Object.defineProperty(Array.prototype, 'selfSome', {
    value: selfSome,
    enumerable: false,
    configurable: true,
    writable: true
}))

let arr = [1, 2, 3, 4, 5]
console.log(arr.selfSome(item => item === 2))
