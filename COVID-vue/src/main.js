import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/global.css'
import request from "@/plugins/axios"
import globals from "@/utils/globals";

Vue.config.productionTip = false
Vue.prototype.request = request
Vue.use(globals)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
