/**
 * @description 洗牌算法
 * @description Shuffle algorithm
 * @see https://github.com/mqyqingfeng/Blog/issues/51
 */

// 旧版本的chrome对于10个元素内的数组使用插入算法进行排序(最新版已经修改了排序算法)
// Older versions of Chrome use insertion sort for arrays with fewer than 10 elements (the latest version has changed the sorting algorithm)
function originSort(arr) {
  arr = arr.sort(() => Math.random() - 0.5)
  return arr
}

// 原理是将当前元素之后的所有元素中随机选取一个和当前元素互换
// The principle is to randomly select one of all elements after the current element and swap it with the current element
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}

// 新生成一个数组,随机从原数组中取出一个元素放入新数组
// Generate a new array and randomly take an element from the original array to put into the new array
function shuffle2(arr) {
  const _arr = []
  while (arr.length) {
    const randomIndex = Math.floor(Math.random() * (arr.length))
    _arr.push(arr.splice(randomIndex, 1)[0])
  }
  return _arr
}

// 分析概率的函数
// Function to analyze probabilities
function statistics(fn, arr) {
  const times = 100000
  const res = {}
  for (let i = 0; i < times; i++) {
    // 每次循环声明一次防止引用同一数组
    // Declare each loop once to prevent referencing the same array
    const _arr = [...arr]
    const key = JSON.stringify(fn(_arr))
    res[key] ? res[key]++ : res[key] = 1
  }

  // 为了方便展示，转换成百分比
  // Convert to percentages for ease of display
  Object.keys(res).forEach((key) => {
    res[key] = `${res[key] / times * 100}%`
  })

  console.log(fn.name, res)
}

statistics(originSort, [1, 2, 3])
statistics(shuffle, [1, 2, 3])
statistics(shuffle2, [1, 2, 3])
