const speed = function (fn, num) {
  console.time('time')
  const value = fn(num)
  console.timeEnd('time')
  console.log(`return:${value}`)
}

/**
 * @description 斐波那契数列
 * @description Fibonacci sequence
 * @param {number} n -第几个位置
 * @param {number} n - The position in the sequence
 * @return {number} 参数对应在数列中的数字
 * @return {number} The number at the position in the sequence
 */
let fibonacci = function (n) {
  if (n < 1)
    throw new Error('Incorrect parameter')
  if (n === 1 || n === 2)
    return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

speed(fibonacci, 35)

// 函数记忆
// Function memoization
const memory = function (fn) {
  const obj = {}
  return function (n) {
    if (obj[n] === undefined)
      obj[n] = fn(n)
    return obj[n]
  }
}
fibonacci = memory(fibonacci)

speed(fibonacci, 35)

/**
 * @description 斐波那契动态规划版本（最优解）
 * @description Fibonacci dynamic programming version (optimal solution)
 */
function fibonacci_DP(n) {
  let res = 1
  if (n === 1 || n === 2)
    return res
  n = n - 2
  let cur = 1
  let pre = 1
  while (n) {
    res = cur + pre
    pre = cur
    cur = res
    n--
  }
  return res
}

speed(fibonacci_DP, 35)
