const speed = function (fn, num) {
    console.time('time')
    let value = fn(num)
    console.timeEnd('time')
    console.log(`返回值:${value}`)
}


let fibonacci = function (n) {
    if (n < 1) throw new Error('参数有误')
    if (n === 1 || n === 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}

speed(fibonacci, 35)


//函数记忆
const memory = function (fn) {
    let obj = {}
    return function (n) {
        if (obj[n] === undefined) obj[n] = fn(n)
        return obj[n]
    }
}
fibonacci = memory(fibonacci)

speed(fibonacci, 35)

