const speed = function (fn, num) {
    console.time('time')
    let value = fn(num)
    console.timeEnd('time')
    console.log(`返回值:${value}`)
}


const fibonacci1 = function (n) {
    if (n < 1) throw new Error('参数有误')
    if (n === 1 || n === 2) return 1
    return fibonacci1(n - 1) + fibonacci1(n - 2)
}

speed(fibonacci1, 35)


//函数记忆
const memory = function (fn) {
    let obj = {}
    return function (n) {
        if(!obj[n]) obj[n] = fn(n)
        return obj[n]
    }
}
const fibonacci2 = memory(fibonacci1)

speed(fibonacci2, 35)

