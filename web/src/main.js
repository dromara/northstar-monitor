import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import './assets/style/index.css'
import './assets/style/theme/index.css'

import 'animate.css/animate.css'

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
