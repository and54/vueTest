<template>
  <md-card class="center" md-with-hover>
    <p class="block">
      <p><img :src="image"></p>
      <h1>{{ userInfo.name + " " + userInfo.lastname }}</h1>
      <h2>{{ userInfo.user }}</h2>
    </p>
    <hr>
    <p class="block">
      <h4 v-for="email in userInfo.emails" :key="email">{{ email }}</h4>
      <h4 v-for="phone in userInfo.phones" :key="phone">{{ phone }}</h4>
    </p>
  </md-card>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => ({name:'Andres', user:'and54', lastname:'Munoz'})
    },
    image: {
      type: String,
      default: require('@/assets/avatar.png')
    },
  },
}
</script>

<style scoped>
.center {
  text-align: center;
}
.md-card {
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  height: calc(100% - 20px);
  /* min-width: 350px; */
  max-width: 600px;
  margin: 0 auto;
}
.block {
  line-height: 0.5;
}
</style>