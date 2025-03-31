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
                                    mail
                                 </v-icon>
                              </template></v-text-field>
                           <v-text-field filled id="password" v-model="senha" prepend-icon="lock" color="#7B447B" name="password" label="Senha"
                              type="password"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    lock
                                 </v-icon>
                              </template></v-text-field>
                              <v-text-field filled v-model="primeiroNome" prepend-icon="lock" color="#7B447B" name="primeiroNome" label="Nome"
                              type="text"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    person
                                 </v-icon>
                              </template></v-text-field>
                              <v-text-field filled v-model="segundoNome" prepend-icon="lock" color="#7B447B" name="segundoNome" label="Sobrenome"
                              type="text"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    person
                                 </v-icon>
                              </template></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        
                        <v-btn class="white--text mb-4 ml-5" color="#91A366" @click="criarUsuario()">
                           <template>
                                 <v-icon class="material-symbols-rounded">
                                    done_outline
                                 </v-icon>
                              </template>Cadastrar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn outlined class=" mb-4 mr-8" color="#91A366" @click="sair()">
                           <template>
                                 <v-icon class="material-symbols-rounded">
                                    close
                                 </v-icon>
                              </template>Cancelar</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import router from '@/router';
import { auth } from '../firebase/firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
        nomeCompleto: null,
        alertaErro: false,
        exibirAviso: false,
        imagemPerfil: "https://firebasestorage.googleapis.com/v0/b/app-colaborativo.appspot.com/o/Avatares%2Fflower.png?alt=media&token=b0e0edff-9ed7-4ea0-b3fe-d1ec69015fb7"

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
               const user = userCredential.user;
               this.nomeCompleto = this.primeiroNome + " " + this.segundoNome;


               return updateProfile(user,  {
                  displayName: this.nomeCompleto,
                  photoURL: this.imagemPerfil
               });
            })
            .then(() => {
               this.exibirAviso = true;
               this.fecharAvisoAutomaticamente();
               router.push("/entrar")
            }).catch((error)=>{
               console.log("Erro ao criar ou atualizar perfil: ", error)
               this.alertaErro = true
            })
      },

      sair() {
         router.push("/entrar")
      }

   }

};
</script>

<style></style>