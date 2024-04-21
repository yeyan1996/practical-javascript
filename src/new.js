const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

const selfNew = function (fn, ...rest) {
  const instance = Object.create(fn.prototype)
  const res = fn.call(instance, ...rest)
  return isComplexDataType(res) ? res : instance
}

function Person(name, sex) {
  this.name = name
  this.sex = sex
}

const newPerson = new Person('zhl', 'male')
const selfNewPerson = selfNew(Person, 'zhl', 'male')

console.log(newPerson)
console.log(selfNewPerson)
