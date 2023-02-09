
import { container } from 'webpack';

<template>
    <v-main style="background-color:#44075e;">
      <v-container>
                <v-row>
                    <v-col cols="12">

                        <v-card style="margin-top:18px"  color="purple" :elevation="publicacaoSelecionada - 1" class="mx-auto white--text" height="800" width="1200">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div>
                                    <v-card-title class="text-h5" v-text="publicacaoSelecionada.titulo"></v-card-title>
                                    <v-card-subtitle v-text="publicacaoSelecionada.autor"></v-card-subtitle>
                                    <v-card-text class="text-h7 font-weight-bold" v-text="publicacaoSelecionada.descricao"></v-card-text>
                                    
                                    <v-row style="padding-left:18px; padding-top:8px" text-align="bottom" >
                                    
                                        <!-- <v-btn class="white--text" rounded color="cyan" @click="adicionarPublicacao(colRef)">
                                            Visualizar
                                        </v-btn> -->
                                       
                                    </v-row>
                                    
                                </div>
                            </div>
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
  name: 'PublicacaoUnica',
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
    recuperarPublicacaoSelecionada(){
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