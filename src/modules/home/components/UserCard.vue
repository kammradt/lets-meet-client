<template>
  <v-menu :close-on-content-click="false" open-on-hover offset-x>
    <template v-slot:activator="{ on: menu }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            large
            color="primary"
            dark
            v-on="{ ...tooltip, ...menu }"
          >
            <v-icon v-text="'mdi-account'" />
          </v-btn>
        </template>
        <span v-text="'My account'" />
      </v-tooltip>
    </template>
    <v-card width="350" class="mx-auto">
      <v-list-item>
        <v-list-item-avatar color="grey">
          <span class="white--text headline" v-text="'YN'" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="headline"
          >Your name
          </v-list-item-title>
          <v-list-item-subtitle v-text="user.email" />
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div class="title" v-text="'Account status'" />
            <div class="subtitle-1" v-text="user.role" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-row no-gutters>
          <v-col cols="10">
            <v-btn block color="primary" v-text="'Update plan'" />
          </v-col>
          <v-col cols="2">
            <v-btn text color="red" @click="this.$emit('logout')">
              <v-icon v-text="'mdi-logout'" />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    name: "UserCard",
    props: {
      user: {
        type: Object,
        required: true,
      }
    }
  }
</script>

