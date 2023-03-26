
import { container } from 'webpack';

<template>
    <v-main style="background-color:#391D41;">
      <v-container>
                <v-row>
                    <v-col cols="12">

                      <v-btn @click="$router.go(-1)" style="margin-top:18px" color="white" variant="text" class="white--text" text>
                        
                        <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
                    </v-btn>

                        <v-card style="margin-top:18px"  color="#5C3C6C" :elevation="5" class="mx-auto white--text" height="800" width="1200">
                          <v-menu bottom left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item class="topright">
                                        <v-btn variant="outlined" icon v-bind="attrs" v-on="on">
                                            <v-icon color="white">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </v-list-item>
                                </template>

                                <v-list>
                                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
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
        console.log("Do router: ", this.publicacaoId)
        this.docRef = doc(db, String(this.$route.params.tipoPublicacao), this.publicacaoId)
        this.recuperarPublicacaoSelecionada()
       
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
        console.log("publicacaoSelecionada: ", this.publicacaoSelecionada)
      })
    }

  },

    data: () => ({
        podcast: null,
        publicacaoId: null,
        publicacaoSelecionada: null,
        docRef: null,
        items: [
            { title: 'Editar', to: {name: 'editarPublicacao' }},
            { title: 'Excluir' },
            { title: 'Publicação duplicada' },
            { title: 'Não é uma publicação' },
            { title: 'Cancelar' },
        ],

    }),
}


</script>