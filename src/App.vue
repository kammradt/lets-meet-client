<template>
  <v-app>
    <v-app-bar hide-on-scroll flat elevation="3" app>
      <v-toolbar-title class="font-weight-bold display-1 primary--text">Let's meet!</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="primary" outlined class="mx-2">
        <v-icon left v-text="'mdi-plus'"/>
        Create event!
      </v-btn>

      <v-btn outlined color="primary">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: "App",
  };
</script>
