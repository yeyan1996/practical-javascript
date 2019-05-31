// async/await 优雅处理方式
async function errorCaptured(promise) {
    try {
        let res = await promise
        return [null,res]
    } catch (e) {
        return [e,null]
    }
}

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('success') : reject('error')
    }, 1000)
})


async function func() {
    let [err, res] = await errorCaptured(promise)
    console.log('res', res)
    console.log('err', err)
}

func()
