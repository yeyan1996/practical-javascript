/**
 * @description 函数柯里化（根据柯里化前的函数的参数数量决定柯里化后的函数需要执行多少次）
 * @function Curry2
 * @param {function} fn -柯里化的函数
 */

function curry2(fn) {
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

const add2 = (a, b, c, d) => a + b + c + d;
const curriedAdd2 = curry2(add2);
console.log("curriedAdd2", curriedAdd2(5)(6)(7)(8));


//ES6简写
const curry3 = fn => {
    if (fn.length <= 1) return fn;
    const generator = (...args) => (args.length === fn.length ? fn(...args) : (...args2) => generator(...args, ...args2));
    return generator;
};
const curriedAdd3 = curry3(add2);
console.log("curriedAdd3", curriedAdd3(5)(6)(7)(8));


/**
 * @description 函数柯里化（支持占位符版本）
 * @function curry4
 * @param {function} fn -柯里化的函数
 * @param {String} [placeholder = "_"] -占位符
 */
const curry4 = (fn, placeholder = "_") => {
    curry4.placeholder = placeholder
    if (fn.length <= 1) return fn;
    let argsList = []
    const generator = (...args) => {
        let currentPlaceholderIndex = -1 //防止当前轮元素覆盖了当前轮的占位符
        args.forEach(arg => {
            let placeholderIndex = argsList.findIndex(arg => arg === curry4.placeholder)
            if (placeholderIndex < 0) { // 如果没有占位符直接往数组末尾放入一个元素
                currentPlaceholderIndex = argsList.push(arg) - 1
            } else if (placeholderIndex !== currentPlaceholderIndex) {  // 防止将真实元素填充到当前轮参数的占位符
                argsList[placeholderIndex] = arg
            } else {
                argsList.push(arg)
            }
        })
        let realArgList = argsList.filter(arg => arg !== curry4.placeholder) //过滤出不含占位符的真实数组
        if (realArgList.length === fn.length) {
            return fn(...argsList)
        } else if (realArgList.length > fn.length) {
            throw new Error('超出初始函数参数最大值')
        } else {
            return generator
        }
    }

    return generator
}
const curriedAdd4 = curry4(add2);
console.log("curriedAdd4", curriedAdd4('_', 6)(5, '_')(7)(8))


//函数组合+函数柯里化
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
 * @description 偏函数（创建已经设置好一个或多个参数的函数,并且添加了占位符功能）
 * @function partial
 * @param {Function} func -部分求值的函数
 * @param {...*} [args] -部分求值的参数
 * @return {Function} -部分求值后的函数
 **/

const partialFunc = (func, ...args) => {
    let placeholderNum = 0
    return (...args2) => {
        args2.forEach(arg => {
            let index = args.findIndex(item => item === "_")
            if (index < 0) return
            args[index] = arg
            placeholderNum++
        })
        if (placeholderNum < args2.length) {
            args2 = args2.slice(placeholderNum, args2.length)
        }
        return func.apply(this, [...args, ...args2])
    }
}

function add(num1, num2, num3, num4) {
    return num1 + num2 + num3 + num4
}

let partialAdd = partialFunc(add, 1)
console.log("partialFunc", partialAdd(2, 3, 4))


let partialAdd2 = partialFunc(add, '_', 2, '_')
console.log('partialFunc2', partialAdd2(1, 3, 4))

