const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

// 实现一个简易的bind
const selfBind = function (bindTarget, ...args1) {
    if (typeof this !== 'function') throw new TypeError('this is not function')
    let func = this
    let boundFunc = function (...args2) {
        let args = [...args1, ...args2]

        // 使用new关键字调用返回新对象
        if (new.target) {
            let res = func.apply(this, args)
            //如果构造函数返回一个对象则返回这个对象
            if (isComplexDataType(res)) return res
            //否则返回新建的对象
            return this
        } else {
            func.apply(bindTarget, args)
        }
    }
    // 绑定后的函数继承绑定前的函数(非箭头函数)
    /**真正的bind创建的函数是没有prototype的,但是使用new会将创建的对象连接到bind前函数的prototype(非箭头函数)**/
    this.prototype && (boundFunc.prototype = Object.create(this.prototype))

    // 定义绑定后函数的长度和名字
    let desc = Object.getOwnPropertyDescriptors(func)
    Object.defineProperties(boundFunc, {
        length: desc.length,
        name: Object.assign(desc.name, {
            value: `bound${desc.name.value}`
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
    return {}
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

