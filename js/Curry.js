/**
 * @description 函数柯里化1（创建已经设置好一个或多个参数的函数）
 * @function Curry1
 * @param {Function} func -柯里化的函数
 * @param {*} [rest] -柯里化函数需要设置的参数
 * @return {Function} -柯里化后的函数
 **/

function Curry1(func, ...rest) {
    return (arg) => {
        return func(...rest, arg)
    }
}


function add(num1, num2) {
    return num1 + num2
}

let curriedAdd = Curry1(add, 2, 3)

/**
 * @description 函数柯里化2
 * @function Curry2
 * @param {*} fn -柯里化的函数
 * @returns {function} -柯里化后的函数
 */
function Curry2(fn) {
    let args = []
    return function next() {
        //    debugger
        if (arguments.length) {
            args.push(...arguments)
            return next
        } else {
            console.log(...args);
            return fn(...args)
        }
    }
}

function add2(num1, num2, num3) {
    return num1 + num2 + num3
}

let curriedAdd2 = Curry2(add2)
console.log(curriedAdd2(1)(2)(3)());




/**
 * @description 函数柯里化3
 * @function Curry2
 * @param {*} fn -柯里化的函数
 */
function Curry3(fn) {
    if (fn.length <= 1) return fn;
    const generator = (args, rest) => (rest ? arg => generator([...args, arg], rest - 1) : fn(...args));


    return generator([], fn.length);
};

const add3 = (a, b, c) => a + b + c;
const curriedAdd3 = Curry3(add2);
console.log(curriedAdd3(5)(6)(7));
