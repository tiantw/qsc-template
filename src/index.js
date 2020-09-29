import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 解决Android机器页面不再受到用户字体缩放强制改变大小
import 'lib-flexible'
// import JSBridge from '../static/js/JSBridge'
// 加入神策
import sensorsSDK from 'sa-sdk-javascript'
// import VueOrionSDK from './components/custom/LhAdNew.vue'

  
// start 阿里云ARMS
/**
 * qsc环境  <==>  阿里云控制台对应选项
 * 本地 => 本地环境
 * 测试 => 日常环境
 * 预生产 => 预发环境
 * 正式  => 线上环境
 * **/
const BrowserLogger = require('alife-logger');
const __bl = BrowserLogger.singleton({
    pid:"hvd9oaga9s@9dd07b8a2d4b047",
    appType:"web",
    imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",
    sendResource:true,
    enableLinkTrace:true,
    behavior:true,
    enableSPA:true,
    environment: process.env.ARMS_ENV
});
// end 阿里云ARMS

// __bl.sum('fe-httpError-5xx-test', '1')
// __bl.sum('fe-httpError-4xx-test', '1')

// import { wechat } from 'library'
// import { resolve } from 'dns';
// Vue.component(VueOrionSDK.name, VueOrionSDK)
// Vue.use(ConfigPlugin, {
//     $layout: 'VIEW_BOX'
// })
// Vue.use(Toast)

// console.log = (function(oriLogFunc){
//     return function(str)
//     {}
//   })(console.log);

// 开发环境使用mock数据，打包的时候并不会将其打包进去
if (process.env.NODE_ENV === 'development') {
    // require('@/http/mock/index.js')
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    components: { App },
    render: h => h(App)
}).$mount('#app')