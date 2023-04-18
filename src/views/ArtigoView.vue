<template>
  <v-app style="background-color:#391D41;">
      <v-main>
          <v-container>
              <v-row>
                  <v-col v-for="artigo in artigos" :key="artigo.id" cols="112">

                      <v-card style="margin-top:18px" color="#5C3C6C" :elevation="artigo - 1" class="mx-auto white--text"
                          height="330" width="1000">
                          <v-menu bottom left>
                              <template v-slot:activator="{ on, attrs }">
                                  <v-list-item class="topright">
                                      <v-btn variant="outlined" icon v-bind="attrs" v-on="on">
                                          <v-icon color="white">mdi-dots-vertical</v-icon>
                                      </v-btn>
                                  </v-list-item>
                              </template>

                              <v-list>
                                  <v-list-item v-for="(item, i) in items" :key="i" @click="() => { }">
                                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                                  </v-list-item>
                              </v-list>
                          </v-menu>
                          <div class="d-flex flex-no-wrap justify-space-between">
                              <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                  <v-card-title class="text-h5" v-text="artigo.titulo">
                                  </v-card-title>
                                  <v-card-subtitle v-text="artigo.autor"></v-card-subtitle>
                                  <v-card-text class="limite-linhas text-justify text-h7 font-weight-bold">
                                    <p class="three-lines mt-5">{{ artigo.descricao }}</p>
                                  </v-card-text>

                                  <v-row class="bottom-left" style="padding-left:18px; padding-top:8px"
                                      text-align="bottom">
                                      <v-card-actions>
                                          <!-- <v-btn class="white--text" rounded color="cyan" @click="adicionarPublicacao(colRef)">
                                          Visualizar
                                      </v-btn> -->
                                      <v-btn class="white--text" rounded color="#C198C4"
                                                :to="{ name: 'publicacao', params: { id: artigo.id, tipoPublicacao: 'artigos' } }">
                                                Visualizar
                                            </v-btn>
                                      </v-card-actions>
                                      <v-card-actions>
                                          <v-btn class="white--text" rounded color="cyan"
                                              @click="deletarPublicacao(artigo.id)">
                                              Deletar
                                          </v-btn>
                                      </v-card-actions>

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

import { db } from '../firebase/firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
//updateDoc


export default {
  name: 'artigoView',
  //setup(){
  mounted() {
      this.artigos = this.recuperarDocumentos(this.colRef)
  },


  //},

  components: {

  BotaoAdicionarPubli: () => import('../components/BotaoAdicionar.vue')
  },

  data: () => ({
      dialog: false,
      drawer: false,
      group: null,
      artigos: null,
      novaPublicacao: {
          titulo: "Teste",
          descricao: "Dinossauro descrição",
          autor: "Coiso"
      },
      colRef: collection(db, 'artigos'),
      items: [
          { title: 'Spam' },
          { title: 'Publicação ofensiva' },
          { title: 'Publicação duplicada' },
          { title: 'Não é uma publicação' },
          { title: 'Publicação ofensiva' },
          { title: 'Cancelar' },
      ],

  }),

  methods: {
      recuperarDocumentos(colRef) {
          getDocs(colRef)
              .then(snapshot => {
                  console.log(snapshot.docs)
                  let artigos = []
                  snapshot.docs.forEach(doc => {
                    artigos.push({ ...doc.data(), id: doc.id })
                  })
                  
                  this.artigos = artigos

                  
              })
              .catch(err => {
                  console.log('Retornou erro:', err.message)
              })

          console.log('Chamou a função, que retornou: ', this.artigos)
          return this.artigos
      },

      adicionarPublicacao(colRef) {
          addDoc(colRef, {
              titulo: this.novaPublicacao.titulo,
              autor: this.novaPublicacao.autor,
              descricao: this.novaPublicacao.descricao,
          })
              .then(() => {
                  console.log('Inserção de novos dados finalizada')
              })
      },

      deletarPublicacao(id) {
          console.log('Verificando deleção...')
          const docRef = doc(db, 'artigos', id)

          deleteDoc(docRef)
              .then(() => {
                  console.log('Documento deletado com sucesso!')
                  location.reload()
              })
      },


  }
};
</script>

<style>
.topright {
  position: absolute;
  top: 5px;
  right: 1px;
  font-size: 12px;
  margin-left: 8px;
}

.bottom-left {
  position: absolute;
  bottom: 30px;
  left: 16px;
  font-size: 18px;
}

.limite-linhas {
    line-clamp: 5 "… (continued on next page)";
}

.three-lines {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    white-space: normal;
}
</style>