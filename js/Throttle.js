/**
 * @description 函数节流(时间戳)，第一次会立即触发，最后一次会立即停止
 * @function Throttle
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
 **/

export  function Throttle1(func,context,time) {
    let previous = 0
    return function () {
       let now = (new Date()).getTime()
      if(now - previous > time){
            func.apply(context,arguments)
          previous = now
      }
    }
}

/**
 * @description 函数节流(定时器)，第一次会在延时time秒后触发，最后一次会在触发mousemove后time秒再触发
 * @function Throttle2
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
 **/

export function Throttle2(func,context,time) {
    let timeout
      return function () {
          if(!timeout){
              timeout = setTimeout(()=>{
                  timeout = null //定时器的id会一直存在除非调用clearTimeout()，手动清除节流
                  func.apply(context)
              },time)
          }
      }
}


