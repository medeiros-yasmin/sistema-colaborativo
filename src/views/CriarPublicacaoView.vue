<template>
    <v-main style="background-color:#44075e;">
        <v-container>
            <v-row>
                <v-col cols="12">

                    <v-card style="margin-top:18px" color="purple" :elevation="publicacaoSelecionada - 1"
                        class="mx-auto white--text" height="800" width="1200">


                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-col cols="28" sm="14" md="7">
                                <v-text-field class="custom-label-color" background-color="#44075e" color="white" light
                                    shaped filled v-model="name" :counter="40" label="Título" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field class="custom-label-color" background-color="#44075e" color="white" light
                                    shaped filled v-model="name" :counter="40" label="Autor(a)" required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-text-field class="custom-label-color" background-color="#44075e" color="white" light
                                    shaped filled v-model="name" :counter="40" label="Link da Publicação"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="28" sm="14" md="7">
                                <v-textarea class="custom-textarea-color" background-color="#44075e" shaped dark
                                    :counter="200" color="white" input-color clearable filled>
                                    <template v-slot:label>
                                        <div>
                                            Descrição
                                        </div>
                                    </template>
                                </v-textarea>
                            </v-col>
                            <v-col cols="28" sm="14" md="7">
                                <v-text-field class="custom-label-color" background-color="#44075e" color="white" light
                                    shaped filled v-model="name" :counter="40" label="Categoria"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="28" sm="14" md="7">
                                <v-btn rounded color="#14C1D7" class="white--text" @click="validate">
                                    Publicar
                                </v-btn>
                            </v-col>
                        </v-form>


                    </v-card>

                </v-col>
            </v-row>


        </v-container>

    </v-main>

</template>

<script>
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'

export default {
    name: 'PublicacaoNova',
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

    mounted() {
        this.publicacaoId = this.$route.params.id
        console.log("No mounted, com o id pego do router")
        console.log("Do router: ", this.publicacaoId)
        console.log("Mounted: ")
        this.docRef = doc(db, String(this.$route.params.tipoPublicacao), this.publicacaoId)
        this.recuperarPublicacaoSelecionada()
        // this.publicacaoSelecionada = this.recuperarPublicacaoSelecionada()
        //console.log(this.publicacaoSelecionada)
        console.log("Depois da atribuçção no mounted")
    },

    /* computed: {
      publicacaoSelecionadaDupe() {
        //const docRef = doc(db, 'sites', this.id)
        //this.publicacaoSelecionada = getDoc(db, 'sites', this.publicacaoId)
        
        console.log("REF")
        console.log("docRef")
        return this.publicacaoSelecionada
      }
    }, */

    methods: {
        recuperarPublicacaoSelecionada() {
            getDoc(this.docRef).then((doc) => {
                console.log("Chegou")
                console.log(doc.data(), doc.id)
                this.publicacaoSelecionada = (doc.data())
            })
        }

    },

    data: () => ({
        podcast: null,
        publicacaoId: null,
        publicacaoSelecionada: null,
        docRef: null

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