const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h]

/**
 * @description 偏函数（创建已经设置好一个或多个参数的函数,并且添加了占位符功能）
 * @description Partial function (creates a function with one or more arguments preset, and adds placeholder functionality)
 * @param {Function} func -部分求值的函数
 * @param {Function} func - the function to partially evaluate
 * @param {...*} [args] -部分求值的参数
 * @param {...*} [args] - the arguments for partial evaluation
 * @return {Function} -部分求值后的函数
 * @return {Function} - the function after partial evaluation
 */

function partialFunc(func, ...args) {
  let placeholderNum = 0
  return (...args2) => {
    args2.forEach((arg) => {
      const index = args.findIndex(item => item === '_')
      if (index < 0)
        return
      args[index] = arg
      placeholderNum++
    })
    if (placeholderNum < args2.length)
      args2 = args2.slice(placeholderNum, args2.length)

    return func.apply(this, [...args, ...args2])
  }
}

const partialDisplay = partialFunc(display, 1, 2)
console.log('partialFunc', partialDisplay(3, 4, 5, 6, 7, 8))

// 使用占位符
// Using placeholders
const partialDisplay2 = partialFunc(display, '_', 2, '_')
console.log('partialFunc2', partialDisplay2(1, 3, 4, 5, 6, 7, 8))
