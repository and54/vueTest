<template>
  <div class="center">
    <md-dialog-alert :md-active.sync="showModal" :md-content="modalMsg" md-confirm-text="Accept"/>
    <div class="mydiv" id="password"></div>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="{'md-invalid': !emailValidation}">
          <md-icon>alternate_email</md-icon>
          <label>Email</label>
          <md-input v-model="email" @blur="validateEmail()" @focus="emailValidation = true;" @keyup.enter="submit()"></md-input>
          <span class="md-error">Valid email is required!</span>
        </md-field>
        <md-field :class="{'md-invalid': !passValidation}">
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password" @blur="validatePass()"  @focus="passValidation = true;" @keyup.enter="submit()"></md-input>
          <span class="md-error">{{ passError }}</span>
        </md-field>
      </md-card-content>

      <md-card-actions md-alignment="space-between">
        <router-link to="/forgotpassword"><md-button>Forgot Password</md-button></router-link>
        <router-link to="/register"><md-button>Register</md-button></router-link>
        <md-button class="md-raised md-primary" @click="submit()">Login</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import md5 from 'md5';
import { AuthBus } from '../../services/authentication';

export default {
  data: () => ({
    email: '',
    password: '',
    emailValidation: true,
    passValidation: true,
    passError: '',
    showModal: false,
    modalMsg: '',
  }),
  created() {
    AuthBus.$on('userData', this.userData);
  },
  methods: {
    submit() {
      if (this.validateEmail() && this.validatePass()) {
        AuthBus.Login(this.email, md5(this.password), (success, message) => {
          if (success) this.$router.push('/dragdash2');
          else {
            this.modalMsg = message;
            this.showModal = true;
          }
        });
      }
    },
    validateEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.emailValidation = re.test(this.email);
      return this.emailValidation;
    },
    validatePass() {
      this.passValidation = this.password.length >= 6;
      this.passError = this.password.length === 0 ? 'Password is required!' : 'Password can\'t be les than 6 characters!';
      return this.passValidation;
    },
    userData(data) {
      console.log('userData received (method)', data);
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
  width: 60%;
  min-width: 400px;
  max-width: 800px;
  margin: 0 auto;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
</style>
