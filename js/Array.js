//ES3实现map
const selfMap = function (fn, context) {
    if (!Array.isArray(this)) throw new TypeError('not Array')
    let arr = [...this]
    let mappedArr = []
    for (let i = 0; i < arr.length; i++) {
        mappedArr.push(fn.apply(context, [arr[i], i, this]))
    }
    return mappedArr
}

!Array.prototype.selfMap ? Array.prototype.selfMap = selfMap : null

let arr = ['z', 'h', 'l']

arr = arr.selfMap(function (item) {
    return item + "1"
})

console.log(arr)

//ES3实现filter
const selfFilter = function (fn, context) {
    if (!Array.isArray(this)) throw new TypeError('not Array')
    let arr = [...this]
    let filteredArr = []
    for (let i = 0; i < arr.length; i++) {
        fn.apply(context, [arr[i], i, this]) ?  filteredArr.push(arr[i]) : null
    }
    return filteredArr
}

!Array.prototype.selfFilter ? Array.prototype.selfFilter = selfFilter : null

let arr2 = [1, 2, 3]

arr2 = arr2.selfFilter(function (item) {
   return item === 2
}, ['a', 'b', 'c'])

console.log(arr2)






// const selfReduce = function (fn, initialValue) {
//     if (Object.prototype.toString.call(this) !== '[object Array]') throw new TypeError('not Array')
//     let i = 0
//     let reducedValue;
//     let that = this
//     const next = function (acc, cur, index, Array) {
//         let arr = [...that]
//         let first = arr[0]
//         if (initialValue){
//             first = initialValue
//             reducedValue = fn.apply(null, [first, arr[i], i, that])
//         }else{
//             reducedValue = fn.apply(null, [first, arr[i + 1], i, that])
//         }
//         i++
//         if (i < arr.length) {
//             console.log(reducedValue)
//             next(reducedValue, arr[i + 1], i + 1, that)
//         } else {
//             return reducedValue
//         }
//     }
//     return next()
// }
//
// !Array.prototype.selfReduce ? Array.prototype.selfReduce = selfReduce : null
//
// let arr3= [1, 2, 3]
//
// arr3 = arr3.selfReduce(function (acc,cur) {
//     return acc + cur
// })
//
// console.log(arr3)