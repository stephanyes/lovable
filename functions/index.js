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


// app.post("/api/login", (req, res) => {
//   console.log(req.body);
//   const txtEmail = req.body.email;
//   const txtPassword = req.body.password;
//   const promise = firebase.admin
//     .auth()
//     .signInWithEmailAndPassword("testeando2@mail.com", "123456");
//   promise.then(user => console.log(user)).catch(e => console.log(e.message));
//   console.log("click lick");
// });

app.get('/api/testeando', (req, res) => {
  console.log("segui!")
  res.send("OKOKOK")
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);



// const sendMail = function (dueñoTarjeta, numTarj, email, total, dir){
//   const nodemailer = require("nodemailer");
//   const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//       user: "winesellectionp5@gmail.com",
//       pass: "plataforma5"
//       }
//   });
//   const mailOptions = {
//       from: "winesellectionp5@gmail.com",
//       to: `${email}`,
//       subject: "Confirmacion de tu compra",
//       text: `Estimado/a ${dueñoTarjeta}. Su compra se ha efectudo satisfactoriamente al numero de tarjeta ${numTarj} por un monto total de $ ${total}. Dicha entrega será en ${dir} en aproximadamente 3 días. Recuerde que puede dejar una reseña ingresando a nuestra página.
//       Muchas gracias por elegirnos`
//   };
//   transporter.sendMail(mailOptions, function(error, info) {
//       if (error) {
//       console.log(error);
//       } else {
//       console.log("Se ha enviando el mail");
//       }
//   });
// }