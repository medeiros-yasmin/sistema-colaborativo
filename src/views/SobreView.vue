<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                

                <v-row>
                    <v-col  cols="112">

                        <v-card shaped style="margin-top:80px; " color="#5C3C6C" :elevation="- 1"
                            class="overflow-hidden mx-auto white--text" height="663" width="1000">
                            
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                    <v-card-title class="text-h5">
                                        Sobre a aplicação, tecnologias usadas e seu desenvolvimento
                                    </v-card-title>
                                    <v-card-subtitle >Por: Yasmin Medeiros</v-card-subtitle>
                                    <v-card-text class="limite-linhas text-justify text-h7 font-weight-bold">
                                        <p class=" mt-5"> 
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
                                            ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                            voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                            tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
                                            ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
                                            voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                                        
                                        </p>
                                    </v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        
                        



                                    </v-row>

                                </div>

                                <v-avatar rounded align="center" class="mt-10 mr-5" size="250">
                                    <v-img src="../assets/logo-noz.png"
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
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'

export default {
    name: 'SobreView',

    created() {
        this.$store.commit('toggleAppBar', true);
    },

    mounted() {
        //const q = query(collection(db, "publicacoes"), where("autorPubli", "==", "ebcwRnUHmWRRGklKUAhsBZhlU7f2"));
        this.publicacaoId = this.$route.params.id
        console.log("Do router: ", this.publicacaoId)
        this.docRef = doc(db, "publicacoes", this.publicacaoId)
        this.recuperarPublicacaoSelecionada()
        console.log("Chegou22")

    },
    methods: {
        recuperarPublicacaoSelecionada() {
            getDoc(this.docRef).then((doc) => {
                console.log("Chegou2")
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
            { title: 'Editar', to: { name: 'editarPublicacao' } },
            { title: 'Excluir' },
            { title: 'Publicação duplicada' },
            { title: 'Não é uma publicação' },
            { title: 'Cancelar' },
        ],

    }),
}


</script>

<style>
.bottomleft {
    position: absolute;
    bottom: 30px;
    left: 30px;
    font-size: 18px;
}
</style>