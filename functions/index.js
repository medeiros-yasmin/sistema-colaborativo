/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */



const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializa o Firebase Admin
admin.initializeApp();

const db = admin.firestore();

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `O usuário  ${data.email} foi incluído como administrador!`
        }
    }).catch(err => {
        return err;
    });
});






// Função para criar o usuário no Firestore
exports.createUserInFirestore = functions.auth.user().onCreate((user) => {
    // Verificar se os dados do usuário estão presentes
    console.log('Trigger disparada.');
  console.log('Dados do usuário:', user);

  if (!user || !user.uid) {
    console.error('Nenhum dado do usuário encontrado.');
    return;
  }

  console.log('Usuário recebido:', user);
  
    // Dados padrão do usuário
    const userData = {
        displayName: user.displayName || '',
        email: user.email|| '',
        photoURL: user.photoURL || '',
        createdAt: admin.firestore.FieldValue.serverTimestamp(), //Talvez trocar o nome depois
      };
  
    // Cria o documento no Firestore
    return admin.firestore().collection('usuarios').doc(user.uid).set(userData)
    .then(() => {
      console.log(`Usuário criado no Firestore: ${user.uid}`);
    })
    .catch((error) => {
      console.error(`Erro ao criar usuário no Firestore: ${error.message}`);
    });
  });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
