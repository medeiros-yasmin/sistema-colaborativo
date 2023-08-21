import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../firebase/firebase-config'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showAppBar: false,
        auth: auth,
        currentUser: false,
        currentUserName: "Usuário não autenticado",
        currentUserEMail: "Sem e-mail"
      },
      mutations: {
        toggleAppBar(state, value) {
          state.showAppBar = value;
        },
        toggleContent(state, value){
          state.auth = value;
        },
        toggleUserName(state, value){
          state.currentUserName = value;
        },
        UpdateUserInfo(state, value){
          state.currentUserEMail = value.currentUserEMail || state.currentUserEMail;
          state.currentUserName = value.currentUserName || state.currentUserName;
        }
      },
      getters: {
        showAppBar(state) {
          return state.showAppBar;
        },
        getCurrentUser: (state) => state.currentUser,
      },
      dadosUsuarioAutenticado(state){
        return { 
          currentUserName: state.currentUserName,
          currentUserEmail: state.currentUserEMail
        }
      }
})

export default store;