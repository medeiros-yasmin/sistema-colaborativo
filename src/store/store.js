import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '../firebase/firebase-config'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showAppBar: false,
        auth: auth,
        currentUser: false,
        currentUserName: "Convidado",
        currentUserEMail: "Sem cadastro",
        currentUserId: "Sem identificador",
        currentUserFullData: "Sem dados",
        //Dados de agradecimento
        agradecimentos: {},
        mensagemLogout: null,
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
        },

        //Botão de agradecimento
        toggleAgradecimento(state, publicacaoId) {
          if (state.agradecimentos[publicacaoId]) {
              delete state.agradecimentos[publicacaoId]; // Remove o agradecimento
          } else {
              state.agradecimentos[publicacaoId] = true; // Marca como agradecido
          }
        },

        //Botão de agradecimento
        setAgradecimentos(state, { publicacaoId, jaAgradeceu }) {
          if (jaAgradeceu) {
              state.agradecimentos[publicacaoId] = true;
          } else {
              delete state.agradecimentos[publicacaoId];
          }
        },
        setMensagemLogout(state, mensagem){
          state.mensagemLogout = mensagem
        }
      },
      getters: {
        showAppBar(state) {
          return state.showAppBar;
        },
        getCurrentUser: (state) => state.currentUser,

        getCurrentUserFullData: (auth) => {
          return {
            id: auth.user.uid
          } 
        },
        dadosUsuarioAutenticado(state){
          return { 
            currentUserName: state.currentUserName,
            currentUserEmail: state.currentUserEMail,
            currentUserId: state.currentUserId
          }
        },
        getCurrentUserName (state) {
          return {currentUserName: state.currentUserName}
        }
      },
      actions: {
        //Botão de agradecimento
        atualizarAgradecimento({ commit }, publicacaoId) {
          // Aqui você pode integrar com o Firebase ou outra API
          commit('toggleAgradecimento', publicacaoId);
      },
        
      }
      
})

export default store;