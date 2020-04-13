import React from "react";
import firebase from "../../../services/firebase";
import SingleTable from "../../../restaurant/components/views/SingleTable";
import Sidebar from "../general/Sidebar";
import { connect } from "react-redux";
import nodemailer from "nodemailer";
//const nodemailer = require("nodemailer");

const DB = firebase.db;

let pruebaSingleTable;
let orderQuery;
let productsTable;
let tableId;
let orderId;

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
  };
};

class SingleTableContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      table: {},
      tableOrder: {},
      productArray: [],
      order: 0,
    };
    this.handlerButton = this.handlerButton.bind(this);
    this.orderHandler = this.orderHandler.bind(this);
    this.tableHandler = this.tableHandler.bind(this);
    this.sendMailToUser = this.sendMailToUser.bind(this);
  }

  componentDidMount() {
    pruebaSingleTable = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables")
      .doc(this.props.match.params.idTable);
    pruebaSingleTable.onSnapshot((tableDoc) => {
      this.setState({
        table: {
          clientActual: tableDoc.data().clientActual,
          number: tableDoc.data().number,
          orderActual: tableDoc.data().orderActual,
          secretCode: tableDoc.data().secretCode,
          state: tableDoc.data().state,
          waiter: tableDoc.data().waiter,
          pay: tableDoc.data().pay,
          orderStatus: tableDoc.data().orderStatus,
          id: tableDoc.id,
        },
      });
      if (tableDoc.data().orderActual !== 0) {
        orderId = tableDoc.data().orderActual.toString();
        this.setState({ order: orderId });
        orderQuery = DB.collection("restaurants")
          .doc(`${this.props.userLogin}`)
          .collection("orders")
          .doc(orderId);
        orderQuery.onSnapshot((docSnapshot) => {
          this.setState({
            tableOrder: {
              status: docSnapshot.data().status,
              totalPrice: docSnapshot.data().totalPrice,
              mail: docSnapshot.data().mail,
            },
          });
          productsTable = orderQuery.collection("products");
          productsTable.onSnapshot((prodDoc) => {
            let arrayHelper = [];
            prodDoc.forEach((singleProd) => {
              arrayHelper.push({
                name: singleProd.data().name,
                price: singleProd.data().price,
              });
            });
            this.setState({
              productArray: arrayHelper,
            });
          });
        });
      }
    });
  }

  componentWillUnmount() {
    pruebaSingleTable.onSnapshot(() => {});
    if (orderQuery && productsTable) {
      orderQuery.onSnapshot(() => {});
      productsTable.onSnapshot(() => {});
    }
  }

  orderHandler(e, id, string, numTable) {
    e.preventDefault();
    let stringy = id.toString();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders")
      .doc(stringy);
    doc.update({ status: string });

    let tableDoc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("tables");

    tableDoc
      .get()
      .then((data) => {
        data.forEach((res) => {
          if (res.data().number === numTable) tableId = res.id;
        });
      })
      .then(() => {
        let idTable = DB.collection("restaurants")
          .doc(this.props.userLogin)
          .collection("tables")
          .doc(tableId);

        idTable.update({ orderStatus: "accepted" });
      });
    firebase.succesfullMsg(`Order ${string}`);
  }

  tableHandler(e, id, string) {
    e.preventDefault();
    let table = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("tables")
      .doc(id);
    if (string === "waiter") {
      table.update({
        waiter: false,
      });
    } else {
      table.update({
        pay: false,
      });
    }
  }

  sendMailToUser(email) {
    console.log("llegue adentro de la funcion con este mail", email);
    // sendMail(dueñoTarjeta, numTarj, email, total, dir){
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "winesellectionp5@gmail.com",
        pass: "plataforma5",
      },
    });
    const mailOptions = {
      from: "winesellectionp5@gmail.com",
      to: `${email}`,
      subject: "Gracias por elegirnos!",
      text: `Estimado/a. Su compra se ha efectudo satisfactoriamente al numero de tarjeta por un monto total de. Dicha entrega será en en aproximadamente 3 días. Recuerde que puede dejar una reseña ingresando a nuestra página.
        Muchas gracias por elegirnos`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Se ha enviando el mail");
      }
    });
  }

  handlerButton(e, string) {
    e.preventDefault();
    let mailToSend;
    let SingleTable = DB.collection("restaurants")
      .doc(`${this.props.userLogin}`)
      .collection("tables")
      .doc(this.props.match.params.idTable);
    if (orderId) {
      let orderChange = DB.collection("restaurants")
        .doc(`${this.props.userLogin}`)
        .collection("orders")
        .doc(orderId);
      SingleTable.get().then((table) => {
        if (table.data().mail) {
          mailToSend = table.data().mail;
          this.sendMailToUser(mailToSend);
          orderChange.update({ status: string, mail: mailToSend });
        } else {
          orderChange.update({ status: string });
        }
      });
    } else {
      SingleTable.get().then((table) => {
        if (table.data().mail) {
          mailToSend = table.data().mail;
          this.sendMailToUser(mailToSend);
        }
      });
    }

    SingleTable.update({
      clientActual: 0,
      orderActual: 0,
      orderStatus: "",
      secretCode: 0,
      state: "free",
      pay: false,
      waiter: false,
      mail: "",
    });

    this.props.history.push(`/dashboard`);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <SingleTable
          table={this.state.table}
          order={this.state.tableOrder}
          orderId={this.state.order}
          productArray={this.state.productArray}
          buttonClick={this.handlerButton}
          orderHandler={this.orderHandler}
          tableHandler={this.tableHandler}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(SingleTableContainer);
