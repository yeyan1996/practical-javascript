// ES5循环实现filter
// ES5 loop implementation of filter
const selfFilter = function (fn, context) {
  const arr = Array.prototype.slice.call(this)
  const filteredArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i))
      continue
    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
  }
  return filteredArr
}

// reduce实现filter
// filter implementation using reduce
const selfFilter2 = function (fn, context) {
  return this.reduce((pre, cur, index) => {
    return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre]
  }, [])
}

Array.prototype.selfFilter || (Object.defineProperty(Array.prototype, 'selfFilter', {
  value: selfFilter,
  enumerable: false,
  configurable: true,
  writable: true,
}))

Array.prototype.selfFilter2 || (Object.defineProperty(Array.prototype, 'selfFilter2', {
  value: selfFilter2,
  enumerable: false,
  configurable: true,
  writable: true,
}))

const arr = [1, 2, 3]
console.log(arr.selfFilter(item => item === 2))

// 当给filter函数传入第二个参数时,第一个参数不能为箭头函数
// When passing a second argument to the filter function, the first parameter cannot be an arrow function
// 否则由于词法绑定，第二个参数会失效，其他迭代方法同理
// Otherwise, due to lexical binding, the second parameter will become ineffective; the same applies to other iterative methods
console.log(arr.selfFilter2((item) => {
  return item === 2
}, ['a', 'b', 'c']))
