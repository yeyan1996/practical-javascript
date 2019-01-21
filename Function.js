// 实现一个简易的bind的polyfill
const selfBind = function (bindTarget, ...args1) {
    if (typeof this !== 'function') throw new TypeError('this is not function')
    let func = this
    let boundFunc = function (...args2) {
        let args = [...args1, ...args2]
        // 使用new关键字调用返回新对象
        return new.target ? func.apply(this, args) : func.apply(bindTarget, args)
    }
    // 绑定后的函数继承绑定前的函数(非箭头函数)
    this.prototype && (boundFunc.prototype = Object.create(this.prototype))

    // 定义绑定后函数的长度和名字
    let descrs = Object.getOwnPropertyDescriptors(func)
    Object.defineProperties(boundFunc, {
        length: descrs.length,
        name: Object.assign(descrs.name, {
            value: `bound${descrs.name.value}`
        })
    })
    return boundFunc
}


Function.prototype.selfBind || (Object.defineProperty(Function.prototype, 'selfBind', {
    value: selfBind,
    enumerable: false,
    configurable: true,
    writable: true
}))


function func() {
    this.name = 'yeyan1996'
}

let example = {
    age: 22
}

let boundFunc = func.selfBind(example)

boundFunc()
console.log(example)

let x = new boundFunc()
console.log(x)


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

