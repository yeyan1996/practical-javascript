// getBoundingClientRect 实现懒加载
let imgList1 = [...document.querySelectorAll('.get_bounding_rect')]
const num = imgList1.length

let lazyLoad1 = (function () {
  let count = 0
  return function () {
    const deleteIndexList = []
    imgList1.forEach((img, index) => {
      const rect = img.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src
        // 加载成功后将图片添加到删除列表中
        deleteIndexList.push(index)
        count++
        if (count === num) {
          // 当图片全部加载完毕解绑scroll事件
          document.removeEventListener('scroll', lazyLoad1)
        }
      }
    })
    // 删除已经加载完毕的图片
    imgList1 = imgList1.filter((_, index) => !deleteIndexList.includes(index))
  }
})()

// 这里引用了 throttle.js 的节流函数
lazyLoad1 = proxy(lazyLoad1, 100)

document.addEventListener('scroll', lazyLoad1)
// 手动加载一次，否则首屏的图片不触发滚动无法加载
lazyLoad1()

// intersectionObserver 实现懒加载
const imgList2 = [...document.querySelectorAll('.intersection_observer')]

const lazyLoad2 = function () {
  // 实例化observer
  const observer = new IntersectionObserver((entries) => {
    // entries存储着所有观察被元素的intersectionObserverEntry配置
    entries.forEach((entry) => {
      // 大于0表示进入视口
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.target.dataset.src
        // 取消观察
        observer.unobserve(entry.target)
      }
    })
  })
  imgList2.forEach((img) => {
    observer.observe(img)
  })
}

lazyLoad2()
