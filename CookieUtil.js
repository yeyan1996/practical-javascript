const CookieUtil = {

    /**
     * @description 查询cookie
     * @function get
     * @param {String} name -查询的cookie名字
    **/

    get: function (name) {
        let cookieName = `${encodeURIComponent(name)}=`
        let cookieStart = document.cookie.indexOf(cookieName)
        let cookieValue = null

        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(';', cookieStart)
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue
    },

    /**
     * @description 设置cookie
     * @function set
     * @param {String} name -cookie键
     * @param {String} value -cookie值
     * @param {Date} expires -到期时间
     * @param {String} path -路径
     * @param {String} domain -有效域名
     * @param {Boolean} secure -安全标志
     **/

    set: function (name, value, expires, path, domain, secure) {
        let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
        if (expires instanceof Date) {
            cookieText = `${cookieText};expires=${expires.toGMTString()}`
        }
        if (path) {
            cookieText = `${cookieText}; path=${path}`
        }
        if (domain) {
            cookieText = `${cookieText}; domain=${domain} `
        }
        if (secure) {
            cookieText = `${cookieText}; secure`
        }
        document.cookie = cookieText
    },

    /**
     * @description 删除cookie
     * @function unset
     * @param {String} name -cookie键
     * @param {String} path -路径
     * @param {String} domain -有效域名
     * @param {Boolean} secure -安全标志
     *
    **/

    unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure)
    }
}
export default CookieUtil