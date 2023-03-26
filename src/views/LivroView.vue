<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                <v-row>
                    <v-col v-for="livro in livros" :key="livro.id" cols="112">

                        <v-card style="margin-top:18px" color="#5C3C6C" :elevation="livro - 1" class="mx-auto white--text"
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
                                <div>
                                    <v-card-title class="text-h5" v-text="livro.titulo">
                                    </v-card-title>
                                    <v-card-subtitle v-text="livro.autor"></v-card-subtitle>
                                    <v-card-text class="text-h7 font-weight-bold" v-text="livro.descricao"></v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        <v-card-actions>
                                            <!-- <v-btn class="white--text" rounded color="cyan" @click="adicionarPublicacao(colRef)">
                                            Visualizar
                                        </v-btn> -->
                                            <BotaoVisualizar
                                                :to="{ name: 'publicacao', params: { id: livro.id, tipoPublicacao: 'livros' } }">
                                                Visualizar
                                            </BotaoVisualizar>
                                        </v-card-actions>
                                        <v-card-actions>
                                            <v-btn class="white--text" rounded color="cyan"
                                                @click="deletarPublicacao(livro.id)">
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

    </v-app>
</template>

<script>

import { db } from '../firebase/firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
//updateDoc


export default {
    name: 'LivroView',
    //setup(){
    mounted() {
        this.livros = this.recuperarDocumentos(this.colRef)
    },


    //},

    components: {
        BotaoVisualizar: () => import('../components/BotaoVisualizar.vue'),
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
        colRef: collection(db, 'livros'),
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
                    let livros = []
                    snapshot.docs.forEach(doc => {
                        livros.push({ ...doc.data(), id: doc.id })
                    })
                    console.log('Tem podcast: ', livros)
                    this.livros = livros

                    console.log('Tem podcast dentro da variável local: ', this.livros)
                })
                .catch(err => {
                    console.log('Retornou erro:', err.message)
                })

            console.log('Chamou a função, que retornou: ', this.livros)
            return this.livros
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