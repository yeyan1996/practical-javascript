// 循环实现map
// Implementing map with a loop
const selfMap = function (fn, context) {
  const arr = Array.prototype.slice.call(this)
  const mappedArr = []
  for (let i = 0; i < arr.length; i++) {
    // 判断稀疏数组的情况
    // Check for sparse array cases
    if (!arr.hasOwnProperty(i))
      continue
    mappedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mappedArr
}

// reduce实现map
// Implementing map with reduce
// 由于 reduce 会跳过空单元数组，所以这个 polyfill 无法处理空单元数组
// Since reduce skips empty array slots, this polyfill cannot handle empty slot arrays
const selfMap2 = function (fn, context) {
  const arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => [...pre, fn.call(context, cur, index, this)], [])
}

Array.prototype.selfMap || (Object.defineProperty(Array.prototype, 'selfMap', {
  value: selfMap,
  enumerable: false,
  configurable: true,
  writable: true,
}))
Array.prototype.selfMap2 || (Object.defineProperty(Array.prototype, 'selfMap2', {
  value: selfMap2,
  enumerable: false,
  configurable: true,
  writable: true,
}))

const arr = ['z', 'h', 'l']
console.log(arr.selfMap(item => `${item}1`))
// map 方法同样支持类数组
// The map method also supports array-like objects
console.log(selfMap2.call({ 0: 'a', 1: 'b', length: 2 }, item => `${item}1`))
