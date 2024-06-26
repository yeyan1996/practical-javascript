// 启用严格模式在尝试给基本包装类型已定义的下标赋值的时候报错
// Enabling strict mode throws an error when attempting to assign a value to a subscript that has been defined for a primitive wrapper type.
'use strict'

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

const selfAssign = function (target, ...source) {
  if (target == null)
    throw new TypeError('Cannot convert undefined or null to object')
  return source.reduce((acc, cur) => {
    isComplexDataType(acc) || (acc = new Object(acc)) // 变成一个基本包装类型
    if (cur == null)
      return acc; // source为null,undefined时忽略
    // 遍历出Symbol属性和可枚举属性
    [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach((key) => {
      acc[key] = cur[key]
    })
    return acc
  }, target)
}

Object.selfAssign || Object.defineProperty(Object, 'selfAssign', {
  value: selfAssign,
  configurable: true,
  enumerable: false,
  writable: false,
})

const target = {
  a: 1,
  b: 1,
}

const obj1 = {
  a: 2,
  b: 2,
  c: undefined,
}

const obj2 = {
  a: 3,
  b: 3,
  [Symbol('a')]: 3,
  d: null,
}

console.log(Object.selfAssign(target, obj1, obj2))
console.log(Object.selfAssign('abd', null, undefined))
