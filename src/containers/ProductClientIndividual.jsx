import React from "react";
import firebase from "../services/firebase";
import ProductClienteInd from "../components/ProductClienteInd";

const DB = firebase.db;
let orderToUpdate;
let orderToCreate;

class ProductContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product: {},
      order: {
        numberOfTable: "completar con INFO",
        status: "draft",
        totalPrice: 0,
      }
    };
    this.handleClick = this.handleClick.bind(this);
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

    doc.get().then(querySnapshot =>
      this.setState({
        product: {
          description: querySnapshot.data().description,
          imageProduct: querySnapshot.data().imageProduct,
          name: querySnapshot.data().name,
          price: querySnapshot.data().price
        }
      })
    ); 
  }

  handleClick(e) {
    e.preventDefault();
    let RestaurantId = this.props.match.params.idRestaurant;

    let TablesRestaurant = DB.collection("restaurants")
    .doc(RestaurantId)
    .collection("tables").doc(this.props.match.params.idTable)

    let RestaurantDoc = DB.collection("restaurants").doc(RestaurantId)
    
    TablesRestaurant.get()
    .then(result => {
      this.setState({order: {numberOfTable : result.data().number, status: "draft",
      totalPrice: 0}})

      if(result.data().orderActual !== 0) { 
        orderToUpdate = result.data().orderActual
        
        let OrdersRestaurant = DB.collection("restaurants")
        .doc(RestaurantId)
        .collection("orders")
        .doc(`${orderToUpdate}`)
        OrdersRestaurant.collection("products").doc().set(this.state.product)
      }
      else{
        RestaurantDoc.get() 
        .then(result => {
          orderToCreate = result.data().orderTotalNumber
          RestaurantDoc.update({orderTotalNumber : orderToCreate + 1})
          TablesRestaurant.update({ orderActual: orderToCreate, orderStatus: "draft"})
          let newOrder = RestaurantDoc.collection("orders").doc(`${orderToCreate}`)
          newOrder.set(this.state.order)
          newOrder.collection("products").doc().set(this.state.product)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <ProductClienteInd
          handleClick={this.handleClick}
          product={this.state.product}
        />
      </div>
    );
  }
}

export default ProductContainer;
