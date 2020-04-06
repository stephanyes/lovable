import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Orders from "../../../restaurant/components/views/Orders";
import { toast } from "react-toastify";

import { connect } from "react-redux";
const DB = firebase.db;
let doc;
//let fecha = `${new Date()}`;

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

class OrdersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderAcepted: [],
      orderCanceled: [],
      orderPending: []
    };
    this.handleClickStatus = this.handleClickStatus.bind(this);
  }

  componentDidMount() {
    let that = this;
    //let fecha = new Date();
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders");
    //.orderBy("timestamp", "desc");
    //.where("date", "==", `${fecha}`);

    doc.onSnapshot(ordersDocuments => {
      let pending = [];
      let acepted = [];
      let cancel = [];

      ordersDocuments.forEach(order => {
        console.log("foEach=>", order.data().status);
        if (order.data().status === "pending") {
          pending.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify
          });
          that.setState({ orderPending: pending });
        } else if (order.data().status === "acepted") {
          acepted.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify
          });
          that.setState({ orderAcepted: acepted });
        } else if (order.data().status === "canceled") {
          cancel.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify
          });
          that.setState({ orderCanceled: cancel });
        }

        //poner if para qe ejecute el msj solo cuando agrega no cuando algo se va
      });
      for (let i = 0; i < pending.length; i++) {
        if (pending[i].notify === false) {
          toast(`Table ${pending[i].numberOfTable} is ordering!`, {
            autoClose: true,
            closeButton: true,
            delay: 1500
          });
          let singleOrder = DB.collection("restaurants")
            .doc(this.props.userLogin)
            .collection("orders")
            .doc(pending[i].id);
          singleOrder.update({ notify: true });
        }
      }
    });
  }
  componentWillUnmount() {
    doc.onSnapshot(() => {});
  }

  handleClickStatus(e, id, param) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders")
      .doc(id);
    doc.update({ status: param });
    firebase.succesfullMsg(`Order ${param}`);
  }

  render() {
    // console.log(this.state);
    console.log("====>", this.state.orderPending);
    return (
      <div>
        <Sidebar />
        <Orders
          acepted={this.state.ordersAcepted}
          canceled={this.state.orderCanceled}
          pending={this.state.orderPending}
          handleClickStatus={this.handleClickStatus}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrdersContainer);
