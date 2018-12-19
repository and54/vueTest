<template>
  <div class="center">
    <md-dialog-alert :md-active.sync="showModal" :md-content="modalMsg" md-confirm-text="Accept"/>

    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Register</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="{'md-invalid': $v.name.$error}">
          <!-- <md-icon>user</md-icon> -->
          <label>Name</label>
          <md-input v-model="name" @input="$v.name.$touch()"></md-input>
          <span class="md-error">Name is required!</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.lastname.$error}">
          <!-- <md-icon>user</md-icon> -->
          <label>Lastname</label>
          <md-input v-model="lastname" @input="$v.lastname.$touch()"></md-input>
          <span class="md-error">Lastname is required!</span>
        </md-field>

        <md-field :class="{'md-invalid': $v.email.$error}">
          <!-- <md-icon>alternate_email</md-icon> -->
          <label>Email</label>
          <md-input v-model="email" @input="$v.email.$touch()"></md-input>
          <span class="md-error">Valid email is required!</span>
        </md-field>
        <md-field :class="{'md-invalid': $v.reemail.$error}">
          <!-- <md-icon>alternate_email</md-icon> -->
          <label>Re Email</label>
          <md-input v-model="reemail" @input="$v.reemail.$touch()"></md-input>
          <span class="md-error">Email do not match!</span>
        </md-field>

        <md-field :class="{'md-invalid': $v.password.$error}">
          <!-- <md-icon>alternate_email</md-icon> -->
          <label>Password</label>
          <md-input v-model="password" @input="$v.password.$touch()"></md-input>
          <span class="md-error">{{ passError }}</span>
        </md-field>

        <div>{{ $v }}</div>
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
import { required, email, maxLength, minLength, alpha, sameAs } from "vuelidate/lib/validators";

const checkStrength = (password, component) => {
  component.passError = "";
  if (password.length < 8) component.passError = "Be at least 8 characters!";
  if (!(/[A-Z]/.test(password))) component.passError = "At least one capital letter!";
  if (!(/[a-z]/.test(password))) component.passError = "At least one letter!";
  if (!(/\d/.test(password))) component.passError = "At least one number!";
  if (/\ /.test(password)) component.passError = "No spaces accepted!";
  return !Boolean(component.passError);
};

const register = {
  data: () => ({
    name: "",
    lastname: "",
    email: "",
    reemail: "",
    password: "",
    repassword: "",
    ssn: "",
    phone: "",

    passError: "",
    showModal: false,
    modalMsg: "",
  }),
  validations: {
    name: {
      required,
      alpha
    },
    lastname: {
      required,
      alpha
    },
    email: {
      required,
      email
    },
    reemail: {
      reemail: sameAs("email")
    },
    password: {
      required,
      checkStrength,
    },
    repassword: {
      repassword: sameAs("password")
    }
  },
  methods: { },
};
export default register;
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
