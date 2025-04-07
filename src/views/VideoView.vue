<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container style="margin-top:18px;" fluid class="d-flex justify-center align-center central-container">
                <v-row align="center" justify="center">
                    <v-col cols="8" sm="6" md="4">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail"
                                placeholder="fulanodetal@preencha-aqui.com" counter="35" required dark></v-text-field>
                            <v-btn :loading="loadingAdmin" :disabled="loadingAdmin" color="#889B59"
                                @click="incluirComoAdministrador(email)" placeholder="fulanodetal@preencha-aqui.com"
                                dark right depressed block>
                                <v-icon size="23px" class="material-symbols-rounded" left>
                                    admin_panel_settings
                                </v-icon>TORNAR ADMINISTRADOR
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>


            <v-container style="margin-top:80px;">
                <v-alert class="center-align" :value="exibirAvisoPCriarPubli" align-items: center dismissible
                    @input="dismissAlert" color="pink" dark border="top" icon="mdi-home"
                    transition="scroll-y-transition">
                    Apenas usuários autenticados podem criar publicações.
                </v-alert>
                <v-alert class="center-align" :value="exibirAvisoAgradNAutenticado"
                    style="margin-top:18px; align-items: center" dismissible @input="dismissAlert" theme="dark"
                    color="#C51162" dark border="top" icon="mdi-alert-circle" transition="scroll-y-transition">
                    Apenas usários autenticados podem agradecer.
                </v-alert>
                <v-alert class="center-align" :value="exibirAvisoErroAgradecer"
                    style="margin-top:18px; align-items: center" dismissible @input="dismissAlertErroAgradecimento" theme="dark"
                    color="#C51162" dark border="top" type="error" transition="scroll-y-transition">
                    Erro ao agradecer pela publicação.
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
                    <v-col v-for="(podcast, index) in podcasts" :key="podcast.id" cols="112">

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
                                                :to="{ name: 'publicacao', params: { id: podcast.id, tipoPublicacao: 'videos' } }">
                                                Visualizar
                                            </v-btn>

                                            <v-btn v-if="ehProprietarioPubli[index]" class="white--text" rounded
                                                color="cyan" @click="deletarPublicacao(podcast.id)">
                                                Deletar
                                            </v-btn>



                                        </v-card-actions>
                                        <v-card-actions>
                                            <BotaoAgradecer :publicacao-id="podcast.id"
                                                :ja-agradeceu="agradecimentosUsuario.includes(podcast.id)"
                                                :total-agradecimentos="totaisAgradecimentos[podcast.id] || 0"
                                                @atualizar-agradecimento="atualizarAgradecimento" />
                                            
                                        </v-card-actions>



                                    </v-row>

                                </div>
                                <v-avatar rounded align="center" class="mt-16 mr-5" size="170">
                                    <v-img :src="podcast.imageURL || defaultImageURL" alt="Sem imagem"></v-img>
                                </v-avatar>
                            </div>
                        </v-card>

                    </v-col>
                </v-row>






                <v-card-text style="height: 100px;">
                    <v-fab-transition>
                        <v-btn @click="verificarSeAutenticadoPCriar()" color="#889B59" dark bottom right fab fixed
                            :to="{ name: 'criarPublicacao' }">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-fab-transition>
                </v-card-text>






            </v-container>


            <v-dialog v-model="dialogDeletar" width="auto">
                <v-card dark max-width="400">
                    <v-card-title class="headline">Confirmar exclusão</v-card-title>
                    <v-card-text>
                        Tem certeza que deseja deletar esta publicação?
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="dialogDeletar = false">Cancelar</v-btn>
                        <v-btn :loading="carregarDelecao" @click="confirmarDelecao">Ok</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


        </v-main>

    </v-app>
</template>

<script>

//import { getAuth } from 'firebase/auth';
import BotaoAgradecer from '@/components/BotaoAgradecer.vue';
import { db, auth } from '../firebase/firebase-config'
import { collection, onSnapshot, getDocs, addDoc, doc, arrayUnion, increment, updateDoc, getDoc, query, where, arrayRemove, deleteDoc } from 'firebase/firestore'
import { getFunctions, httpsCallable } from "firebase/functions";
import { mapGetters } from 'vuex';

