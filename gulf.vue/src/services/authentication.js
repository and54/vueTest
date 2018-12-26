import Vue from 'vue';
import axios from 'axios';

const axiosAuth = axios.create({});
// axiosAuth.defaults.headers.common['Authorization'] = '';

function CheckError(err) {
  return err.response ? err.response.data.message : err.message;
}

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
        callBack(false, CheckError(err));
      });
    },

    RegisterUser(data, callBack) {
      axiosAuth.post('/auth/register', data).then((res) => {
        callBack(true, res.data.message);
      }).catch((err) => {
        callBack(false, CheckError(err));
      });
    },

    CheckEmail(email, callBack) {
      axiosAuth.get(`/auth/checkuser/${email}`).then((res) => {
        callBack(null, res.data);
      }).catch((err) => {
        callBack(CheckError(err), null);
      });
    },

    ContactInfo(email, callBack) {
      axiosAuth.get(`/auth/contactinfo/${email}`).then((res) => {
        callBack(null, res.data);
      }).catch((err) => {
        callBack(CheckError(err), null);
      });
    },

    SendUserInfo(user) {
      this.user = user;
      this.$emit('userData', user);
    },

  },
});
