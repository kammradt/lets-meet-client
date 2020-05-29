<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <SearchFilter @new-filters="getEvents" />
      </v-col>
      <v-col>
        <v-btn
          @click="openCreateEventModal"
          class="font-weight-bold"
          color="primary"
          v-text="'New event'"
        />
      </v-col>
    </v-row>
    <p :key="event.id" v-for="event in events">
      {{ event }}
    </p>
    <v-fab-transition v-if="!showCreateEventButton">
      <v-btn bottom color="primary" dark fab fixed right>
        <v-icon v-text="'mdi-plus'" />
      </v-btn>
    </v-fab-transition>

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
