/**
 * @description 函数节流
 * @param {Function} func -需要函数节流的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过节流处理的函数
 **/

/**
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要额外触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 **/

const throttle = (func, time = 17, options = {
    // leading 和 trailing 无法同时为 false
    leading: true,
    trailing: false,
    context: null
}) => {
    let previous = new Date(0).getTime()
    let timer;
    const _throttle = function (...args) {
        let now = new Date().getTime();

        if (!options.leading) {
            if (timer) return
            timer = setTimeout(() => {
                timer = null
                func.apply(options.context, args)
            }, time)
        } else if (now - previous > time) {
            func.apply(options.context, args)
            previous = now
        } else if (options.trailing) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(options.context, args)
            }, time)
        }
    };
    // 闭包返回取消函数
    _throttle.cancel = () => {
        previous = 0;
        clearTimeout(timer);
        timer = null
    };
    return _throttle
};

//使用Proxy实现函数节流
function proxy(func, time, options = {
    // leading 和 trailing 无法同时为 false
    leading: false,
    trailing: true,
    context: null
}) {
    let timer;
    let previous = new Date(0).getTime();

    let handler = {
        apply(target, _, args) {
            // 和闭包实现核心逻辑相同
            let now = new Date().getTime();
            if (!options.leading) {
                if (timer) return;
                timer = setTimeout(() => {
                    timer = null;
                    Reflect.apply(func, options.context, args)
                }, time)
            } else if (now - previous > time) {
                Reflect.apply(func, options.context, args)
                previous = now
            } else if (options.trailing) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    Reflect.apply(func, options.context, args)
                }, time)
            }
        }
    };
    return new Proxy(func, handler)
}
