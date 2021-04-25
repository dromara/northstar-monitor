import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
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
    path: '/mktdata',
    name: 'marketData',
    component: () => import('../views/MarketData.vue')
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('../views/Trade.vue')
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
