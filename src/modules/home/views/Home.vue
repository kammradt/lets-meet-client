<template>
  <v-container>
    <SearchFilter @new-filters="getEvents" />
    <p :key="event.id" v-for="event in events">
      {{ event }}
    </p>
  </v-container>
</template>

<script>
import SearchFilter from "../components/SearchFilter";
import { http } from "../../../plugins/axios";

export default {
  name: "Home",
  components: { SearchFilter },
  data: () => ({
    events: []
  }),
  methods: {
    async getEvents(params) {
      const res = await http.get("/events", { params });
      this.events = res.data.items;
    }
  }
};
</script>
