// ES5循环实现reduce
// ES5 loop implementation of reduce

Array.prototype.selfReduce = function (fn, initialValue) {
  const arr = Array.prototype.slice.call(this)
  let res
  let startIndex
  if (initialValue === undefined) {
    // 找到第一个非空单元（真实）的元素和下标
    // Find the first non-empty (real) element and its index
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i))
        continue
      startIndex = i
      res = arr[i]
      break
    }
  }
  else {
    res = initialValue
  }
  // 遍历的起点为上一步中找到的真实元素后面一个真实元素
  // The starting point of the iteration is the real element found in the previous step
  // 每次遍历会跳过空单元的元素
  // Each iteration skips over empty slots
  for (let i = ++startIndex || 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i))
      continue
    res = fn.call(null, res, arr[i], i, this)
  }
  return res
}

Array.prototype.selfReduce || (Object.defineProperty(Array.prototype, 'selfReduce', {
  value: selfReduce,
  enumerable: false,
  configurable: true,
  writable: true,
}))

const arr = [1, 2, 3, 4, 5]

console.log(arr.selfReduce((acc, cur) => acc + cur))
console.log(arr.reduce((acc, cur) => acc + cur))
