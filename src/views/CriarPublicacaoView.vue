<template>
    <v-main style="background-color:#391D41;">

        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-alert class="center-align" :value="publiCriada" style="margin-top:18px; align-items: center"
                        dismissible @input="dismissAlertPubliCriada" color="blue" dark border="top" icon="mdi-home"
                        transition="scroll-y-transition">
                        Publicação criada com sucesso.
                    </v-alert>
                    <v-alert type="warning" :value="alertaErro" dismissible @input="dismissAlert">
                        Preencha os campos adequadamente para criar uma publicação
                    </v-alert>
                    <v-alert density="compact" type="error" :value="alertaErroCriar" dismissible
                        @input="dismissAlertErroCriar">
                        Erro ao criar publicação
                    </v-alert>
                    <v-btn @click="$router.go(-1)" style="margin-top:18px" color="white" variant="text"
                        class="white--text" text>

                        <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
                    </v-btn>



                    <v-card style="margin-top:18px; margin-bottom: 18px;" color="#5C3C6C" class="mx-auto white--text"
                        height="890" width="1200">
                        <v-card-text class="text-h5 white--text" style="word-spacing: 10px"> NOVA PUBLICAÇÃO
                        </v-card-text>


                        <v-form ref="form" v-model="validacao" lazy-validation>
                            <v-col cols="28" sm="14" md="7">
                                <v-text-field :rules="regraNome" type="text" v-model="titulo" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled :counter="120"
                                    label="Título" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field :rules="regraNome" type="text" v-model="autor" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled :counter="120"
                                    label="Autor(a)" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field :rules="regraLink" v-model="link" class="custom-label-color"
                                    background-color="#391D41" color="white" light shaped dark filled
                                    label="Link da Publicação" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field :rules="regraLink" v-model="imageURL" class="custom-label-color"
                                    background-color="#391D41" color="white" light shaped dark filled
                                    label="Link da imagem"></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-textarea :rules="regraDescricao" v-model="descricao" class="custom-textarea-color"
                                    background-color="#391D41" shaped dark :counter="500" color="white" input-color
                                    clearable filled>
                                    <template v-slot:label>
                                        <div>
                                            Descrição
                                        </div>
                                    </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="28" sm="14" md="7">
                                <v-select v-model="categoriaEscolhida"
                                    :rules="[v => !!v || 'A categoria é obrigatória']" class="custom-textarea-color"
                                    label="Categoria" dark theme="dark" :items="categorias" required>
                                </v-select>
                            </v-col>

                            <v-row>
                                <v-col cols="28" sm="14" md="7">
                                    <v-btn style="margin-right: 15px;" rounded color="#C1C0E5" class="white--text"
                                        @click="adicionarPublicacao()">
                                        Cancelar
                                        <v-icon size="25px" class="material-symbols-rounded" right dark>
                                            cancel
                                        </v-icon>
                                    </v-btn>
                                    <v-btn :disabled="!validacao" rounded color="#91A366" class="white--text "
                                        @click="adicionarPublicacao()">
                                        Publicar
                                        <v-icon size="25px" class="material-symbols-rounded" right dark>
                                            check
                                        </v-icon>
                                    </v-btn>

                                </v-col>



                            </v-row>
                        </v-form>


                    </v-card>


                </v-col>
            </v-row>


        </v-container>

    </v-main>
</template>

<script>
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import router from '@/router';
//import { onAuthStateChanged }from 'firebase/auth'

const regraNome = [
    v => !!v || 'O campo é obrigatório',
    v => (v && v.length <= 120) || 'Preencha o campo com menos de 20 caracteres',
    v => /^[a-zA-ZÀ-ÿ\s]+$/.test(v) || 'Apenas letras e acentos são permitidos'
];
export default {
    name: 'PublicacaoNova',
    mounted() {

    },

    created() {
        this.$store.commit('toggleAppBar', false);
        /* onAuthStateChanged(auth, (user) => {
             this.currentUser = user;
        }); */
    },

    methods: {
        adicionarPublicacao() {
            this.indiceCategoria = this.categorias.indexOf(this.categoriaEscolhida)
             
            //No momento da criação, seus agradecimentos se iniciam com 0
            if (this.$refs.form.validate()) {
                addDoc(collection(db, this.categoriasBanco[this.indiceCategoria]), {
                    titulo: this.titulo,
                    autor: this.autor,
                    descricao: this.descricao,
                    link: this.link,
                    imageURL: this.imageURL,
                    agradecimentos: 0
                })
                    .then((docRef) => {
                        const agradecimentosRef = doc(db, 'agradecimentos', docRef.id);

                        setDoc(agradecimentosRef, {
                            totalAgradecimentos: 0,
                            usuarios: []
                        }).then(() => {
                            this.publiCriada = true;
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            this.fecharAvisoPubliCriadaERedirecionar();
                        })

                    })
                    .catch((error) => {
                        console.error("Erro ao criar publicação ou agradecimentos:", error);
                        this.alertaErroCriar = true; // Mostra aviso de ERRO
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        this.fecharAvisoErroCriarAutomaticamente(); 
                        
                    });
            }
            else {
                this.alertaErro = true;
                this.fecharAvisoAutomaticamente();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

        },

        dismissAlert() {
            this.alertaErro = false;
        },

        dismissAlertPubliCriada() {
            this.publiCriada = false;
        },

        dismissAlertErroCriar() {
            this.alertaErroCriar = false;
        },

        async fecharAvisoAutomaticamente() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });
            this.alertaErro = false;
        },

        async fecharAvisoErroCriarAutomaticamente() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 5000);
            });
            this.alertaErroCriar = true;
        },

        async fecharAvisoPubliCriadaERedirecionar() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
            this.publiCriada = false;
            router.go(-1);
        },

    },

    data: () => ({
        alertaErroCriar: false,
        alertaErro: false,
        publiCriada: false,
        podcast: null,
        publicacaoId: null,
        publicacaoSelecionada: null,
        validacao: true,
        docRef: null,
        colRef: collection(db, 'sites'),
        titulo: "",
        descricao: "",
        link: "",
        imageURL: "",
        autor: "",
        categoria: "",
        currentUser: null,
        categorias: ['Artigo', 'Auxílio', 'Podcast', 'Site', 'Vídeo', 'Livros/ Revistas'],
        categoriaEscolhida: '',
        indiceCategoria: 0,
        categoriasBanco: ['artigos', 'auxilios', 'podcasts', 'sites', 'videos', 'livros'],



        regraLink: [
            v => !!v || 'O link da publicação é obrigatório',
            v => {
                const pattern = /^(|http|https):\/\/[^ "]+$/;
                return pattern.test(v) || 'Link inválido.';
            }
        ],

        regraDescricao: [
            v => !!v || 'A descrição é obrigatória',
            v => (v && v.length >= 10) || 'A descrição deve conter ao menos 10 caracteres.',
        ],
    }),
    computed: {
        regraNome: () => regraNome
    }
}


</script>

<style>
.custom-label-color .v-label,
.custom-textarea-color .v-label {
    color: white;
    opacity: 20;
}


.custom-label-color input,
.custom-textarea-color .input-slot {
    color: white !important;
}
</style>