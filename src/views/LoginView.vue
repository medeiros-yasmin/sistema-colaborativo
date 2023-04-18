<template>
   <v-app id="inspire">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Autenticação</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field filled name="login" v-model="email" label="E-mail" type="text" color="#b20000"> <template
                                 v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    person
                                 </v-icon>
                              </template></v-text-field>
                           <v-text-field id="password" v-model="senha" prepend-icon="lock" name="password" label="Senha"
                              type="password"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    lock
                                 </v-icon>
                              </template></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="criarUsuario()">Entrar</v-btn>
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
import { createUserWithEmailAndPassword } from "firebase/auth";
export default {
   name: 'LoginView',
   props: {
      source: String,
   },

   data: () => ({
        email: "",
        senha: "",

    }),

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
      }

   }

};
</script>

<style></style>