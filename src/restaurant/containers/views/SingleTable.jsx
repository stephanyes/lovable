import React from "react";
import axios from "axios";
import firebase from "../../../services/firebase";
import SingleTable from "../../../restaurant/components/views/SingleTable";
import Sidebar from "../general/Sidebar";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import { showLoader, hideLoader } from "../../../store/actions/loginAction";
import { connect } from "react-redux";

const DB = firebase.db;

let pruebaSingleTable;
let orderQuery;
let productsTable;
let tableId;
let orderId;

let local = JSON.parse(window.localStorage.getItem('persist:lovableLogin'))
let userLS
if (local) {
  userLS = JSON.parse(local.user)
}

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
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
  }

  componentDidMount() {
    if (userLS.isAuth === false) {
      this.props.history.push("/");
    } else {
      this.props.dispatch(showLoader());
      pruebaSingleTable = DB.collection("restaurants")
        .doc(userLS.loginUser.restaurantID)
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
                  comments: singleProd.data().comments,
                  name: singleProd.data().name,
                  price: singleProd.data().price,
                  quantity: singleProd.data().quantity,
                });
              });
              this.setState({
                productArray: arrayHelper,
              });
            });
          });
        }
      });
      setTimeout(() => {
        this.props.dispatch(hideLoader());
      }, 500);
    }
  }

  componentWillUnmount() {
    if (pruebaSingleTable) {
      pruebaSingleTable.onSnapshot(() => {});
    }
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
        let mesaID;
        data.forEach((res) => {
          if (res.data().number === numTable) {
            mesaID = res.id;
          }
        });
        return mesaID
      })
      .then((mesaID) => {
        let idTable = DB.collection("restaurants")
          .doc(this.props.userLogin)
          .collection("tables")
          .doc(mesaID);

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

  handlerButton(e, string) {
    e.preventDefault();
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
          orderChange.update({ status: string, mail: table.data().mail });
          axios({
            headers: { "Access-Control-Allow-Origin": "*" },
            method: "post",
            data: { mail: table.data().mail },
            //url: "http://localhost:5000/lovable-qr/us-central1/app/api/mail",
            url: "https://lovable-qr.web.app/api/mail",
          })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        } else {
          orderChange.update({ status: string });
        }
      });
    } else {
      SingleTable.get().then((table) => {
        if (table.data().mail) {
          axios({
            headers: { "Access-Control-Allow-Origin": "*" },
            method: "post",
            data: { mail: table.data().mail },
            // url: "http://localhost:5000/lovable-qr/us-central1/app/api/mail",
            url: "https://lovable-qr.web.app/api/mail",
          })
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
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
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SingleTableContainer);
