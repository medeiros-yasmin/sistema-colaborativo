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
                <v-col v-for="pub in minhasPublicacoes" :key="pub.id" cols="112">

                    <v-card shaped style="margin-top:18px" color="#5C3C6C" :elevation="pub - 1"
                        class="overflow-hidden mx-auto white--text" height="330" width="1000">
                        
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                <v-card-title class="text-h5" v-text="pub.titulo">
                                </v-card-title>
                                <v-card-subtitle v-text="pub.autor"></v-card-subtitle>
                                <v-card-text class="overflow-hidden text-justify text-h7 font-weight-bold"
                                    v-text="pub.descricao"></v-card-text>

                                <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                    text-align="bottom">
                                    <v-card-actions>
                                        <!-- <v-btn class="white--text" rounded color="cyan" @click="adicionarPublicacao(colRef)">
                                            Visualizar
                                        </v-btn> -->
                                        <v-btn class="white--text" rounded color="#C198C4"
                                            :to="{ name: 'teste', params: { id: pub.id } }">
                                            Visualizar
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


</template>

<script>

import { auth, db } from '../firebase/firebase-config'
import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore'
//updateDoc


export default {
    name: 'MinhasPublis',

    async created() {
        this.$store.commit('toggleAppBar', false);
        this.usuario = auth.currentUser
        if(this.usuario){
            console.warn('AUTENTICADO!!!!!!!!')
            console.log('UID do usuário:', this.usuario.uid)
            await this.recuperarMinhasPublis();
        }
        else
            console.warn('Usuário não autenticado!!!!!!!!')
    },

    components: {
        BotaoAdicionarPubli: () => import('../components/BotaoAdicionar.vue')
    },

    data: () => ({
        dialog: false,
        drawer: false,
        group: null,
        minhasPublicacoes: [],
        usuario: null
        

    }),

    methods: {
        async recuperarMinhasPublis() {

            try{
            const userId = auth.currentUser.uid
            const colecoes = ['auxilio', 'artigos', 'livros', 'podcasts', 'sites', 'videos']

            //Reinicializa os valores das publicações carregadas
            this.minhasPublicacoes = []

            for(const colecao of colecoes){
                const q = query(collection(db, colecao), where('autorPublicacao', '==', userId))
                const querySnapshot = await getDocs(q)

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log('Documento encontrado:', doc.id, data);
                    console.log('Timestamp:', data.dataCriacao);
                    console.log('Data convertida:', data.dataCriacao.toDate());

                    this.minhasPublicacoes.push({
                        id: doc.id,
                        colecao: colecao,
                        ...data,
                    })
                });
            }
            this.minhasPublicacoes.sort((a, b) => b.dataCriacao.toMillis() - a.dataCriacao.toMillis());
            }catch(error){
                console.error("Erro ao recuperar publis: ", error)

            }
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