<template>
  <v-app>
    <v-app-bar app elevation="3" flat hide-on-scroll>
      <v-toolbar-title class="font-weight-bold display-1 primary--text"
        >Let's meet!
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="mx-2" color="primary" outlined>
        <v-icon left v-text="'mdi-plus'" />
        Create event!
      </v-btn>

      <Register />
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Register from "./modules/home/components/Register";

export default {
  name: "App",
  components: { Register },
  data: () => ({})
};
</script>
