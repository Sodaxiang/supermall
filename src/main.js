import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

Vue.config.productionTip = false

// 注册事件总总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
