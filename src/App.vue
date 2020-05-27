<template>
  <v-app>
    <v-app-bar hide-on-scroll app dark color="primary">
      <v-toolbar-title>Let's meet!</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content> <router-view> </router-view> </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home
  }
};
</script>
