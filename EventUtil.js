const EventUtil = {

    /**
     * @method addHandler 添加事件处理程序
     * @param {Object} element 操作的元素节点
     * @param {String} type 事件名称
     * @param {Function} handler 事件处理函数
     **/

    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent(`on${type}`, handler)
        } else {
            element[`on${type}`] = handler
        }
    },

    /**
     * @method removeHandler 删除事件处理程序
     * @param {Object} element 操作的元素节点
     * @param {String} type 事件名称
     * @param {Function} handler 事件处理函数
     **/

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler)
        } else if (element.detachEvent) {
            element.detachEvent(`on${type}`, handler)
        } else {
            element[`on${type}`] = null
        }
    },

    /**
     * @method getEvent 获取事件对象
     * @param {Object} event 事件对象
     * @return {Object} 跨浏览器事件对象
     **/

    getEvent: function (event) {
        return event ? event : window.event
    },

    /**
     * @method getTarget 获取target属性
     * @param {Object} event 事件对象
     * @return {Object} 跨浏览器事件对象的target属性
     **/

    getTarget: function (event) {
        return event.target || event.srcElement
    },

    /**
     * @method preventDefault 跨浏览器阻止默认行为
     * @param {Object} event 事件对象
     **/

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },

    /**
     * @method stopPropagation 跨浏览器阻止冒泡
     * @param {Object} event 事件对象
     **/

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    }
}

export default EventUtil