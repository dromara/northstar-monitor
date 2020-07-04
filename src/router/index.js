import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Monitor from '../pages/Monitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor
    }
  ]
})
