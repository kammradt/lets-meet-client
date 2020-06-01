<template>
  <v-card
    hover
    flat
    height="250"
    :ripple="false"
    @click="updateEventDetailModalVisibility({ show: true, id: event.id })"
  >
    <v-card-title v-text="event.title" />
    <v-card-subtitle v-text="happeningIn" />
    <v-card-text
      class="format-v-card-text text-justify"
      v-text="event.description"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Event } from '../interfaces/event.interface';
import { namespace } from 'vuex-class';
import moment from 'moment';
import { EventModalParams } from '@/modules/events/interfaces/event-modal-params.interface';

const eventStore = namespace('EventStore');

@Component({
  name: 'EventCard',
})
export default class EventCard extends Vue {
  @Prop({ required: true }) event!: Event;

  @eventStore.Action
  updateEventDetailModalVisibility!: (params: EventModalParams) => void;

  get happeningIn() {
    return moment(this.event.startDate).fromNow();
  }
}
</script>
<style scoped>
.format-v-card-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
