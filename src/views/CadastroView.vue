<template>
   <v-app id="inspire" style="background-color:#391D41;">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card shaped color="#E6E7E9" class="elevation-12">
                     <v-toolbar dark color="#7B447B">
                        <v-toolbar-title>Novo Cadastro</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field filled name="login" v-model="email" label="E-mail" type="text" color="#7B447B"> <template
                                 v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    person
                                 </v-icon>
                              </template></v-text-field>
                           <v-text-field filled id="password" v-model="senha" prepend-icon="lock" color="#7B447B" name="password" label="Senha"
                              type="password"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    lock
                                 </v-icon>
                              </template></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="white--text" color="#91A366" @click="criarUsuario()">Cadastrar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="white--text" color="#91A366" @click="sair()">Sair</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import { auth } from '../firebase/firebase-config'
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
export default {
   name: 'CadastroView',
   props: {
      source: String,
   },

   data: () => ({
        email: "",
        senha: "",

    }),

   created(){
       this.$store.commit('toggleAppBar', false);
   },

   methods: {
      criarUsuario() {
         createUserWithEmailAndPassword(auth, this.email, this.senha)
            .then((userCredential) => {
               // Signed in
               console.log("Usuario: ", userCredential.user);
               console.log("Id criado: ", userCredential.providerId);
               
            })
            .catch((error) => {
               console.log("Código de erro: ", error.code);
               console.log("Mensagem de erro: ", error.message);
            })
      },

      sair() {
         signOut(auth)
            .then(() => {
               // Signed in
               console.log("Você saiu! :)");
               
               
            }).catch((error) => {
               console.log("Código de erro: ", error.code);
});
      }

   }

};
</script>

<style></style>