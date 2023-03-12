import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import * as echarts from 'echarts'
import './assets/global.css'
import request from "@/plugins/axios"

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
