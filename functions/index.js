/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

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


exports.agradecerPubli = functions.https.onCall((data, context) => {

    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'Somente usuários autenticados podem agradecer!'
        );
    }
    //Recuperar o usuario autenticado no momento do agradecimento
    const usuario = admin.firestore().collection('usuarios').doc(context.auth.uid)
    const requisicao = admin.firestore().collection('sites').doc(data.id)

    return usuario.get().then(doc => {
        if (doc.data().agradeceuEm.includes(data.id)) {
            throw new functions.https.HttpsError(
                'failed-precondition',
                'O agradecimento é permitido somente uma vez!'
            );
        }

        return usuario.update({
            agradeceuEm: [...doc.data().agradeceuEm, data.id]
        })
            .then(() => {
                return requisicao.update({
                    agradecimentos: admin.firestore.FieldValue.increment(1)
                })
            })
    })
})

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
