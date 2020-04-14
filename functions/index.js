const functions = require("firebase-functions");
const express = require("express");
const app = express();
const firebase = require("./src/services/firebase");
//const src = require("./src");
//const firestore = require("firebase");

// const smtpTransport = require('nodemailer-smtp-transport');
// const cors = require("cors")({
  //   origin: true
  // });
  
  // exports.emailMessage = functions.https.onRequest((req, res) => {
  //   const { email } = req.body;
  //   return cors(req, res, () => {
    //     var text = `<div>
    //       <h4>Information</h4>
    //       <ul>
    //         <li>
    //           Email - ${email || ""}
    //         </li>
    //       </ul>
    //       <h4>Message</h4>
    //     </div>`;
    
    //      var transporter = nodemailer.createTransport(smtpTransport({
      //       service: 'gmail',
      //       auth: {
  //           user: "winesellectionp5@gmail.com",
  //           pass: "plataforma5"
  //       }
  //     }));
  //     const mailOptions = {
    //       to: "winesellectionp5@gmail.com",
    //       from: `${email}`,
    //       subject: `${email} sent you a new message`,
    //       text: text,
    //       html: text
    //     };
    
    //     transporter.sendMail(mailOptions, function(error, info){
      //      if(error){
        //         console.log(error.message);
        //      }
        //      res.status(200).send({
          //        message: "success"
          //      })
          //     });
          //   }).catch(() => {
            //     res.status(500).send("error");
            //   });
            // });
            
            
            
            
            
            
            
            
            
            
const sendMail = function (mail){
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "winesellectionp5@gmail.com",
      pass: "plataforma5"
    }
  });
  const mailOptions = {
      from: "winesellectionp5@gmail.com",
      to: `${mail}`,
      subject: "Confirmacion de tu compra",
      text: `Estimado/a. Su compra se ha efectudo satisfactoriamente al numero de tarjeta por un monto total de $ . Dicha entrega será en en aproximadamente 3 días. Recuerde que puede dejar una reseña ingresando a nuestra página.
      Muchas gracias por elegirnos`
  };
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
      console.log(error);
      } else {
      console.log("Se ha enviando el mail");
      }
  });
}

app.use("/api/login", (req, res) => {
  const txtEmail = req.body.email;
  const txtPassword = req.body.password;
  const promise = firebase.admin
    .auth()
    .signInWithEmailAndPassword("testeando2@mail.com", "123456");
  promise.then(user => console.log(user)).catch(e => console.log(e.message));
  console.log("click lick");
});


app.post("/api/mail", (req, res) => {
  sendMail("imercs96@gmail.com")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.json("TODO OK")
  // res.send("Holaaa")
});

app.get('/api/testeando', (req, res) => {
  console.log("segui!")
  res.send("OKOKOK")
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.app = functions.https.onRequest(app);


