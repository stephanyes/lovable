const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("./src/services/firebase");

app.use("/api", (req, res) => {
  console.log(firebase);
  firebase.admin
    .firestore()
    .collection("users")
    .get()
    .then(users => {
      users.forEach(user => console.log(user.data()));
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
