// 自执行generator函数
// Self-executing generator function

const data = '{a:1,b:2}'
const data2 = '{c:3,d:4}'
const data3 = '{e:5,f:6}'

const api = function (data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function* func() {
  const res = yield api(data)
  console.log(res)
  const res2 = yield api(data2)
  console.log(res2)
  const res3 = yield api(data3)
  console.log(res3)
  console.log(res, res2, res3)
}

function makePromisify(source) {
  if (source.then && typeof source.then === 'function')
    return source
  return Promise.resolve(source)
}

function run(generatorFunc) {
  const it = generatorFunc()
  const result = it.next()

  return new Promise((resolve, reject) => {
    const next = function (result) {
      if (result.done)
        return resolve(result.value)

      // 保证返回的是一个promise
      // Ensure the return is a promise
      result.value = makePromisify(result.value)
      result.value.then((res) => {
        // 将promise的返回值res传入iterator迭代器的next方法中,作为yield后面表达式的返回值
        // Pass the promise's return value res into the iterator's next method, as the return value of the expression following yield
        // it.next将停止的yield继续执行到下一个yield,返回的result是一个value,done属性组成的对象
        // it.next will continue from the stopped yield to the next yield, the returned result is an object composed of value and done properties
        const result = it.next(res)
        // 递归执行next函数
        // Recursively execute the next function
        next(result)
      }).catch((err) => {
        reject(err)
      })
    }
    next(result)
  })
}

run(func)
