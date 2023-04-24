<template>
  <v-app>
    <v-slide-x-transition mode="out-in" origin="left right">
    <router-view/>
  </v-slide-x-transition>

    <v-app-bar transition="slide-x-transition" color="#7B447B" hide-on-scroll accent-4 dark shaped app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>NOZ</v-toolbar-title>
      
      <v-text-field 
        clearable 
        prepend-inner-icon="mdi-magnify"
        class="topright mx-4"
        flat
        hide-details
        label="Pesquisar"
        solo-inverted
      ></v-text-field>
  
      <v-spacer></v-spacer>

      

      <template  v-slot:extension>
        <v-tabs  class="text-center" align-with-title>
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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="#7B447B"
    >
      <v-list
        nav
        dense
        
      >
        <v-list-item-group 
          v-model="group"
          active-class="cyan--text text--accent-4"
        >
          <v-list-item class="white--text" >
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
              <v-icon color="white">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    

  
  </v-app>
</template>

<script>

import { db } from '../src/firebase/firebase-config'
import { collection, getDocs} from 'firebase/firestore'

export default {
  name: 'App',
  //setup(){
  mounted(){
   this.podcasts = this.recuperarDocumentos(this.colRef)
  },

  
  //},

  components: {
   
  },

  data: () => ({
    drawer: false,
    group: null,
    podcasts: null,
    colRef: collection(db, 'podcasts'),
    
  }),

  methods: {
    recuperarDocumentos(colRef){
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
   .catch(err =>{
     console.log('Retornou erro:' , err.message)
   })
   
    console.log('Chamou a função, que retornou: ', this.podcasts)
    return this.podcasts
    }

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

</style>
