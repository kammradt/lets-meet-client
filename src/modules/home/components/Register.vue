<template>
  <div>
    <v-btn @click.stop="showDialog = true" color="primary" outlined>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-dialog fullscreen hide-overlay transition="scale-transition" v-model="showDialog">
      <v-card>
        <div class="pt-2 display-1 font-weight-light text-center" v-text="'Register'"/>
        <v-divider class="my-4"></v-divider>
        <v-container>
          <v-form>
            <v-text-field label="E-mail" solo type="email" v-model="registerRequest.email"/>
            <v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          label="Password"
                          solo
                          v-model="registerRequest.password"/>
            <v-row no-gutters>
              <v-col cols="3">
                <v-btn @click="showDialog = false" block color="red" text v-text="'Exit'"/>
              </v-col>
              <v-col cols="9">
                <v-btn @click="callRegisterApi" block color="primary" v-text="'Register'"/>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import {register} from "../services/users-service"

  export default {
    name: 'Register',
    data: () => ({
      registerRequest: {
        email: '',
        password: '',
      },
      showDialog: false,
      showPassword: false,
    }),
    methods: {
      async callRegisterApi() {
        await register(this.registerRequest)
        this.showDialog = false
      }
    }

  }
</script>
