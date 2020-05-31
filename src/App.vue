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

<script lang="ts">
import Vue from "vue";
import Toolbar from "@/modules/users/components/Toolbar.vue";
import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { getToken } from "@/plugins/axios";

const userStore = namespace("UserStore");

@Component({
  name: "App",
  components: {
    Toolbar
  }
})
export default class App extends Vue {
  @userStore.Action
  me!: () => void;

  mounted() {
    if (getToken()) {
      this.me();
    }
  }
}
</script>
