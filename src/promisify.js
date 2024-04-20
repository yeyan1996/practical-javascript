// 使用 nodejs 运行以下代码
// 适合err-first风格的异步操作(eg. nodejs)的 promisify 通用函数

const fs = require("fs")

function promisify(asyncFunc) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function callback(err, ...values) {
                if (err) {
                    return reject(err);
                }
                return resolve(...values)
            });
            asyncFunc.call(this, ...args);
        });
    };
}

const fsp = new Proxy(fs,{
    get(target, key) {
        return promisify(target[key])
    }
})


async function generateCommit() {
    try {
        let data = await fsp.readFile('./promisify.js', 'utf-8')
        data += `\n//我是注释`
        await fsp.writeFile('./promisify.js', data)
    } catch (e) {
        console.log(e)
    }
}

generateCommit()


