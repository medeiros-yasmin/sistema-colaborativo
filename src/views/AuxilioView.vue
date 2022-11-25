<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row>
                    <v-col v-for="podcast in podcasts" :key="podcast" cols="3">

                        <v-card  color="purple" :elevation="podcast - 1" class="mx-auto white--text" height="200" width="500">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div>
                                    <v-card-title class="text-h5" v-text="podcast.titulo"></v-card-title>
                                    <v-card-subtitle v-text="podcast.autor"></v-card-subtitle>
                                    <v-card-text class="text-h6 font-weight-bold">
                                        "Turns out semicolon-less style Turns e ."
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-btn class="white--text" rounded color="cyan">
                                            Visualizar
                                        </v-btn>
                                    </v-card-actions>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

    </v-app>
</template>

<script>

import { db } from '../firebase/firebase-config'
import { collection, getDocs } from 'firebase/firestore'

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
        drawer: false,
        group: null,
        podcasts: null,
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
        }

    }
};
</script>