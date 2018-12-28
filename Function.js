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
    return boundFunc
}

Function.prototype.selfBind || (Function.prototype.selfBind = selfBind)

function func() {
    this.name = 'yeyan1996'
}

let person = {
    age: 22
}

let boundFunc = func.selfBind(person)
boundFunc()
console.log(person)

let x = new boundFunc()
console.log(x)

