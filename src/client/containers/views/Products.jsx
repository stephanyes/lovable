import React from "react";
import firebase from "../../../services/firebase";
import Products from "../../components/views/Products";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DB = firebase.db;
const MySwal = withReactContent(Swal);

let orderToUpdate;
let orderToCreate;
let resAddToCart;

class ProductContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product: {},
      order: {
        numberOfTable: "",
        status: "draft",
        totalPrice: 0,
        date: "",
        notify: false,
      },
      comments: "This product has not a special comment",
      value: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.addProd = this.addProd.bind(this);
    this.lessProd = this.lessProd.bind(this);
  }

  componentDidMount() {
    const doc = DB.collection("restaurants")
      .doc(this.props.match.params.idRestaurant)
      .collection("menu")
      .doc(this.props.match.params.idMenu)
      .collection("categories")
      .doc(this.props.match.params.idCategoria)
      .collection("products")
      .doc(this.props.match.params.idProduct);

    doc.get().then((querySnapshot) =>
      this.setState({
        product: {
          description: querySnapshot.data().description,
          imageProduct: querySnapshot.data().imageProduct,
          name: querySnapshot.data().name,
          price: querySnapshot.data().price,
        },
      })
    );
  }

  handlerChange(e) {
    e.preventDefault();
    this.setState({ comments: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    let RestaurantId = this.props.match.params.idRestaurant;

    let TablesRestaurant = DB.collection("restaurants")
      .doc(RestaurantId)
      .collection("tables")
      .doc(this.props.match.params.idTable);

    let RestaurantDoc = DB.collection("restaurants").doc(RestaurantId);

    TablesRestaurant.get().then((result) => {
      this.setState({
        order: {
          numberOfTable: result.data().number,
          status: "draft",
          totalPrice: 0,
          date: `${new Date()}`.slice(0, 15),
          notify: false,
        },
      });
      resAddToCart = true;
      MySwal.fire({
        title: "Success!",
        text: "Your product has been added to cart.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#ff2068",
        cancelButtonColor: "#d33",
        confirmButtonText: "Continue",
      }).then(() => {
        if (resAddToCart && result.data().orderActual !== 0) {
          orderToUpdate = result.data().orderActual;

          let OrdersRestaurant = DB.collection("restaurants")
            .doc(RestaurantId)
            .collection("orders")
            .doc(`${orderToUpdate}`);
          this.setState((state) => ({
            product: {
              ...state.product,
              comments: state.comments,
              quantity: this.state.value,
            },
          }));

          OrdersRestaurant.collection("products").doc().set(this.state.product);
        } else if (resAddToCart) {
          RestaurantDoc.get().then((result) => {
            orderToCreate = result.data().orderTotalNumber;
            RestaurantDoc.update({ orderTotalNumber: orderToCreate + 1 });
            TablesRestaurant.update({
              orderActual: orderToCreate,
              orderStatus: "draft",
            });
            let newOrder = RestaurantDoc.collection("orders").doc(
              `${orderToCreate}`
            );
            newOrder.set(this.state.order);
            this.setState((state) => ({
              product: {
                ...state.product,
                comments: this.state.comments,
                quantity: this.state.value,
              },
            }));
            newOrder.collection("products").doc().set(this.state.product);
          });
        }
      });
    });
  }

  addProd(e) {
    e.preventDefault();
    this.setState({ value: this.state.value + 1 });
  }

  lessProd(e) {
    e.preventDefault();
    if (this.state.value > 1) this.setState({ value: this.state.value - 1 });
  }

  render() {
    return (
      <div>
        <Products
          lessProd={this.lessProd}
          value={this.state.value}
          addProd={this.addProd}
          handlerChange={this.handlerChange}
          handleClick={this.handleClick}
          product={this.state.product}
        />
      </div>
    );
  }
}

export default ProductContainer;
