<template>
  <v-app>
    <v-app-bar app elevation="3" flat hide-on-scroll>
      <v-toolbar-title
        class="font-weight-bold headline primary--text"
        v-text="'Let\'s meet!'"
      />

      <v-spacer></v-spacer>

      <div v-if="!isLogged">
        <v-btn
          @click.stop="openLoginModal"
          class="mx-2"
          color="primary"
          text
          v-text="'Sign in'"
        />

        <v-btn
          @click.stop="openRegisterModal"
          color="primary"
          v-text="'Get started'"
        />
      </div>
      <div v-else>
        <UserCard :user="user" @logout="onLogout" />
      </div>

      <CredentialsModal @login-successful="onLogin" ref="credentialsModal" />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CredentialsModal from "./modules/users/components/CredentialsModal";
import { clearToken, isLogged } from "./plugins/axios";
import { me } from "./modules/users/services/users-service";
import UserCard from "./modules/users/components/UserCard";

export default {
  name: "App",
  components: { CredentialsModal, UserCard },
  data: () => ({
    isLogged: false,
    user: {}
  }),
  mounted() {
    this.onLogin();
  },
  methods: {
    openLoginModal() {
      this.$refs.credentialsModal.openModal("LOGIN");
    },
    async onLogin() {
      this.isLogged = isLogged();
      this.user = await me();
    },
    onLogout() {
      clearToken();
      this.isLogged = false;
    },
    openRegisterModal() {
      this.$refs.credentialsModal.openModal("REGISTER");
    }
  }
};
</script>
