import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showAppBar: false,
      },
      mutations: {
        toggleAppBar(state, value) {
          state.showAppBar = value;
        },
      },
      getters: {
        showAppBar(state) {
          return state.showAppBar;
        },
      },
})

export default store;