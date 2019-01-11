import 'babel-polyfill';

import Vuelidate from 'vuelidate';
//import Vue from 'vue/dist/vue';
import Vue from 'vue';
import Vuex from 'vuex'
import VueMaterial from 'vue-material';
import axios from 'axios';
import App from './App.vue';
import router from './router';

import VueResponsiveGridLayout from 'vue-responsive-grid-layout';

import 'es6-promise/auto';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

axios.defaults.baseURL = 'http://localhost:4300';
// axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.response.use((res) => {
  console.log('response', res);
  return res;
});

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(Vuelidate);

Vue.use(Vuex);

Vue.use(VueResponsiveGridLayout);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
