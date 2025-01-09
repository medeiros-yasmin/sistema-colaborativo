<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container fluid class="d-flex justify-center align-center central-container">
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail"
                                placeholder="fulanodetal@preencha-aqui.com" counter="35" required dark></v-text-field>
                            <v-btn :loading="loadingAdmin" :disabled="loadingAdmin" color="#889B59"
                                @click="incluirComoAdministrador(email)" placeholder="fulanodetal@preencha-aqui.com"
                                dark right depressed>
                                <v-icon size="23px" class="material-symbols-rounded" left>
                                    handshake
                                </v-icon>TORNAR ADMINISTRADOR
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
                </v-container>


                <v-container>
                <v-alert class="center-align" :value="exibirAviso" style="margin-top:18px; align-items: center"
                    dismissible @input="dismissAlert" color="pink" dark border="top" icon="mdi-home"
                    transition="scroll-y-transition">
                    Apenas usuários autenticados podem criar publicações.
                </v-alert>
                <v-alert class="center-align" :value="exibirAvisoAgradecimento"
                    style="margin-top:18px; align-items: center" dismissible @input="dismissAlert" theme="dark"
                    color="#C51162" dark border="top" icon="mdi-alert-circle" transition="scroll-y-transition">
                    Você pode agradecer somente uma vez.
                </v-alert>
                <div class="text-center">
                    <v-snackbar v-model="snackbarAgradecimento" color="primary" variant="tonal" timeout="5000">
                        Agradecimento atualizado!

                        <template v-slot:actions>
                            <v-btn color="orange" variant="text" @click="snackbarAgradecimento = false">
                                Fechar
                            </v-btn>
                        </template>
                    </v-snackbar>
                </div>

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
                                            <BotaoAgradecer :publicacao-id="podcast.id"
                                                :ja-agradeceu="agradecimentosUsuario.includes(podcast.id)"
                                                :total-agradecimentos="podcast.agradecimentos"
                                                @atualizar-agradecimento="atualizarAgradecimento" />
                                            <span class="mr-2; ml-5">·</span>
                                            <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                share
                                            </v-icon>
                                            <span style="margin-left: 6px; font-size: 16px;"
                                                class="subheading">45</span>
                                        </v-card-actions>



                                    </v-row>

                                </div>
                                <v-avatar rounded align="center" class="mt-16 mr-5" size="170">
                                    <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                                        alt="Sem imagem"></v-img>
                                </v-avatar>
                            </div>
                        </v-card>

                    </v-col>
                </v-row>




            

            <v-card-text style="height: 100px;">
                <v-fab-transition>
                    <v-btn @click="verificarSeAutenticado()" color="#889B59" dark bottom right fab fixed
                        :to="{ name: 'criarPublicacao' }">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-fab-transition>
            </v-card-text>

        </v-container>
        </v-main>

    </v-app>
</template>

<script>

//import { getAuth } from 'firebase/auth';
import BotaoAgradecer from '@/components/BotaoAgradecer.vue';
import { db, auth } from '../firebase/firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc, arrayUnion, increment, updateDoc, getDoc, query, where, arrayRemove } from 'firebase/firestore'
import { getFunctions, httpsCallable } from "firebase/functions";
import { mapGetters } from 'vuex';
//import { functions } from '../../functions/index'
//updateDoc


