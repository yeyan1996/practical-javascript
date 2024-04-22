/**
 * @description 函数防抖
 * @description Function debouncing
 * @param {Function} func -需要函数防抖的函数
 * @param {Function} func - the function that requires debouncing
 * @param {number} time -延迟时间
 * @param {number} time - delay time
 * @param {Options} options -配置项
 * @param {Options} options - configuration options
 * @return {Function} -经过防抖处理的函数
 * @return {Function} - the debounced function
 */

/**
 * @typedef {object} Options -配置项
 * @typedef {object} Options - configuration options
 * @property {boolean} leading -开始是否需要额外触发一次
 * @property {boolean} leading - whether to trigger once at the beginning
 * @property {boolean} trailing -结束后是否需要额外触发一次
 * @property {boolean} trailing - whether to trigger once at the end
 * @property {this} context -上下文
 * @property {this} context - context
 */

function debounce(func, time = 17, options = {
  leading: true,
  context: null,
}) {
  let timer
  const _debounce = function (...args) {
    if (timer)
      clearTimeout(timer)

    if (options.leading && !timer) {
      timer = setTimeout(null, time)
      func.apply(options.context, args)
    }
    else {
      timer = setTimeout(() => {
        func.apply(options.context, args)
        timer = null
      }, time)
    }
  }
  /**
   * @description 取消函数
   * @description Cancellation function
   * @see https://juejin.im/post/5931561fa22b9d0058c5b87d
   */
  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}
