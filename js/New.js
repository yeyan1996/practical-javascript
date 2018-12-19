const isComplexDataType = obj => {
     return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}
const selfNew = function (fn, ...rest) {
    let instance = Object.create(fn.prototype)
    let res = fn.apply(instance, rest)
    return isComplexDataType(res) ? res : instance
}

function Person(name, sex) {
    this.name = name
    this.sex = sex
}

let newPerson = new Person('zhl','male')
let selfNewPerson =  selfNew(Person, 'zhl', 'male')

console.log(newPerson)
console.log(selfNewPerson)