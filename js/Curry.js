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
 * @description 函数柯里化2（根据柯里化后的函数执行多少次判断函数的结果）
 * @function Curry2
 * @param {function} fn -柯里化的函数
 * @returns {function} -柯里化后的函数
 */
function Curry2(fn) {
    let args = []
    return function next() { 
        if (arguments.length) {
            args.push(...arguments)
            return next
        } else {
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
 * @description 函数柯里化3（根据柯里化前的函数决定柯里化后的函数需要执行多少次）
 * @function Curry2
 * @param {function} fn -柯里化的函数
 */
function Curry3(fn) {
    if (fn.length <= 1) return fn;
    const generator = function (args, rest) {
        if (rest) {  //如果执行的次数未达到柯里化前的函数的参数个数
            return function (arg) {
               return generator([...args, arg], rest - 1)
            }
        } else {
          return  fn(...args)
    };
}


return generator([], fn.length);
};

const add3 = (a, b, c) => a + b + c;
const curriedAdd3 = Curry3(add2);
console.log(curriedAdd3(5)(6)(7));
