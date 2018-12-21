import Vue from 'vue/dist/vue'
import Router from 'vue-router';
import { AuthBus } from './services/authentication'

import Home from './components/home.vue';
import Dashboard from './components/dashboard.vue';
import Login from './components/authentication/login.vue';
import Register from './components/authentication/register.vue';
import ForgotPassword from './components/authentication/forgot_password.vue';
import ResetPassword from './components/authentication/reset_password.vue';

Vue.use(Router);

function CheckToken (to, from, next) {
  if (AuthBus.token) next();
  else next('/login');
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '', component: Home },
    { path: '/dashboard', component: Dashboard, beforeEnter: CheckToken},
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgotpassword', component: ForgotPassword },
    { path: '/resetpassword/:pass_id', component: ResetPassword },
  ],
});
