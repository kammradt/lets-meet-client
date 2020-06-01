import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/modules/users/store/user.store';
import EventStore from '@/modules/events/store/event.store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    UserStore,
    EventStore,
  },
});
