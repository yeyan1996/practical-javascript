//发布订阅(自定义事件)

class EventEmitter {
    constructor() {
        this.subs = {}
    }

    on(event, cb) {
        (this.subs[event] || (this.subs[event] = [])).push(cb)
    }

    // 也可以使用 call 指定 context
    trigger(event, ...args) {
        this.subs[event] && this.subs[event].forEach(cb => {
            cb(...args)
        })
    }

    once(event, onceCb) {
        const cb = (...args) => {
            onceCb(...args)
            this.off(event, onceCb)
        }
        this.on(event,cb)
    }

    off(event, offCb) {
        if (this.subs[event]) {
            let index = this.subs[event].findIndex(cb => cb === offCb)
            this.subs[event].splice(index, 1)
            if (!this.subs[event].length) delete this.subs[event]
        }
    }
}

let dep = new EventEmitter()

let cb = function () {
    console.log('handleClick')
}

let cb2 = function () {
    console.log('handleMouseover')
}

console.group()
dep.on('click', cb)
dep.on('click',cb2)
dep.trigger('click')
console.groupEnd()

console.group()
dep.off('click', cb)
dep.trigger('click')
console.groupEnd()

console.group()
dep.once('mouseover', cb2)
dep.trigger('mouseover')
dep.trigger('mouseover')
console.groupEnd()
