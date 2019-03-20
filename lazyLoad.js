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


let imgList1 = [document.querySelectorAll("img")[0]]

const lazyLoad1 = function () {
    imgList1.forEach(img => {
        let rect = img.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
            img.src = img.dataset.src
        }
    })
}

document.addEventListener('scroll', proxy(lazyLoad1, 100))


let imgList2 = [document.querySelectorAll("img")[1]]

const lazyLoad2 = function () {
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
