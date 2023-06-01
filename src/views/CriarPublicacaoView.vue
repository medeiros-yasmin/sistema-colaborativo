<template>
    <v-main style="background-color:#391D41;">

        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-btn @click="$router.go(-1)" style="margin-top:18px" color="white" variant="text" class="white--text"
                        text>

                        <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
                    </v-btn>


                    <v-card style="margin-top:18px" color="#5C3C6C" class="mx-auto white--text" height="850" width="1200">
                        <v-card-text class="text-h5 white--text" style="word-spacing: 50px;"> NOVA PUBLICAÇÃO </v-card-text>


                        <v-form ref="form" lazy-validation>
                            <v-col cols="28" sm="14" md="7">
                                <v-text-field type="text" v-model="titulo" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled :counter="40"
                                    label="Título" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field type="text" v-model="autor" class="custom-label-color"
                                    background-color="#391D41" color="white" dark shaped filled :counter="40"
                                    label="Autor(a)" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field v-model="link" class="custom-label-color" background-color="#391D41"
                                    color="white" light shaped dark filled :counter="40" label="Link da Publicação"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-textarea v-model="descricao" class="custom-textarea-color" background-color="#391D41"
                                    shaped dark :counter="200" color="white" input-color clearable filled>
                                    <template v-slot:label>
                                        <div>
                                            Descrição
                                        </div>
                                    </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="28" sm="14" md="7">
                                <v-select class="custom-textarea-color" label="Categoria" dark theme="dark"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']">
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
                                    <v-btn rounded color="#91A366" class="white--text " @click="adicionarPublicacao()">
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
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'

export default {
    name: 'PublicacaoNova',

    mounted() {

    },

    created(){
       this.$store.commit('toggleAppBar', false);
  },

    methods: {
        adicionarPublicacao() {
            addDoc(this.colRef, {
                titulo: this.titulo,
                autor: this.autor,
                descricao: this.descricao,
            })
                .then(() => {
                    console.log('Inserção de novos dados finalizada')
                })
        },

    },

    data: () => ({
        podcast: null,
        publicacaoId: null,
        publicacaoSelecionada: null,
        docRef: null,
        colRef: collection(db, 'sites'),
        titulo: "",
        descricao: "",
        link: "",
        autor: "",
        categoria: "",

    }),
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