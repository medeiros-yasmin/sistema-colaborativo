<template>

    <v-main style="background-color:#391D41;">

        <v-container>
            <v-row>
                <v-col cols="12">

                    <v-btn @click="$router.go(-1)" style="margin-top:18px" color="white" variant="text"
                        class="white--text" text>

                        <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col v-for="livro in livros" :key="livro.id" cols="112">

                    <v-card style="margin-top:18px" color="#5C3C6C" :elevation="livro - 1"
                        class="overflow-hidden mx-auto white--text" height="330" width="1000">
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
                            <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                <v-card-title class="text-h5" v-text="livro.titulo">
                                </v-card-title>
                                <v-card-subtitle v-text="livro.autor"></v-card-subtitle>
                                <v-card-text class="overflow-hidden text-justify text-h7 font-weight-bold"
                                    v-text="livro.descricao"></v-card-text>

                                <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                    text-align="bottom">
                                    <v-card-actions>
                                        <!-- <v-btn class="white--text" rounded color="cyan" @click="adicionarPublicacao(colRef)">
                                            Visualizar
                                        </v-btn> -->
                                        <v-btn class="white--text" rounded color="#C198C4"
                                            :to="{ name: 'teste', params: { id: livro.id } }">
                                            Visualizar
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-actions>
                                        <v-btn class="white--text" rounded color="cyan"
                                            @click="deletarPublicacao(livro.id)">
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
                <BotaoAdicionarPubli>

                </BotaoAdicionarPubli>
            </v-fab-transition>
        </v-card-text>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-text-field label="File name"></v-text-field>

                    <small class="grey--text">* This doesn't actually save.</small>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn text color="primary" @click="dialog = false">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>


</template>

<script>

import { db } from '../firebase/firebase-config'
import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore'
//updateDoc


export default {
    name: 'MinhasPublis',
    //setup(){
    mounted() {
        this.livros = this.recuperarDocumentos(this.colRef)
    },

    created() {
        this.$store.commit('toggleAppBar', false);
    },


    //},

    components: {
        BotaoAdicionarPubli: () => import('../components/BotaoAdicionar.vue')
    },

    data: () => ({
        dialog: false,
        drawer: false,
        group: null,
        livros: null,
        novaPublicacao: {
            titulo: "Teste",
            descricao: "Dinossauro descrição",
            autor: "Coiso"
        },


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
        async recuperarDocumentos() {
            const q = query(collection(db, "publicacoes"), where("autorPubli", "==", "ebcwRnUHmWRRGklKUAhsBZhlU7f2"));
            const querySnapshot = await getDocs(q);


            let livros = []

            querySnapshot.docs.forEach(doc => {
                livros.push({ ...doc.data(), id: doc.id })
            })
            this.livros = livros



            console.log('Chamou a função, que retornou: ', this.livros)
            return this.livros
        },


        deletarPublicacao(id) {
            console.log('Verificando deleção...')
            const docRef = doc(db, 'livros', id)

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
</style>