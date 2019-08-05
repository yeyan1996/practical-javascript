const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h];

/**
 * @description 函数柯里化（根据柯里化前的函数的参数数量决定柯里化后的函数需要执行多少次）
 * @param {function} fn -柯里化的函数
 */

function curry(fn) {
    if (fn.length <= 1) return fn;
    const generator = (...args) => {
        if (fn.length === args.length) {
            //执行fn并且返回执行结果
            return fn(...args)
        } else {
            return (...args2) => {
                //返回generator函数
                return generator(...args, ...args2)
            }
        }
    }
    return generator
}

const curriedDisplay = curry(display);
console.log("curriedDisplay", curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8));




// ES6简写
const curry2 = fn => {
    if (fn.length <= 1) return fn;
    const generator = (...args) => (args.length === fn.length ? fn(...args) : (...args2) => generator(...args, ...args2));
    return generator;
};
const curriedDisplay2 = curry2(display);
console.log("curriedDisplay2", curriedDisplay2(1)(2)(3)(4)(5)(6)(7)(8));




/**
 * @description 函数柯里化（支持占位符版本）
 * @param {function} fn -柯里化的函数
 * @param {String} [placeholder = "_"] -占位符
 */

const curry3 = (fn, placeholder = "_") => {
    curry3.placeholder = placeholder
    if (fn.length <= 1) return fn;
    let argsList = []
    const generator = (...args) => {
        let currentPlaceholderIndex = -1 // 记录了非当前轮最近的一个占位符下标，防止当前轮元素覆盖了当前轮的占位符
        args.forEach(arg => {
            let placeholderIndex = argsList.findIndex(item => item === curry3.placeholder)
            if (placeholderIndex < 0) { // 如果数组中没有占位符直接往数组末尾放入一个元素
                currentPlaceholderIndex = argsList.push(arg) - 1
                // 防止将元素填充到当前轮参数的占位符
                // (1,'_')('_',2) 数字2应该填充1后面的占位符，不能是2前面的占位符
            } else if (placeholderIndex !== currentPlaceholderIndex) {
                argsList[placeholderIndex] = arg
            } else { // 当前元素是占位符的情况
                argsList.push(arg)
            }
        })
        let realArgsList = argsList.filter(arg => arg !== curry3.placeholder) //过滤出不含占位符的数组
        if (realArgsList.length >= fn.length) {
            return fn(...argsList)
        } else {
            return generator
        }
    }

    return generator
}

const curriedDisplay3 = curry3(display);
console.log("curriedDisplay3", curriedDisplay3('_', 2)(1, '_', 4)(3, '_',)('_', 5)(6)(7, 8))




/**
 * @example 函数组合 + 函数柯里化
 **/

const compose = function (...fns) {
    return function (initValue) {
        return fns.reduceRight((acc, cur) => {
            return cur(acc)
        }, initValue)
    }
}

const curriedJoin = curry3((separator, arr) => arr.join(separator))
const curriedMap = curry3((fn, arr) => arr.map(fn))
const curriedSplit = curry3((separator, str) => str.split(separator))


const composeFunc = compose(
    curriedJoin("1"),
    curriedMap(item => `${item}1`),
    curriedSplit(""),
)

console.log("compose + curry", composeFunc('helloworld'))





/**
 * @example  通过占位符将路径参数延迟到之后传入
 **/

if (!window) {
    const {readFile} = require("fs")
    const {join} = require("path")

    const callback = (err, data) => {
        err ? console.error(err) : console.log(data)
    }

    ['curry.js', 'curry.html'] // 将文件列表变成数组方便管理和维护
        .map(file => join(__dirname, file)) // join 函数无法使用柯里化因为参数都是可选参数，length 为 0
        .map(curry3(readFile)('_', 'utf-8', callback))

} else {
    console.warn('请使用 nodejs 环境运行以下代码')
}

