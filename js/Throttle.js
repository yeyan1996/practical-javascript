
/**
 * @description 函数节流(时间戳)，第一次会立即触发，最后一次会立即停止
 * @function Throttle
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
 **/

export  function Throttle1(func,context,time) {
    let previous = new Date()
    return function () {
       let now = (new Date()).getTime()
      if(now - previous > time){
            func.apply(context,arguments)
          previous = now
      }
    }
}

/**
 * @description 函数节流(定时器)，第一次会在延时time秒后触发，最后一次会在触发后time秒再触发
 * @function Throttle2
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
 **/

export function Throttle2(func,context,time) {
    let timeout
    //setTimeout使用的是默认绑定，传入context可指定执行上下文
      return function () {
          if(!timeout){
              timeout = setTimeout(()=>{
                  timeout = null //定时器的id会一直存在除非调用clearTimeout()，手动清除节流
                  func.apply(context,arguments)
              },time)
          }
      }
}


/**
 * @description 函数节流(时间戳)，第一次会立即触发，最后一次会在触发后time秒再触发
 * @function Throttle3
 * @param {Function} func -需要函数节流的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过节流处理的函数
 **/

export function Throttle3(func, context, time) {
    let previous = new Date()
    let timeId = null
    return function () {
        let now = (new Date()).getTime()
        if (now - previous > time) {
            func.apply(context, arguments)
            previous = now
        } else {
            if (timeId) clearTimeout(timeId)
            timeId = setTimeout(() => {
                func.apply(context, arguments)
            }, time)
        }
    }

}