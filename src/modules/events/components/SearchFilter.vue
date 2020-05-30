<template>
  <v-text-field solo @change="getEvents" v-model="params.search">
    <template v-slot:prepend-inner>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon
            color="primary"
            class="px-2"
            v-on="on"
            v-text="'mdi-magnify'"
          />
        </template>
        Search by title
      </v-tooltip>
    </template>
    <template v-slot:append>
      <!--      <v-combobox-->
      <!--        flat-->
      <!--        id="combobox"-->
      <!--        color="primary"-->
      <!--        style="width: 45px; height: 0; padding-top: -20px"-->
      <!--        :items="['Open', 'Done', 'Canceled']"-->
      <!--        @change="getEvents"-->
      <!--        solo-->
      <!--        multiple-->
      <!--        v-model="params.status"-->
      <!--      />-->
      <v-menu :close-on-content-click="false" offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" icon v-on="on">
            <v-icon v-text="'mdi-calendar'" />
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
    </template>
  </v-text-field>
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
