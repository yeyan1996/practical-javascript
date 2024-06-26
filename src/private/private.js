// 私有变量(Proxy)
// Private variable (Proxy)
const proxy = function (obj) {
  return new Proxy(obj, {
    get(target, key) {
      if (key.startsWith('_'))
        throw new Error('private key')

      return Reflect.get(target, key)
    },
    // 拦截所有遍历操作
    // Intercept all traversal operations
    ownKeys(target) {
      return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
    },
  })
}

class Person {
  constructor(name) {
    this._name = name
    return proxy(this)
  }

  get name() {
    return this._name
  }
}

const person = new Person('zhl')

console.log(person)
try {
  console.log(person._name)
}
catch (e) {
  console.error(e)
}
console.log(person.name)

// 私有变量(Symbol)
// Private variable (Symbol)
const Person1 = (function () {
  const _name = Symbol('name')

  class Person1 {
    constructor(name) {
      this[_name] = name
    }

    getName() {
      return this[_name]
    }
  }

  return Person1
})()

const person1 = new Person1('zhl')

console.log('Symbol:', person1)
console.log(person1._name) // undefined
console.log(person1.getName())

// 私有变量(WeakMap)
// Private variable (WeakMap)
// WeakMap相对于Map当对象不存在的时候自动从映射表中移除,自动减少内存占用率
// WeakMap, unlike Map, automatically removes an object from the map when it no longer exists, reducing memory usage automatically
const Person2 = (function () {
  const wp = new WeakMap()

  class Person2 {
    constructor(name) {
      // 存储当前实例和当前实例的私有变量
      // Store the current instance and its private variables
      wp.set(this, { name })
    }

    getName() {
      return wp.get(this).name
    }
  }

  return Person2
})()

const person2 = new Person2('zhl')

console.log('WeakMap:', person2)
console.log(person2.name)
console.log(person2.getName())

// 私有变量(闭包)
// Private variable (Closure)
class Person4 {
  constructor(name) {
    const _name = name
    this.getName = function () {
      return _name
    }
  }
}

const person4 = new Person4('zhl')

console.log('closure:', person4)
console.log(person4.name)
console.log(person4.getName())
