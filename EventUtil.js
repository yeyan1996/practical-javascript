const EventUtil = {

    /**
     * @description 添加事件处理程序
     * @function addHandler
     * @param {Object} element -操作的元素节点
     * @param {String} type -事件名称
     * @param {Function} handler -事件处理函数
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
     * @description 删除事件处理程序
     * @function removeHandler
     * @param {Object} element -操作的元素节点
     * @param {String} type -事件名称
     * @param {Function} handler -事件处理函数
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
     * @description 获取事件对象
     * @function getEvent
     * @param {Object} event -事件对象
     * @return {Object} -跨浏览器事件对象
     **/

    getEvent: function (event) {
        return event ? event : window.event
    },

    /**
     * @description 获取target属性
     * @function getTarget
     * @param {Object} event -事件对象
     * @return {Object} -跨浏览器事件对象的target属性
     **/

    getTarget: function (event) {
        return event.target || event.srcElement
    },

    /**
     * @description 跨浏览器阻止默认行为
     * @function preventDefault
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
     * @description 跨浏览器阻止冒泡
     * @function stopPropagation
     * @param {Object} event -事件对象
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