// 对象转为 JSON 字符串

const isComplexDataType = value => (typeof value === 'object' || typeof value === 'function') && value !== null;
const isValidBasicDataType = value => value !== undefined && typeof value !== 'symbol'; // 合法的基础类型
const isDate = obj => Object.prototype.toString.call(obj) === '[object Date]'
const isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]';
const isValidObj = obj => Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]';// 合法的复杂类型(对象)
const isInfinity = value => value === Infinity || value === -Infinity
const isString = value => Object.prototype.toString.call(value) === '[object String]';
// 根据 JSON 规范处理属性值
const processValue = value => {
    if (isInfinity(value) || isNaN(value)) {
        return null
    }
    if (isString(value)) {
        return `"${value}"`
    }
    return value
};

let s = Symbol('s')
let obj = {
    str:"123",
    arr: [1, 2, {e: 1}],
    obj: {a: 1},
    Infinity: -Infinity,
    nan:NaN,
    undef: undefined,
    symbol: s,
    date: new Date(),
    reg:/123/g,
    func:()=>{},
    dom:document.querySelector('body'),
}

// obj.loop = obj

const jsonStringify = (function () {
    // 闭包 + WeakMap 防止循环引用
    let wp = new WeakMap()
    // 递归调用 jsonStringify 的都是闭包中的这个函数，而非 const 声明的 jsonStringify 函数
    return function jsonStringify(obj) {
        if (wp.get(obj)) throw new TypeError('Converting circular structure to JSON');
        let res = "";

        if (isComplexDataType(obj)) { // 复杂类型的情况

            if (!isValidObj(obj)) {  // 非法的复杂类型直接返回
                return
            }
            wp.set(obj, obj);

            if (Array.isArray(obj)) {  // 数组的情况
                res += "[";
                let temp = []; //声明一个临时数组用来控制属性之间的逗号
                obj.forEach((value) => {
                    temp.push(isComplexDataType(value) ? jsonStringify(value) : `${value}`)
                })
                res += `${temp.join(',')}]`
            } else {  // 对象的情况
                res += "{";
                let temp = [];
                Object.keys(obj).forEach((key) => {
                    // 值是对象的情况
                    if (isComplexDataType(obj[key])) {
                        // 值是合法对象的情况
                        if (isValidObj(obj[key])) {
                            temp.push(`"${key}":${jsonStringify(obj[key])}`)
                        } else if (isDate(obj[key])) {
                            temp.push(`"${key}":"${obj[key].toISOString()}"`)
                        } else if (!isFunction(obj[key])) {
                            temp.push(`"${key}":{}`)
                        }
                    } else if (isValidBasicDataType(obj[key])) {   // 值是基本类型
                        temp.push(`"${key}":${processValue(obj[key])}`)
                    }
                });
                res += `${temp.join(',')}}`
            }
        }else{ // 基本类型直接返回
            return obj
        }
        return res
    }
})();


console.log(jsonStringify(obj));
console.log(JSON.stringify(obj));
