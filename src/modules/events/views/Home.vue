<template>
  <v-container>
    <EventModal />
    <SearchFilter @new-filters="test" />

    <v-btn
      @click="updateLoginModalVisibility(true)"
      class="font-weight-bold"
      color="primary"
      v-text="'New event'"
    />

    <v-row>
      <v-col :key="event.id" cols="12" md="4" v-for="event in events">
        <v-card>
          <v-card-title v-text="event.title" />
          <v-card-text v-text="event.description" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Event } from '../interfaces/event.interface';
import SearchFilter from '@/modules/events/components/SearchFilter.vue';
import { namespace } from 'vuex-class';
import EventModal from '@/modules/events/components/EventModal.vue';

const eventStore = namespace('EventStore');
const userStore = namespace('UserStore');

@Component({
  name: 'Home',
  components: {
    SearchFilter,
    EventModal,
  },
})
export default class Home extends Vue {
  @eventStore.Action
  updateLoginModalVisibility!: (showEventModal: boolean) => void;
  @eventStore.State
  private events!: Event[];
  @eventStore.Action
  private getEvents!: (params: URLSearchParams | void) => void;
  @userStore.Getter
  private isLogged!: boolean;

  test(params: URLSearchParams) {
    this.getEvents(params);
  }

  mounted() {
    this.getEvents();
    // falta verificar se ta pegando os eventos certo e remover a mensagme de sucesso sempre
    setInterval(this.getEvents, 60000);
  }
}
</script>
