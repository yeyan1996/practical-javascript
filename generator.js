//自执行generator函数

const data = "{a:1,b:2}"
const data2 = "{c:3,d:4}"
const data3 = "{e:5,f:6}"

const api = function (data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data)
        }, 1000)
    })

}


function* func() {
    let res = yield api(data)
    console.log(res)
    let res2 = yield api(data2)
    console.log(res2)
    let res3 = yield api(data3)
    console.log(res3)
    console.log(res, res2, res3)
}


function makePromisify(source) {
    if (source.then && typeof source.then === "function") return source
    return Promise.resolve(source)
}

function run(generatorFunc) {
    let it = generatorFunc()
    let result = it.next()

    return new Promise((resolve, reject) => {
        const next = function (result) {
            if (result.done) {
                resolve(result.value)
            }
            //保证返回的是一个promise
            result.value = makePromisify(result.value)
            result.value.then(res => {
                //将promise的返回值res传入iterator迭代器的next方法中,作为yield后面表达式的返回值
                //it.next将停止的yield继续执行到下一个yield,返回的result是一个value,done属性组成的对象
                let result = it.next(res)
                //递归执行next函数
                next(result)
            }).catch(err => {
                reject(err)
            })
        }
        next(result)
    })
}

run(func)

