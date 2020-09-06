import Vue from 'vue'
import Router from 'vue-router'
import loginService from '../api/service/loginService'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/Login')
    },
    {
      path: '/monitor',
      name: 'monitor',
      meta: {
        requireAuth: true
      },
      component: () => import('../pages/Monitor')
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
      console.log('未获得登陆权限')
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
