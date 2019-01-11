//import Vue from 'vue/dist/vue';
import Vue from 'vue';
import Router from 'vue-router';
import { AuthBus } from './services/authentication';

import Home from './components/home.vue';
import DragDash from './components/drag_dash.vue';
import DragDash2 from './components/drag_dash2.vue';
import Dashboard from './components/dashboard.vue';
import Login from './components/authentication/login.vue';
import Register from './components/authentication/register.vue';
import ForgotPassword from './components/authentication/forgot_password.vue';
import ResetPassword from './components/authentication/reset_password.vue';

import App from './App';

Vue.use(Router);

function CheckToken (to, from, next) {
  if (AuthBus && AuthBus.token) next();
  else next('/login');
  if (App.component) App.component.enter = false;
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '', component: Home },
    { path: '/dashboard', component: Dashboard, beforeEnter: CheckToken},
    { path: '/dragdash', component: DragDash},
    { path: '/dragdash2', component: DragDash2},
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgotpassword', component: ForgotPassword },
    { path: '/resetpassword/:pass_id', component: ResetPassword },
  ],
});
