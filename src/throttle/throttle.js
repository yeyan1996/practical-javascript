/**
 * @description 函数节流
 * @description Function Throttling
 * @param {Function} func -需要函数节流的函数
 * @param {Function} func - the function to be throttled
 * @param {number} time -延迟时间
 * @param {number} time - delay time
 * @param {Options} options -配置项
 * @param {Options} options - configuration options
 * @return {Function} -经过节流处理的函数
 * @return {Function} - the throttled function
 */

/**
 * @typedef {object} Options -配置项
 * @typedef {object} Options - configuration options
 * @property {boolean} leading -开始是否需要额外触发一次
 * @property {boolean} leading - whether to trigger at the beginning
 * @property {boolean} trailing -结束后是否需要额外触发一次
 * @property {boolean} trailing - whether to trigger at the end
 * @property {this} context -上下文
 * @property {this} context - context
 */

function throttle(func, time = 17, options = {
  // leading 和 trailing 无法同时为 false
  // leading and trailing cannot both be false
  leading: true,
  trailing: false,
  context: null,
}) {
  let previous = new Date(0).getTime()
  let timer
  const _throttle = function (...args) {
    const now = new Date().getTime()

    if (!options.leading) {
      if (timer)
        return
      timer = setTimeout(() => {
        timer = null
        func.apply(options.context, args)
      }, time)
    }
    else if (now - previous > time) {
      func.apply(options.context, args)
      previous = now
    }
    else if (options.trailing) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(options.context, args)
      }, time)
    }
  }
  // 闭包返回取消函数
  // Closure returns cancellation function
  _throttle.cancel = () => {
    previous = 0
    clearTimeout(timer)
    timer = null
  }
  return _throttle
}

// 使用Proxy实现函数节流
// Implementing function throttling using Proxy
function proxy(func, time, options = {
  // leading 和 trailing 无法同时为 false
  // leading and trailing cannot both be false
  leading: false,
  trailing: true,
  context: null,
}) {
  let timer
  let previous = new Date(0).getTime()

  const handler = {
    apply(target, _, args) {
      // 和闭包实现核心逻辑相同
      // Same core logic as the closure implementation
      const now = new Date().getTime()
      if (!options.leading) {
        if (timer)
          return
        timer = setTimeout(() => {
          timer = null
          Reflect.apply(func, options.context, args)
        }, time)
      }
      else if (now - previous > time) {
        Reflect.apply(func, options.context, args)
        previous = now
      }
      else if (options.trailing) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          Reflect.apply(func, options.context, args)
        }, time)
      }
    },
  }
  return new Proxy(func, handler)
}
