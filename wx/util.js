/**
 * @typedef {Object} UploadOptions
 * @param {String} url -路径
 * @param {String} path -图片路径
 * @param {String} name -文件对应的 key
 * @param {Object} [header={ "Content-Type": "multipart/form-data"}] -HTTP 请求 Header，Header 中不能设置 Referer
 * @param {Object} [formData] -HTTP 请求中其他额外的 form data
 **/

/**
 * @description 上传功能
 * @function uploadFile
 * @param {UploadOptions} options
 * @return {Promise}
 **/
export function uploadFile({
                               url,
                               path,
                               name,
                               header = {"Content-Type": "multipart/form-data"},
                               formData
                           }) {
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: url,
            filePath: path,
            name: name,
            header,
            formData,
            success: (res) => {
                resolve(res);
            },
            fail: (e) => {
                reject(e);
            }
        });
    });
}

/**
 * @typedef {Object} ChooseImgOptions
 * @param {Number} [count=9] -选择图片数量最大9
 * @param {Array} [sizeType=['original', 'compressed']] -所选的图片的尺寸
 * @param {Array} [sourceType=['album', 'camera']] -选择图片的来源
 **/

/**
 * @description 选择图片
 * @function chooseImage
 * @param {ChooseImgOptions} options -选择图片的配置
 * @return {Promise} 返回resolve值为选择图片信息组成的对象的Promise实例
 **/

export function chooseImage({
                                count = 9,
                                sizeType = ['original', 'compressed'],
                                sourceType = ['album', 'camera']
                            }) {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: count || 9,
            sizeType: sizeType || ['original', 'compressed'],
            sourceType: sourceType || ['album', 'camera'],
            success: (res) => {
                resolve(res)
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}


/**
 * @description 获取登录凭证（code）
 * @function login
 * @return {Promise} 返回一个resolve值为登录凭证的Promise实例
 **/
export function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (result) => {
                resolve(result.code)
            },
            fail: (e) => {
                reject(e)
            }
        });
    })
}


/**
 * 配置参数
 * @typedef {Object} ModalOptions
 * @param {String} [title='提示'] -模态框标题
 * @param {String} [content='这是一个模态框'] -模态框显示文字
 * @param {String} [showCancel=false] -是否显示取消按钮
 * @param {Boolean} [cancelText='取消'] -取消按钮的文字
 * @param {String} [confirmText='确定'] -确认按钮的文字
 **/


/**
 * @description 模态框
 * @function showModal
 * @param {ModalOptions} [Options] -配置参数
 * @return {Promise} Promise实例
 **/

export function showModal({
                              title = '提示',
                              content = '这是一个模态框',
                              showCancel = true,
                              cancelText = '取消',
                              confirmText = '确定'
                          }) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            cancelText: cancelText,
            confirmText: confirmText,
            success: (res) => {
                if (res.confirm) {
                    resolve()
                } else {
                    reject('点击取消')
                }
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}


/**
 * @description 获取用户当前设置(授权信息的情况)
 * @function getSetting
 * @return {Promise} 返回一个resolve值为用户当前设置的Promise实例
 **/

export function getSetting() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (authSetting) => {
                resolve(authSetting)
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}

/**
 * @description 授权请求
 * @function authorize
 * @param {String} scope -获取的权限信息
 * @return {Promise} Promise实例
 **/

export function authorize(scope) {
    if (!scope) {
        throw new TypeError('必须传入scope参数')
    }
    return new Promise((resolve, reject) => {
        wx.authorize({
            scope: scope,
            success: () => {
                resolve()
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}

/**
 * @description 在用户已经授权访问用户信息的情况下,返回用户信息
 * @function getUserInfo
 * @param {Boolean} [withCredentials] -是否带上登录信息,授权成功会返回敏感信息
 * @return {Promise} 返回resolve值为用户信息对象的Promise实例
 **/

export function getUserInfo(withCredentials) {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials: withCredentials || false,
            success: (res) => {
                resolve(res)
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}


/**
 * @description 显示loading图
 * @function showLoading
 * @param {Object} options -loading的配置,见微信官网
 * @return {Promise} 返回Promise实例
 **/

export function showLoading(options) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: options.title || '加载中',
            mask: options.mask || false,
            success: (res) => {
                resolve(res)
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}


/**
 * @description 隐藏loading图
 * @function hideLoading
 * @return {Promise} 返回Promise实例
 **/

export function hideLoading() {
    return new Promise((resolve, reject) => {
        wx.hideLoading({
            success: (res) => {
                resolve(res)
            },
            fail: (e) => {
                reject(e)
            }
        })
    })
}
