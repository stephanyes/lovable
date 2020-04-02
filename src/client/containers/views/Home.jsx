import React from "react";
import firebase from "../../../services/firebase";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import ClientView from "../../../components/ClientView";
import { connect } from "react-redux";
const DB = firebase.db;
let tablesOfRestaurant;

const mapStateToProps = (state, ownprops) => {
  return {
    userLogin: state.user.loginUser.restaurantID
  };
};
class ClientViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    tablesOfRestaurant = DB.collection("restaurants")
      .doc(`${this.props.match.params.idRestaurant}`)
      .collection("tables");
    tablesOfRestaurant.onSnapshot(docSnapshot => {
      docSnapshot.forEach(doc => {
        if (doc.id == this.props.match.params.idTable) {
          this.setState({
            table: {
              clientActual: doc.data().clientActual,
              number: doc.data().number,
              orderActual: doc.data().orderActual,
              secretCode: doc.data().secretCode,
              state: doc.data().state,
              waiter: doc.data().waiter,
              pay: doc.data().pay,
              orderStatus: doc.data().orderStatus,
              id: doc.id
            }
          });
        }
      });
    });
  }

  componentWillUnmount() {
    tablesOfRestaurant.onSnapshot(() => {});
  }

  handleClick(type) {
    let tableActual = DB.collection("restaurants").doc(
      `${this.props.match.params.idRestaurant}/tables/${this.props.match.params.idTable}`
    );
    if (type === "waiter") {
      if (this.state.table.waiter === false) {
        tableActual.update({ waiter: true });
      } else {
        tableActual.update({ waiter: false });
      }
    } else if (type === "payment") {
      if (this.state.table.pay === false) {
        tableActual.update({ pay: true });
      } else {
        tableActual.update({ pay: false });
      }
    }
  }

  render() {
    return (
      <div>
        <ClientView
          handleClick={this.handleClick}
          table={this.state.table}
          propsOfRestaurantId={this.props.match.params.idRestaurant}
          propsOfTabletId={this.props.match.params.idTable}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ClientViewContainer);
