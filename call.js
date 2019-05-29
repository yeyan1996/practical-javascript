//selfCall(ES6版本)
const selfCall = function (context, ...args) {
    let func = this
    context || (context = window)
    if (typeof func !== 'function') throw new TypeError('this is not function')
    let caller = Symbol('caller')
    context[caller] = func
    let res = context[caller](...args)
    delete context[caller]
    return res
}


Function.prototype.selfCall || (Object.defineProperty(Function.prototype, 'selfCall', {
    value: selfCall,
    enumerable: false,
    configurable: true,
    writable: true
}))

let example2 = {a: 1}
func.selfCall(example2)
console.log(example2)

