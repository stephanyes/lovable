const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("./src/services/firebase");
//const src = require("./src");
//const firestore = require("firebase");

app.use("/api/login", (req, res) => {
  console.log(req.body);
  const txtEmail = req.body.email;
  const txtPassword = req.body.password;
  const promise = firebase.admin
    .auth()
    .signInWithEmailAndPassword("testeando2@mail.com", "123456");
  promise.then(user => console.log(user)).catch(e => console.log(e.message));
  console.log("click lick");
});

app.get('/api/testeando', (req, res) => {
  console.log("segui!")
  res.send("OKOKOK")
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
