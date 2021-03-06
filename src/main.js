import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueConfirmDialog from 'vue-confirm-dialog';

Vue.use(VueConfirmDialog);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
