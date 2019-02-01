/**
 * @description 函数防抖
 * @function Debounce
 * @param {Function} func -需要函数防抖的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @param {Boolean} immediate -是否立即执行
 * @return {Function} -经过函数防抖处理的函数
 **/

export default function Debounce(func, context = null, time = 17, immediate = false) {
    let timeId = Symbol('timeId')
    return function (...args) {
        if (func[timeId]) {  //timeId必须是在函数外面能够读取的到的属性
            clearTimeout(func[timeId])
        }
        if (immediate && !func[timeId]) {
            func[timeId] = setTimeout(() => {
            }, time)
            func.apply(context,args)
        } else {
            func[timeId] = setTimeout(() => {
                func.apply(context,args)
                func[timeId] = null
            }, time)
        }
    }
}
