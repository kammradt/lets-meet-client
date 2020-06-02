<template>
  <v-dialog
    fullscreen
    hide-overlay
    @input="
      () => {
        updateLoginModalVisibility(false);
        clear();
      }
    "
    transition="scale-transition"
    v-model="showLoginModal"
  >
    <v-card>
      <div
        class="pt-2 display-1 font-weight-light text-center"
        v-text="'Sign in'"
      />
      <v-divider class="my-4" />
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" sm="8">
            <v-form>
              <v-text-field
                label="E-mail"
                solo
                type="email"
                v-model="loginRequest.email"
              />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="loginHandler"
                label="Password"
                solo
                v-model="loginRequest.password"
              />
              <v-row no-gutters>
                <v-col cols="3">
                  <v-btn
                    @click="
                      () => {
                        updateLoginModalVisibility(false);
                        clear();
                      }
                    "
                    block
                    color="red"
                    text
                    v-text="'Exit'"
                  />
                </v-col>
                <v-col cols="9">
                  <v-btn
                    @click="loginHandler"
                    block
                    color="primary"
                    v-text="'Sign in'"
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
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Credentials } from '@/modules/users/interfaces/credentials';

const user = namespace('UserStore');

@Component({ name: 'LoginModal' })
export default class CredentialsModal extends Vue {
  @user.Action
  updateLoginModalVisibility!: (showLoginModal: boolean) => void;
  @user.Action
  login!: (loginRequest: Credentials) => void;
  @user.State
  private showLoginModal?: boolean;
  private showPassword = false;
  private loginRequest = {
    email: '',
    password: '',
  };

  async loginHandler(): Promise<void> {
    this.login(this.loginRequest);
  }

  clear(): void {
    this.loginRequest = {
      email: '',
      password: '',
    };
  }
}
</script>
