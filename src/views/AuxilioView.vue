<template>
    <v-app style="background-color:#44075e;">
        <v-main>
            <v-container>
                <v-row>
                    <v-col v-for="podcast in podcasts" :key="podcast.id" cols="4">

                        <v-card style="margin-top:18px"  color="purple" :elevation="podcast - 1" class="mx-auto white--text" height="200" width="500">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div>
                                    <v-card-title class="text-h5" v-text="podcast.titulo"></v-card-title>
                                    <v-card-subtitle v-text="podcast.autor"></v-card-subtitle>
                                    <v-card-text class="text-h7 font-weight-bold" v-text="podcast.descricao"></v-card-text>
                                    
                                    <v-row style="padding-left:18px; padding-top:8px" text-align="bottom" >
                                    <v-card-actions>
                                        <v-btn class="white--text" rounded color="cyan" :to="{ name: 'publicacao', params: { id: podcast.id, tipoPublicacao: 'auxilio' } }">
                                            Visualizar
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn class="white--text" rounded color="cyan" @click="deletarPublicacao(podcast.id)">
                                            Deletar
                                        </v-btn>
                                    </v-card-actions>
                                    </v-row>
                                    
                                </div>
                            </div>
                        </v-card>
                        
                    </v-col>
                </v-row>

                
            </v-container>

            <v-card-text style="height: 100px;">
            <v-fab-transition>
              <v-btn
                color="#f5a751"
                dark
                bottom
                right
                fab
                fixed
                @click="dialog = !dialog"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>

          
        </v-main>

    </v-app>
</template>

<script>

import { db } from '../firebase/firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

export default {
    name: 'AuxilioView',
    //setup(){
    mounted() {
        this.podcasts = this.recuperarDocumentos(this.colRef)
    },


    //},

    components: {

    },

    data: () => ({
        dialog: false,
        drawer: false,
        group: null,
        podcasts: null,
        novaPublicacao: {
            titulo: "Teste",
            descricao: "Dinossauro doido",
            autor: "Dinossauro"
        },
        colRef: collection(db, 'auxilio'),

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

        adicionarPublicacao(colRef){
            addDoc(colRef, {
                titulo: this.novaPublicacao.titulo,
                autor: this.novaPublicacao.autor,
                descricao: this.novaPublicacao.descricao,
            })
            .then(() => {
                console.log('Inserção de novos dados finalizada')
            })
        },

        deletarPublicacao(id){
            console.log('Verificando deleção...')
            const docRef = doc(db, 'auxilio', id)

            deleteDoc(docRef)
                .then(() => {
                    console.log('Documento deletado com sucesso!')
                    location.reload()
                })
        }

    }
};
</script>

<style>
  
</style>