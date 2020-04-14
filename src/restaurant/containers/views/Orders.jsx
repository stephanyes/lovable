import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import Orders from "../../../restaurant/components/views/Orders";

import { connect } from "react-redux";
//import { faTheaterMasks } from "@fortawesome/free-solid-svg-icons";
const DB = firebase.db;
let doc;
let tableId;
let dateNow = `${new Date()}`.slice(0, 15);

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
  };
};

class OrdersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderAccepted: [],
      orderCanceled: [],
      orderPending: [],
      orderCompletedToday: [],
      orderCompletedOld: [],
      history: false,
      total: 0,
    };
    this.handleClickStatus = this.handleClickStatus.bind(this);
    this.showHistory = this.showHistory.bind(this);
  }

  componentDidMount() {
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("orders");

    doc.onSnapshot((ordersDocuments) => {
      let pending = [];
      let accepted = [];
      let cancel = [];
      let completedOld = [];
      let completedToday = [];
      let totalCobradoEnElDia = 0;

      ordersDocuments.forEach((order) => {
        if (order.data().status === "pending") {
          pending.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify,
            tableID: order.data().tableID,
          });
        } else if (order.data().status === "accepted") {
          accepted.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify,
          });
        } else if (
          order.data().status === "canceled" &&
          order.data().date === dateNow
        ) {
          cancel.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify,
          });
        } else if (
          order.data().status === "completed" &&
          order.data().date === dateNow
        ) {
          completedToday.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify,
          });
          totalCobradoEnElDia = totalCobradoEnElDia + order.data().totalPrice;
        } else if (
          order.data().status === "completed" &&
          order.data().date !== dateNow
        ) {
          completedOld.push({
            id: order.id,
            idUser: order.data().idUser,
            numberOfOrder: order.data().numberOfOrder,
            numberOfTable: order.data().numberOfTable,
            status: order.data().status,
            totalPrice: order.data().totalPrice,
            notify: order.data().notify,
          });
        }
      });
      console.log(pending);
      this.setState({
        orderPending: pending,
        orderAccepted: accepted,
        orderCanceled: cancel,
        orderCompletedToday: completedToday,
        orderCompletedOld: completedOld,
        total: totalCobradoEnElDia,
      });
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

    firebase.succesfullMsg(`Order ${param}`);
  }

  showHistory(e) {
    e.preventDefault();
    this.setState({ history: true });
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Orders
          total={this.state.total}
          history={this.state.history}
          showHistory={this.showHistory}
          completedToday={this.state.orderCompletedToday}
          completedOld={this.state.orderCompletedOld}
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
