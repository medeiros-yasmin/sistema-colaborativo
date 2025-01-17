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
       
        <h3 class=" descricao-pagina" size="150" >
            Dados do Usuário
        </h3>
        
        <div class="user-card-container">
          

          <v-card class="mx-auto user-card" max-width="800">
            <v-card-title>
              <v-avatar class="mr-4" size="120">
                <v-img alt="Avatar" :src="usuarioInfo.photoURL"></v-img>


              </v-avatar>
              <div>
                <h3 class="texto-ambar mb-1"> Nome: {{  usuarioInfo.displayName }}</h3>
                <p class="mb-0"> E-mail: {{ usuarioInfo.email }}</p>
                <small>Conta criada em: {{ formattedCreationDate }}</small>
              </div>
            </v-card-title>
            <v-divider class="mb-7" :thickness="5"></v-divider>
            <v-card-actions>
              <v-btn color="primary" text @click="imprimir">Ver dados</v-btn>
          
             </v-card-actions> 
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

  mounted() {
    this.usuarioInfo = auth.currentUser
  },

  created() {
        this.$store.commit('toggleAppBar', false);
        
    },

  data: () => ({
    usuarioInfo: {
      /* nome: '',
      email: '',
      dataCriacao: new Date(),
      imagemPerfil: '' */
    },
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
    imprimir(){
      console.log("USER: ", auth.currentUser.displayName)
    }

  },
};
</script>

<style scoped>

.descricao-pagina{
  justify-content: center;
  color: white;
  font-size: x-large;
  display: flex;
  justify-content: center;
  
}
.user-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  /* Ocupa a altura total da tela */
  background-color: #391D41;
  /* Cor de fundo clara para destaque */
  padding: 16px;
}

.user-card {
  width: 100%;
 /* background-color: #5C3C6C; */
 background: linear-gradient(
  45deg,
    /* Roxo bem escuro */
    #30003b 0%,  
    /* Tom intermediário */
    #490f65 50%, 
    /* Roxo mais claro, porém ainda escuro */
    #6b1e8c 100%
  );
  color: white;
  max-width: 800px;
  /* Largura máxima maior */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* Sombra para destacar o cartão */
}

.texto-ambar {
  color: #ffffff;
}
</style>