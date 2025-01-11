<template>
    
    <div class="user-card-container">
        <v-btn @click="$router.go(-1)" style="margin-top:18px;" color="white" variant="text" class="white--text"
                        text>

                        <v-icon style="margin-right:5px" start>mdi-arrow-left</v-icon> Voltar
                    </v-btn>
      <v-card class="mx-auto user-card" max-width="800">
        <v-card-title>
          <v-avatar class="mr-4" size="100">
            <v-img :src="user.image" alt="Imagem do usuário"></v-img>
          </v-avatar>
          <div>
            <h3 class="mb-1">{{ user.name }}</h3>
            <p class="mb-0">{{ user.email }}</p>
            <small>Conta criada em: {{ formattedCreationDate }}</small>
          </div>
        </v-card-title>
  
        <v-card-actions>
          <v-btn color="primary" text @click="editUser">Editar</v-btn>
          <v-btn color="red" text @click="deleteUser">Deletar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserCard",
    props: {
      user: {
        type: Object,
        required: true,
        default: () => ({
          name: "Nome do Usuário",
          email: "usuario@exemplo.com",
          creationDate: new Date(),
          image: "https://via.placeholder.com/150", // Imagem padrão
        }),
      },
    },
    computed: {
      formattedCreationDate() {
        return new Date(this.user.creationDate).toLocaleDateString();
      },
    },
    methods: {
      editUser() {
        console.log("Editar usuário:", this.user);
      },
      deleteUser() {
        console.log("Deletar usuário:", this.user);
      },
    },
  };
  </script>
  
  <style scoped>
  .user-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ocupa a altura total da tela */
    background-color: #391D41; /* Cor de fundo clara para destaque */
    padding: 16px;
  }
  
  .user-card {
    width: 100%;
    background-color: #5C3C6C;
    color: white;
    max-width: 800px; /* Largura máxima maior */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra para destacar o cartão */
  }
  </style>
  