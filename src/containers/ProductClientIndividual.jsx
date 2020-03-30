import React from "react";
import firebase from "../services/firebase";
import ProductClienteInd from "./ProductClienteInd";

const DB = firebase.db;

class ProductContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      product: {}
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

    doc.get().then(querySnapchot =>
      this.setState({
        product: {
          description: querySnapchot.data().description,
          imageProduct: querySnapchot.data().imageProduct,
          name: querySnapchot.data().name,
          price: querySnapchot.data().price
        }
      })
    );
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.props.match.params.idProduct);
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
