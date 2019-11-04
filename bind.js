const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

// 实现一个简易的bind
const selfBind = function (bindTarget, ...args1) {
    if (typeof this !== 'function') throw new TypeError('Bind must be called on a function')
    const originFunc = this
    const boundFunc = function (...args2) {
        // 使用new关键字调用返回新对象
        if (new.target) {
            let res = originFunc.call(this, ...args1, ...args2)
            //如果构造函数返回一个对象则返回这个对象
            if (isComplexDataType(res)) return res
            //否则返回新建的对象
            return this
        } else {
            originFunc.call(bindTarget, ...args1, ...args2)
        }
    }
    /**
     * 真正的 bind 创建的函数是没有 prototype 的，取而代之有个 [[TargetFunction]] 保存 bind 前的函数
     * 使用 new 会将创建的对象的 __proto__ 连接 [[TargetFunction] prototype (非箭头函数)
     * 这里给 bind 后的函数手动设置一个 prototype 属性，模拟这个行为
     * **/
    // 箭头函数则没有 prototype
    if (originFunc.prototype) {
        boundFunc.prototype = originFunc.prototype
    }

    // 定义绑定后函数的长度和名字
    const desc = Object.getOwnPropertyDescriptors(originFunc)
    Object.defineProperties(boundFunc, {
        length: desc.length,
        name: Object.assign(desc.name, {
            value: `bound ${desc.name.value}`
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


function originFunc() {
    this.name = 'yeyan1996'
    return {}
}

let obj = {
    age: 22
}

const boundFunc = originFunc.selfBind(obj)

console.dir(originFunc)
console.dir(boundFunc)

// 即使绑定了 obj，但是使用 new 作为构造函数执行时 this 还是会指向新创建的对象
// 即不会给 obj 添加 name 属性
new boundFunc()
console.log(obj)

// 其他情况指向 boundFunc 会给绑定的 obj 对象添加 name 属性
boundFunc()
console.log(obj)


function originFunc2() {
    this.name = 'yeyan1996'
}

const boundFunc2 = originFunc2.selfBind({})
let instance = new boundFunc2()
// 将绑定后的函数作为构造函数，生成的对象的 __proto__ 指向绑定前函数的 prototype
console.log(instance.__proto__ === originFunc2.prototype)
