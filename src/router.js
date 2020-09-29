import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 动态获取路由，请在各个app中填写
const routerFiles = require.context('./apps/', true, /routes\.js$/)
const routes = routerFiles.keys().reduce((res, rfPath) => res.concat(routerFiles(rfPath).default), [])
// }map(rfPath => routerFiles(rfPath).default)
const router = new Router({
  mode: 'history',
  routes
})

/*
router.afterEach((to ,from) => {
  
})
*/

export default router
