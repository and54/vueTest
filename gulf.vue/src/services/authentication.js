import Vue from 'vue';
import axios from 'axios';

const axiosAuth = axios.create({});
// axiosAuth.defaults.headers.common['Authorization'] = '';

export const AuthBus = new Vue({
  data: {},
  methods: {
    Login(user, password) {
      const data = {
        user,
        password,
      };
      axiosAuth.post('/login', data)
        .then((res) => {

        });
    },
  },
});
