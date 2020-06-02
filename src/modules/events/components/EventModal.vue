<template>
  <v-dialog
    fullscreen
    hide-overlay
    @input="updateEventModalVisibility(false)"
    transition="scale-transition"
    v-model="showEventModal"
  >
    <v-card>
      <div
        class="pt-2 display-1 font-weight-light text-center"
        v-text="'New event'"
      />
      <v-divider class="my-4" />
      <v-container class="px-6">
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" sm="8">
            <v-form>
              <v-row>
                <v-col>
                  <v-datetime-picker
                    elevation="12"
                    label="Start date"
                    v-model="event.startDate"
                  >
                    <template v-slot:dateIcon>
                      <v-icon v-text="'mdi-calendar'" />
                    </template>
                    <template v-slot:timeIcon>
                      <v-icon v-text="'mdi-clock'" />
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col>
                  <v-datetime-picker label="End date" v-model="event.endDate">
                    <template v-slot:dateIcon>
                      <v-icon v-text="'mdi-calendar'" />
                    </template>
                    <template v-slot:timeIcon>
                      <v-icon v-text="'mdi-clock'" />
                    </template>
                  </v-datetime-picker>
                </v-col>
              </v-row>
              <v-text-field label="Title" solo v-model="event.title" />
              <v-textarea
                counter="512"
                label="Description"
                solo
                v-model="event.description"
              />

              <v-slider
                append-icon="mdi-account-group"
                max="100"
                min="0"
                prepend-icon="mdi-account"
                thumb-label
                v-model="event.maxAttendees"
              />

              <v-row no-gutters>
                <v-col cols="3">
                  <v-btn
                    @click="updateEventModalVisibility(false)"
                    block
                    color="red"
                    text
                    v-text="'Exit'"
                  />
                </v-col>
                <v-col cols="9">
                  <v-btn
                    @click="createEvent(event)"
                    block
                    color="primary"
                    v-text="'Create'"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Event } from '@/modules/events/interfaces/event.interface';

const eventStore = namespace('EventStore');

@Component({ name: 'EventModal' })
export default class EventModal extends Vue {
  @eventStore.Action
  createEvent!: (event: Event) => void;
  @eventStore.State
  showEventModal!: boolean;
  @eventStore.Action
  updateEventModalVisibility!: (showEventModal: boolean) => void;
  private event: Event = {
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    maxAttendees: 25,
  };
}
</script>
