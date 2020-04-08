import React from "react";
import firebase from "../../../services/firebase";
import Home from "../../../client/components/views/Home";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DB = firebase.db;
const MySwal = withReactContent(Swal);

let tablesOfRestaurant;
let restaurantInfo;
let controlPay;
let control;

const mapStateToProps = (state, ownprops) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
  };
};
class ClientViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: {},
      restaurant: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    tablesOfRestaurant = DB.collection("restaurants")
      .doc(`${this.props.match.params.idRestaurant}`)
      .collection("tables");
    restaurantInfo = DB.collection("restaurants").doc(
      `${this.props.match.params.idRestaurant}`
    );
    restaurantInfo.get().then((doc) => {
      this.setState({ restaurant: doc.data() });
    });
    tablesOfRestaurant.onSnapshot((docSnapshot) => {
      docSnapshot.forEach((doc) => {
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
              id: doc.id,
            },
          });
        }
      });
    });

    controlPay = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("tables")
      .doc(this.props.match.params.idTable);

    controlPay.get().then((data) => (control = data.data().pay));
  }

  componentWillUnmount() {
    tablesOfRestaurant.onSnapshot(() => {});
  }

  handleClick(type) {
    let tableActual = DB.collection("restaurants").doc(
      `${this.props.match.params.idRestaurant}/tables/${this.props.match.params.idTable}`
    );

    if (type === "waiter") {
      this.state.table.waiter === false
        ? tableActual.update({ waiter: true })
        : tableActual.update({ waiter: false });
    }

    if (!control && type === "payment") {
      MySwal.fire({
        title: "Are you sure you want to request bill?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.value) {
          MySwal.fire("Success!", `Your bill has been to request.`, "success");
          if (this.state.table.pay === false) {
            tableActual.update({ pay: true });
            control = true;
          }
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Home
          handleClick={this.handleClick}
          table={this.state.table}
          restaurant={this.state.restaurant}
          propsOfRestaurantId={this.props.match.params.idRestaurant}
          propsOfTabletId={this.props.match.params.idTable}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ClientViewContainer);
