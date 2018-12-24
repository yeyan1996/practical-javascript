
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
console.log(curriedAdd1(1)(2)(3)());


/**
 * @description 函数柯里化（根据柯里化前的函数的参数数量决定柯里化后的函数需要执行多少次）
 * @function Curry2
 * @param {function} fn -柯里化的函数
 */

function Curry2(fn) {
    if (fn.length <= 1) return fn;
    let finalArgs = []
    const generator = () => num => {
        finalArgs = [...finalArgs, num]
        return finalArgs.length === fn.length ? fn(...finalArgs) : generator()
    }
    return generator()
}

const add2 = (a, b, c) => a + b + c;
const curriedAdd2 = Curry2(add2);
console.log(curriedAdd2(5)(6)(7));



//网上更好的方法,不用特意声明一个数组储存参数
const Curry3 = (fn) => {
    if (fn.length <= 1) return fn;
    const generator = (args) => (args.length === fn.length ? fn(...args) : arg => generator([...args, arg]));
    return generator([]);
};


const curriedAdd3 = Curry3(add2);
console.log(curriedAdd3(8)(9)(10));


/**
 * @description 偏函数（创建已经设置好一个或多个参数的函数）
 * @function partial
 * @param {Function} func -部分求值的函数
 * @param {...*} [rest1] -部分求值的参数
 * @return {Function} -部分求值后的函数
 **/

let partialFunc  = (func, ...rest1) => (...rest2) => func.apply(this,[...rest1,...rest2])

function add(num1, num2, num3, num4) {
    return num1 + num2 + num3 + num4
}

let addTwo = partialFunc(add, 2)
console.log(addTwo(3, 4, 5))