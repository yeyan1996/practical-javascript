const isType = type => target => {
    let stringType = Object.prototype.toString.call(target)
    return `[object ${type}]` === stringType
}

const selfIsArray = isType('Array')

Array.selfIsArray || (Object.defineProperty(Array, 'selfIsArray', {
    value: selfIsArray,
    enumerable: false,
    configurable: true,
    writable: true
}))

const isNull = isType('Null')
isNull(null) // true
