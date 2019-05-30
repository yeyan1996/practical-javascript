//发布订阅

class EventEmitter {
    constructor() {
        this.subs = {}
    }

    on(event, cb) {
        if (!this.subs[event]) {
            this.subs[event] = []
            this.subs[event].push(cb)
        }
    }

    trigger(event, options) {
        if (this.subs[event]) {
            this.subs[event].forEach(cb => {
                cb(options)
            })
        }
    }

    once(event, onceCb) {
        const cb = (...rest) => {
            let res = onceCb.apply(null, rest)
            this.off(event, onceCb)
            return res
        }

        if (!this.subs[event]) {
            this.subs[event] = []
            this.subs[event].push(cb)
        }
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

dep.on('click', cb)
dep.trigger('click')
dep.off('click', cb)
dep.trigger('click')

dep.once('mouseover', cb2)
dep.trigger('mouseover')
dep.trigger('mouseover')
