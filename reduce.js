// ES5循环实现reduce

/**
 * @description 找到第一个非 empty 的元素的下标
 * @param {Array} arr -参数说明
 * @param {Number} [initIndex] -遍历的起始下标
 * @return {Number} 真实元素的下标
 **/
const findRealElementIndex = function (arr, initIndex) {
    let index
    for (let i = initIndex || 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue;
        index = i
        break
    }
    return index
}

const selfReduce = function (fn, initialValue) {
    let arr = Array.prototype.slice.call(this)
    let res;

    if (initialValue === undefined) {
        res = arr[findRealElementIndex(arr)]
        for (let i = 0; i < arr.length - 1; i++) {
            if (!arr.hasOwnProperty(i)) continue;
            // reduce 遍历时，需要跳过稀疏元素，找到最近一个非稀疏元素
            let realElementIndex = findRealElementIndex(arr, i + 1)
            res = fn.call(null, res, arr[realElementIndex], realElementIndex, this)
        }
    } else {
        res = initialValue
        for (let i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) continue;
            res = fn.call(null, res, arr[i], i, this)
        }
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
console.log(arr.reduce((acc, cur) => acc + cur))
