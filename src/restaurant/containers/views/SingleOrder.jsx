import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import SingleOrder from "../../../restaurant/components/views/SingleOrder";
import { connect } from "react-redux";
const DB = firebase.db;
let doc;
let product;

const mapStateToProps = (state) => {
  return {
    userLogin: state.user.loginUser.restaurantID,
    isAuth: state.user.isAuth,
  };
};

class SingleOrderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      productsArray: [],
    };
  }

  orderId = this.props.match.params.orderId;

  componentDidMount() {
    if (this.props.isAuth == false) {
      this.props.history.push("/");
    } else {
      doc = DB.collection("restaurants")
        .doc(this.props.userLogin)
        .collection("orders")
        .doc(this.orderId);
      doc.get().then((order) => {
        this.setState({
          order: {
            table: order.data().numberOfTable,
            total: order.data().totalPrice,
          },
        });
      });
      product = DB.collection("restaurants")
        .doc(this.props.userLogin)
        .collection("orders")
        .doc(this.orderId)
        .collection("products")
        .get()
        .then((products) => {
          let array = [];
          products.forEach((product) => {
            array.push({
              name: product.data().name,
              price: product.data().price,
              quantity: product.data().quantity,
            });
          });
          this.setState({
            productsArray: array,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <Sidebar />
        <SingleOrder order={this.state} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(SingleOrderContainer);
