import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../../services/firebase";
import { connect } from "react-redux";
import Navbar from "../../../restaurant/components/general/Navbar";
import { userLogout } from "../../../store/actions/loginAction";
import { toast } from "react-toastify";

const DB = firebase.db;
let doc;
let orderQuery;

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chauUser: () => dispatch(userLogout()),
  };
};

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      mesas: [],
      ordersArray: [],
      isOpen: false,
    };
    this.logoutButton = this.logoutButton.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  logoutButton(e) {
    e.preventDefault();
    firebase.logout();
    this.props.chauUser();
    this.props.history.replace("/");
  }
  toggleOpen() {
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    } else {
      this.setState({
        isOpen: false,
      });
    }
  }

  componentDidMount() {
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("tables");
    doc.onSnapshot((tables) => {
      let mesas = [];
      tables.forEach((change) => {
        if (
          change.data().pay ||
          change.data().waiter ||
          change.data().orderStatus === "pending"
        )
          mesas.push({
            id: change.id,
            number: change.data().number,
            pay: change.data().pay,
            waiter: change.data().waiter,
            orderStatus: change.data().orderStatus,
          });
      });

      orderQuery = DB.collection("restaurants")
        .doc(this.props.userLogin)
        .collection("orders");

      orderQuery.onSnapshot((ordenes) => {
        let orders = [];
        ordenes.forEach((orden) => {
          if (orden.data().status === "pending" && orden.data().notify === false) {
            orders.push({
              id: orden.id,
              idUser: orden.data().idUser,
              numberOfOrder: orden.data().numberOfOrder,
              numberOfTable: orden.data().numberOfTable,
              status: orden.data().status,
              totalPrice: orden.data().totalPrice,
              notify: orden.data().notify,
              tableID: orden.data().tableID,
            });
          }
        });
        this.setState({ ordersArray: orders, mesas: mesas });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ordersArray.length !== this.state.ordersArray.length) {
      let arr = this.state.ordersArray
      for (let i = 0; i < arr.length + 1 - 1; i++) {
        if (arr[i].notify === false) {
          toast.info(`Table ${arr[i].numberOfTable} is ordering!`, {
            autoClose: false,
            closeButton: true,
            delay: 1500,
          });
          let singleOrder = DB.collection("restaurants")
            .doc(this.props.userLogin)
            .collection("orders")
            .doc(arr[i].id);
          singleOrder.update({ notify: true });
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar
          mesas={this.state.mesas}
          buttonClick={this.logoutButton}
          isOpen={this.toggleOpen}
          dropdown={this.state.isOpen}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
);
