// selfCall (ES6)
const selfCall = function (context, ...args) {
  const func = this
  context || (context = window)
  if (typeof func !== 'function')
    throw new TypeError('this is not function')
  const caller = Symbol('caller')
  context[caller] = func
  const res = context[caller](...args)
  delete context[caller]
  return res
}

Function.prototype.selfCall || (Object.defineProperty(Function.prototype, 'selfCall', {
  value: selfCall,
  enumerable: false,
  configurable: true,
  writable: true,
}))

const example2 = { a: 1 }
func.selfCall(example2)
console.log(example2)
