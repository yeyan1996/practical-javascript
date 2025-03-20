// implementation of reduce
Array.prototype.selfReduce = function (callbackFn, initialValue) {
  if (typeof callbackFn !== 'function')
    throw new TypeError(`${callbackFn} is not a function`)

  const arr = this
  const hasInitialValue = initialValue !== undefined
  let accumulator = hasInitialValue ? initialValue : arr[0]

  if (!hasInitialValue && arr.length === 0)
    throw new TypeError('Reduce of empty array with no initial value')

  for (let i = hasInitialValue ? 0 : 1; i < arr.length; i++) {
    if (Object.prototype.hasOwnProperty.call(arr, i))
      accumulator = callbackFn(accumulator, arr[i], i, arr)
  }

  return accumulator
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
