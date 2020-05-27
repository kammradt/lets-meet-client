<template>
  <v-sheet class="mx-auto my-2" elevation="4">
    <div class="text-center">
      <h1 class="pt-2 font-weight-light">Popular events</h1>
    </div>
    <v-slide-group class="pa-2" center-active>
      <v-slide-item
        v-for="event in events"
        :key="event.id"
        v-slot:default="{ active, toggle }"
      >
        <Event :event="event" :selected="active" :toggle-selected="toggle" />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
import Event from "./Event";
import { http } from "../plugins/axios";

export default {
  name: "PopularEvents",
  components: { Event },
  data: () => ({
    events: []
  }),
  mounted() {
    this.getEvents();
    setInterval(this.getEvents, 60000);
  },
  methods: {
    getEvents() {
      http.get("/events").then(res => (this.events = res.data.items));
    }
  }
};
</script>
