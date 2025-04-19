<template>
    <v-main style="background-color:#391D41;">

        <v-container>
            <v-row>
                <v-col cols="12">

                    <v-alert class="center-align" :value="publiAtualizada" style="margin-top:18px; align-items: center"
                        dismissible @input="dismissAlertPubliAtualizada" color="blue" dark border="top" icon="mdi-home"
                        transition="scroll-y-transition">
                        Publicação criada com sucesso.
                    </v-alert>
                    <v-btn @click="$router.go(-1)" style="margin-top:18px" color="white" variant="text" class="white--text"
                        text>

                        <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
                    </v-btn>
                    


                    <v-card style="margin-top:18px" color="#5C3C6C" :elevation="publicacaoSelecionada - 1"
                        class="mx-auto white--text" height="850" width="1200">



                        <v-form ref="form" lazy-validation>
                            <v-col cols="28" sm="14" md="7">
                                <v-text-field type="text" v-model="publicacaoSelecionada.titulo" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled :counter="120"
                                    label="Título" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field type="text" v-model="publicacaoSelecionada.autor" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled :counter="120"
                                    label="Autor(a)" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field :rules="regraLink" v-model="publicacaoSelecionada.link" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled 
                                    label="Link da Publicação" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field :rules="regraLink" v-model="publicacaoSelecionada.imageURL" class="custom-label-color"
                                    background-color="#391D41" color="white" light shaped dark filled
                                    label="Link da imagem"></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-textarea :rules="regraDescricao" v-model="publicacaoSelecionada.descricao" class="custom-textarea-color"
                                    background-color="#391D41" shaped dark :counter="1000" color="white" input-color
                                    clearable filled>
                                    <template v-slot:label>
                                        <div>
                                            Descrição
                                        </div>
                                    </template>
                                </v-textarea>
                            </v-col>
                           
                            
                                
                            <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">

                                    
                                <v-btn rounded color="#8a718c" class="white--text" @click="atualizarPublicacao()">
                                    Cancelar
                                </v-btn>
                                <v-btn style="margin-left:25px" rounded color="#C6A0C9" class="white--text" @click="atualizarPublicacao()">
                                    Salvar
                                </v-btn>
                            
                            </v-row>
                        </v-form>


                    </v-card>

                </v-col>
            </v-row>


        </v-container>

    </v-main>
</template>

<script>
import { doc, getDoc, collection, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import router from '@/router';

const regraNome = [
    v => !!v || 'O campo é obrigatório',
    v => (v && v.length <= 120) || 'Preencha o campo com menos de 20 caracteres',
    v => /^[a-zA-ZÀ-ÿ\s]+$/.test(v) || 'Apenas letras e acentos são permitidos'
];

export default {
    name: 'EdicaoPublicacao',
    props: {
        id: {
            Number: String,
            required: true,
        },
        tipoPublicacao: {
        type: String,
        required: true,
    }
    },

    created(){
       this.$store.commit('toggleAppBar', false);
  },


    mounted() {
        this.publicacaoId = this.$route.params.id
        console.log("Do router: ", this.publicacaoId)
        this.docRef = doc(db, String(this.$route.params.tipoPublicacao), this.publicacaoId)
        this.recuperarPublicacaoSelecionada()

    },

   methods: {

        //Retirar, pois aqui se trata de EDIÇÃO de publiacações
        atualizarPublicacao() {
            console.log('Chamada da função de atualizar: ')
            updateDoc(this.docRef, {
                autor: this.publicacaoSelecionada.autor,
                descricao: this.publicacaoSelecionada.descricao,
                link: this.publicacaoSelecionada.link,
                titulo: this.publicacaoSelecionada.titulo
            }).then(()=>{
                this.publiAtualizada = true;
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.fecharAvisoPubliCriadaERedirecionar();
            })
        },
        recuperarPublicacaoSelecionada() {
            getDoc(this.docRef).then((doc) => {
                this.publicacaoSelecionada = (doc.data())
               
            })
        },

        dismissAlertPubliAtualizada() {
            this.publiAtualizada = false;
        },
        async fecharAvisoPubliCriadaERedirecionar() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
            this.publiAtualizada = false;
            router.go(-1);
        },



    },

    data: () => ({
        podcast: null,
        publicacaoId: null,
        publiAtualizada: false,
        publicacaoSelecionada: {
            titulo: "null",
            descricao: null,
            link: null,
            imageURL: null,
            autor: null,
            categoria: "",
        },
        docRef: null,
        colRef: collection(db, 'sites'),
        titulo: "",
        descricao: "",
        link: "",
        autor: "",
        categoria: "",

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