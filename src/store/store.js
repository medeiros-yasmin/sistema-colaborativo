import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../firebase/firebase-config'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showAppBar: false,
        auth: auth,
        currentUser: false,
      },
      mutations: {
        toggleAppBar(state, value) {
          state.showAppBar = value;
        },
        toggleContent(state, value){
          state.auth = value;
        }
      },
      getters: {
        showAppBar(state) {
          return state.showAppBar;
        },
        getCurrentUser: (state) => state.currentUser,
      },
})

export default store;