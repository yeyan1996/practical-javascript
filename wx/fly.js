import {baseURL} from "./config";
import {showFullScreenLoading} from "./loading";
import {tryHideFullScreenLoading} from "./loading";
import {showModal} from "./util";

let Fly = require("flyio/dist/npm/wx")
let fly = new Fly


fly.config.baseURL = baseURL // 配置请求基地址
fly.config.timeout = 1000 * 60 * 60 * 2;

fly.interceptors.request.use((request) => {
    //给所有请求添加自定义header
    request.headers = {
        "content-type": "application/json",
    }
    showFullScreenLoading()
    return request;
})


fly.interceptors.response.use((response) => {
        tryHideFullScreenLoading()
        switch (response.data.status) {
            //响应成功，但是服务器返回找不到数据
            case '0':
                showModal({
                    content: response.data.msg
                })
                return Promise.reject(response.data)
            //没有登录权限
            case '-1':
                showModal({
                    content: `登录失效请重新登录`
                })
                return Promise.reject(response.data)
            case "1":
                return response;
            default:
                showModal({
                    content: `未知错误`
                })
                return Promise.reject(response.data)
        }
    },
    //网络错误拦截
    (err) => {
        tryHideFullScreenLoading()
        console.log('fly响应错误', err)
        if (err.message.includes('timeout')) {
            wx.showModal({
                title: "提示",
                content: `服务器未响应，请求超时`,
            });
            Promise.reject(err)
        } else {
            wx.showModal({
                title: "提示",
                content: `服务器请求失败，错误信息${err.message}`
            });
            Promise.reject(err)
        }
    }
)

export default fly