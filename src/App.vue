<template>
  <v-app>
    <v-slide-x-transition mode="out-in" origin="left right">
      <router-view />
    </v-slide-x-transition>

    <v-app-bar v-if="showAppBar" transition="slide-x-transition" color="#7B447B" hide-on-scroll accent-4 dark shaped app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex align-center" style="font-size: 50px;">N <v-img style="margin-left: 6px; margin-right: 6px;" width="60" height="60" src="@/assets/walnut.png"></v-img> Z   </v-toolbar-title>

      

      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs class="text-center" align-with-title>
          <v-tab to="/">Início</v-tab>
          <v-tab to="/artigo">Artigos</v-tab>
          <v-tab to="/auxilio">Apoio</v-tab>
          <v-tab to="/podcast">Podcasts</v-tab>
          <v-tab to="/site">Sites</v-tab>
          <v-tab to="/video">Vídeos</v-tab>
          <v-tab to="/livro">Livros e Revistas</v-tab>
          <v-tab to="/sobre">Sobre Nós</v-tab>

        </v-tabs>

      </template>
    </v-app-bar>

    <v-navigation-drawer  class="drawer-fundo" v-model="drawer" absolute temporary width="300" color="#7B447B">
      
      <v-list nav dense>

        <v-list>
          <v-list-item v-if="usuarioAutenticado">
            <v-list-item class="px-1">
              <v-list-item-avatar height="50px" width="50">
                <v-img :src="currentUser.photoURL ? currentUser.photoURL : `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.displayName || 'Convidado')}&background=random&color=fff&size=128`" ></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title dark class="unica-linha text-h6 white--text">
                  {{ currentUser && currentUser.displayName ? currentUser.displayName : 'Convidado'}}
                </v-list-item-title>
                <v-list-item-subtitle class="unica-linha white--text">{{ currentUser.email ? currentUser.email : 'Sem e-mail cadastrado' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        

        
          <v-list-item v-else>
            <v-list-item class="px-1">
              <v-list-item-avatar height="50px" width="50">
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title dark class="text-h6 white--text">
                  Convidado
                </v-list-item-title>
                <v-list-item-subtitle class="white--text">Sem e-mail cadastrado</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list>

        <v-divider :thickness="2" class="border-opacity-50"></v-divider>

        <v-list-item-group v-model="group" active-class="cyan--text text--accent-4">
          <router-link to="/" class="white--text no-underline">
          <v-list-item class="white--text">
            
            <v-list-item-icon>
              <v-icon color="white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/usuario" class="white--text no-underline"> 
          <v-list-item class="white--text">
            <v-list-item-icon>
              <v-icon color="white">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Minha Conta</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/minhas"  class="white--text no-underline"> 
          <v-list-item class="white--text">
            <v-list-item-icon>
              <v-icon class="material-symbols-rounded" color="white">potted_plant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Minhas Publicações</v-list-item-title>
          </v-list-item>
        </router-link>
        
        
            <div v-if="usuarioAutenticado" class="mt-5" >
              <v-divider :thickness="2" class="border-opacity-50"></v-divider>
              <v-list-item  class="mt-auto">
                <v-btn class="botao-sair" @click="sair()">
                  <v-list-item-title class="font-weight-bold"> Sair</v-list-item-title>
                  <v-list-item-icon>

                    <v-icon>mdi-logout</v-icon> 

                  </v-list-item-icon>

                  
                </v-btn>
              </v-list-item>
            </div>
          

          
            <div  v-else class="pa-1 mt-5">
              <v-divider :thickness="2" class="border-opacity-50"></v-divider>
              <v-list-item @click="entrar()">
                <v-btn class="botao-entrar"  block>
                  <v-list-item-title class="font-weight-bold">Fazer login</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-login</v-icon>
                  </v-list-item-icon>
                </v-btn>
              </v-list-item>
            </div>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <RodapeComponent/>


  </v-app>
</template>

<script>

//import router from '@/router';
import { db } from '../src/firebase/firebase-config'
import { auth } from '../src/firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { getFunctions } from "firebase/functions";
import router from './router';
import { httpsCallable } from 'firebase/functions';
import RodapeComponent from '@/components/RodapeComponent.vue';

export default {
  name: 'App',

  computed: {
    showAppBar() {
      return this.$store.state.showAppBar;
    },
    //Serve também para verificar se existe um usuário autenticado ou não, usando como variável usuarioAutenticado
    usuarioAutenticado() {
      console.log("Usuário autenticado APPV.VUE: ", this.$store.getters.dadosUsuarioAutenticado.currentUserName)
      return auth.currentUser;
    }
  },
  //setup(){
  mounted() {
    this.podcasts = this.recuperarDocumentos(this.colRef)
  },

  created() {
    //console.log("Usuário autenticado:", this.currentUser)
    onAuthStateChanged(this.$store.state.auth, (user) => {
      this.currentUser = { id: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL};
    });

  },

  components: {
        RodapeComponent,
  },

  data: () => ({
    drawer: false,
    group: null,
    podcasts: null,
    colRef: collection(db, 'podcasts'),
    currentUser: {
      nome: '',
      id: '',
      photoURL: ''
    },
    id: null
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

    carregarDadosUsuario(id) {
      const functions = getFunctions();
      const usuario = httpsCallable(functions, 'exibirDadosUsuario');
      usuario({ id: id })
        .then((result) => {
          console.log("Dá pra imprimir (APP)?", result.data);
          console.log('Resposta da Cloud Function para buscar dados:', result.data.message)
          
        })
        .catch(error => {
          console.log("Erro ao buscar o usuário: ", error)
        })
    },

    sair() {
      signOut(auth)
        .then(() => {
          // Signed in
          this.$store.commit('toggleAppBar', false);
          this.$store.commit('setMensagemLogout', 'Você saiu com sucesso! :) ')
          router.push("/entrar");


        }).catch((error) => {
          console.log("Erro de logout: ", error.code);
        });
    },

    entrar() {
      router.push("/entrar")
    },

     verificarAutenticacao(){
        onAuthStateChanged(auth, (user) => {
           if (user) {
              console.log('Usuário autenticado DE APP: ', user)


           } else {
              console.log('Usuário não autenticado.')
           }
        });
     }

  }
};
</script>

<style>
.drawer-fundo {
  
  background: url('./assets/plano-fundo.jpg') no-repeat center center;
  background-size: cover;
}

.topright {
  position: absolute;
  top: 12px;
  right: 20px;
  font-size: 40px;
}

.v-application {
  color: #2E1F32 !important;
  caret-color: coral !important;
}

.align-center {
  align-items: center;
}
.d-flex {
  display: flex;
}

.no-underline{
  text-decoration: none !important; /* Para retirar o sublinhado do componente de router*/
}

.botao-sair{
  font-weight:bold;
  margin-top: 20px; 
  position: relative;
  width: 100%; 
}

.botao-entrar{
  font-weight:bold;
  margin-top: 20px; 
  position: relative;
  width: 100%; 
}


.unica-linha {
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    width: 190px;
}
</style>
