<template>
  <v-app>
    <v-app-bar app elevation="3" flat hide-on-scroll>
      <v-toolbar-title class="font-weight-bold display-1 primary--text"
        >Let's meet!
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
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

      <CredentialsModal ref="credentialsModal" />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CredentialsModal from "./modules/home/components/CredentialsModal";

export default {
  name: "App",
  components: { CredentialsModal },
  methods: {
    openLoginModal() {
      this.$refs.credentialsModal.openModal(true);
    },
    openRegisterModal() {
      this.$refs.credentialsModal.openModal(false);
    }
  }
};
</script>
