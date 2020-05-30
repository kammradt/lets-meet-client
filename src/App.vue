<template>
  <div id="app">
    <v-app>
      <v-content class="background">
        <Toolbar />
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import Toolbar from "./modules/users/components/Toolbar";
export default {
  name: "App",
  components: { Toolbar }
};
</script>
