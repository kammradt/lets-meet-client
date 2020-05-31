<template>
  <v-dialog
    fullscreen
    hide-overlay
    persistent
    transition="scale-transition"
    v-model="showRegisterModal"
  >
    <v-card>
      <div
        class="pt-2 display-1 font-weight-light text-center"
        v-text="'Register'"
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
                v-model="registerRequest.email"
              />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                @keyup.enter="register(registerRequest)"
                label="Password"
                solo
                v-model="registerRequest.password"
              />
              <v-row no-gutters>
                <v-col cols="3">
                  <v-btn
                    @click="
                      () => {
                        updateRegisterModalVisibility(false);
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
                    @click="register(registerRequest)"
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

const userStore = namespace('UserStore');

@Component({ name: 'RegisterModal' })
export default class RegisterModal extends Vue {
  @userStore.Action
  updateRegisterModalVisibility!: (showLoginModal: boolean) => void;
  @userStore.Action
  register!: (registerRequest: Credentials) => void;
  @userStore.State
  private showRegisterModal?: boolean;
  private showPassword = false;
  private registerRequest = {
    email: '',
    password: '',
  };

  clear(): void {
    this.registerRequest = {
      email: '',
      password: '',
    };
  }
}
</script>
