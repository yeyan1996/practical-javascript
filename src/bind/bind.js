const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

const selfBind = function (bindTarget, ...args1) {
  if (typeof this !== 'function')
    throw new TypeError('Bind must be called on a function')
  const originFunc = this
  const boundFunc = function (...args2) {
    // 使用new关键字调用返回新对象
    // Use the new keyword to call and return a new object
    if (new.target) {
      const res = originFunc.call(this, ...args1, ...args2)
      // 如果构造函数返回一个对象则返回这个对象
      // If the constructor returns an object, return that object
      if (isComplexDataType(res))
        return res
      // 否则返回新建的对象
      // Otherwise, return the newly created object
      return this
    }
    else {
      return originFunc.call(bindTarget, ...args1, ...args2)
    }
  }
  /**
   * 真正的 bind 创建的函数是没有 prototype 的，取而代之有个 [[TargetFunction]] 保存 bind 前的函数
   * The function created by the real bind does not have a prototype; instead, it has a [[TargetFunction]] that stores the function before binding.
   * 使用 new 会将创建的对象的 __proto__ 连接 [[TargetFunction]] prototype (非箭头函数)
   * Using new links the __proto__ of the created object to the [[TargetFunction]] prototype (non-arrow function).
   * 这里给 bind 后的函数手动设置一个 prototype 属性，模拟这个行为
   * Here, a prototype property is manually set to the function after bind, to simulate this behavior.
   */
  // 箭头函数则没有 prototype
  // Arrow functions do not have a prototype.
  if (originFunc.prototype)
    boundFunc.prototype = originFunc.prototype

  // 定义绑定后函数的长度和名字
  // Define the length and name of the function after binding.
  const desc = Object.getOwnPropertyDescriptors(originFunc)
  Object.defineProperties(boundFunc, {
    length: desc.length,
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`,
    }),
  })
  return boundFunc
}

Function.prototype.selfBind || (Object.defineProperty(Function.prototype, 'selfBind', {
  value: selfBind,
  enumerable: false,
  configurable: true,
  writable: true,
}))

function originFunc() {
  this.name = 'yeyan1996'
  return {}
}

const obj = {
  age: 22,
}

const boundFunc = originFunc.selfBind(obj)

console.dir(originFunc)
console.dir(boundFunc)

// 即使绑定了 obj，但是使用 new 作为构造函数执行时 this 还是会指向新创建的对象
// Even if obj is bound, when using new as a constructor, this still points to the newly created object
// 即不会给 obj 添加 name 属性
// It will not add a name property to obj
new boundFunc()
console.log(obj)

// 其他情况指向 boundFunc 会给绑定的 obj 对象添加 name 属性
// In other cases, pointing to boundFunc will add a name property to the bound obj object
boundFunc()
console.log(obj)

function OriginFunc2() {
  this.name = 'yeyan1996'
}

const boundFunc2 = OriginFunc2.selfBind({})
const instance = new boundFunc2()
// 将绑定后的函数作为构造函数，生成的对象的 __proto__ 指向绑定前函数的 prototype
// When the bound function is used as a constructor, the __proto__ of the generated object points to the prototype of the function before binding
console.log(Object.getPrototypeOf(instance) === OriginFunc2.prototype)
