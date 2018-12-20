<template>
  <div class="center">
    <md-dialog-alert :md-active.sync="showModal" :md-content="modalMsg" md-confirm-text="Accept"/>

    <md-card md-with-hover>
      <div @keydown.enter="submit()">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="{'md-invalid': $v.name.$error}">
            <label>Name</label>
            <md-input v-model="name" @input="$v.name.$touch()"></md-input>
            <span class="md-error">Name is required!</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.lastname.$error}">
            <label>Lastname</label>
            <md-input v-model="lastname" @input="$v.lastname.$touch()"></md-input>
            <span class="md-error">Lastname is required!</span>
          </md-field>

          <md-field :class="{'md-invalid': $v.email.$error}">
            <label>Email</label>
            <md-input v-model="email" @input="$v.email.$touch(); checkedEmail=false;" @blur="validateEmail()" ></md-input>
            <md-icon v-if="checkedEmail && !validEmail" class="red">cancel</md-icon>
            <md-icon v-if="checkedEmail && validEmail" class="green">check_circle</md-icon>
            <span class="md-error">{{ emailError }}</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.reemail.$error}">
            <label>Re Email</label>
            <md-input v-model="reemail" @input="$v.reemail.$touch()"></md-input>
            <span class="md-error">Email do not match!</span>
          </md-field>

          <md-field :class="{'md-invalid': $v.password.$error}">
            <label>Password</label>
            <md-input type="password" v-model="password" @input="$v.password.$touch()"></md-input>
            <span class="md-error">{{ passError }}</span>
          </md-field>
          <md-field :class="{'md-invalid': $v.repassword.$error}">
            <label>Re Password</label>
            <md-input type="password" v-model="repassword" @input="$v.repassword.$touch()"></md-input>
            <span class="md-error">Password do not match!</span>
          </md-field>

          <md-field :class="{'md-invalid': $v.phone.$error}">
            <label>Phone</label>
            <md-input v-model="phone" @input="$v.phone.$touch()"></md-input>
            <span class="md-error">Phone not valid!</span>
          </md-field>

          <md-field :class="{'md-invalid': $v.ssn.$error}">
            <label>SSN ( last 4 digits )</label>
            <md-input v-model="ssn" @input="$v.ssn.$touch()"></md-input>
            <span class="md-error">SSN not valid!</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-primary" @click="submit()">Send</md-button>
          <md-button class="md-raised md-accent" href="/login">Cancel</md-button>
        </md-card-actions>
      </div>
    </md-card>
  </div>
</template>

<script>
import { AuthBus } from '../../services/authentication';
import md5 from 'md5';
import { required, email, maxLength, minLength, alpha, numeric, sameAs } from 'vuelidate/lib/validators';

const checkPassword = (value, component) => {
  component.passError = '';
  if (value.length < 8) component.passError = 'Be at least 8 characters!';
  if (!/[A-Z]/.test(value)) component.passError = 'At least one capital letter!';
  if (!/[a-z]/.test(value)) component.passError = 'At least one letter!';
  if (!/\d/.test(value)) component.passError = 'At least one number!';
  if (/ /.test(value)) component.passError = 'No spaces accepted!';
  return !Boolean(component.passError);
};

const checkEmail = (value, component) => {
  component.emailError = (component.checkedEmail && !component.validEmail) ? 'Email already in use!' : 'Valid email is required!';
  return !component.checkedEmail || component.validEmail;
};

export default {
  data: () => ({
    name: '',
    lastname: '',
    email: '',
    reemail: '',
    password: '',
    repassword: '',
    ssn: '',
    phone: '',

    checkedEmail: false,
    validEmail: false,

    passError: '',
    emailError: '',
    showModal: false,
    modalMsg: '',
  }),
  validations: {
    name: {
      required,
      alpha,
    },
    lastname: {
      required,
      alpha,
    },
    email: {
      required,
      email,
      checkEmail,
    },
    reemail: {
      reemail: sameAs('email'),
    },
    password: {
      required,
      checkPassword,
    },
    repassword: {
      repassword: sameAs('password'),
    },
    phone: {
      required,
      numeric,
      minLength: minLength(10),
    },
    ssn: {
      required,
      numeric,
      minLength: minLength(4),
      maxLength: maxLength(4),
    },
  },
  methods: {
    submit() {
      if (!this.$v.$invalid) {
        const data = {
          name: this.name,
          lastname: this.lastname,
          user: this.email,
          password: md5(this.password),
          ssn: this.ssn,
          emails: [this.email],
          phones: [this.phone],
        };
        AuthBus.RegisterUser(data, (success, message) => {
          if (success) this.$router.push('/login');
          else {
            this.modalMsg = message;
            this.showModal = true;
          }
        });
      }
    },
    validateEmail() {
      console.log('validateEmail');
      AuthBus.CheckEmail(this.email, (err, data) => {
        if (data) {
          this.checkedEmail = true;
          this.validEmail = !data.exists;
        } else {
          this.modalMsg = err;
          this.showModal = true;
        }
      });
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
.red {
  color: var(
    --md-theme-default-icon-on-background,
    rgba(255, 0, 0, 0.8)
  ) !important;
}
.green {
  color: var(
    --md-theme-default-icon-on-background,
    rgba(0, 173, 0, 0.8)
  ) !important;
}
</style>
