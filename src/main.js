import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

require('@/assets/css/normalize.css');
require('@/assets/css/skeleton-alerts.css');
require('@/assets/css/skeleton.css');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
