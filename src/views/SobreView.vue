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
                                            A título de curiosidade, o nome NOZ surge do homófono, onde a grafia é quase igual e a pronúncia é igual, existente entre a fruta
                                             noz e nós. Haja visto a complexidade da fibromialgia e a ausência de uniformidade de sintomas mesmo entre as pessoas acometidas
                                              pela doença, achou-se válido dizer que: “Cada um de nós sabe como é viver dentro da sua própria casca de noz”.
                                        
                                        </p>
                                    </v-card-text>

                                    <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                        text-align="bottom">
                                        
                        



                                    </v-row>

                                </div>

                                <v-avatar rounded align="center" class="mt-10 mr-5" size="250">
                                    <v-img src="../assets/flower.png"
                                        alt="Sem imagem"></v-img>
                                </v-avatar>
                                
                            </div>
                        </v-card>

                    </v-col>
                </v-row>


                <v-row>
                    <v-col  cols="112">

                        <v-card shaped style="margin-top:80px; " color="#5C3C6C" :elevation="- 1"
                            class="overflow-hidden mx-auto white--text" height="663" width="1000">
                            
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                    <v-card-title class="text-h5">
                                        Pacotes, ícones e fontes usados
                                    </v-card-title>
                                    
                                    <v-card-text class="limite-linhas text-justify text-h7 font-weight-bold">
                                        <p class=" mt-5 text-justify"> 
                                            Google fonts: 
                                          <v-btn 
                                          href="https://fonts.google.com/icons?icon.size=24&icon.color=%23e8eaed&selected=Material+Symbols+Outlined:potted_plant:FILL@0;wght@400;GRAD@0;opsz@24"
                                          target="_blank"
                                          rel="noopener"
                                          >
                                           Google fonts
                                         </v-btn>  
                                        
                                        </p>

                                        <p> Imagem do drawer: 
                                          <v-btn
                                          class="text-center" 
                                          href="https://www.freepik.com/free-vector/gradient-purple-striped-background_29699681.htm#fromView=keyword&page=1&position=24&uuid=3984fc6b-3004-4791-a2f4-cab909ba8285"
                                          target="_blank"
                                          rel="noopener"
                                          prepend-icon="mdi-check"
                                          variant="text"
                                          dark
                                          outlined
                                          > 
                                          <v-icon class="material-symbols-rounded">mdi-check</v-icon>  Imagem </v-btn>  
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
            </v-container>

        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'SobreView',

    created() {
        this.$store.commit('toggleAppBar', true);
    },


    data: () => ({
    
        docRef: null,

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