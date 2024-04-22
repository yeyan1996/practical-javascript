function proxy(func) {
  let instance
  const handler = {
    construct(target, args) {
      if (!instance) {
        // 没有实例就创造一个实例
        // If there is no instance, create one
        instance = Reflect.construct(func, args)
      }
      // 无论如何都会返回一个实例(new关键字)
      // Always return an instance (new keyword)
      return instance
    },
  }
  return new Proxy(func, handler)
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const SingletonPerson = proxy(Person)

const person1 = new SingletonPerson('zhl', 22)

const person2 = new SingletonPerson('cyw', 22)

console.log(person1 === person2) // true
