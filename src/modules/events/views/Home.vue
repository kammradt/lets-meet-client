<template>
  <v-container>
    <EventModal ref="eventModal" />
    <SearchFilter @new-filters="getEvents" />

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

    <v-row>
      <v-col cols="12" md="4" :key="event.id" v-for="event in events">
        <v-card>
          <v-card-title v-text="event.title" />
          <v-card-text v-text="event.description" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import { events } from "../services/events-service";
import { isLogged } from "../../../plugins/axios";
import EventModal from "../components/EventModal";

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
