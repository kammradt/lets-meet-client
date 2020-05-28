<template>
  <v-card color="#F5F5F5" flat>
    <v-row align="center" class="pa-2">
      <v-col class="mt-2" cols="12" sm="6">
        <v-text-field @change="getEvents" v-model="params.search">
          <v-icon color="primary" slot="prepend" v-text="'mdi-magnify'" />
        </v-text-field>
      </v-col>
      <v-col cols="10" sm="4">
        <v-select
          :items="['Open', 'Done', 'Canceled']"
          @change="getEvents"
          class="mt-3"
          label="Status"
          multiple
          v-model="params.status"
        >
        </v-select>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="pl-6" cols="2">
        <v-menu :close-on-content-click="false" center offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" icon v-on="on">
              <v-icon>mdi-calendar</v-icon>
            </v-btn>
          </template>
          <v-date-picker
            @change="getEvents"
            no-title
            range
            v-model="params.dates"
          >
            <v-spacer></v-spacer>
            <v-btn block color="primary" small v-text="'OK'" />
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import moment from "moment";

export default {
  name: "SearchFilter",
  data: () => ({
    params: {
      search: "",
      dates: [],
      status: [],
      limit: 100,
      page: 1
    }
  }),
  methods: {
    getEvents() {
      const params = new URLSearchParams();
      params.append("search", this.params.search);
      params.append("limit", this.params.limit);
      params.append("page", this.params.page);

      let [startDate, endDate] = this.params.dates;
      const now = moment();
      if (startDate) {
        params.append(
          "startDate",
          startDate +
            now
              .startOf("day")
              .toISOString()
              .substr(10)
        );
      }
      if (endDate) {
        params.append(
          "endDate",
          endDate +
            now
              .startOf("day")
              .toISOString()
              .substr(10)
        );
      }

      this.params.status.forEach(status =>
        params.append("status", status.toUpperCase())
      );

      this.$emit("new-filters", params);
    }
  }
};
</script>
