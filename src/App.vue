<template>
  <v-app>
    <v-slide-x-transition mode="out-in" origin="left right">
      <router-view />
    </v-slide-x-transition>

    <v-app-bar v-if="showAppBar" transition="slide-x-transition" color="#7B447B" hide-on-scroll accent-4 dark shaped app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>NOZ</v-toolbar-title>

      <v-text-field clearable prepend-inner-icon="mdi-magnify" class="topright mx-4" flat hide-details label="Pesquisar"
        solo-inverted></v-text-field>

      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs class="text-center" align-with-title>
          <v-tab to="/">Início</v-tab>
          <v-tab to="/artigo">Artigos</v-tab>
          <v-tab to="/auxilio">Auxílios</v-tab>
          <v-tab to="/podcast">Podcasts</v-tab>
          <v-tab to="/site">Sites</v-tab>
          <v-tab to="/video">Vídeos</v-tab>
          <v-tab to="/livro">Livros e Revistas</v-tab>

        </v-tabs>

      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary color="#7B447B">
      <v-list nav dense>

        <v-list>
          <v-list-item v-if="usuarioAutenticado">
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title dark class="text-h6 white--text">
                  {{ usuarioAutenticado.currentUserName }}
                </v-list-item-title>
                <v-list-item-subtitle class="white--text">{{ usuarioAutenticado.currentUserEmail }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list>

        <v-list>
        <v-list-item v-if="!usuarioAutenticado">
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title dark class="text-h6 white--text">
                  Visitante
                </v-list-item-title>
                <v-list-item-subtitle class="white--text">Sem dados</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list-item-group v-model="group" active-class="cyan--text text--accent-4">
          <v-list-item class="white--text">
            <v-list-item-icon>
              <v-icon color="white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item>

          <v-list-item class="white--text">
            <v-list-item-icon>
              <v-icon color="white">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Minha Conta</v-list-item-title>
          </v-list-item>

          <v-list-item class="white--text">
            <v-list-item-icon>
              <v-icon color="white">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Minhas Publicações</v-list-item-title>
          </v-list-item>
          <v-list-item>
          <div v-if="usuarioAutenticado" class="pa-1">
            <v-list-item @click="sair()">
              <v-btn block>
                <v-list-item-icon>

                  <v-icon>mdi-logout</v-icon>

                </v-list-item-icon>

                <v-list-item-title>Sair</v-list-item-title>
              </v-btn>
            </v-list-item>
          </div>
        </v-list-item>

        <v-list-item>
          <div v-if="!usuarioAutenticado" class="pa-1">
            <v-list-item @click="entrar()">
              <v-btn block>
                <v-list-item-icon>

                  <v-icon>mdi-login</v-icon>

                </v-list-item-icon>

                <v-list-item-title>Fazer login</v-list-item-title>
              </v-btn>
            </v-list-item>
          </div>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>




  </v-app>
</template>

<script>

//import router from '@/router';
import { db } from '../src/firebase/firebase-config'
import { auth } from '../src/firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import router from './router';

export default {
  name: 'App',

  computed: {
    showAppBar() {
      return this.$store.state.showAppBar;
    },
    usuarioAutenticado() {
      return this.$store.getters.dadosUsuarioAutenticado;
    }
  },
  //setup(){
  mounted() {
    this.podcasts = this.recuperarDocumentos(this.colRef)
  },

  created() {
    onAuthStateChanged(this.$store.state.auth, (user) => {
      this.currentUser = user;
    });

  },

  components: {

  },

  data: () => ({
    drawer: false,
    group: null,
    podcasts: null,
    colRef: collection(db, 'podcasts'),
    currentUser: null,
  }),



  methods: {
    recuperarDocumentos(colRef) {
      getDocs(colRef)
        .then(snapshot => {
          console.log(snapshot.docs)
          let podcasts = []
          snapshot.docs.forEach(doc => {
            podcasts.push({ ...doc.data(), id: doc.id })
          })
          console.log('Tem podcast: ', podcasts)
          this.podcasts = podcasts

          console.log('Tem podcast dentro da variável local: ', this.podcasts)
        })
        .catch(err => {
          console.log('Retornou erro:', err.message)
        })

      console.log('Chamou a função, que retornou: ', this.podcasts)
      return this.podcasts
    },

    sair() {
      signOut(auth)
        .then(() => {
          // Signed in
          router.push("/entrar");
          this.$store.commit('toggleAppBar', false);
          console.log("Você saiu! :)");


        }).catch((error) => {
          console.log("Código de erro: ", error.code);
        });
    },

    entrar(){
      router.push("/entrar")
    }

    // verificarAutenticacao(){
    //    onAuthStateChanged(auth, (user) => {
    //       if (user) {
    //          console.log('Usuário autenticado: ', user)


    //       } else {
    //          console.log('Usuário não autenticado.')
    //       }
    //    });
    // }

  }
};
</script>

<style>
.topright {
  position: absolute;
  top: 12px;
  right: 20px;
  font-size: 40px;
}

.v-application {
  color:blueviolet !important;
  caret-color: coral !important;
}
</style>
