<template>
   <v-app id="inspire" style="background-color:#391D41;">
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-alert class="center-align" :value="exibirAvisoLogin" style="margin-top:18px; align-items: center" color="blue"  dark border="top" icon="mdi-home" transition="scroll-y-transition">
                        Bem vindo(a), {{ nomeUsuario }}.
               </v-alert>
               <v-flex xs12 sm8 md4>
                  <v-card shaped color="#E6E7E9" class="elevation-12">
                     <v-toolbar dark color="#7B447B">
                        <v-toolbar-title>Autenticação</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field filled name="login" v-model="email" label="E-mail" type="text" color="#7B447B">
                              <template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    person
                                 </v-icon>
                              </template></v-text-field>
                           <v-text-field filled id="password" v-model="senha" prepend-icon="lock" color="#7B447B"
                              name="password" label="Senha" type="password"><template v-slot:prepend>
                                 <v-icon class="material-symbols-rounded">
                                    lock
                                 </v-icon>
                              </template></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="white--text" color="#91A366" @click="entrar()">Entrar</v-btn>
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
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { mapGetters } from 'vuex';
import { getFunctions, httpsCallable } from "firebase/functions";
export default {
   name: 'EntrarView',
   props: {
      source: String,
   },

   data: () => ({
      email: "",
      senha: "",
      exibirAvisoLogin: false,
      nomeUsuario: '',

   }),

   created() {
      this.$store.commit('toggleAppBar', false);
   },

   watch: {
      // whenever question changes, this function will run
      usuarioAutenticado: function () {
         this.verificarAutenticacao();
      },

      ...mapGetters(['getCurrentUser']),
      ...mapGetters(['dadosUsuarioAutenticado'])

   },


   methods: {
      async carregarDadosUsuario(id) {
         const functions = getFunctions();
         const usuario = httpsCallable(functions, 'exibirDadosUsuario');
         usuario({ id: id })
            .then((result) => {
               console.log("Dá pra imprimir (ENTRAR)?", result.data);
               console.log('Resposta da Cloud Function para buscar dados:', result.data.message)

               return result.data.nome, result.data.sobrenome ;

            })
            .catch(error => {
               console.log("Erro ao buscar o usuário em entrar: ", error)
            })
      },
      async entrar() {
         try {
            const userCredential = signInWithEmailAndPassword(auth, this.email, this.senha)

            console.log("Usuario: ", userCredential.user);
            console.log("Id: ", (await userCredential).user.uid);
            

            const idUsuario = (await userCredential).user.uid;

            const dadosUsuario = await this.carregarDadosUsuario(idUsuario);

            console.log("DadosUsuario: ", dadosUsuario);

            this.$store.commit('updateUserInfo', dadosUsuario);
            this.nomeUsuario = this.dadosUsuarioAutenticado;
            this.exibirAvisoLogin = true;

            router.push("/");

         } catch (error) {
            console.log("Código de erro: ", error.code);
            console.log("Mensagem de erro: ", error.message);
         }
      },

      sair() {
         signOut(auth)
            .then(() => {
               // Signed in
               console.log("Você saiu! :)");


            }).catch((error) => {
               console.log("Código de erro: ", error.code);
            });
      },
      verificarAutenticacao() {
         onAuthStateChanged(auth, (user) => {
            if (user) {
               console.log('Usuário autenticado de ENTRAR: ', user)


            } else {
               console.log('Usuário não autenticado.')
            }
         });
      }
   }
};
</script>

<style></style>