/**
 * @description 全局挂载svg-icon组件（需要配合iconfont.js）
 * @example
 * //main.js
 * import svgIcon from './index.js'
 * Vue.use(SvgIcon)
 * <svg-icon :svgName="dog" :svgClass="icon_dog"></svg-icon>
**/
import svgIcon from './svgIcon'

const SvgIcon = {
    install: function(Vue){
        Vue.component('svg-icon',svgIcon)
    }
}


export default SvgIcon
