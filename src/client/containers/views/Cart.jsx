import React from "react";
import firebase from "../../../services/firebase";
import Cart from "../../../client/components/views/Cart";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const DB = firebase.db;
let order;
let orderPrice;
let total;
let productArray;

class ViewCartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      priceTotal: 0,
      idOrder: "",
    };
    this.deleteClick = this.deleteClick.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount() {
    const doc = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("tables")
      .doc(this.props.match.params.idTable);

    doc.get().then((data) => {
      let orderId = data.data().orderActual;
      order = DB.collection("restaurants")
        .doc(this.props.match.params.idRestaurant)
        .collection("orders")
        .doc(`${orderId}`)
        .collection("products");

      order.onSnapshot((result) => {
        total = this.state.priceTotal;
        productArray = [];
        result.forEach((product) => {
          orderPrice = DB.collection("restaurants")
            .doc(this.props.match.params.idRestaurant)
            .collection("orders")
            .doc(`${orderId}`);

          productArray.push({
            id: product.id,
            imageProduct: product.data().imageProduct,
            name: product.data().name,
            price: product.data().price,
            description: product.data().description,
            quantity: product.data().quantity,
          });
        });
        if (this.state.priceTotal !== 0) total = 0;
        for (let i = 0; i < productArray.length; i++) {
          total += parseInt(productArray[i].price) * productArray[i].quantity;
        }
        orderPrice.update({ totalPrice: total });
        this.setState({
          productos: productArray,
          priceTotal: total,
          idOrder: orderId,
        });
      });
    });
  }

  componentWillUnmount() {
    order.onSnapshot(() => {});
  }

  deleteClick(e, id) {
    e.preventDefault();

    const order = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("orders")
      .doc(`${this.state.idOrder}`)
      .collection("products");
    order
      .doc(`${id}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => console.error("Error removing document: ", error));
  }

  handlerSubmit(e) {
    e.preventDefault();
    const order = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("orders")
      .doc(`${this.state.idOrder}`);

    order.update({ status: "pending" });

    const tables = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("tables")
      .doc(`${this.props.match.params.idTable}`);

    tables.update({ orderStatus: "pending" });
    MySwal.fire({
      title: "Excellent!",
      text: "Your Order is on the way.",
      icon: "success",
      confirmButtonColor: "#ff2068",
      confirmButtonText: "Continue",
    });
    this.props.history.push(
      `/${this.props.match.params.idRestaurant}/${this.props.match.params.idTable}`
    );
  }

  render() {
    return (
      <div>
        <Cart
          deleteClick={this.deleteClick}
          handlerSubmit={this.handlerSubmit}
          productos={this.state.productos}
          priceTotal={this.state.priceTotal}
        />
      </div>
    );
  }
}

export default ViewCartContainer;
