<template>
   <v-app id="inspire" style="background-color:#391D41;">
      <v-main>


         <v-layout row justify-center>
            <v-flex xs12 sm8 md6>
               <v-alert class="mb-3" :value="exibirAvisoLogin" color="blue" dark border="top" icon="mdi-home"
                  transition="scroll-y-transition">
                  Bem vindo(a), {{ nomeUsuario }}.
               </v-alert>

               <v-alert class="mb-3" v-if="mensagemLogout"  dismissible @input="fecharAlertaLogout">
                  {{ mensagemLogout }}
               </v-alert>
            </v-flex>
         </v-layout>

         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card shaped color="#E6E7E9" class="elevation-18">
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

                        <v-btn class="white--text" color="#91A366" block @click="entrar()">

                           Entrar
                        </v-btn>
                     </v-card-actions>
                     <v-card-actions>

                        <v-btn block elevation="5" class="white--text d-flex align-center " color="#91A366"
                           @click="entrarGoogle()">
                           <img class="mr-2 " src="../assets/google.png" alt="Google" width="24" height="24">
                           <img />
                           Entrar com google
                        </v-btn>
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
import { auth, provider } from '../firebase/firebase-config'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
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
   computed: {
      mensagemLogout() {
         return this.$store.state.mensagemLogout
      }
   },

   mounted() {
      setTimeout(() => {
         this.$store.commit('setMensagemLogout', null)
      }, 5000)
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
               console.log('Resposta da Cloud Function para buscar dados:', result.data.message)

               return result.data.nome, result.data.sobrenome;

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

            router.push("/home");

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

      fecharAlertaLogout() {
         this.$store.commit('setMensagemLogout', null)
      },

      //Entrar via Google

      entrarGoogle() {
         signInWithPopup(auth, provider)
            .then((result) => {
               // This gives you a Google Access Token. You can use it to access the Google API.
               const usuario = result.user;
               const nomeSobrenome = result.user.displayName;

               console.log("Usuário autenticado:", usuario.displayName, usuario.uid);
               this.$store.commit('updateUserInfo', nomeSobrenome);
               router.push("/home");


            }).catch((error) => {
               // Handle Errors here.

               console.error("Erro ao autenticar com Google:", error.code, error.message);

            })
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

<style>
.inline-img {
   display: inline-flex !important;
   /* ou inline-flex, se precisar que o conteúdo interno (ex. slot) seja flex */
}
</style>