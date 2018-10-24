<template>
    <svg :class="iconClass" aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
    export default {
        name: 'svgIcon',
        props: {
            svgClass: {
                type: String,
                default: '',
            },
            svgName: {
                type: String,
                required: true
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.svgName}`
            },
            iconClass() {
                if (this.svgClass) {
                    return 'svg_icon ' + this.svgClass
                } else {
                    return 'svg_icon'
                }
            }
        }
    }
</script>

<style scoped>
    .svg_icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
