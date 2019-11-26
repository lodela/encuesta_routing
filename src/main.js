import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faEyeSlash, faEye, faTrashAlt, faEdit, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faEyeSlash, faEye, faTrashAlt, faEdit, faPlusCircle, faMinusCircle )

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
