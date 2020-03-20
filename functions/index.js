const functions = require("firebase-functions");
const express = require("express");
const app = express();

app.use("/api", (req, res) => {
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
