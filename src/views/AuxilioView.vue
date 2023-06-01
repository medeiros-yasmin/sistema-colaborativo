<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                <v-row>
                    <v-col v-for="auxilio in auxilios" :key="auxilio.id" cols="112">

                        <v-card style="margin-top:18px" color="#5C3C6C" :elevation="auxilio - 1" class="mx-auto white--text"
                            height="330" width="1000">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                    <v-card-title class="text-h5" v-text="auxilio.titulo"></v-card-title>
                                    <v-card-subtitle v-text="auxilio.autor"></v-card-subtitle>
                                    <v-card-text class="text-justify text-h7 font-weight-bold"
                                        v-text="auxilio.descricao"></v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        <v-card-actions>
                                            <v-btn class="white--text" rounded color="#C198C4"
                                                :to="{ name: 'publicacao', params: { id: auxilio.id, tipoPublicacao: 'auxilio' } }">
                                                Visualizar
                                            </v-btn>

                                            <v-btn class="white--text" rounded color="cyan"
                                                @click="deletarPublicacao(auxilio.id)">
                                                Deletar
                                            </v-btn>
                                        </v-card-actions>
                                        <v-card-actions>
                                            <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                handshake
                                            </v-icon>
                                            <span style="margin-left: 6px;" class="subheading mr-2">256</span>
                                            <span class="mr-1">·</span>
                                            <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                share
                                            </v-icon>
                                            <span style="margin-left: 6px;" class="subheading">45</span>
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
                    <v-btn color="#f5a751" dark bottom right fab fixed @click="dialog = !dialog">
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
        this.auxilios = this.recuperarDocumentos(this.colRef)
    },

    created(){
       this.$store.commit('toggleAppBar', true);
  },

    components: {

    },

    data: () => ({
        dialog: false,
        drawer: false,
        group: null,
        auxilios: null,
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
                    let auxilios = []
                    snapshot.docs.forEach(doc => {
                        auxilios.push({ ...doc.data(), id: doc.id })
                    })
                    this.auxilios = auxilios
                })
                .catch(err => {
                    console.log('Retornou erro:', err.message)
                })


            return this.auxilios
        },

        adicionarPublicacao(colRef) {
            addDoc(colRef, {
                titulo: this.novaPublicacao.titulo,
                autor: this.novaPublicacao.autor,
                descricao: this.novaPublicacao.descricao,
            })
                .then(() => {
                    console.log('Inserção de novos dados finalizada')
                })
        },

        deletarPublicacao(id) {
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

<style></style>