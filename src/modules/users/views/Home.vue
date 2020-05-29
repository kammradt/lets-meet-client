<template>
  <v-container>
    <SearchFilter @new-filters="getEvents" />
    <p :key="event.id" v-for="event in events">
      {{ event }}
    </p>
    <v-fab-transition v-if="showCreateEventButton">
      <v-btn
        @click="openCreateEventModal"
        bottom
        color="primary"
        dark
        fab
        fixed
        right
      >
        <v-icon v-text="'mdi-plus'" />
      </v-btn>
    </v-fab-transition>
    <v-btn
      @click="openCreateEventModal"
      class="font-weight-bold"
      color="primary"
      v-text="'New event'"
    />

    <EventModal ref="eventModal" />
  </v-container>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import { events } from "../../events/services/events-service";
import { isLogged } from "../../../plugins/axios";
import EventModal from "../../events/components/EventModal";

export default {
  name: "Home",
  components: { EventModal, SearchFilter },
  data: () => ({
    events: []
  }),
  computed: {
    showCreateEventButton() {
      return this.$vuetify.breakpoint.smAndDown && isLogged();
    }
  },
  mounted() {
    this.getEvents();
    setInterval(this.getEvents, 60000);
  },
  methods: {
    async getEvents(params) {
      this.events = await events(params);
    },
    openCreateEventModal() {
      this.$refs.eventModal.openModal({ action: "CREATE" });
    },
    openUpdateEventModal() {
      this.$refs.eventModal.openModal({ id: 1, action: "UPDATE" });
    }
  }
};
</script>
