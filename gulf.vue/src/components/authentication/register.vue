<template>
  <div class="center">
    <md-dialog-alert :md-active.sync="showModal" :md-content="modalMsg" md-confirm-text="Accept"/>

    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Register</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="{'md-invalid': !emailValidation}">
          <md-icon>alternate_email</md-icon>
          <label>Email</label>
          <md-input
            v-model="email"
            @blur="validateEmail()"
            @focus="emailValidation = true;"
            @keyup.enter="submit()"
          ></md-input>
          <span class="md-error">Valid email is required!</span>
        </md-field>
        <md-field :class="{'md-invalid': !passValidation}">
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input
            v-model="password"
            type="password"
            @blur="validatePass()"
            @focus="passValidation = true;"
            @keyup.enter="submit()"
          ></md-input>
          <span class="md-error">{{ passError }}</span>
        </md-field>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-raised md-primary" @click="submit()">Send</md-button>
        <md-button class="md-raised md-accent" href="/login">Cancel</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { AuthBus } from "../../services/authentication";

export default {
  data: () => ({
    email: "",
    password: "",
    emailValidation: true,
    passValidation: true,
    passError: "",
    showModal: false,
    modalMsg: ""
  }),
  created() {
    AuthBus.$on("userData", this.userData);
  },
  methods: {
  }
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
