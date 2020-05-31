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
          @click.stop="updateLoginModalVisibility(true)"
          text
          :small="isSmallButton"
          class="mx-2 white--text"
          v-text="'Sign in'"
        />

        <v-btn
          @click.stop="updateRegisterModalVisibility(true)"
          depressed
          :small="isSmallButton"
          class="primary--text"
          v-text="'Get started'"
        />

        <LoginModal />
        <RegisterModal />
      </div>
      <v-btn v-else @click="logout" depressed color="primary">
        <v-icon v-text="'mdi-logout'" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense></v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginModal from "@/modules/users/components/LoginModal.vue";
import RegisterModal from "@/modules/users/components/RegisterModal.vue";
import { namespace } from "vuex-class";

const userStore = namespace("UserStore");

@Component({
  name: "Toolbar",
  components: {
    LoginModal,
    RegisterModal
  }
})
export default class Toolbar extends Vue {
  private drawer = false;
  private isSmallButton = false;

  @userStore.State
  private isLogged?: boolean;

  @userStore.Action
  updateLoginModalVisibility!: (showLoginModal: boolean) => void;

  @userStore.Action
  updateRegisterModalVisibility!: (showRegisterModal: boolean) => void;

  @userStore.Action
  logout!: () => void;
}
</script>
