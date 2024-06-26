// reduce实现 Array.prototype.flat，数组扁平化
// Array.prototype.flat implementation using reduce, array flattening
const selfFlat = function (depth = 1) {
  const arr = Array.prototype.slice.call(this)
  if (depth === 0)
    return arr
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      // 需要用 call 绑定 this 值，否则会指向 window
      // Need to use call to bind this value, otherwise it points to window
      return [...pre, ...selfFlat.call(cur, depth - 1)]
    }
    else {
      return [...pre, cur]
    }
  }, [])
}

Array.prototype.selfFlat || (Object.defineProperty(Array.prototype, 'selfFlat', {
  value: selfFlat,
  enumerable: false,
  configurable: true,
  writable: true,
}))
const arr = [1, 2, [3, 4, [5, 6, 7, 8], 9], 10, 11, 12, [13, 14]]

console.log(arr.selfFlat())
