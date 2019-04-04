const isType = type => target => {
    let stringType = Object.prototype.toString.call(target)
    let index = stringType.indexOf("]")
    return stringType.slice(8, index) === type
}

const selfIsArray = isType('Array')

Array.selfIsArray || (Object.defineProperty(Array, 'selfIsArray', {
    value: selfIsArray,
    enumerable: false,
    configurable: true,
    writable: true
}))


//循环实现map
const selfMap = function (fn, context) {
    if (!Array.selfIsArray(this)) throw new TypeError('not Array')
    let arr = [...this]
    let mappedArr = []
    for (let i = 0; i < arr.length; i++) {
        mappedArr.push(fn.apply(context, [arr[i], i, this]))
    }
    return mappedArr
}


//reduce实现map
const selfMap2 = function (fn, context = null) {
    return this.reduce((acc, cur, index) => {
        return [...acc, fn.call(context, cur, index, this)]
    }, [])
}


Array.prototype.selfMap || (Array.prototype.selfMap = selfMap)
Array.prototype.selfMap2 || (Array.prototype.selfMap2 = selfMap2)


let arr = ['z', 'h', 'l']
console.log(arr.selfMap(item => item + "1"))
console.log(arr.selfMap2(item => item + "1"))


//循环实现filter
const selfFilter = function (fn, context) {
    if (!Array.selfIsArray(this)) throw new TypeError('not Array')
    let arr = [...this]
    let filteredArr = []
    for (let i = 0; i < arr.length; i++) {
        fn.apply(context, [arr[i], i, this]) ? filteredArr.push(arr[i]) : null
    }
    return filteredArr
}


//reduce实现filter
const selfFilter2 = function (fn, context) {
    return this.reduce((acc, cur, index) => {
        return fn.call(context, cur, index, this) ? [...acc, cur] : [...acc]
    }, [])
}

Array.prototype.selfFilter || (Array.prototype.selfFilter = selfFilter)
Array.prototype.selfFilter2 || (Array.prototype.selfFilter2 = selfFilter2)

let arr2 = [1, 2, 3]
console.log(arr2.selfFilter(item => item === 2))

//使用filter第二个参数时,第一个参数不能为箭头函数,否则为词法绑定
console.log(arr2.selfFilter2(function (item) {
    console.log(this)
    return item === 2
}, ['a', 'b', 'c']))


//循环实现reduce
const selfReduce = function (fn, initialValue) {
    if (!this instanceof Array) throw new TypeError('not an Array')
    let arr = [...this]
    if (initialValue) arr.unshift(initialValue)
    let res = arr[0]
    for (let i = 0; i < arr.length - 1; i++) {
        res = fn.call(null, res, arr[i + 1], i, arr)
    }
    return res
}

Array.prototype.selfReduce || (Array.prototype.selfReduce = selfReduce)

let arr3 = [1, 2, 3, 4, 5]
console.log(arr3.selfReduce((acc, cur) => acc + cur))


//reduce实现数组扁平化
const selfFlat = function (array) {
    return array.reduce((acc, cur) => {
        if (Array.selfIsArray(cur)) {
            return [...acc, ...selfFlat(cur)]
        } else {
            return [...acc, cur]
        }
    }, [])
}

//箭头函数简写
const selfFlat2 = array => array.reduce((acc, cur) => (Array.selfIsArray(cur) ? [...acc, ...selfFlat2(cur)] : [...acc, cur]), [])

let arr4 = [1, 2, [3, 4, [5, 6, 7, 8], 9], 10, 11, 12, [13, 14]]
console.log(selfFlat2(arr4))


//reduce实现some方法
const selfSome = function (fn, context) {
    let res = true
    this.reduce((acc, cur, index) => {
        if (!fn.call(context, cur, index, this)) res = false
    }, [])
    return res
}

Array.prototype.selfSome || (Array.prototype.selfSome = selfSome)

let arr5 = [1, 2, 3, 4, 5]
console.log(arr5.selfSome(item => item === 2))
