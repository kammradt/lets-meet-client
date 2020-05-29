import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import lineClamp from "vue-line-clamp";
import DatetimePicker from "vuetify-datetime-picker";

Vue.config.productionTip = false;
Vue.use(lineClamp);
Vue.use(DatetimePicker);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
