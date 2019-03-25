//nodejs promisify通用函数
const fs = require("fs")

function promisify(original) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            args.push(function callback(err, ...values) {
                if (err) {
                    return reject(err);
                }
                return resolve(...values)
            });
            original.call(this, ...args);
        });
    };
}


const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)


async function generateCommit() {
    try {
        let data = await readFileAsync('./promisify.js', 'utf-8')
        data += `\n//我是注释`
        await writeFileAsync('./promisify.js', data)
    } catch (e) {
        console.log(e)
    }
}

generateCommit()


