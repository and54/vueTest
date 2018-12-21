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
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
        this.SendUserInfo(res.data.user);
        callBack(true, res.data.message);
      }).catch((err) => {
        callBack(false, err.response.data.message);
      });
    },

    RegisterUser(data, callBack) {
      axiosAuth.post('/auth/register', data).then((res) => {
        callBack(true, res.data.message);
      }).catch((err) => {
        callBack(false, err.response.data.message);
      });
    },

    CheckEmail(email, callBack) {
      axiosAuth.get(`/auth/checkuser/${email}`).then((res) => {
        callBack(null, res.data);
      }).catch((err) => {
        callBack(err.response.data.message, null);
      });
    },

    ContactInfo(email, callBack) {
      axiosAuth.get(`/auth/contactinfo/${email}`).then((res) => {
        callBack(null, res.data);
      }).catch((err) => {
        callBack(err.response.data.message, null);
      });
    },

    SendUserInfo(user) {
      this.user = user;
      this.$emit('userData', user);
    },
  },
});
