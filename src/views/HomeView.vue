<template>
  <v-app style="background-color:#391D41;">
      <v-main>
          <v-container>
              <v-row>
                  <v-col v-for="item in items" :key="item.id" cols="4">

                      <v-card shaped style="margin-top:18px" color="#5C3C6C" :elevation="item - 10" class="overflow-hidden mx-auto white--text"
                          height="330" width="1000">
                          <v-menu bottom left>
                              <template v-slot:activator="{ on, attrs }">
                                  <v-list-item class="topright">
                                      <v-btn variant="outlined" icon v-bind="attrs" v-on="on">
                                          <v-icon color="white">mdi-dots-vertical</v-icon>
                                      </v-btn>
                                  </v-list-item>
                              </template>

                              
                          </v-menu>
                          <div class="d-flex flex-no-wrap justify-space-between">
                              <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                  <v-card-title class="text-h5" v-text="item.title">
                                  </v-card-title>
                                  <v-card-subtitle v-text="item.title"></v-card-subtitle>
                                  <v-card-text class="overflow-hidden text-justify text-h7 font-weight-bold" v-text="item.title"></v-card-text>
                              </div>
                              <v-avatar rounded align="center" class="mt-16 mr-5 " size="170">
                                <v-icon size="150px" class="material-symbols-rounded" color="#E6E7E9">
                                                share
                                            </v-icon>
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

          <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                  <v-card-text>
                      <v-text-field label="File name"></v-text-field>

                      <small class="grey--text">* This doesn't actually save.</small>
                  </v-card-text>

                  <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn text color="primary" @click="dialog = false">
                          Submit
                      </v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
      </v-main>

  </v-app>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data: () => ({
        
        items: [
            { id: 0, title: 'Artigos' },
            { id: 1, title: 'Auxílios' },
            { id: 2, title: 'Podcasts' },
            { id: 3, title: 'Sites' },
            { id: 4, title: 'Vídeos' },
            { id: 5, title: 'Livros e Revistas' },
        ],

    }),

    created(){
       this.$store.commit('toggleAppBar', false);
  },

}
</script>
