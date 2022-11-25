<template>
    <v-app>
        <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="podcast in podcasts"
            :key="podcast.id"
            cols="4"
          >
          
            <v-card flat  class="text-xs-center" height="200">{{podcast.titulo}}</v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    </v-app>
</template>

<script>

import { db } from '../firebase/firebase-config'
import { collection, getDocs} from 'firebase/firestore'

export default {
  name: 'ArtigoView',
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
    colRef: collection(db, 'artigos'),
    
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