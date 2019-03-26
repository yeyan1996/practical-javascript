function proxy(func) {
    let instance;
    let handler = {
        construct(target, args) {
            if (!instance) {
                //没有实例就创造一个实例
                instance = Reflect.construct(func,args)
            }
            //无论如何都会返回一个实例(new关键字)
            return instance
        }
    }
    return new Proxy(func, handler)
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const SingletonPerson = proxy(Person)

let person1 = new SingletonPerson('zhl', 22)

let person2 = new SingletonPerson('cyw', 22)

console.log(person1 === person2)
