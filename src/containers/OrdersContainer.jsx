import React from "react";
import firebase from "../services/firebase";
import SidebarContainer from "../containers/SidebarContainer";
import FooterContainer from "./FooterContainer";
import Orders from "../components/Orders";
import { toast } from "react-toastify";

import { connect } from "react-redux";
const DB = firebase.db;
let doc;

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
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders")
      .where("status", "==", "pending");

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
    return (
      <div>
        <SidebarContainer />
        <Orders
          orders={this.state.ordersArray}
          handleClickStatus={this.handleClickStatus}
        />
        <FooterContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrdersContainer);