export default {
    name: 'SiteView',
    mounted() {
        this.podcasts = this.recuperarDocumentos(this.colRef)

    },
    components: {
        BotaoAgradecer,
        //BotaoVisualizar: () => import('../components/BotaoVisualizar.vue'),
        //BotaoAdicionarPubli: () => import('../components/BotaoAdicionar.vue')
    },

    data: () => ({
        valid: true,
        ultimoDocumento: null,
        exibirAviso: false,
        exibirAvisoAgradecimento: false,
        criarClicado: false,
        dialog: false,
        isLiked: false,
        drawer: false,
        group: null,
        podcasts: null,
        snackbarAgradecimento: false,
        loadingAdmin: false,
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
        email: '',
        emailRules: [
            v => !!v || 'E-mail obrigatório',
            v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido',
        ],
        publicacoes: [],
        agradecimentosUsuario: [],

    }),

    created() {
        this.$store.commit('toggleAppBar', true);
        this.carregarAgradecimentos();


    },
    computed: {
        ...mapGetters(['getCurrentUser', 'getCurrentUserFullData']),
    },

    methods: {
        async carregarAgradecimentos() {
            try {

                this.verificarSeAutenticado();
                const q = query(
                    collection(db, 'agradecimentos'),
                    where('usuarios', 'array-contains', auth.currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                this.agradecimentosUsuario = querySnapshot.docs.map((doc) => doc.id);

            } catch (error) {
                console.error("Erro nos agradecimentos: ", error);
            }
        },

        async atualizarAgradecimento(publicacaoId) {
            try {
                const idUsuario = auth.currentUser.uid;
                const jaAgradeceu = this.agradecimentosUsuario.includes(publicacaoId);

                if (jaAgradeceu) {
                    await updateDoc(doc(db, 'agradecimentos', publicacaoId), {
                        usuarios: arrayRemove(idUsuario)
                    });
                    this.agradecimentosUsuario = this.agradecimentosUsuario.filter(
                        (id) => id !== publicacaoId
                    );
                } else {
                    await updateDoc(doc(db, 'agradecimentos', publicacaoId), {
                        usuarios: arrayUnion(idUsuario),
                    });
                    this.agradecimentosUsuario.push(publicacaoId);

                }
                this.snackbarAgradecimento = !this.snackbarAgradecimento;
            } catch (error) {
                console.error('Erro ao atualizar agradecimento: ', error);
            }
        },
        incluirComoAdministrador(address) {
            const functions = getFunctions();
            this.loadingAdmin = true
            const addAdminRole = httpsCallable(functions, 'addAdminRole');
            addAdminRole({ email: address })
                .then((result) => {
                    console.log('Resposta da Cloud Function:', result.data.message)
                    this.loadingAdmin = false
                }).catch((error) => {
                    console.error('Erro ao chamar a Cloud Function:', error);
                })
        },
        //Verifica se o usuário está autenticado ao selecionar o botão de criar publicação
        verificarSeAutenticado() {
            if (!this.getCurrentUser && this.criarClicado)
                this.exibirAviso = true;
            else
                this.exibirAviso = false;

            this.fecharAvisoAutomaticamente();
        },

        dismissAlert() {
            this.exibirAviso = false;
        },

        async adicionarAgradecimento(publicacaoId) {

            const user = auth.currentUser;

            if (!user)
                throw new Error('Somente usuários autenticados podem agradecer!');

            try {
                const usuarioRef = doc(db, 'usuarios', user.uid);
                const publicacaoRef = doc(db, 'sites', publicacaoId);

                // Recupera os dados do usuário
                const usuarioDoc = await getDoc(usuarioRef);

                if (!usuarioDoc.exists()) {
                    throw new Error('Usuário não encontrado!');
                }

                const usuarioData = usuarioDoc.data();

                // Verifica se o usuário já agradeceu esta publicação
                if (usuarioData.agradeceuEm && usuarioData.agradeceuEm.includes(publicacaoId)) {
                    this.exibirAvisoAgradecimento = true;
                    this.fecharAvisoAgradecimento()
                    throw new Error('O agradecimento é permitido somente uma vez!');
                }

                // Atualiza os dados do usuário
                await updateDoc(usuarioRef, {
                    agradeceuEm: arrayUnion(publicacaoId),
                });

                // Incrementa o contador de agradecimentos na publicação
                await updateDoc(publicacaoRef, {
                    agradecimentos: increment(1),
                });

                console.log('Agradecimento realizado com sucesso!');
            } catch (error) {
                console.error('Erro ao agradecer:', error.message);

                throw error;

            }
        },

        async fecharAvisoAutomaticamente() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });
            this.exibirAviso = false;
        },

        async fecharAvisoAgradecimento() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            })
            this.exibirAvisoAgradecimento = false;
        },
        recuperarDocumentos(colRef) {
            getDocs(colRef)
                .then(snapshot => {

                    let podcasts = []
                    snapshot.docs.forEach(doc => {
                        podcasts.push({ ...doc.data(), id: doc.id })
                    })
                    this.podcasts = podcasts


                })
                .catch(err => {
                    console.log('Retornou erro:', err.message)
                })


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
.botao-agradecer {
    outline-width: 1px !important;
    outline-style: solid !important;
    outline-color: white !important;
    background-color: transparent !important;
}




.span-selecionado {
    color: #391D41 !important;
    font-weight: bold !important;
}

.selected-icon {
    color: #391D41 !important;
    font-variation-settings: 'wght' 410 !important;
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