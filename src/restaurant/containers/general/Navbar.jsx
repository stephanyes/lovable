import React from "react";
import { withRouter } from "react-router-dom";
import firebase from "../../../services/firebase";
import { connect } from "react-redux";
import Navbar from "../../../restaurant/components/general/Navbar";
import { userLogout } from "../../../store/actions/loginAction";

const DB = firebase.db;
let doc;

const mapStateToProps = state => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chauUser: () => dispatch(userLogout())
  };
};

class NavbarContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      mesas: []
    };
    this.logoutButton = this.logoutButton.bind(this);
  }

  async logoutButton(e) {
    e.preventDefault();
    await firebase.logout();
    this.props.chauUser();
    this.props.history.replace("/");
  }

  componentDidMount() {
    let that = this;
    doc = DB.collection("restaurants")
      .doc(this.props.userLogin)
      .collection("tables");
    // .where("status", "==", "pending");

    doc.onSnapshot(function(snapshot) {
      let mesas = [];
      snapshot.docChanges().forEach(function(change) {
        if (
          change.type === "modified" &&
          change.doc.data().orderStatus === "pending"
        ) {
          console.log("Modified city: ", change.doc.data());
          mesas.push({
            number: change.doc.data().number,
            pay: change.doc.data().pay,
            waiter: change.doc.data().waiter,
            orderStatus: change.doc.data().orderStatus
          });

          that.setState({ mesas });
        }
      });
    });

    // doc.onSnapshot(ordersDocuments => {
    //   let orders = [];
    //   ordersDocuments.forEach(order => {
    //     orders.push({
    //       id: order.id,
    //       idUser: order.data().idUser,
    //       numberOfOrder: order.data().numberOfOrder,
    //       numberOfTable: order.data().numberOfTable,
    //       status: order.data().status,
    //       totalPrice: order.data().totalPrice
    //     });
    //     //poner if para qe ejecute el msj solo cuando agrega no cuando algo se va
    //     if (order.data().status === "pending") {
    //       toast(`Table ${order.data().numberOfTable} is ordering!`, {
    //         autoClose: false,
    //         closeButton: true
    //       });
    //     }
    //   });
    //   this.setState({ ordersArray: orders });
    // });
  }
  componentWillUnmount() {
    doc.onSnapshot(() => {});
  }

  render() {
    return (
      <div>
        <Navbar mesas={this.state.mesas} buttonClick={this.logoutButton} />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
);
