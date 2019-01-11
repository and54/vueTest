<template>
  <div>
    <span>dashboard</span>
    <cmp-profile :userInfo="userInfo" :image="require('@/assets/avatar.png')" class="md-card center block"></cmp-profile>
  </div>
</template>

<script>
import CmpProfile from "./dashboard/profile.vue";
import { AuthBus } from "../services/authentication";

export default {
  data: () => ({
    userInfo: AuthBus.user ? AuthBus.user : {},
  }),
  components: {
    CmpProfile
  }
};
</script>

<style scoped>
.center {
  text-align: center;
}
.md-card {
  border-radius: 4px;
  padding: 10px;
  width: 60%;
  min-width: 350px;
  max-width: 600px;
  margin: 0 auto;
}
.block {
  line-height: 0.5;
}
</style>
