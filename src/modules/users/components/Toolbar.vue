<template>
  <div>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <span class="headline ml-3 mr-5 white--text"
      >Let's&nbsp; <span class="font-weight-light">Meet</span></span
      >
      <v-spacer />

      <div v-if="!isLogged">
        <v-btn
          @click.stop="openLoginModal"
          text
          :small="isSmallButton"
          class="mx-2 white--text"
          v-text="'Sign in'"
        />

        <v-btn
          @click.stop="openRegisterModal"
          depressed
          :small="isSmallButton"
          class="primary--text"
          v-text="'Get started'"
        />

        <CredentialsModal
          @login-successful="onLogin"
          ref="credentialsModal"
        />
      </div>
      <v-btn v-else @click="onLogout" depressed color="primary">
        <v-icon v-text="'mdi-logout'" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense> </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import SearchFilter from "../../events/components/SearchFilter";
  import CredentialsModal from "./CredentialsModal";
  import {clearToken, isLogged} from "../../../plugins/axios";
  import {me} from "../services/users-service";

  export default {
    name: "Toolbar",
    components: { SearchFilter, CredentialsModal },
    data: () => ({
      drawer: null,
      isLogged: false,
      user: {}
    }),
    computed: {
      isSmallButton() {
        return this.$vuetify.breakpoint.xsOnly;
      }
    },
    mounted() {
      this.onLogin();
    },
    methods: {
      openLoginModal() {
        this.$refs.credentialsModal.openModal("LOGIN");
      },
      openRegisterModal() {
        this.$refs.credentialsModal.openModal("REGISTER");
      },
      async onLogin() {
        this.isLogged = isLogged();
        this.user = await me();
      },
      onLogout() {
        clearToken();
        this.isLogged = false;
      }
    }
  };
</script>
