<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="112">

                        <v-card shaped style="margin-top:18px; " color="#5C3C6C" :elevation="- 1"
                            class="overflow-hidden mx-auto white--text" height="300" width="1000">
                            
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                    <v-card-title class="text-h5" v-text="aviso">
                                    </v-card-title>
                                    <v-card-subtitle v-text="TESTE"></v-card-subtitle>
                                    <v-card-text class="limite-linhas text-justify text-h7 font-weight-bold">
                                        <p class="three-lines mt-5"> {{ DESC }} </p>
                                    </v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        
                                        <v-card-actions>
                                            <v-icon size="30px" class="material-symbols-rounded" color="#E6E7E9">
                                                handshake
                                            </v-icon>
                                            <span style="margin-left: 6px;" class="subheading mr-2">256</span>
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
                    <BotaoAdicionarPubli>

                    </BotaoAdicionarPubli>
                </v-fab-transition>
            </v-card-text>


        </v-main>

    </v-app>
</template>
<script>

//updateDoc


export default {
    name: 'AvisoView',


    data: () => ({
        ultimoDocumento: null,
        dialog: false,
        drawer: false,
        group: null,
        aviso: "PERMISSÃO NECESSÁRIA",
        

    }),

    created(){
       this.$store.commit('toggleAppBar', false);
  },

    methods: {


    }
};
</script>