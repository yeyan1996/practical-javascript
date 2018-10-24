/**
 * @description 函数节流
 * @function Throttle
 * @param {Function} func -节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
**/

export default  function Throttle(func,context,time) {
    let timer = null
    return function () {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{console.log(1)},time)
    }
}