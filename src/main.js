// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import _ from 'lodash'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(MintUI)

Vue.prototype.$axios = axios
window.axios = axios
Vue.prototype.$_ = _
window._ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
