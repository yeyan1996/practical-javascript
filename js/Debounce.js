/**
 * @description 函数防抖
 * @function Debounce
 * @param {Function} func -需要函数防抖的函数
 * @param {Object} context -函数作用域
 * @param {Number} time -延迟时间
 * @return {Function} -经过函数防抖处理的函数
**/

export default  function Debounce(func,context,time) {
     return function () {
         func.timeId ?  clearTimeout(func.timeId) : ''
         func.timeId = setTimeout(()=>{
             func.apply(context)
         },time)
     }
}