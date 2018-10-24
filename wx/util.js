/**
 * @typedef {Object} UploadOptions
 * @param {String} url -路径
 * @param {String} path -图片路径
 * @param {Number} index -下标
**/

/**
 * @description 上传功能
 * @function uploadFile
 * @param {UploadOptions} options
 * @return {Promise}
 **/
export function uploadFile({url,path,index}) {
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: url,
            filePath: path,
            name: "file",
            formData: {
                "fileIndex": index,
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
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
 * @description 获取登录凭证
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
 * @example
 * async function func() {
  try {
    await showModal('重新登录')
    //用户点击确认后才执行以下操作,否则进入catch子句
     await login()
  } catch (e) {
    console.log(e)
  }
}
 **/

export function showModal({
        title='提示',
        content='这是一个模态框',
        showCancel=true,
        cancelText='取消',
        confirmText='确定'
    }) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            cancelText:cancelText,
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
    if(!scope){
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
 * @description 选择图片
 * @function chooseImage
 * @param {Object} options -选择图片的配置,见微信官网
 * @return {Promise} 返回resolve值为选择图片信息组成的对象的Promise实例
 **/

export function chooseImage(options) {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: options.count || 9,
            sizeType: options.sizeType || ['original', 'compressed'],
            sourceType: options.sourceType || ['album', 'camera'],
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
