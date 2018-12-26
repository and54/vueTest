<template>
  <div class="center">
    <md-dialog-alert :md-active.sync="showModal" :md-content="modalMsg" md-confirm-text="Accept"/>

    <md-card md-with-hover>
      <div @keydown.enter="callAction()">
        <md-card-header>
          <div class="md-title">Forgot Password</div>
        </md-card-header>

        <md-card-content v-if="!nextStep">
          <md-field :class="{'md-invalid': $v.email.$error}">
            <label>Email</label>
            <md-input v-model="email" @input="$v.email.$touch(); checkedEmail=false;" @blur="validateEmail()" ></md-input>
            <md-icon v-if="checkedEmail && !validEmail" class="red">cancel</md-icon>
            <md-icon v-if="checkedEmail && validEmail" class="green">check_circle</md-icon>
            <span class="md-error">{{ emailError }}</span>
          </md-field>
        </md-card-content>

        <md-card-content v-else>
          <div v-for="phone in userInfo.phones" :key="phone" >
            Phone: {{ hideNumber(phone) }} <md-radio class="radio" v-model="radio" :value="phone+'-Call'">Call</md-radio><md-radio class="radio" v-model="radio" :value="phone+'-SMS'">SMS</md-radio>
          </div>
          <div v-for="email in userInfo.emails" :key="email">
            <md-radio v-model="radio" :value="email" >Send email to: {{ hideEmail(email) }}</md-radio>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-primary" @click="callAction()">Send</md-button>
          <router-link to="/login"><md-button class="md-raised md-accent">Cancel</md-button></router-link>
        </md-card-actions>
      </div>
    </md-card>
  </div>
</template>

<script>
import md5 from 'md5';
import { required, email } from 'vuelidate/lib/validators';
import { AuthBus } from '../../services/authentication';

const checkEmail = (value, component) => {
  component.emailError = (component.checkedEmail && !component.validEmail) ? 'Email provided is not in our database!' : 'Valid email is required!';
  return !component.checkedEmail || component.validEmail;
};

export default {
  data: () => ({
    email: '',
    userInfo: {
      phones: [],
      emails: [],
    },
    radio: '',

    checkedEmail: false,
    validEmail: false,

    nextStep: false,

    emailError: '',
    showModal: false,
    modalMsg: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    callAction() {
      if (!this.nextStep) {
        if (!this.checkedEmail) this.validateEmail();
        else if (this.validEmail) this.contactInfo();
      } else if (this.nextStep) this.submit();
    },
    submit() {
      /* AuthBus.RegisterUser(data, (success, message) => {
        if (success) this.$router.push('/login');
        else {
          this.modalMsg = message;
          this.showModal = true;
        }
      }); */
    },
    hideNumber(num) {
      let txt = '';
      for (let i = 0; i < num.length - 4; i++) {
        txt += '*';
      }
      txt += num.substr(-4);
      return txt;
    },
    hideEmail(email) {
      let txt = email.substr(0, 4);
      const at = email.indexOf('@');
      const dot = email.indexOf('.', at);
      for (let i = 4; i < at; i++) {
        txt += '*';
      }
      txt += '@';
      for (let i = at; i < dot; i++) {
        txt += '*';
      }
      txt += email.substr(dot);
      return txt;
    },
    contactInfo() {
      this.nextStep = true;
      AuthBus.ContactInfo(this.email, (err, data) => {
        if (data) {
          this.userInfo = data.info;
          this.radio = this.userInfo.email[0];
        } else {
          this.modalMsg = message;
          this.showModal = true;
        }
      });
    },
    validateEmail() {
      console.log('validateEmail');
      AuthBus.CheckEmail(this.email, (err, data) => {
        if (data) {
          this.checkedEmail = true;
          this.validEmail = data.exists;
        } else {
          this.modalMsg = message;
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
.radio {
  margin-left: 18px !important;
}
</style>
