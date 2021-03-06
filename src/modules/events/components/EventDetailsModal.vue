<template>
  <v-dialog
    fullscreen
    hide-overlay
    @input="onClose"
    transition="scale-transition"
    v-model="showEventDetailsModal"
  >
    <v-card>
      <div
        class="pt-2 display-1 font-weight-light text-center"
        v-text="currentEvent.title"
      />
      <v-divider class="my-4" />
      <v-container class="px-6">
        <v-row align="start" justify="start">
          <v-col cols="12" md="8">
            <v-form>
              <v-row class="pb-4">
                <v-col>
                  <v-card>
                    <v-card-text>
                      <v-icon v-text="'mdi-alarm'" color="primary" />
                      <span class="pl-4" v-text="startDate" />
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-card-text>
                      <v-icon v-text="'mdi-alarm-check'" color="warning" />
                      <span class="pl-4" v-text="endDate" />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-text-field
                class="pb-2"
                readonly
                persistent-hint
                hint="Title"
                solo
                :value="currentEvent.title"
              />
              <v-textarea
                class="pb-2"
                readonly
                counter="512"
                persistent-hint
                hint="Description"
                solo
                :value="currentEvent.description"
              />

              <v-slider
                append-icon="mdi-account-group"
                readonly
                max="100"
                min="0"
                prepend-icon="mdi-account"
                thumb-label
                persistent-hint
                :value="currentEvent.maxAttendees"
              />
            </v-form>
            <v-row v-if="!showSmallButton">
              <v-col cols="2">
                <v-btn
                  @click="onClose"
                  block
                  dark
                  class="red"
                  v-text="'Exit'"
                />
              </v-col>
              <v-col cols="5">
                <v-btn
                  block
                  @click="cancelAttendance"
                  class="warning"
                  v-text="'Cancel Attendance'"
                />
              </v-col>
              <v-col cols="5">
                <v-btn
                  block
                  @click="attendToEvent"
                  class="primary"
                  v-text="'Attend'"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-card flat class="background">
              <v-card-title @click="showAttendees = !showAttendees">
                <v-icon left v-text="getArrowIcon" />
                {{ attendeesTitle }}
              </v-card-title>
              <template v-if="showAttendees">
                <template v-if="hasAttendees">
                  <v-card
                    flat
                    class="background"
                    v-for="attendee in attendees"
                    :key="attendee.id"
                  >
                    <v-card-title>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            left
                            v-on="on"
                            :color="getAttendeeIconColor(attendee)"
                            v-text="'mdi-crown'"
                          />
                        </template>
                        <span
                          v-text="'Golden Crowns are only for Premium users!'"
                        />
                      </v-tooltip>
                      <v-icon left color="primary" v-text="'mdi-account'" />
                      <span
                        class="subtitle-1 text-lowercase"
                        v-text="attendee.email"
                      />
                    </v-card-title>
                    <v-card-subtitle>
                      <v-icon left color="primary" v-text="'mdi-alarm'" />
                      <span
                        class="subtitle-1"
                        v-text="formatDate(attendee.confirmation)"
                      />
                    </v-card-subtitle>
                  </v-card>
                </template>
                <v-card v-else flat class="background">
                  <v-card-title>
                    <v-icon
                      left
                      v-text="'mdi-emoticon-sad-outline'"
                      color="info"
                    />
                    <span
                      class="subtitle-1"
                      v-text="'There are no attendees. Be the first!'"
                    />
                    <v-icon
                      right
                      v-text="'mdi-emoticon-outline'"
                      color="primary"
                    />
                  </v-card-title>
                </v-card>
              </template>
            </v-card>
          </v-col>
        </v-row>
        <v-btn
          v-if="showSmallButton"
          @click="onClose"
          fixed
          fab
          bottom
          dark
          left
          style="z-index: 1;"
          class="red"
          v-text="'x'"
        />
        <div>
          <v-btn
            v-if="showSmallButton"
            x-large
            fixed
            bottom
            right
            style="z-index: 1;"
            class="primary"
            @click="attendToEvent"
            v-text="'Attend'"
          />
          <v-btn
            v-if="showSmallButton"
            x-large
            fixed
            bottom
            right
            style="z-index: 1; margin-right: 150px;"
            class="warning"
            @click="cancelAttendance"
            v-text="'Cancel'"
          />
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Event } from '../interfaces/event.interface';
import { EventModalParams } from '@/modules/events/interfaces/event-modal-params.interface';
import moment from 'moment';
import { http } from '@/plugins/axios';
import { AttendeeResponse } from '@/modules/events/interfaces/attendee-response.interface';
import { error, success } from '@/plugins/notification';

const eventStore = namespace('EventStore');
const userStore = namespace('UserStore');

@Component({ name: 'EventModal' })
export default class EventModalDetails extends Vue {
  @eventStore.State
  currentEvent!: Event;
  attendees: AttendeeResponse[] = [];
  @eventStore.State
  showEventDetailsModal?: boolean;
  @userStore.State
  isLogged?: boolean;
  @eventStore.Action
  updateEventDetailModalVisibility!: (params: EventModalParams) => void;
  showAttendees = false;

  get startDate() {
    return moment(this.currentEvent.startDate).calendar();
  }

  get endDate() {
    return moment(this.currentEvent.endDate).calendar();
  }

  get showSmallButton() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  get hasAttendees() {
    return this.attendees.length > 0;
  }

  get attendeesTitle() {
    return `Attendees ${this.attendees.length}/${this.currentEvent.maxAttendees}`;
  }

  get getArrowIcon() {
    return this.showAttendees ? 'mdi-chevron-up' : 'mdi-chevron-down';
  }

  @Watch('showEventDetailsModal')
  updateAttendees() {
    if (this.showEventDetailsModal) {
      this.getAttendees();
    }
  }

  async getAttendees() {
    const response = await http.get(
      `/events/${this.currentEvent.id}/attendance`
    );
    this.attendees = response.data;
  }

  async attendToEvent() {
    if (this.isLogged) {
      await http.patch(`/events/${this.currentEvent.id}/attendance`);
      success('Attending!');
      await this.getAttendees();
      this.showAttendees = true;
    } else {
      error('Sign in first!');
    }
  }

  async cancelAttendance() {
    if (this.isLogged) {
      await http.delete(`/events/${this.currentEvent.id}/attendance`);
      success('Cancelled!');
      await this.getAttendees();
      this.showAttendees = true;
    } else {
      error('Sign in first!');
    }
  }

  formatDate(date: Date) {
    return moment(date).format('MMMM Do YYYY');
  }

  isAttendeePremium(attendee: AttendeeResponse) {
    return attendee.role === 'PREMIUM';
  }

  getAttendeeIconColor(attendee: AttendeeResponse) {
    return this.isAttendeePremium(attendee) ? 'amber' : 'grey';
  }

  onClose() {
    this.updateEventDetailModalVisibility({ show: false });
    this.showAttendees = false;
    if (!this.showEventDetailsModal) {
      this.attendees = [];
    }
  }
}
</script>
