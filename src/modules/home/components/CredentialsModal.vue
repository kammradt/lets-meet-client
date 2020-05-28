<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="scale-transition"
    v-model="showModal"
  >
    <v-card>
      <div
        class="pt-2 display-1 font-weight-light text-center"
        v-text="title"
      />
      <v-divider class="my-4"></v-divider>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-form>
              <v-text-field
                label="E-mail"
                solo
                type="email"
                v-model="credentialsRequest.email"
              />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                label="Password"
                solo
                v-model="credentialsRequest.password"
              />
              <v-row no-gutters>
                <v-col cols="3">
                  <v-btn
                    @click="closeModal"
                    block
                    color="red"
                    text
                    v-text="'Exit'"
                  />
                </v-col>
                <v-col cols="9">
                  <v-btn @click="action" block color="primary" v-text="title" />
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { login, register } from "../services/users-service";

export default {
  name: "Register",
  data: () => ({
    credentialsRequest: {
      email: "",
      password: ""
    },
    showModal: false,
    showPassword: false,
    isLogin: false
  }),
  computed: {
    title() {
      return this.isLogin ? "Sign in" : "Register";
    }
  },
  methods: {
    action() {
      this.isLogin ? this.performLogin() : this.performRegister();
    },
    performLogin() {
      login(this.credentialsRequest).then(this.closeModal);
    },
    performRegister() {
      register(this.credentialsRequest).then(this.performLogin);
    },
    openModal(isLogin) {
      this.isLogin = isLogin;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>
