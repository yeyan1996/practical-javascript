import {showLoading, hideLoading} from "./util";

let needLoadingRequestCount = 0

function startLoading() {
    showLoading({
        title: '加载中'
    })
}

function endLoading() {
    hideLoading()
}

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}