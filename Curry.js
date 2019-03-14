/**
 * @description 函数柯里化（根据柯里化后的函数执行多少次判断函数的结果）
 * @function Curry1
 * @param {function} fn -柯里化的函数
 * @returns {function} -柯里化后的函数
 */
function Curry1(fn) {
    let args = []
    return function next(...rest) {
        if (rest.length) {
            args.push(...rest)
            return next
        } else {
            return fn(...args)
        }
    }
}

function add1(num1, num2, num3) {
    return num1 + num2 + num3
}

let curriedAdd1 = Curry1(add1)
console.log("curriedAdd1", curriedAdd1(1)(2)(3)());


/**
 * @description 函数柯里化（根据柯里化前的函数的参数数量决定柯里化后的函数需要执行多少次）
 * @function Curry2
 * @param {function} fn -柯里化的函数
 */

function Curry2(fn) {
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
const curriedAdd2 = Curry2(add2);
console.log("curriedAdd2", curriedAdd2(5)(6)(7)(8));


//ES6简写
const Curry3 = (fn) => {
    if (fn.length <= 1) return fn;
    const generator = (...args) => (args.length === fn.length ? fn(...args) : (...args2) => generator(...args, ...args2));
    return generator;
};
const curriedAdd3 = Curry3(add2);
console.log("curriedAdd3", curriedAdd3(5)(6)(7)(8));

/**
 * @description 偏函数（创建已经设置好一个或多个参数的函数,并且添加了占位符功能）
 * @function partial
 * @param {Function} func -部分求值的函数
 * @param {...*} [rest1] -部分求值的参数
 * @return {Function} -部分求值后的函数
 **/

let partialFunc = (func, ...rest1) => {
    let placeholderNum = 0
    return (...rest2) => {
        rest2.forEach(arg => {
            let index = rest1.findIndex(item => item === "_")
            if (index < 0) return
            rest1[index] = arg
            placeholderNum++
        })
        if (placeholderNum < rest2.length) {
            rest2 = rest2.slice(placeholderNum, rest2.length)
        }
        return func.apply(this, [...rest1, ...rest2])
    }
}

function add(num1, num2, num3, num4) {
    return num1 + num2 + num3 + num4
}

let partialAdd = partialFunc(add, 1)
console.log("partialFunc", partialAdd(2, 3, 4))


let partialAdd2 = partialFunc(add, '_', 2, '_')
console.log('partialFunc2', partialAdd2(1, 3, 4))

