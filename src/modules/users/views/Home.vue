<template>
  <v-container>
    <SearchFilter @new-filters="getEvents" />
    <p :key="event.id" v-for="event in events">
      {{ event }}
    </p>
    <v-fab-transition v-if="showBottomButton">
      <v-btn color="primary" dark fixed bottom right fab>
        <v-icon v-text="'mdi-plus'" />
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import { events } from "../../events/services/events-service";

export default {
  name: "Home",
  components: { SearchFilter },
  data: () => ({
    events: []
  }),
  computed: {
    showBottomButton() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  mounted() {
    this.getEvents();
    setInterval(this.getEvents, 60000);
    console.log(this.$vuetify);
  },
  methods: {
    async getEvents(params) {
      this.events = await events(params);
    }
  }
};
</script>
