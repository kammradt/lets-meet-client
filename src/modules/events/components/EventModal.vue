<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="scale-transition"
    v-model="showModal"
  >
    <v-card>
      <div
        class="pt-2 display-1 font-weight-light text-center"
        v-text="title"
      />
      <v-divider class="my-4"/>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" sm="8">
            <v-form>
              <v-row>
                <v-col>
                  <v-datetime-picker label="Start date" v-model="event.startDate">
                    <template v-slot:dateIcon>
                      <v-icon v-text="'mdi-calendar'"/>
                    </template>
                    <template v-slot:timeIcon>
                      <v-icon v-text="'mdi-clock'"/>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <v-col>
                  <v-datetime-picker label="End date" v-model="event.endDate">
                    <template v-slot:dateIcon>
                      <v-icon v-text="'mdi-calendar'"/>
                    </template>
                    <template v-slot:timeIcon>
                      <v-icon v-text="'mdi-clock'"/>
                    </template>
                  </v-datetime-picker>
                </v-col>

              </v-row>
              <v-text-field
                label="Title"
                solo
                v-model="event.title"
              />
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
                    @click="closeModal"
                    block
                    color="red"
                    text
                    v-text="'Exit'"
                  />
                </v-col>
                <v-col cols="9">
                  <v-btn @click="action" block color="primary" v-text="title"/>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import {create} from "../services/events-service"
  export default {
    name: "EventModal",
    data: () => ({
      actions: () => {
      },
      title: '',
      event: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        maxAttendees: 25,
        status: ''
      },
      showModal: false,
    }),
    methods: {
      action() {

      },
      openModal({id, action}) {
        this.id = id;

        if (id) {
          // get event and fill value
        }

        const actions = {
          CREATE: {
            action: this.createEvent, title: "Create"
          },
          UPDATE: {
            action: this.update, title: "Update"
          }
        };
        this.action = actions[action].action;
        this.title = actions[action].title;

        this.showModal = true;
      },
      createEvent() {
        create(this.event).then(() => {
          this.closeModal()
        })
      },
      update() {

      },
      closeModal() {
        this.event = {};
        this.showModal = false;
      }
    }
  };
</script>
