<template>
   <v-app id="inspire" style="background-color:#391D41;">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-alert class="center-align" :value="exibirAviso" style="margin-top:18px; align-items: center" dismissible @input="dismissAlert" color="blue" dark border="top" icon="mdi-home" transition="scroll-y-transition">
                        Usuário criado com sucesso.
                    </v-alert>
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
                              <v-text-field filled v-model="primeiroNome" prepend-icon="lock" color="#7B447B" name="password" label="Nome"
                              type="text"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    lock
                                 </v-icon>
                              </template></v-text-field>
                              <v-text-field filled v-model="segundoNome" prepend-icon="lock" color="#7B447B" name="password" label="Sobrenome"
                              type="text"><template v-slot:prepend>
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
import { auth, db } from '../firebase/firebase-config'
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
export default {
   name: 'CadastroView',
   props: {
      source: String,
   },

   data: () => ({
        email: "",
        senha: "",
        primeiroNome: "",
        segundoNome: "",
        alertaErro: false,
        exibirAviso: false,

    }),

   created(){
       this.$store.commit('toggleAppBar', false);
   },

   methods: {

      async fecharAvisoAutomaticamente(){
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve();
                }, 5000);
            });
            this.alertaErro = false;
        },
      dismissAlert() {
            this.alertaErro = false;
        },
      criarUsuario() {
         createUserWithEmailAndPassword(auth, this.email, this.senha)
            .then((userCredential) => {
               // Signed in
               console.log("Usuario: ", userCredential.user);
               console.log("Id criado: ", userCredential.providerId);
               return setDoc(doc(db, 'usuarios', userCredential.user.uid),  {
                  nome: this.primeiroNome,
                  sobrenome: this.segundoNome,
                  agradeceuEm: []
               });
            })
            .then(() => {
               this.exibirAviso = true;
               this.fecharAvisoAutomaticamente();
            }).catch((error)=>{
               console.log("Erro: ", error)
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