<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                <v-alert class="center-align" :value="exibirAviso" style="margin-top:18px; align-items: center" dismissible @input="dismissAlert" color="pink" dark border="top" icon="mdi-home" transition="scroll-y-transition">
                        Apenas usuários autenticados podem criar publicações.
                    </v-alert>
                <v-row>
                    <v-col v-for="podcast in podcasts" :key="podcast.id" cols="112">

                        <v-card shaped style="margin-top:18px; " color="#5C3C6C" :elevation="podcast - 1"
                            class="overflow-hidden mx-auto white--text" height="300" width="1000">
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
                                    <v-card-title class="text-h5" v-text="podcast.titulo">
                                    </v-card-title>
                                    <v-card-subtitle v-text="podcast.autor"></v-card-subtitle>
                                    <v-card-text class="limite-linhas text-justify text-h7 font-weight-bold">
                                        <p class="three-lines mt-5"> {{ podcast.descricao }} </p>
                                    </v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        <v-card-actions class="d-flex align-end">

                                            <v-btn class=" white--text" rounded color="#C198C4"
                                                :to="{ name: 'publicacao', params: { id: podcast.id, tipoPublicacao: 'sites' } }">
                                                Visualizar
                                            </v-btn>

                                            <v-btn class="white--text" rounded color="cyan"
                                                @click="deletarPublicacao(podcast.id)">
                                                Deletar
                                            </v-btn>
                                        </v-card-actions>
                                        <v-card-actions>
                                            <v-btn
                                            class="botao-agradecer" 
                                            :class="{ 'selected': publicacaoSelecionada === podcast.id }"
                                                rounded
                                                @click="adicionarAgradecimento(podcast.id)"
                                                
                                                color="#E6E7E9"
                                                >
                                                <v-icon :class="{ 'selected-icon': publicacaoSelecionada === podcast.id }" size="30px" class="material-symbols-rounded" color="#D2A8E7">
                                                    handshake
                                                </v-icon>
                                                <span style="margin-left: 6px;" class="subheading mr-2">256</span>
                                            </v-btn>
                                                <span class="mr-1">·</span>
                                                <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                    share
                                                </v-icon>
                                                <span style="margin-left: 6px;" class="subheading">45</span>
                                            </v-card-actions>



                                    </v-row>

                                </div>
                                <v-avatar rounded align="center" class="mt-16 mr-5" size="170">
                                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" alt="Sem imagem"></v-img>
                                </v-avatar>
                            </div>
                        </v-card>

                    </v-col>
                </v-row>


            </v-container>

            <v-card-text style="height: 100px;">
                <v-fab-transition>
                    <v-btn @click="verificarSeAutenticado()" color="#889B59" dark bottom right fab fixed
                        :to="{ name: 'criarPublicacao' }">
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
import { mapGetters } from 'vuex';
//updateDoc


export default {
    name: 'SiteView',
    mounted() {
        this.podcasts = this.recuperarDocumentos(this.colRef)
    },

    components: {
        //BotaoVisualizar: () => import('../components/BotaoVisualizar.vue'),
        //BotaoAdicionarPubli: () => import('../components/BotaoAdicionar.vue')
    },

    data: () => ({
        ultimoDocumento: null,
        exibirAviso: false,
        criarClicado: false,
        dialog: false,
        isLiked: false,
        drawer: false,
        group: null,
        podcasts: null,
        publicacaoSelecionada: null,
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

    created() {
        this.$store.commit('toggleAppBar', true);
    },
    computed: {
        ...mapGetters(['getCurrentUser']),
    },

    methods: {
        verificarSeAutenticado() {
            this.criarClicado = ! this.criarClicado
            if (this.getCurrentUser && this.criarClicado)
                this.exibirAviso = false;
            else
                this.exibirAviso = true;
                this.fecharAvisoAutomaticamente();
        },

        dismissAlert() {
            this.exibirAviso = false;
        },

        adicionarAgradecimento(index) {
            if (this.publicacaoSelecionada === index) {
                this.publicacaoSelecionada = null;
            } else {
                this.publicacaoSelecionada = index;
            }
        },

        async fecharAvisoAutomaticamente(){
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, 5000);
            });
            this.exibirAviso = false;
        },

        /* async recuperarNovosDocumentos(doc) {
            loading.classList.add('active');

            const ref = db.collection('reviews')
                .orderBy('createdAt')
                .startAfter(doc || 0)
                .limit(6);

            const data = await ref.get();

            // output docs
            let template = '';
            data.docs.forEach(doc => {
                const review = doc.data();
                template += `
    <div class="card">
      <h2>${review.name}</h2>
      <p>Written by ${review.author}</p>
      <p>Rating - ${review.rating} / 5</p>
    </div>
  `
            })
        }, */
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
.botao-agradecer{
    outline-width: 1px;
    outline-style: solid;
    outline-color: white ;
    background-color: transparent !important;
}
.selected {
  /* Adicione estilos visuais para indicar o estado de seleção */
  outline-width: 2px;
  outline-style: solid;
  outline-color: #D2A8E7;
}

.selected-icon{
    color: white !important;
}
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

.bottom-right {


    right: 16px;
    font-size: 18px;
}

.limite-linhas {
    line-clamp: 5 "… (continued on next page)";
}

.three-lines {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    white-space: normal;
}
</style>