<template>
  <div>
    dashboard
    <cmp-profile :userInfo="userInfo" class="md-card center block"></cmp-profile>
  </div>
</template>

<script>
import profile from './dashboard/profile';
import { AuthBus } from '../services/authentication';

export default {
  data: () => ({
    userInfo: AuthBus.user ? AuthBus.user : {},
  }),
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
  line-height: .5;
}
</style>
