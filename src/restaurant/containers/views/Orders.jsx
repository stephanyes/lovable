import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Orders from "../../../restaurant/components/views/Orders";
import { toast } from "react-toastify";

import { connect } from "react-redux";
const DB = firebase.db;
let doc;
let tableId;

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

class OrdersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderAccepted: [],
      orderCanceled: [],
      orderPending: []
    };
    this.handleClickStatus = this.handleClickStatus.bind(this);
  }

  componentDidMount() {
    let that = this;
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders");

    doc.onSnapshot(ordersDocuments => {
      let pending = [];
      let accepted = [];
      let cancel = [];

      ordersDocuments.forEach(order => {

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
        } else if (order.data().status === "accepted") {
          accepted.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify
          });
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
        }
      })
      that.setState({ orderPending: pending, orderAccepted: accepted, orderCanceled: cancel }, this.props.history.push("/orders"));

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

  handleClickStatus(e, id, param, numTable) {
    e.preventDefault();
    let doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders")
      .doc(id);
    doc.update({ status: param });
    
    let tableDoc = DB.collection("restaurants")
    .doc(this.props.userLogin)
    .collection("tables")
    
    tableDoc.get()
    .then(data => {
      data.forEach(res => {
        if(res.data().number === numTable) tableId = res.id
      })
    })
    .then(() => {
      let idTable = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("tables")
      .doc(tableId)
      
      idTable.update({orderStatus: "accepted"})
    })
    
    
    firebase.succesfullMsg(`Order ${param}`);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Orders
          accepted={this.state.orderAccepted}
          canceled={this.state.orderCanceled}
          pending={this.state.orderPending}
          handleClickStatus={this.handleClickStatus}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrdersContainer);
