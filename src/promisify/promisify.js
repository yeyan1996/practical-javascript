// 使用 nodejs 运行以下代码
// Run the following code using nodejs
// 适合err-first风格的异步操作(eg. nodejs)的 promisify 通用函数
// Generic promisify function suitable for err-first style asynchronous operations (e.g., nodejs)

const fs = require('node:fs')

function promisify(asyncFunc) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push((err, ...values) => {
        if (err)
          return reject(err)

        return resolve(...values)
      })
      asyncFunc.call(this, ...args)
    })
  }
}

const fsp = new Proxy(fs, {
  get(target, key) {
    return promisify(target[key])
  },
})

async function generateCommit() {
  try {
    let data = fsp.readFileSync('./promisify.js', 'utf-8')
    data += `\n// comment`
    // I am a comment
    fsp.writeFileSync('./promisify.js', data)
  }
  catch (e) {
    console.log(e)
  }
}

generateCommit()
