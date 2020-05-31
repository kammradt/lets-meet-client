<template>
  <v-text-field
    @change="emitEventPaginationOptions"
    solo
    v-model="params.search"
  >
    <template v-slot:prepend-inner>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon
            class="px-2"
            color="primary"
            v-on="on"
            v-text="'mdi-magnify'"
          />
        </template>
        Search by title
      </v-tooltip>
    </template>
    <template v-slot:append>
      <!--            <v-combobox-->
      <!--              flat-->
      <!--              id="combobox"-->
      <!--              color="primary"-->
      <!--              style="width: 45px; height: 0; padding-top: -20px"-->
      <!--              :items="['Open', 'Done', 'Canceled']"-->
      <!--              @change="emitEventPaginationOptions"-->
      <!--              solo-->
      <!--              multiple-->
      <!--              v-model="params.status"-->
      <!--            />-->
      <v-menu :close-on-content-click="false" offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" icon v-on="on">
            <v-icon v-text="'mdi-calendar'" />
          </v-btn>
        </template>
        <v-date-picker
          @change="emitEventPaginationOptions"
          no-title
          range
          v-model="params.dates"
        >
          <v-spacer></v-spacer>
          <v-btn block color="primary" small v-text="'OK'" />
        </v-date-picker>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { EventPaginationOptions } from '@/modules/events/interfaces/event-pagination-options';
import { EventStatus } from '@/modules/events/interfaces/event.interface';

@Component({ name: 'SearchFilter' })
export default class SearchFilter extends Vue {
  private params = {
    search: '',
    dates: [],
    status: [],
    limit: 100,
    page: 1,
  };

  emitEventPaginationOptions() {
    const search = this.params.search;
    const limit = this.params.limit;
    const page = this.params.page;
    const status = this.params.status.map((s: string) => s as EventStatus);

    const params: EventPaginationOptions = {
      search,
      limit,
      page,
      status,
    };

    const [start, end] = this.params.dates;
    const now = moment();
    if (start) {
      params.startDate = start + now.startOf('day').toISOString().substr(10);
    }
    if (end) {
      params.endDate = end + now.startOf('day').toISOString().substr(10);
    }

    this.$emit('new-filters', params);
  }
}
</script>
