/**
 * @description 函数防抖
 * @param {Function} func -需要函数防抖的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过防抖处理的函数
 **/

/**
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要额外触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 **/

const debounce = (func, time = 17, options = {
    // leading 和 trailing 无法同时为 false
    leading: true,
    trailing: true,
    context: null
}) => {
    let timer;
    const _debounce = function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        if (options.leading && !timer) {
            timer = setTimeout(null, time)
            func.apply(options.context, args)
        } else if (options.trailing) {
            timer = setTimeout(() => {
                func.apply(options.context, args)
                timer = null
            }, time)
        }
    };
    /**
     * @description 取消函数
     * @see https://juejin.im/post/5931561fa22b9d0058c5b87d
     **/
    _debounce.cancel = function () {
        clearTimeout(timer)
        timer = null
    };
    return _debounce
};
