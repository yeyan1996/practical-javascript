/**
 * @description 洗牌算法
 * @see https://github.com/mqyqingfeng/Blog/issues/51
 **/

//原理是将当前元素之后的所有元素中随机选取一个和当前元素互换
function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = i + Math.floor(Math.random() * (arr.length - i));
        [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
    }
    return arr
}

//新生成一个数组,随机从原数组中取出一个元素放入新数组
function shuffle2(arr) {
    let _arr = []
    while (arr.length) {
        let randomIndex = Math.floor(Math.random() * (arr.length))
        _arr.push(arr.splice(randomIndex, 1)[0])
    }
    return _arr
}

var times = 100000;
var res = {};

for (var i = 0; i < times; i++) {

    var arr = [1, 2, 3];
    arr = shuffle(arr)

    var key = JSON.stringify(arr);
    res[key] ? res[key]++ : res[key] = 1;
}

// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}
console.log(res)
