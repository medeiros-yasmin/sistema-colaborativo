<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                <v-row>
                    <v-col v-for="podcast in podcasts" :key="podcast.id" cols="112">

                        <v-card style="margin-top:18px" color="#5C3C6C" :elevation="podcast - 1" class="mx-auto white--text"
                            height="330" width="1000">
                            <v-menu bottom left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item class="topright">
                                        <v-btn variant="outlined" icon v-bind="attrs" v-on="on">
                                            <v-icon color="white">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </v-list-item>
                                </template>

                                <v-list>
                                    <v-list-item v-for="(item, i) in items" :key="i" @click="() => { }">
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div style="margin-top:18px; margin-left: 18px; margin-right: 320px">
                                    <v-card-title class="text-h5" v-text="podcast.titulo">
                                    </v-card-title>
                                    <v-card-subtitle v-text="podcast.autor"></v-card-subtitle>
                                    <v-card-text class="text-justify text-h7 font-weight-bold"
                                        v-text="podcast.descricao"></v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        <v-card-actions>

                                            <v-btn class="white--text" rounded color="#C198C4"
                                                :to="{ name: 'publicacao', params: { id: podcast.id, tipoPublicacao: 'sites' } }">
                                                Visualizar
                                            </v-btn>
                                        </v-card-actions>
                                        <v-card-actions>
                                            <v-btn class="white--text" rounded color="cyan"
                                                @click="deletarPublicacao(podcast.id)">
                                                Deletar
                                            </v-btn>
                                        </v-card-actions>

                                    </v-row>
                                    <v-card-actions>
                                        <v-row class="bottom-right" align="center" justify="end" style="padding-right:18px; padding-top:8px">
                                            <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                handshake
                                            </v-icon>
                                            <span style="margin-left: 6px;" class="subheading mr-2">256</span>
                                            <span class="mr-1">·</span>
                                            <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                share
                                            </v-icon>
                                            <span style="margin-left: 6px;" class="subheading">45</span>
                                        </v-row>
                                    </v-card-actions>

                                </div>
                            </div>
                        </v-card>

                    </v-col>
                </v-row>


            </v-container>

            <v-card-text style="height: 100px;">
                <v-fab-transition>
                    <BotaoAdicionarPubli>

                    </BotaoAdicionarPubli>
                </v-fab-transition>
            </v-card-text>


        </v-main>

    </v-app>
</template>

<script>

import { db } from '../firebase/firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
//updateDoc


export default {
    name: 'SiteView',
    //setup(){
    mounted() {
        this.podcasts = this.recuperarDocumentos(this.colRef)
    },


    //},

    components: {
        //BotaoVisualizar: () => import('../components/BotaoVisualizar.vue'),
        BotaoAdicionarPubli: () => import('../components/BotaoAdicionar.vue')
    },

    data: () => ({
        dialog: false,
        drawer: false,
        group: null,
        podcasts: null,
        novaPublicacao: {
            titulo: "Teste",
            descricao: "Dinossauro descrição",
            autor: "Coiso"
        },
        colRef: collection(db, 'sites'),
        items: [
            { title: 'Spam' },
            { title: 'Publicação ofensiva' },
            { title: 'Publicação duplicada' },
            { title: 'Não é uma publicação' },
            { title: 'Publicação ofensiva' },
            { title: 'Cancelar' },
        ],

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
            const docRef = doc(db, 'sites', id)

            deleteDoc(docRef)
                .then(() => {
                    console.log('Documento deletado com sucesso!')
                    location.reload()
                })
        },


    }
};
</script>

<style>
.topright {
    position: absolute;
    top: 5px;
    right: 1px;
    font-size: 12px;
    margin-left: 8px;
}

.bottom-left {
    position: absolute;
    bottom: 30px;
    left: 16px;
    font-size: 18px;
}

.bottom-right{
    
    
    right: 16px;
    font-size: 18px;
}
</style>