//import { functions } from '../../functions/index'
//updateDoc


export default {
    name: 'VideoView',

    async mounted() {
        this.podcasts = await this.recuperarDocumentos(this.colRef)

        if (auth.currentUser) {
            // Mapeia os proprietários
            this.ehProprietarioPubli = this.podcasts.map(podcast =>
                podcast.autorPublicacao === auth.currentUser.uid
            );
            console.log("Se é o proprietário", JSON.stringify(this.ehProprietarioPubli, null, 2));
        } else {
            console.log("Usuário não autenticado.");
        }
        //Carrega os agradecimentos
        const ref = collection(db, 'agradecimentos')
        this.unsubscribeAgradecimentos = onSnapshot(ref, snapshot => {
            const temp = {}
            snapshot.forEach(docSnap => {
                const data = docSnap.data()
                // docSnap.id é o mesmo ID da publicação?
                temp[docSnap.id] = data.totalAgradecimentos
            })
            // Atualiza local: reatividade do Vue
            this.totaisAgradecimentos = temp
        })

    },
    beforeUnmount() {
        // Remove o listener para evitar vazamento de memória
        if (this.unsubscribeAgradecimentos) this.unsubscribeAgradecimentos()
    },
    components: {
        BotaoAgradecer,
    },

    data: () => ({
        valid: true,
        ultimoDocumento: null,
        exibirAviso: false,
        exibirAvisoPCriarPubli: false,
        exibirAvisoAgradNAutenticado: false,
        criarClicado: false,
        dialog: false,
        isLiked: false,
        drawer: false,
        group: null,
        podcasts: [],
        snackbarAgradecimento: false,
        loadingAdmin: false,
        publicacaoSelecionada: null,
        colRef: collection(db, 'videos'),
        totalAgradecimentos: [],
        totaisAgradecimentos: {},
        items: [
            { title: 'Spam' },
            { title: 'Publicação ofensiva' },
            { title: 'Publicação duplicada' },
            { title: 'Denunciar publicação' },
            { title: 'Cancelar' },
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail obrigatório',
            v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido',
        ],
        publicacoes: [],
        agradecimentosUsuario: [],
        dialogDeletar: false,
        carregarDelecao: false,
        ehProprietarioPubli: [true],
        unsubscribeAgradecimentos: null,
        exibirAvisoErroAgradecer: false

    }),

    created() {
        this.$store.commit('toggleAppBar', true);
        if (this.verificarSeAutenticado()) {
            this.carregarAgradecimentos();
        }

    },
    computed: {
        ...mapGetters(['getCurrentUser', 'getCurrentUserFullData']),
        defaultImageURL() {
        return "https://firebasestorage.googleapis.com/v0/b/app-colaborativo.appspot.com/o/Imagens%2Fwalnut.png?alt=media&token=76e21f15-f48d-47c3-9e6b-477adac92c93";
      },
    },


    methods: {
        async carregarAgradecimentos() {
            try {
                // 1. Carrega os agradecimentos do usuário atual
                const q = query(
                    collection(db, 'agradecimentos'),
                    where('usuarios', 'array-contains', auth.currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                this.agradecimentosUsuario = querySnapshot.docs.map((doc) => doc.id);

                // 2. Configura o listener para atualizações em tempo real
                const ref = collection(db, 'agradecimentos');

                // Remove o listener anterior, se existir
                if (this.unsubscribeAgradecimentos) {
                    this.unsubscribeAgradecimentos();
                }

                // Cria um novo listener
                this.unsubscribeAgradecimentos = onSnapshot(ref, snapshot => {
                    const temp = {};
                    snapshot.forEach(docSnap => {
                        const data = docSnap.data();
                        temp[docSnap.id] = data.totalAgradecimentos; // Atualiza o total de agradecimentos
                    });
                    // Substitui o objeto para garantir reatividade
                    this.totaisAgradecimentos = { ...temp };
                    console.log("Totais de agradecimentos atualizados:", this.totaisAgradecimentos);
                });

            } catch (error) {
                console.error("Erro nos agradecimentos: ", error);
            }
        },

        async atualizarAgradecimento(publicacaoId) {
            const user = auth.currentUser;

            if (!user) {
                this.exibirAvisoAgradNAutenticado = true;
                this.fecharAvisoAgradNAutenticado()
                return;
            }
            try {
                const idUsuario = auth.currentUser.uid;
                const docRef = doc(db, 'agradecimentos', publicacaoId);

                // Verifica se o usuário já agradeceu no sistema
                const docSnap = await getDoc(docRef);
                const jaAgradeceu = docSnap.exists() && docSnap.data().usuarios.includes(idUsuario);

                if (jaAgradeceu) {
                    //Remoção do agradecimento
                    await updateDoc(docRef, {
                        usuarios: arrayRemove(idUsuario),
                        totalAgradecimentos: increment(-1)
                    });
                    this.agradecimentosUsuario = this.agradecimentosUsuario.filter(
                        (id) => id !== publicacaoId
                    );


                } else {
                    await updateDoc(docRef, {
                        usuarios: arrayUnion(idUsuario),
                        totalAgradecimentos: increment(1)
                    });
                    this.agradecimentosUsuario.push(publicacaoId);



                }
                this.snackbarAgradecimento = true;
            } catch (error) {
                this.exibirAvisoErroAgradecer = true;
                this.fecharAvisoErroAgradecer()
                throw("Erro ao agradecer pela publicação. ", error)
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
        verificarSeAutenticadoPCriar() {
            //Autenticado
            if (!this.$store.getters.dadosUsuarioAutenticado.currentUserName == "Convidado" && this.criarClicado)
                this.exibirAvisoPCriarPubli = false;
            //Não autenticado
            else {

                this.exibirAvisoPCriarPubli = true;
            }
            this.criarClicado = false
            this.fecharAvisoAutomaticamente();
        },

        verificarSeAutenticado() {

            if (this.$store.getters.dadosUsuarioAutenticado.currentUserName == "Convidado")
                return false;
            else
                return true;
        },

        dismissAlert() {
            this.exibirAviso = false;
        },
        dismissAlertErroAgradecimento(){
            this.exibirAvisoErroAgradecer = false;
        },


        async fecharAvisoAutomaticamente() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });
            this.exibirAvisoPCriarPubli = false;
        },

        async fecharAvisoAgradNAutenticado() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            })
            this.exibirAvisoAgradNAutenticado = false;
        },

        async fecharAvisoErroAgradecer(){
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, 5000);
            })
            this.exibirAvisoErroAgradecer = false;
        },
        async recuperarDocumentos(colRef) {
            try {
                const snapshot = await getDocs(colRef);
                const podcasts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                console.log("Publicações carregadas:", podcasts);
                return podcasts; // Retorna os podcasts carregados
            } catch (err) {
                console.error('Erro ao recuperar documentos:', err.message);
                return []; // Retorna um array vazio em caso de erro
            }
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
            //console.log('Abrindo diálogo para deletar publicação:', id);
            this.publicacaoSelecionada = id;
            this.dialogDeletar = true;
        },
        async confirmarDelecao() {
            if (this.publicacaoSelecionada) {
                const docRef = doc(db, 'videos', this.publicacaoSelecionada);
                this.carregarDelecao = true
                try {
                    await deleteDoc(docRef).then(() => {
                        console.log('Documento deletado com sucesso!')
                        this.carregarDelecao = true
                        setTimeout(() => (this.loading = false), 3000)
                        location.reload()
                    })
                } catch (error) {
                    console.error("Erro ao deletar o documento desejado: ", error)
                }
            }
        }


    }
};
</script>

<style>
.central-container {
    height: 15vh;
}

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

.v-dialog {
    z-index: 1000 !important;
    /* Garante que o diálogo fique acima de outros elementos */
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
}
</style>