import Vue from 'vue';
import axios from 'axios';

const axiosAuth = axios.create({});
// axiosAuth.defaults.headers.common['Authorization'] = '';

export const AuthBus = new Vue({
  data: {
    token: null,
    user: null,
  },
  methods: {
    Login(user, password, callBack) {
      const data = {
        user,
        password,
      };
      axiosAuth.post('/auth/login', data).then((res) => {
        this.token = res.data.token;
        this.UserInfo(res.data.user);
        callBack(true, res.data.message);
      }).catch((err) => {
        callBack(false, err.response.data.message);
      });
    },
    UserInfo(user) {
      this.user = user;
      console.log('emit info', user);
      this.$emit('userData', user);
    }
  },
})