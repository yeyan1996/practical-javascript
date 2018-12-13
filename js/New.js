const selfNew = function (fn, ...rest) {
    let instance = Object.create(fn.prototype)
    let res = fn.apply(instance, rest)
    return typeof res === 'object' && res !== null ? res : instance
}

function Person(name, sex) {
    this.name = name
    this.sex = sex
}

let newPerson = new Person('zhl','male')
let selfNewPerson =  selfNew(Person, 'zhl', 'male')

console.log(newPerson)
console.log(selfNewPerson)