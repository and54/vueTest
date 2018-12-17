<template>
  <div class="center">
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="emailValidation">
          <md-icon>alternate_email</md-icon>
          <label>Email</label>
          <md-input v-model="email"></md-input>
          <span class="md-error">Email invalid!</span>
        </md-field>
        <md-field :class="passValidation">
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
          <span class="md-error">Password invalid!</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary">Send</md-button>
        <md-button class="md-raised md-accent">Cancel</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
  }),
  computed: {
    emailValidation() {
      return {
        'md-invalid': false,
      };
    },
    passValidation() {
      return {
        'md-invalid': false,
      };
    },
  },
};
</script>

<style scoped>
.center {
  height: 100vh;
  margin: 0 auto;
}
.md-card {
  border-radius: 4px;
  padding: 10px;
  width: 600px;
  margin: 0 auto;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
</style>
