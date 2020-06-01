<template>
  <div>
    <v-app-bar app clipped-left color="primary" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <span class="headline ml-3 mr-5 white--text">
        Let's&nbsp;
        <span class="font-weight-light">Meet</span>
      </span>
      <v-spacer />

      <div v-if="!isLogged">
        <v-btn
          :small="isSmallButton"
          @click.stop="updateLoginModalVisibility(true)"
          class="mx-2 white--text"
          text
          v-text="'Sign in'"
        />

        <v-btn
          :small="isSmallButton"
          @click.stop="updateRegisterModalVisibility(true)"
          class="primary--text"
          depressed
          v-text="'Get started'"
        />

        <LoginModal />
        <RegisterModal />
      </div>
      <v-btn @click="logout" color="primary" depressed v-else>
        <v-icon v-text="'mdi-logout'" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense></v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginModal from '@/modules/users/components/LoginModal.vue';
import RegisterModal from '@/modules/users/components/RegisterModal.vue';
import { namespace } from 'vuex-class';

const userStore = namespace('UserStore');

@Component({
  name: 'Toolbar',
  components: {
    LoginModal,
    RegisterModal,
  },
})
export default class Toolbar extends Vue {
  @userStore.Action
  updateLoginModalVisibility!: (showLoginModal: boolean) => void;
  @userStore.Action
  updateRegisterModalVisibility!: (showRegisterModal: boolean) => void;
  @userStore.Action
  logout!: () => void;
  private drawer = false;
  private isSmallButton = false;
  @userStore.State
  private isLogged?: boolean;
}
</script>
