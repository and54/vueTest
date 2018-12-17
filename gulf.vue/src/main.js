import 'babel-polyfill';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import axios from 'axios';
import App from './App.vue';
import router from './router';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

axios.defaults.baseURL = 'http://localhost:4300';
// axios.defaults.headers.common['Authorization'] = '';
axios.interceptors.response.use((res) => {
  // eslint-disable-next-line no-console
  console.log('response', res);
  return res;
});

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
