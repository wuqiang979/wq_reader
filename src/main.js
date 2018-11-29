// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import fly from './http1.js'
Vue.prototype.$http1 = fly;

import axios from './http.js'
Vue.prototype.$http = axios;

import zxjqTouch from './zxjq_swipe'
Vue.use(zxjqTouch)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
