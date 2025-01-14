<template>

  <v-app style="background-color:#391D41;">
    <v-main>
      <v-container class="voltar">
        <div><v-btn @click="$router.go(-1)" style="margin-top:18px;" color="white" variant="text" class="white--text"
            text>

            <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
          </v-btn></div>

      </v-container>

      <v-container>
        <v-row></v-row>
        <v-col cols="8" sm="6" md="4">
        <v-text block>
            Dados do Usuário
          </v-text>
        </v-col>
        <div class="user-card-container">
          

          <v-card class="mx-auto user-card" max-width="800">
            <v-card-title>
              <v-avatar class="mr-4" size="150">
                <v-img alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"></v-img>


              </v-avatar>
              <div>
                <h3 class="mb-1">{{ nome }}</h3>
                <p class="mb-0">{{ email }}</p>
                <small>Conta criada em: {{ formattedCreationDate }}</small>
              </div>
            </v-card-title>
            <v-divider class="mb-7" :thickness="5"></v-divider>
            <!-- <v-card-actions> -->
            <!--  <v-btn color="primary" text @click="editUser">Editar</v-btn>
          <v-btn color="red" text @click="deleteUser">Deletar</v-btn> -->
            <!-- </v-card-actions> -->
          </v-card>
        </div>
      </v-container>

    </v-main>
  </v-app>
</template>

<script>

import { auth } from '../firebase/firebase-config'

export default {
  name: "UserCard",

  mounted: {
    usuarioInfo: auth.currentUser
  },

  data: () => ({
    usuarioInfo: [],
    nome: "Nome do Usuário",
    email: "usuario@exemplo.com",
    creationDate: new Date(),
    image: "https://via.placeholder.com/150", // Imagem padrão
  }),

  computed: {
    formattedCreationDate() {
      return new Date(this.creationDate).toLocaleDateString();
    },
  },
  methods: {

  },
};
</script>

<style scoped>
.user-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Ocupa a altura total da tela */
  background-color: #391D41;
  /* Cor de fundo clara para destaque */
  padding: 16px;
}

.user-card {
  width: 100%;
  background-color: #5C3C6C;
  color: white;
  max-width: 800px;
  /* Largura máxima maior */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* Sombra para destacar o cartão */
}
</style>