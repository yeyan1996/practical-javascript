function selfIsArray(obj) {
    let stringType = Object.prototype.toString.call(obj)
    let index = stringType.indexOf("]")
    return stringType.slice(8,index) === 'Array'
}

Array.selfIsArray || (Array.selfIsArray = selfIsArray)

//ES3实现map
const selfMap = function (fn, context) {
    if (!Array.selfIsArray(this)) throw new TypeError('not Array')
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
    if (!Array.selfIsArray(this)) throw new TypeError('not Array')
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


// reduce实现ES6的Array.prototype.flat(Infinity)
let arr3 = [1, 2, [3, 4, [5, 6, 7, 8], 9], 10, 11, 12, [13, 14]]

function selfFlat(array) {
    return array.reduce((acc,cur)=>{
        if(Array.selfIsArray(cur)){
            return [...acc,...selfFlat(cur)]
        }else{
            return [...acc,cur]
        }
    },[])
}

//剪头函数简写
let selfFlat2 = array => array.reduce((acc, cur) => (Array.selfIsArray(cur) ? [...acc, ...selfFlat(cur)] : [...acc, cur]), [])

console.log(selfFlat2(arr3))
