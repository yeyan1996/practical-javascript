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
         func.timeId ?  clearTimeout(func.timeId) : '' //timeId必须是在函数外面能够读取的到的属性
         func.timeId = setTimeout(()=>{
             func.apply(context)
         },time)
     }
}