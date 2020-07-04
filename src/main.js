// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import {
  Divider,
  Flexbox,
  FlexboxItem,
  Grid,
  GridItem,
  XInput,
  XButton,
  Tab,
  TabItem,
  XTable,
  XHeader,
  PopupPicker,
  Group,
  Toast,
  Actionsheet,
  Search,
  ToastPlugin
} from 'vux'
import {
  Select,
  Option,
  Input,
  Form,
  FormItem
} from 'element-ui'

import store from './store/index'

Vue.component('x-button', XButton)
Vue.component('x-input', XInput)
Vue.component('toast', Toast)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('divider', Divider)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('x-table', XTable)
Vue.component('x-header', XHeader)
Vue.component('actionsheet', Actionsheet)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('popup-picker', PopupPicker)
Vue.component('group', Group)
Vue.component('search', Search)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(ToastPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false
// 统一异常处理
const errorHandler = (err, vm, info) => {
  console.log(err)
  vm.$vux.toast.text(err.message)
}
Vue.prototype.$throw = (error, vm) => errorHandler(error, vm)
Vue.config.errorHandler = errorHandler

window.onerror = (e) => {
  console.log('报错了')
  console.log(e)
}
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
