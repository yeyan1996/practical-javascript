// 简单实现 JSON.stringify 方法
// Simple implementation of JSON.stringify method

const isString = value => typeof value === 'string'
const isSymbol = value => typeof value === 'symbol'
const isUndefined = value => typeof value === 'undefined'
const isDate = obj => Object.prototype.toString.call(obj) === '[object Date]'
const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'
const isComplexDataType = value => (typeof value === 'object' || typeof value === 'function') && value !== null

// 合法的基础类型
// Legal basic types
const isValidBasicDataType = value => value !== undefined && !isSymbol(value)

// 合法的复杂类型(对象)
// Legal complex types (objects)
const isValidObj = obj => Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]'
const isInfinity = value => value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY

// 在数组中存在 Symbol/Undefined/Function 类型会变成 null
// Symbol/Undefined/Function types in arrays will be converted to null
// Infinity/NaN 也会变成 null
// Infinity/NaN will also become null
function processSpecialValueInArray(value) {
  return isSymbol(value) || isFunction(value) || isUndefined(value) || isInfinity(value) || isNaN(value) ? null : value
}

// 根据 JSON 规范处理属性值
// Process property values according to JSON specification
function processValue(value) {
  if (isInfinity(value) || isNaN(value))
    return null

  if (isString(value))
    return `"${value}"`

  return value
}

const s = Symbol('s')
const obj = {
  str: '123',
  arr: [1, { e: 1 }, s, () => {
  }, undefined, Number.POSITIVE_INFINITY, Number.NaN],
  obj: { a: 1 },
  Infinity: Number.NEGATIVE_INFINITY,
  nan: Number.NaN,
  undef: undefined,
  symbol: s,
  date: new Date(),
  reg: /123/g,
  func: () => {
  },
  dom: document.querySelector('body'),
}

// 闭包 + WeakMap 防止循环引用
// Closure + WeakMap to prevent circular references
const jsonStringify = (function () {
  const wp = new WeakMap()
  // 递归调用 jsonStringify 的都是闭包中的这个函数，而非 const 声明的 jsonStringify 函数
  // Recursive calls to jsonStringify use this function in the closure, not the jsonStringify function declared with const
  return function jsonStringify(obj) {
    if (wp.get(obj))
      throw new TypeError('Converting circular structure to JSON')
    let res = ''

    if (isComplexDataType(obj)) { // 复杂类型的情况
      // In case of complex types
      if (obj.toJSON)
        return obj.toJSON // 含有 toJSON 方法则直接调用
      // Directly call toJSON if available
      if (!isValidObj(obj)) { // 非法的复杂类型直接返回
        // Return directly for invalid complex types
        return
      }
      wp.set(obj, obj)

      if (Array.isArray(obj)) { // 数组的情况
        // In case of arrays
        res += '['
        const temp = [] // 声明一个临时数组用来控制属性之间的逗号
        // A temporary array to manage commas between properties
        obj.forEach((value) => {
          temp.push(
            isComplexDataType(value) && !isFunction(value)
              ? jsonStringify(value)
              : `${processSpecialValueInArray(value, true)}`,
          )
        })
        res += `${temp.join(',')}]`
      }
      else {
        // 对象的情况
        // In case of objects
        res += '{'
        const temp = []
        Object.keys(obj).forEach((key) => {
          // 值是对象的情况
          // When the value is an object
          if (isComplexDataType(obj[key])) {
            // 值是合法对象的情况
            // When the value is a valid object
            if (isValidObj(obj[key])) {
              temp.push(`"${key}":${jsonStringify(obj[key])}`)
            }
            else if (isDate(obj[key])) { // Date 类型调用 toISOString
              // Handle Date type with toISOString
              temp.push(`"${key}":"${obj[key].toISOString()}"`)
            }
            else if (!isFunction(obj[key])) { // 其余非函数类型返回空对象
              // Return empty object for other non-function types
              temp.push(`"${key}":{}`)
            }
          }
          else if (isValidBasicDataType(obj[key])) { // 值是基本类型
            // When the value is a basic type
            temp.push(`"${key}":${processValue(obj[key])}`)
          }
        })
        res += `${temp.join(',')}}`
      }
    }
    else if (isSymbol(obj)) {
      // Symbol 返回 undefined
      // Return undefined for Symbols
      return
    }
    else {
      // 非 Symbol 的基本类型直接返回
      // Directly return for non-Symbol basic types
      return obj
    }
    return res
  }
})()

console.log(jsonStringify(obj))
console.log(JSON.stringify(obj))
