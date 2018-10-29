/**
 * @description 函数节流
 * @function Throttle
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
 **/

export default  function Throttle(func,context,time) {
    let previous = 0
    return function () {
       let now = (new Date()).getTime()
      if(now - previous > time){
            func.apply(context,arguments)
          previous = now
      }
    }
}