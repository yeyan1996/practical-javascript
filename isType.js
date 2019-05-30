const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

const selfIsArray = isType('Array')

Array.selfIsArray || (Object.defineProperty(Array, 'selfIsArray', {
    value: selfIsArray,
    enumerable: false,
    configurable: true,
    writable: true
}))

const isNull = isType('Null')
console.log(isNull(null)); // true
