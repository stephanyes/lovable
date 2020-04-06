import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Orders from "../../../restaurant/components/views/Orders";
import { toast } from "react-toastify";

import { connect } from "react-redux";
const DB = firebase.db;
let doc;
let fecha = `${new Date()}`;

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

class OrdersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersArray: []
    };
    this.handleClickStatus = this.handleClickStatus.bind(this);
  }

  componentDidMount() {
    let fecha = new Date();
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders")
      .where("date", "==", `${fecha}`);

    doc.onSnapshot(ordersDocuments => {
      let orders = [];
      ordersDocuments.forEach(order => {
        orders.push({
          id: order.id,
          idUser: order.data().idUser,
          numberOfOrder: order.data().numberOfOrder,
          numberOfTable: order.data().numberOfTable,
          status: order.data().status,
          totalPrice: order.data().totalPrice
        });
        //poner if para qe ejecute el msj solo cuando agrega no cuando algo se va
        if (order.data().status === "pending") {
          toast(`Table ${order.data().numberOfTable} is ordering!`, {
            autoClose: false,
            closeButton: true
          });
        }
      });
      this.setState({ ordersArray: orders });
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
    console.log("fecha: ", fecha.slice(0, 15));
    return (
      <div>
        <Sidebar />
        <Orders
          orders={this.state.ordersArray}
          handleClickStatus={this.handleClickStatus}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrdersContainer);
