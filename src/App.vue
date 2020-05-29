<template>
  <v-app>
    <v-app-bar app elevation="3" flat hide-on-scroll>
      <v-toolbar-title class="font-weight-bold display-1 primary--text"
        >Let's meet!
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="!isLogged">
        <v-btn
          class="mx-2"
          @click.stop="openLoginModal"
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
        <UserCard @logout="onLogout" :user="user" />
      </div>

      <CredentialsModal @login-successful="onLogin" ref="credentialsModal" />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CredentialsModal from "./modules/home/components/CredentialsModal";
import { clearToken, isLogged } from "./plugins/axios";
import { me } from "./modules/home/services/users-service";
import UserCard from "./modules/home/components/UserCard";

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
      this.$refs.credentialsModal.openModal(true);
    },
    async onLogin() {
      this.isLogged = isLogged();
      this.user = await me();
    },
    onLogout() {
      console.log("opa");
      clearToken();
      console.log("opa");
      this.isLogged = false;
      console.log(this.isLogged);
    },
    openRegisterModal() {
      this.$refs.credentialsModal.openModal(false);
    }
  }
};
</script>
