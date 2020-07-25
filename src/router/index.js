import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Monitor from '../pages/Monitor'
import loginService from '../api/service/loginService'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/monitor',
      name: 'monitor',
      meta: {
        requireAuth: true
      },
      component: Monitor
    }
  ]
})

// 配置路由权限
router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    let auth
    try {
      auth = await loginService.auth()
    } catch (e) {
      console.log(e)
    }
    if (auth) { // 判断本地是否存在access_token
      next()
    } else {
      // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
      next('/')
    }
  } else {
    next()
  }
})

export default router
