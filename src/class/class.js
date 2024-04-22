// 简单模拟ES6的class实现
// Simulate ES6 class implementation
// class Animal {
//     constructor(name) {
//         this.name = name
//     }
//
//     sleep() {
//         console.log('animal is sleeping')
//     }
//
//     static staticFunc() {
//         console.log('staticFunc')
//     }
// }
//
// class Dog extends Animal {
//     constructor(name, color) {
//         super(name)
//         this.color = color
//     }
//
//     barking() {
//         console.log('wang!')
//     }
// }
//
// let brownTeddy = new Dog('teddy', 'brown')
// Dog.staticFunc()
// console.log(brownTeddy)
// brownTeddy.sleep()
// brownTeddy.barking()

function Animal(name) {
  this.name = name
}

Animal.staticFunc = function () {
  console.log('staticFunc')
}
Animal.prototype.sleep = function () {
  console.log('animal is sleeping')
}

function Dog(name, color) {
  Animal.call(this, name)
  this.color = color
}

// 寄生组合式继承 + 构造函数之间的继承
// Parasitic combination inheritance + inheritance between constructors
function inherit(subType, superType) {
  // 由于JavaScript引用类型和函数按值传递的特性，不能改变subType的引用地址
  // Due to the characteristic of JavaScript reference types and functions being passed by value, subType's reference cannot be changed
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      // 指向子类，和默认的继承行为保持一致
      // Point to subclass, consistent with the default inheritance behavior
      value: subType,
    },
  })
  // 子构造函数继承父构造函数(子类继承父类的静态方法和静态属性)
  // Child constructor inherits from parent constructor (subclass inherits parent's static methods and properties)
  Object.setPrototypeOf(subType, superType)
}

inherit(Dog, Animal)

// 需要在继承之后再往Dog中添加原型方法，否则会被覆盖掉
// Prototype methods must be added to Dog after inheritance, otherwise they will be overwritten
Dog.prototype.barking = function () {
  console.log('wang!')
}

const brownTeddy = new Dog('teddy', 'brown')
Dog.staticFunc()
console.log(brownTeddy)
brownTeddy.sleep()
brownTeddy.barking()
