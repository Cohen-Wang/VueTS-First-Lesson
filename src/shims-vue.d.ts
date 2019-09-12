/**
 * 此文件作用
 * 让ts能识别.vue文件
 * 告诉ts导入.vue文件
 *
 */
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
