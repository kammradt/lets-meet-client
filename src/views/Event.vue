<template>
  <v-card
    class="ma-2"
    :color="selected ? 'secondary' : 'background'"
    :ripple="false"
    @click="openMyModal"
    width="300"
    flat
    outlined
  >
    <v-col cols="12">
      <v-card flat class="fill-height">
        <v-card-title v-text="event.title" />
        <v-card-subtitle v-text="timeUntil" />
        <v-card-text class="text" v-text="formattedDescription" />
      </v-card>
    </v-col>
  </v-card>
</template>
<script>
import moment from "moment";

export default {
  name: "event",
  props: {
    selected: {},
    toggleSelected: {},
    event: {}
  },
  computed: {
    timeUntil() {
      return moment(this.event.startDate).fromNow();
    },
    formattedDescription() {
      if (this.event.description.length > 410) {
        return `${this.event.description.substring(0, 410)} . . .`;
      }
      return this.event.description;
    }
  },
  methods: {
    openMyModal() {
      this.toggleSelected();
    }
  }
};
</script>

<style scoped>
.text {
  height: 280px;
}
</style>
