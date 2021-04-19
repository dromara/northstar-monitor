import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('../views/Icon.vue')
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: () => import('../views/Workspace.vue')
  },
  {
    path: '/gateway/mkt',
    name: 'gateway',
    component: () => import('../views/GatewayMgmt.vue')
  },
  {
    path: '/gateway/trd',
    name: 'account',
    component: () => import('../views/GatewayMgmt.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
