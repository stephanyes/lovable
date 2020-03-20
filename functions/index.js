const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("./src/services/firebase");

app.use("/api/login", (req, res) => {
  firebase.admin
    .firestore()
    .collection("users")
    .get()
    .then(users => {
      users.forEach(user => console.log(user.data()));
    });
});

//handleRegister(e) {
e.preventDefault();
const txtEmail = document.getElementById("txtEmail").value;
const txtPassword = document.getElementById("txtPassword").value;
const auth = firebase.auth();
const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);
promise.then(user => console.log(user)).catch(e => console.log(e.message));
console.log("click lick");
//}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
