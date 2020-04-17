const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("./src/services/firebase");

const cors = require("cors");
app.use(cors());

const sendMail = function (mail) {
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "winesellectionp5@gmail.com",
      pass: "plataforma5",
    },
  });
  const mailOptions = {
    from: "winesellectionp5@gmail.com",
    to: `${mail}`,
    subject: "Gracias por visitarnos!",
    text: `Estimado/a,
      Muchas gracias por elegirnos una vez más. Esperamos verlo pronto nuevamente.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Se ha enviando el mail");
    }
  });
};

app.use("/api/login", (req, res) => {
  const txtEmail = req.body.email;
  const txtPassword = req.body.password;
  const promise = firebase.admin
    .auth()
    .signInWithEmailAndPassword("testeando2@mail.com", "123456");
  promise
    .then((user) => console.log(user))
    .catch((e) => console.log(e.message));
  console.log("click lick");
});

app.post("/api/mail", (req, res) => {
  sendMail(req.body.mail);
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
});

app.get("/api/testeando", (req, res) => {
  console.log("segui!");
  res.send("OKOKOK");
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.app = functions.https.onRequest(app);
