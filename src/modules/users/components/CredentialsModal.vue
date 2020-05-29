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
                @keyup.enter="performAction"
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
                  <v-btn
                    @click="performAction"
                    block
                    color="primary"
                    v-text="title"
                  />
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
    title: "",
    action: () => {},
    credentialsRequest: {
      email: "",
      password: ""
    },
    showModal: false,
    showPassword: false
  }),
  methods: {
    performAction() {
      this.action();
    },
    performLogin() {
      login(this.credentialsRequest).then(() => {
        this.$emit("login-successful");
        this.closeModal();
      });
    },
    performRegister() {
      register(this.credentialsRequest).then(this.performLogin);
    },
    openModal(action) {
      const actions = {
        LOGIN: { action: this.performLogin, title: "Sign in" },
        REGISTER: { action: this.performRegister, title: "Register" }
      };
      this.action = actions[action].action;
      this.title = actions[action].title;
      this.showModal = true;
    },
    closeModal() {
      this.credentialsRequest = {};
      this.showModal = false;
    }
  }
};
</script>
