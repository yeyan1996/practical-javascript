/**
 * @description 函数节流(时间戳)，第一次会立即触发，最后一次会立即停止
 * @function Throttle
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @param {Boolean} trailing -是否需要在停止的时候再触发一次
 * @return {Function} -经过节流处理的函数
 **/


export const throttle1 = (func, context, time, trailing) => {
    let previous = new Date(0).getTime()
    let timmer
    const throttle = function (...args) {
        let now = new Date().getTime()

        if (now - previous > time) {
            func.apply(context, args)
            previous = now
        } else if (trailing) {
            clearTimeout(timmer)
            timmer = setTimeout(() => {
                func.apply(context, args)
            }, time)
        }
    }

    throttle.cancel = function () {
        previous = 0
        clearTimeout(timmer)
        timmer = null
    }
    return throttle
}

//使用Proxy实现函数节流
export const proxy = (func, time) => {

    let previous = new Date(0).getTime()

    let handler = {
        apply(target, context, args) {
            let now = new Date().getTime()
            if (now - previous > time) {
                previous = now
                Reflect.apply(func, context, args)
            }
        }
    }
    return new Proxy(func, handler)
}
