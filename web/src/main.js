import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import NumberFilter from '@/filter/number-filter'

console.log(NumberFilter)

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

Vue.filter('accountingFormatter', NumberFilter.accountingFormatter)

// 统一异常处理
Vue.config.errorHandler = function (e, v) {
  console.warn('统一异常处理', e)
  ElementUI.Message({
    message: e.message || '遇到未知异常',
    type: 'error',
    duration: 5 * 1000
  })
  v.loading = false
  console.error(e)
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
