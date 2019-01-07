const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

//简单实现ES6的Object.assign
const selfAssign = function (target, ...source) {
    if (target === null || target === undefined) throw new TypeError('不能传入null/undefined')
    isComplexDataType(target) || (target = new Object(target)) //变成一个基本包装类型
    return source.reduce((acc, cur) => {
        // 遍历出Symbol属性和可枚举属性
        // 字符串因为有iterator接口可被枚举,Object.assign会会遍历字符串所以可枚举的属性(没有length)
        [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(key => {
            acc[key] = cur[key]
        })
        return acc
    }, target)
}

Object.selfAssign || Object.defineProperty(Object, 'selfAssign', {
    value: selfAssign,
    configurable: true,
    enumerable: false,
    writable: false
})


let target = {
    a: 1,
    b: 1
}

let obj1 = {
    a: 2,
    b: 2,
    c:undefined
}

let obj2 = {
    a: 3,
    b: 3,
    [Symbol("a")]: 3,
    d:null
}

console.log(Object.selfAssign(target, false, obj2))



