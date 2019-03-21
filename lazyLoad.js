//使用Proxy实现函数节流
const proxy = (func, time) => {
    let previous = new Date(0).getTime()
    let handler = {
        apply(target, context, args) {
            let now = new Date().getTime()
            if (now - previous > time) {
                previous = now
                Reflect.apply(func, context, args)
            }
        }
    }
    return new Proxy(func, handler)
}


let imgList1 = [...document.querySelectorAll(".get_bounding_rect")]
let num = imgList1.length

let lazyLoad1 = (function () {
    let count = 0
    return function () {
        imgList1.forEach(img => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                let index = imgList1.findIndex(item => item === img)
                imgList1.splice(index, 1)
                count++
                if (count === num) {
                    //当图片全部加载完毕解绑scroll事件
                    document.removeEventListener('scroll',lazyLoad1)
                }
            }
        })
    }
})()

lazyLoad1 = proxy(lazyLoad1, 100)

document.addEventListener('scroll', lazyLoad1)
//手动加载一次，否则首屏的图片不触发滚动无法加载
lazyLoad1()




let imgList2 = [...document.querySelectorAll(".intersection_observer")]

let lazyLoad2 = function () {
    //实例化observer
    let observer = new IntersectionObserver(entries => {
        //entries存储着所有观察被元素的intersectionObserverEntry配置
        entries.forEach(entry => {
            //大于0表示进入视口
            if (entry.intersectionRatio > 0) {
                entry.target.src = entry.target.dataset.src
                //取消观察
                observer.unobserve(entry.target)
            }
        })
    })
    imgList2.forEach(img => {
        observer.observe(img)
    })
}

lazyLoad2()


