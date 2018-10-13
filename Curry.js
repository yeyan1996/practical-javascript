/**
 * @description 函数柯里化（创建已经设置好一个或多个参数的函数）
 * @function Curry
 * @param {Function} func -柯里化的函数
 * @param {*} [rest] -柯里化函数需要设置的参数
 * @return {Function} -柯里化后的函数
**/

function Curry(func,...rest) {
    if(func.length<rest.length){
        throw new TypeError(`参数超过预期数量，期望${func.length}个，传入${rest.length}个`)
    }
    return function () {
        let innerArgs = Array.prototype.slice.call(arguments)
        let fullArgus = [...rest,...innerArgs]
        return func.apply(null,fullArgus)
    }
}

export default Curry