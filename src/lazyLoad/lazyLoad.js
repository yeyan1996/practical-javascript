// getBoundingClientRect 实现懒加载
// Implementing lazy loading with getBoundingClientRect
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
        // Add the image to the delete list after it loads successfully
        deleteIndexList.push(index)
        count++
        if (count === num) {
          // 当图片全部加载完毕解绑scroll事件
          // Unbind scroll event when all images are loaded
          document.removeEventListener('scroll', lazyLoad1)
        }
      }
    })
    // 删除已经加载完毕的图片
    // Remove images that have finished loading
    imgList1 = imgList1.filter((_, index) => !deleteIndexList.includes(index))
  }
})()

// 这里引用了 throttle.js 的节流函数
// Referencing the throttle function from throttle.js here
lazyLoad1 = proxy(lazyLoad1, 100)

document.addEventListener('scroll', lazyLoad1)
// 手动加载一次，否则首屏的图片不触发滚动无法加载
// Manually load once, otherwise the first screen images won't load without scrolling
lazyLoad1()

// intersectionObserver 实现懒加载
// Implementing lazy loading with IntersectionObserver
const imgList2 = [...document.querySelectorAll('.intersection_observer')]

const lazyLoad2 = function () {
  // 实例化observer
  // Instantiating the observer
  const observer = new IntersectionObserver((entries) => {
    // entries存储着所有观察被元素的intersectionObserverEntry配置
    // entries store all observed elements' intersectionObserverEntry configurations
    entries.forEach((entry) => {
      // 大于0表示进入视口
      // Greater than 0 indicates entry into the viewport
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.target.dataset.src
        // 取消观察
        // Stop observing
        observer.unobserve(entry.target)
      }
    })
  })
  imgList2.forEach((img) => {
    observer.observe(img)
  })
}

lazyLoad2()
