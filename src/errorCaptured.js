// async/await 优雅处理方式
async function errorCaptured(asyncFunc) {
    try {
        let res = await asyncFunc()
        return [null,res]
    } catch (e) {
        return [e,null]
    }
}

let asyncFunc = ()=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('success') : reject('error')
        }, 1000)
    })
}


async function func() {
    let [err, res] = await errorCaptured(asyncFunc)
    console.log('res', res)
    console.log('err', err)
}

func()
