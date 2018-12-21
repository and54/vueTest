import Vue from 'vue/dist/vue';

Vue.component('cmp-profile', {
  data: () => ({

  }),
  props: {
    userInfo: Object,
  },
  methods: {

  },
  computed: {
    avatar () {
      return require('../../assets/avatar.png')
    }
  },
  template: 
    `<md-card class="center" md-with-hover>
      <p class="block">
        <p><img :src="avatar"></p>
        <h1>{{ userInfo.name + " " + userInfo.lastname }}</h1>
        <h2>{{ userInfo.user }}</h2>
      </p>
      <hr>
      <p class="block">
        <h4 v-for="email in userInfo.emails">{{ email }}</h4>
        <h4 v-for="phone in userInfo.phones">{{ phone }}</h4>
      </p>
    </md-card>`,
  });